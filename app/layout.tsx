import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from '@/components/theme.provider'

import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/toaster'
import { PremiumModal } from '@/components/premium-modal'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SoulSynth.AI',
  description: 'Your AI companion and trusted advisor.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={cn("bg-system", inter.className)}>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          {children}
          <PremiumModal />
          <Toaster />
        </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
