import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Token Tools - Free AI Developer Tools',
  description:
    'Free AI developer tools for token calculation, cost estimation, prompt optimization, and model price comparison. Calculate tokens, compare prices, format prompts, and more for OpenAI, Claude, Gemini and other AI models.',
  keywords: [
    'AI tokens',
    'token calculator',
    'OpenAI',
    'Claude',
    'GPT-4',
    'AI cost calculator',
    'prompt formatter',
    'AI developer tools',
    'model price comparison',
    'tokenization',
    'prompt engineering',
    'LLM context window',
    'AI API costs',
    'token cost calculator',
    'AI model prices',
  ],
  authors: [{ name: 'AI Token Tools' }],
  openGraph: {
    title: 'AI Token Tools - Free AI Developer Tools',
    description:
      'Free AI developer tools for token calculation, cost estimation, prompt optimization, and model price comparison.',
    type: 'website',
    url: 'https://aitokentools.com',
    siteName: 'AI Token Tools',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Token Tools - Free AI Developer Tools',
    description: 'Free AI developer tools for token calculation, cost estimation, and prompt optimization.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://aitokentools.com',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
