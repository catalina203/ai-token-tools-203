import Link from 'next/link'
import { Metadata } from 'next'
import {
  Calculator,
  DollarSign,
  Eye,
  AlignLeft,
  GitCompare,
  BarChart3,
  Ruler,
  ArrowRight,
} from 'lucide-react'
import ToolCard from '@/components/ToolCard'

export const metadata: Metadata = {
  title: 'AI Token Tools - Free AI Developer Tools',
  description:
    'Free AI developer tools for token calculation, cost estimation, and prompt optimization. Calculate tokens, compare model prices, format prompts, and more.',
}

const tools = [
  {
    title: 'Token Calculator',
    description:
      'Calculate the estimated token count for your text. Supports multiple languages including English, Chinese, and code.',
    href: '/tools/token-calculator/',
    icon: Calculator,
  },
  {
    title: 'Token Cost Calculator',
    description:
      'Calculate the API cost for different AI models based on input and output token counts. Compare prices across providers.',
    href: '/tools/token-cost-calculator/',
    icon: DollarSign,
  },
  {
    title: 'Tokenizer Viewer',
    description:
      'Visualize how your text is split into tokens. See the tokenization process and understand token boundaries.',
    href: '/tools/tokenizer-viewer/',
    icon: Eye,
  },
  {
    title: 'Prompt Formatter',
    description:
      'Format your prompts with proper structure for system, user, and assistant messages. Improve prompt organization.',
    href: '/tools/prompt-formatter/',
    icon: AlignLeft,
  },
  {
    title: 'Prompt Diff',
    description:
      'Compare two prompts side by side and highlight the differences. Perfect for tracking prompt iterations.',
    href: '/tools/prompt-diff/',
    icon: GitCompare,
  },
  {
    title: 'Model Price Comparison',
    description:
      'Compare AI model prices from OpenAI, Anthropic, Google, and more. Find the most cost-effective option.',
    href: '/tools/model-price-comparison/',
    icon: BarChart3,
  },
  {
    title: 'Context Length Checker',
    description:
      'Check if your prompt fits within the context limits of various AI models. Avoid truncation issues.',
    href: '/tools/context-length-checker/',
    icon: Ruler,
  },
]

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-primary-50 to-white">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Free AI Developer Tools
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              A collection of free tools for AI developers. Calculate tokens,
              estimate API costs, format prompts, and optimize your AI
              applications.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/tools/"
                className="rounded-md bg-primary-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 transition-colors"
              >
                Explore Tools
              </Link>
              <Link
                href="/tools/token-calculator/"
                className="text-base font-semibold leading-6 text-gray-900 flex items-center gap-1 hover:text-primary-600 transition-colors"
              >
                Try Token Calculator <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Tools Section */}
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            All Tools
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Everything you need to optimize your AI development workflow. All
            tools are free to use and run entirely in your browser.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {tools.map((tool) => (
            <ToolCard key={tool.title} {...tool} />
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Why Use Our Tools?
            </h2>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600">
                    <Calculator
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  Accurate Calculations
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    Our token calculator uses industry-standard algorithms to
                    provide accurate estimates for various AI models.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600">
                    <DollarSign
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  Cost Optimization
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    Compare prices across different AI providers to find the
                    most cost-effective solution for your use case.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600">
                    <Eye
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  Privacy First
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    All processing happens in your browser. Your data never
                    leaves your device, ensuring complete privacy.
                  </p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-600">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to optimize your AI workflow?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-primary-100">
              Start using our free tools today and take your AI development to
              the next level.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/tools/"
                className="rounded-md bg-white px-6 py-3 text-base font-semibold text-primary-600 shadow-sm hover:bg-primary-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
              >
                Get Started
              </Link>
              <Link
                href="/tools/model-price-comparison/"
                className="text-base font-semibold leading-6 text-white hover:text-primary-100 transition-colors"
              >
                Compare Model Prices <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
