import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { logAdminAction } from '@/lib/admin'

// Map network names to blockchain identifiers
const NETWORK_TO_BLOCKCHAIN: Record<string, string> = {
  'Ethereum': 'ethereum',
  'Bitcoin': 'bitcoin',
  'BSC': 'bsc',
  'Tron': 'tron',
  'Solana': 'solana',
  'Monero': 'monero',
  'Litecoin': 'litecoin',
  'TON': 'ton',
  'Dogecoin': 'dogecoin',
}

// Extract currency from crypto_symbol (e.g., "USDT-ERC20" -> "USDT")
function extractCurrency(cryptoSymbol: string): string {
  return cryptoSymbol.split('-')[0]
}

export async function POST(request: Request) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data: adminUser } = await supabase
    .from('admin_users')
    .select('id, role')
    .eq('user_id', user.id)
    .single()

  if (!adminUser) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  try {
    const { wallets } = await request.json()

    if (!Array.isArray(wallets)) {
      return NextResponse.json({ error: 'Invalid format' }, { status: 400 })
    }

    const results = []

    for (const wallet of wallets) {
      try {
        const blockchain = NETWORK_TO_BLOCKCHAIN[wallet.network_name] || wallet.network_name.toLowerCase()
        const currency = extractCurrency(wallet.crypto_symbol)
        
        // Check if already exists
        const { data: existing } = await supabase
          .from('wallet_addresses')
          .select('id')
          .eq('address', wallet.wallet_address)
          .eq('currency', currency)
          .single()

        if (existing) {
          results.push({
            address: wallet.wallet_address.slice(0, 12) + '...',
            currency,
            status: 'skipped',
            reason: 'already exists',
          })
          continue
        }

        // Insert wallet
        const { data: newWallet, error: insertError } = await supabase
          .from('wallet_addresses')
          .insert({
            address: wallet.wallet_address,
            currency,
            blockchain,
            address_type: 'hot', // Default to hot wallet
            owner_type: 'platform',
            label: `${currency} ${wallet.network_name} Wallet`,
            balance: 0,
            api_provider: blockchain === 'ethereum' || blockchain === 'bsc' || blockchain === 'polygon' 
              ? 'moralis' 
              : 'blockchain-api',
          })
          .select()
          .single()

        if (insertError) {
          results.push({
            address: wallet.wallet_address.slice(0, 12) + '...',
            currency,
            status: 'error',
            error: insertError.message,
          })
        } else {
          results.push({
            address: wallet.wallet_address.slice(0, 12) + '...',
            currency,
            blockchain,
            status: 'success',
          })
        }
      } catch (error: any) {
        results.push({
          address: wallet.wallet_address?.slice(0, 12) + '...',
          status: 'error',
          error: error.message,
        })
      }
    }

    // Log action
    await logAdminAction('bulk_import_wallets', 'wallet_address', undefined, {
      count: wallets.length,
      successful: results.filter(r => r.status === 'success').length,
    })

    return NextResponse.json({
      message: 'Bulk import completed',
      results,
      summary: {
        total: wallets.length,
        success: results.filter(r => r.status === 'success').length,
        skipped: results.filter(r => r.status === 'skipped').length,
        errors: results.filter(r => r.status === 'error').length,
      },
    })
  } catch (error: any) {
    console.error('Error bulk importing wallets:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
