import { Metadata } from 'next'
import { BarChart3, Info, Check } from 'lucide-react'
import { getAllProviders, formatPricePerMillion } from '@/lib/costCalculator'

export const metadata: Metadata = {
  title: 'AI Model Price Comparison - Compare OpenAI, Claude, Gemini Prices',
  description:
    'Compare AI model prices from OpenAI, Anthropic, Google, and more. Find the most cost-effective option for your AI applications with detailed price comparisons.',
  keywords: [
    'AI model price comparison',
    'OpenAI pricing',
    'Claude pricing',
    'Gemini pricing',
    'AI model costs',
    'LLM prices',
    'AI API pricing',
    'cost comparison',
    'AI developer tools',
  ],
  openGraph: {
    title: 'AI Model Price Comparison - Compare OpenAI, Claude, Gemini Prices',
    description: 'Compare AI model prices from OpenAI, Anthropic, Google, and more. Find the most cost-effective option for your AI applications.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://aitokentools.com/tools/model-price-comparison',
  },
}

export default function ModelPriceComparisonPage() {
  const providers = getAllProviders()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 bg-primary-100 rounded-xl mb-4">
            <BarChart3 className="h-8 w-8 text-primary-600" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            AI Model Price Comparison
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Compare prices across different AI providers. Find the most
            cost-effective model for your use case.
          </p>
        </div>

        {/* Price Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Provider
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Model
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Context Length
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Input Price
                    <span className="block text-gray-400 normal-case">
                      per 1M tokens
                    </span>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Output Price
                    <span className="block text-gray-400 normal-case">
                      per 1M tokens
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {providers.map((provider) =>
                  provider.models.map((model, index) => (
                    <tr
                      key={model.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      {index === 0 && (
                        <td
                          className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                          rowSpan={provider.models.length}
                        >
                          {provider.name}
                        </td>
                      )}
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {model.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {model.description}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {model.contextLength >= 1000000
                          ? `${(model.contextLength / 1000000).toFixed(1)}M`
                          : model.contextLength >= 1000
                          ? `${(model.contextLength / 1000).toFixed(0)}K`
                          : model.contextLength}{' '}
                        tokens
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                        {formatPricePerMillion(model.inputPrice)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                        {formatPricePerMillion(model.outputPrice)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Comparison */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Quick Comparison
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Most Affordable */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 text-lg">$</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Most Affordable
                </h3>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">GPT-4o Mini</p>
                  <p className="text-sm font-medium text-gray-900">
                    {formatPricePerMillion(0.15)} /{' '}
                    {formatPricePerMillion(0.6)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Claude 3 Haiku</p>
                  <p className="text-sm font-medium text-gray-900">
                    {formatPricePerMillion(0.25)} /{' '}
                    {formatPricePerMillion(1.25)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Gemini 1.5 Flash</p>
                  <p className="text-sm font-medium text-gray-900">
                    {formatPricePerMillion(0.35)} /{' '}
                    {formatPricePerMillion(1.05)}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-600">
                Best for simple tasks, high-volume applications, and
                cost-sensitive projects.
              </p>
            </div>

            {/* Best Value */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Check className="h-5 w-5 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Best Value
                </h3>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">GPT-4o</p>
                  <p className="text-sm font-medium text-gray-900">
                    {formatPricePerMillion(2.5)} /{' '}
                    {formatPricePerMillion(10.0)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Claude 3.5 Sonnet</p>
                  <p className="text-sm font-medium text-gray-900">
                    {formatPricePerMillion(3.0)} /{' '}
                    {formatPricePerMillion(15.0)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Gemini 1.5 Pro</p>
                  <p className="text-sm font-medium text-gray-900">
                    {formatPricePerMillion(3.5)} /{' '}
                    {formatPricePerMillion(10.5)}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-600">
                Best balance of capability and cost for most applications.
              </p>
            </div>

            {/* Most Capable */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="h-5 w-5 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Most Capable
                </h3>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">GPT-4 Turbo</p>
                  <p className="text-sm font-medium text-gray-900">
                    {formatPricePerMillion(10.0)} /{' '}
                    {formatPricePerMillion(30.0)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Claude 3 Opus</p>
                  <p className="text-sm font-medium text-gray-900">
                    {formatPricePerMillion(15.0)} /{' '}
                    {formatPricePerMillion(75.0)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">o1 Preview</p>
                  <p className="text-sm font-medium text-gray-900">
                    {formatPricePerMillion(15.0)} /{' '}
                    {formatPricePerMillion(60.0)}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-600">
                Best for complex reasoning, coding, and demanding tasks.
              </p>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <Info className="h-5 w-5 text-primary-600" />
              <h2 className="text-lg font-semibold text-gray-900">
                Understanding Pricing
              </h2>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              AI model pricing is typically based on the number of tokens
              processed. Input tokens (your prompt) and output tokens (the
              AI&apos;s response) are often priced differently. Prices are shown
              per 1 million tokens. Remember that 1,000 tokens is approximately
              750 words in English.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="h-5 w-5 text-primary-600" />
              <h2 className="text-lg font-semibold text-gray-900">
                Choosing a Model
              </h2>
            </div>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-primary-600">•</span>
                <span>
                  Start with affordable models for prototyping and testing
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-600">•</span>
                <span>
                  Upgrade to more capable models for production applications
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-600">•</span>
                <span>Consider context length requirements</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-600">•</span>
                <span>Factor in both input and output costs</span>
              </li>
            </ul>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How often are these prices updated?
              </h3>
              <p className="text-gray-600">
                We strive to keep pricing information current, but AI providers
                frequently adjust their pricing. Always verify current prices
                on the official provider websites before making decisions. This
                tool provides estimates for comparison purposes.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What is context length and why does it matter?
              </h3>
              <p className="text-gray-600">
                Context length is the maximum number of tokens a model can
                process in a single request. It includes both your input
                (prompt) and the model&apos;s output. Longer context lengths allow
                you to process larger documents, maintain longer conversations,
                and provide more context to the AI.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Are there any hidden costs?
              </h3>
              <p className="text-gray-600">
                The prices shown are the base API usage costs. Some providers
                may have additional fees for features like fine-tuning,
                dedicated instances, or premium support. Always review the
                complete pricing documentation of your chosen provider.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Which provider should I choose?
              </h3>
              <p className="text-gray-600">
                The best provider depends on your specific needs. OpenAI models
                are widely used and well-documented. Anthropic&apos;s Claude
                excels at reasoning and following instructions. Google&apos;s
                Gemini offers very long context windows. Consider factors like
                pricing, capabilities, context length, and API reliability when
                making your choice.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
