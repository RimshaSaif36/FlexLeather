'use client'

import Link from 'next/link'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'

export default function LoginPage() {
  return (
    <>
      <Header />
      <main className="bg-background min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md px-4">
          <div className="border border-border p-8">
            <h1 className="text-3xl font-serif font-light tracking-wide mb-8 text-center">
              Sign In
            </h1>

            <form className="space-y-6">
              <div>
                <label className="block text-sm font-light mb-2">Email Address</label>
                <input
                  type="email"
                  className="w-full border border-border px-4 py-3 text-sm outline-none focus:border-accent transition"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-light mb-2">Password</label>
                <input
                  type="password"
                  className="w-full border border-border px-4 py-3 text-sm outline-none focus:border-accent transition"
                  placeholder="••••••••"
                />
              </div>

              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                Sign In
              </Button>
            </form>

            <div className="text-center text-sm mt-6">
              <p className="opacity-60">
                Don't have an account?{' '}
                <Link href="/register" className="text-accent hover:opacity-75">
                  Create Account
                </Link>
              </p>
            </div>

            <div className="mt-6 text-center">
              <Link href="#" className="text-sm text-accent hover:opacity-75">
                Forgot Password?
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
