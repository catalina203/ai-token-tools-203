'use client'

import { useState, useMemo } from 'react'
import { Ruler, AlertCircle, CheckCircle, Info } from 'lucide-react'
import { estimateTokenCount } from '@/lib/tokenizer'
import { getAllProviders, isWithinContextLimit } from '@/lib/costCalculator'

export default function ContextLengthCheckerPage() {
  const [text, setText] = useState('')
  const providers = getAllProviders()

  const tokenCount = useMemo(() => estimateTokenCount(text), [text])

  const modelStatuses = useMemo(() => {
    return providers.flatMap((provider) =>
      provider.models.map((model) => ({
        ...model,
        provider: provider.name,
        fits: isWithinContextLimit(tokenCount, model.id),
        percentage: Math.min(100, (tokenCount / model.contextLength) * 100),
        remaining: model.contextLength - tokenCount,
      }))
    )
  }, [tokenCount, providers])

  const fittingModels = modelStatuses.filter((m) => m.fits)
  const nonFittingModels = modelStatuses.filter((m) => !m.fits)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 bg-primary-100 rounded-xl mb-4">
            <Ruler className="h-8 w-8 text-primary-600" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Context Length Checker
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Check if your prompt fits within the context limits of various AI
            models. Avoid truncation issues.
          </p>
        </div>

        {/* Main Tool */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Input Section */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter your prompt
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type or paste your prompt here to check context length..."
                className="block w-full rounded-lg border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 min-h-[200px] resize-y"
              />
              <div className="mt-2 flex justify-between text-sm text-gray-500">
                <span>{text.length.toLocaleString()} characters</span>
                <span>~{tokenCount.toLocaleString()} tokens</span>
              </div>
            </div>

            {/* Summary Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Summary
              </label>
              <div className="bg-primary-50 rounded-xl p-4 border border-primary-100">
                <div className="text-center mb-4">
                  <p className="text-sm text-gray-600 mb-1">Estimated Tokens</p>
                  <p className="text-3xl font-bold text-primary-600">
                    {tokenCount.toLocaleString()}
                  </p>
                </div>

                <div className="border-t border-primary-200 pt-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Compatible Models
                    </span>
                    <span className="text-lg font-semibold text-green-600">
                      {fittingModels.length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Too Large For
                    </span>
                    <span className="text-lg font-semibold text-red-600">
                      {nonFittingModels.length}
                    </span>
                  </div>
                </div>
              </div>

              {nonFittingModels.length > 0 && (
                <div className="mt-4 bg-red-50 rounded-xl p-4 border border-red-100">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-red-800">
                        Context Limit Exceeded
                      </p>
                      <p className="text-sm text-red-600 mt-1">
                        Your prompt exceeds the context limit of{' '}
                        {nonFittingModels.length} models. Consider shortening
                        your prompt or using a model with a larger context
                        window.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Model Compatibility Table */}
        <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Model Compatibility
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Provider
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Model
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Context Limit
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Usage
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {modelStatuses.map((model) => (
                  <tr
                    key={model.id}
                    className={`hover:bg-gray-50 transition-colors ${
                      !model.fits ? 'bg-red-50/50' : ''
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {model.provider}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {model.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {model.contextLength >= 1000000
                        ? `${(model.contextLength / 1000000).toFixed(1)}M`
                        : model.contextLength >= 1000
                        ? `${(model.contextLength / 1000).toFixed(0)}K`
                        : model.contextLength}{' '}
                      tokens
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-32">
                        <div className="flex justify-between text-xs mb-1">
                          <span
                            className={
                              model.fits ? 'text-green-600' : 'text-red-600'
                            }
                          >
                            {model.percentage.toFixed(0)}%
                          </span>
                          <span className="text-gray-500">
                            {model.remaining >= 0
                              ? `${model.remaining.toLocaleString()} left`
                              : `${Math.abs(model.remaining).toLocaleString()} over`}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all ${
                              model.fits
                                ? model.percentage > 80
                                  ? 'bg-yellow-500'
                                  : 'bg-green-500'
                                : 'bg-red-500'
                            }`}
                            style={{ width: `${Math.min(100, model.percentage)}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {model.fits ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3" /> Fits
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          <AlertCircle className="h-3 w-3" /> Exceeds
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <Info className="h-5 w-5 text-primary-600" />
              <h2 className="text-lg font-semibold text-gray-900">
                What is Context Length?
              </h2>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Context length (also called context window) is the maximum number
              of tokens a language model can process in a single request. This
              includes both your input (prompt) and the model&apos;s output. If
              your content exceeds the context limit, the model may truncate
              your input or refuse to process it entirely.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <Ruler className="h-5 w-5 text-primary-600" />
              <h2 className="text-lg font-semibold text-gray-900">
                Tips to Reduce Context
              </h2>
            </div>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-primary-600">•</span>
                <span>Remove unnecessary whitespace and formatting</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-600">•</span>
                <span>Summarize long documents before including them</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-600">•</span>
                <span>Split large tasks into smaller chunks</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-600">•</span>
                <span>Use models with larger context windows</span>
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
                What happens if my prompt is too long?
              </h3>
              <p className="text-gray-600">
                If your prompt exceeds a model&apos;s context limit, different
                providers handle it differently. Some will truncate your input
                from the beginning or end, some will return an error, and
                others may refuse to process the request. It&apos;s always best
                to check your prompt length before sending it to ensure you get
                the expected results.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Does context length include the AI&apos;s response?
              </h3>
              <p className="text-gray-600">
                Yes, the context limit applies to the total of your input plus
                the AI&apos;s output. If you&apos;re near the limit with your
                input, there may not be room for a complete response. It&apos;s
                good practice to leave at least 10-20% of the context window
                available for the AI&apos;s response.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Which model has the largest context window?
              </h3>
              <p className="text-gray-600">
                Currently, Google&apos;s Gemini 1.5 Pro leads with a 2 million
                token context window, followed by Gemini 1.5 Flash with 1
                million tokens. Anthropic&apos;s Claude 3 models offer 200K
                tokens, and most OpenAI models provide 128K tokens. Always
                check the latest documentation as these numbers change
                frequently.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How accurate is the token estimation?
              </h3>
              <p className="text-gray-600">
                Our token calculator provides estimates based on standard
                tokenization patterns. While generally accurate within 10-15%,
                actual token counts may vary depending on the specific model
                and tokenizer used. For critical applications, we recommend
                leaving a safety margin of at least 5-10% below the context
                limit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
