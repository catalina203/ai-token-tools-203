'use client'

import { useState, useMemo } from 'react'
import { DollarSign, Info, Calculator } from 'lucide-react'
import {
  getAllProviders,
  calculateCost,
  formatCost,
  formatPricePerMillion,
} from '@/lib/costCalculator'
import { estimateTokenCount } from '@/lib/tokenizer'

export default function TokenCostCalculatorPage() {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [inputTokens, setInputTokens] = useState<number | ''>('')
  const [outputTokens, setOutputTokens] = useState<number | ''>('')
  const [selectedModel, setSelectedModel] = useState('gpt-4o')
  const [useTextInput, setUseTextInput] = useState(true)

  const providers = getAllProviders()

  // Calculate tokens from text if using text input
  const calculatedInputTokens = useMemo(() => {
    if (!useTextInput) return typeof inputTokens === 'number' ? inputTokens : 0
    return estimateTokenCount(inputText)
  }, [inputText, inputTokens, useTextInput])

  const calculatedOutputTokens = useMemo(() => {
    if (!useTextInput) return typeof outputTokens === 'number' ? outputTokens : 0
    return estimateTokenCount(outputText)
  }, [outputText, outputTokens, useTextInput])

  const costResult = useMemo(() => {
    return calculateCost(
      calculatedInputTokens,
      calculatedOutputTokens,
      selectedModel
    )
  }, [calculatedInputTokens, calculatedOutputTokens, selectedModel])

  const selectedModelInfo = providers
    .flatMap((p) => p.models)
    .find((m) => m.id === selectedModel)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 bg-primary-100 rounded-xl mb-4">
            <DollarSign className="h-8 w-8 text-primary-600" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Token Cost Calculator
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Calculate API costs for different AI models. Compare prices and
            find the most cost-effective option.
          </p>
        </div>

        {/* Main Tool */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
          {/* Input Mode Toggle */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex rounded-lg border border-gray-200 p-1 bg-gray-50">
              <button
                onClick={() => setUseTextInput(true)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  useTextInput
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Text Input
              </button>
              <button
                onClick={() => setUseTextInput(false)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  !useTextInput
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Token Count
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              {useTextInput ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Input Text (Prompt)
                    </label>
                    <textarea
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder="Enter your input text..."
                      className="block w-full rounded-lg border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 min-h-[120px] resize-y"
                    />
                    <p className="mt-1 text-sm text-gray-500">
                      ~{calculatedInputTokens.toLocaleString()} tokens
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expected Output Text
                    </label>
                    <textarea
                      value={outputText}
                      onChange={(e) => setOutputText(e.target.value)}
                      placeholder="Enter expected output (optional)..."
                      className="block w-full rounded-lg border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 min-h-[120px] resize-y"
                    />
                    <p className="mt-1 text-sm text-gray-500">
                      ~{calculatedOutputTokens.toLocaleString()} tokens
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Input Tokens
                    </label>
                    <input
                      type="number"
                      value={inputTokens}
                      onChange={(e) =>
                        setInputTokens(
                          e.target.value === '' ? '' : parseInt(e.target.value)
                        )
                      }
                      placeholder="1000"
                      className="block w-full rounded-lg border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Output Tokens
                    </label>
                    <input
                      type="number"
                      value={outputTokens}
                      onChange={(e) =>
                        setOutputTokens(
                          e.target.value === '' ? '' : parseInt(e.target.value)
                        )
                      }
                      placeholder="500"
                      className="block w-full rounded-lg border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </>
              )}

              {/* Model Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Model
                </label>
                <div className="relative">
                  <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="block w-full rounded-lg border-0 py-3 pl-4 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 appearance-none"
                  >
                    {providers.map((provider) => (
                      <optgroup key={provider.name} label={provider.name}>
                        {provider.models.map((model) => (
                          <option key={model.id} value={model.id}>
                            {model.name}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
                    <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                {selectedModelInfo && (
                  <p className="mt-2 text-sm text-gray-500">
                    {selectedModelInfo.description}
                  </p>
                )}
              </div>
            </div>

            {/* Result Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Cost Estimate
              </label>
              <div className="bg-primary-50 rounded-xl p-6 border border-primary-100">
                {costResult ? (
                  <div className="space-y-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-1">Total Cost</p>
                      <p className="text-4xl font-bold text-primary-600">
                        {formatCost(costResult.totalCost)}
                      </p>
                    </div>

                    <div className="border-t border-primary-200 pt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Input Cost:</span>
                        <span className="font-medium">
                          {formatCost(costResult.inputCost)} (
                          {costResult.inputTokens.toLocaleString()} tokens)
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Output Cost:</span>
                        <span className="font-medium">
                          {formatCost(costResult.outputCost)} (
                          {costResult.outputTokens.toLocaleString()} tokens)
                        </span>
                      </div>
                    </div>

                    <div className="border-t border-primary-200 pt-4">
                      <p className="text-sm text-gray-600 mb-2">
                        Model Pricing (per 1M tokens):
                      </p>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Input:</span>
                        <span className="font-medium">
                          {formatPricePerMillion(costResult.model.inputPrice)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Output:</span>
                        <span className="font-medium">
                          {formatPricePerMillion(costResult.model.outputPrice)}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-center text-gray-500">
                    Select a model to see cost estimate
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <Info className="h-5 w-5 text-primary-600" />
              <h2 className="text-lg font-semibold text-gray-900">
                Understanding API Costs
              </h2>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              AI API costs are typically charged per 1,000 tokens (or per 1M
              tokens for some providers). Input tokens (your prompt) and output
              tokens (the AI&apos;s response) are often priced differently.
              Understanding these costs helps you optimize your applications
              and choose the right model for your budget.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <Calculator className="h-5 w-5 text-primary-600" />
              <h2 className="text-lg font-semibold text-gray-900">
                Cost Optimization Tips
              </h2>
            </div>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-primary-600">•</span>
                <span>Use smaller models for simple tasks</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-600">•</span>
                <span>Limit response length with max_tokens parameter</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-600">•</span>
                <span>Cache responses for repeated queries</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-600">•</span>
                <span>Compare prices across providers regularly</span>
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
                How are AI API costs calculated?
              </h3>
              <p className="text-gray-600">
                AI API costs are calculated based on the number of tokens
                processed. You&apos;re charged for both input tokens (your
                prompt) and output tokens (the AI&apos;s response). Different
                models have different pricing, with more powerful models
                typically costing more per token.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What&apos;s the difference between input and output tokens?
              </h3>
              <p className="text-gray-600">
                Input tokens are the tokens from your prompt or message that
                you send to the AI. Output tokens are the tokens in the
                AI&apos;s response. Most providers charge different rates for
                input and output, with output often being more expensive
                because generating text requires more computation.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Which AI model is the most cost-effective?
              </h3>
              <p className="text-gray-600">
                The most cost-effective model depends on your use case. For
                simple tasks, smaller models like GPT-3.5 Turbo or Claude 3
                Haiku are very affordable. For complex reasoning, larger models
                may be more cost-effective despite higher per-token costs
                because they require fewer attempts to get the right answer.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Are the prices shown up-to-date?
              </h3>
              <p className="text-gray-600">
                We strive to keep our pricing data current, but AI providers
                frequently update their pricing. Always check the official
                provider documentation for the most accurate and up-to-date
                pricing information before making decisions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
