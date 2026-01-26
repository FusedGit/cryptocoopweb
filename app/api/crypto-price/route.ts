import { NextResponse } from 'next/server'
import { getCryptoPrice } from '@/lib/coingecko'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const symbol = searchParams.get('symbol')

    if (!symbol) {
      return NextResponse.json({ error: 'Symbol is required' }, { status: 400 })
    }

    const price = await getCryptoPrice(symbol)

    if (!price) {
      return NextResponse.json({ error: 'Could not fetch price' }, { status: 404 })
    }

    return NextResponse.json({ 
      symbol: symbol.toUpperCase(),
      price,
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    console.error('Error in crypto-price API:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
