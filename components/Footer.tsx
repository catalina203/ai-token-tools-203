import Link from 'next/link'
import { Cpu } from 'lucide-react'

const footerLinks = {
  tools: [
    { name: 'Token Calculator', href: '/tools/token-calculator/' },
    { name: 'Token Cost Calculator', href: '/tools/token-cost-calculator/' },
    { name: 'Tokenizer Viewer', href: '/tools/tokenizer-viewer/' },
    { name: 'Prompt Formatter', href: '/tools/prompt-formatter/' },
  ],
  moreTools: [
    { name: 'Prompt Diff', href: '/tools/prompt-diff/' },
    { name: 'Model Price Comparison', href: '/tools/model-price-comparison/' },
    { name: 'Context Length Checker', href: '/tools/context-length-checker/' },
  ],
}

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Cpu className="h-8 w-8 text-primary-400" />
              <span className="text-xl font-bold">AI Token Tools</span>
            </Link>
            <p className="text-gray-400 text-sm">
              Free AI developer tools for token calculation, cost estimation, and prompt optimization.
            </p>
          </div>

          {/* Tools Links */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Tools</h3>
            <ul className="space-y-3">
              {footerLinks.tools.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More Tools Links */}
          <div>
            <h3 className="text-sm font-semibold mb-4">More Tools</h3>
            <ul className="space-y-3">
              {footerLinks.moreTools.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} AI Token Tools. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm mt-2 md:mt-0">
            Free tools for AI developers
          </p>
        </div>
      </div>
    </footer>
  )
}
