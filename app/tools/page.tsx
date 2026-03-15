import { Metadata } from 'next'
import {
  Calculator,
  DollarSign,
  Eye,
  AlignLeft,
  GitCompare,
  BarChart3,
  Ruler,
} from 'lucide-react'
import ToolCard from '@/components/ToolCard'

export const metadata: Metadata = {
  title: 'All AI Tools - AI Token Tools',
  description:
    'Browse all our free AI developer tools. Token calculators, cost estimators, prompt formatters, and more.',
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

export default function ToolsPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            All Tools
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            A complete collection of free AI developer tools. All tools run
            entirely in your browser for maximum privacy and speed.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {tools.map((tool) => (
            <ToolCard key={tool.title} {...tool} />
          ))}
        </div>

        {/* FAQ Section for SEO */}
        <div className="mx-auto max-w-3xl mt-24">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Are these tools free to use?
              </h3>
              <p className="text-gray-600">
                Yes, all our AI developer tools are completely free to use. No
                registration or API key required.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Is my data safe?
              </h3>
              <p className="text-gray-600">
                Absolutely. All processing happens locally in your browser. Your
                text and prompts never leave your device.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How accurate is the token calculator?
              </h3>
              <p className="text-gray-600">
                Our token calculator provides estimates based on standard
                tokenization algorithms. While very accurate, actual token
                counts may vary slightly depending on the specific model.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Which AI models are supported?
              </h3>
              <p className="text-gray-600">
                We support all major AI providers including OpenAI (GPT-4,
                GPT-3.5), Anthropic (Claude), Google (Gemini), Mistral, and
                Cohere.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
