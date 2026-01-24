'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

export default function InvestorsLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(false);

    try {
      const response = await fetch('/api/investors/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        router.push('/investors');
        router.refresh();
      } else {
        setError(true);
        setPassword('');
      }
    } catch (err) {
      setError(true);
      setPassword('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-background flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-primary" strokeWidth={1.5} />
          </div>
          <h1 className="text-2xl md:text-3xl text-foreground mb-3 heading-text">
            Investor Access
          </h1>
          <p className="text-[15px] text-muted-foreground professional-text">
            This area is restricted to authorized investors
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card p-8 border border-border rounded-lg refined-shadow">
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm text-foreground professional-text font-medium mb-3">
              Access Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                className="w-full px-4 py-3 bg-background border border-border rounded-md text-foreground professional-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                placeholder="Enter password"
                autoFocus
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" strokeWidth={1.5} />
                ) : (
                  <Eye className="w-5 h-5" strokeWidth={1.5} />
                )}
              </button>
            </div>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-red-600 professional-text mt-2"
              >
                Incorrect password. Please try again.
              </motion.p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-foreground text-background px-6 py-3 rounded-md professional-text font-medium hover:opacity-90 transition-opacity elevated-shadow disabled:opacity-50"
          >
            {isLoading ? 'Verifying...' : 'Access Investor Area'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground professional-text mb-4">
            Don't have access?
          </p>
          <a
            href="mailto:hello@cryptocoop.info?subject=Investor Access Request"
            className="inline-flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors professional-text font-medium"
          >
            Request Access
            <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
          </a>
        </div>
      </motion.div>
    </div>
  );
}
