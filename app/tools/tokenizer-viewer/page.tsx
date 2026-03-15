'use client'

import { useState, useMemo } from 'react'
import { Eye, Info, Type } from 'lucide-react'
import { tokenizeText, Token } from '@/lib/tokenizer'

const tokenColors: Record<Token['type'], string> = {
  word: 'bg-blue-100 text-blue-800 border-blue-200',
  chinese: 'bg-red-100 text-red-800 border-red-200',
  whitespace: 'bg-gray-100 text-gray-600 border-gray-200',
  punctuation: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  symbol: 'bg-purple-100 text-purple-800 border-purple-200',
}

const tokenLabels: Record<Token['type'], string> = {
  word: 'Word',
  chinese: 'Chinese',
  whitespace: 'Space',
  punctuation: 'Punctuation',
  symbol: 'Symbol',
}

export default function TokenizerViewerPage() {
  const [text, setText] = useState(
    'Hello World! This is a tokenizer viewer. 你好世界！'
  )

  const tokens = useMemo(() => tokenizeText(text), [text])

  const tokenStats = useMemo(() => {
    const stats: Record<Token['type'], number> = {
      word: 0,
      chinese: 0,
      whitespace: 0,
      punctuation: 0,
      symbol: 0,
    }
    tokens.forEach((token) => {
      stats[token.type]++
    })
    return stats
  }, [tokens])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 bg-primary-100 rounded-xl mb-4">
            <Eye className="h-8 w-8 text-primary-600" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Tokenizer Viewer
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Visualize how your text is split into tokens. See the tokenization
            process and understand token boundaries.
          </p>
        </div>

        {/* Main Tool */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
          {/* Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter your text
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type or paste your text here..."
              className="block w-full rounded-lg border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 min-h-[120px] resize-y"
            />
          </div>

          {/* Token Display */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Tokenized View
              </label>
              <span className="text-sm text-gray-500">
                {tokens.length} tokens
              </span>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 min-h-[150px]">
              {tokens.length === 0 ? (
                <p className="text-gray-400 text-center py-8">
                  Enter text to see tokenization
                </p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {tokens.map((token, idx) => (
                    <div
                      key={idx}
                      className={`inline-flex items-center px-2 py-1 rounded border text-sm font-medium ${tokenColors[token.type]}`}
                      title={`${tokenLabels[token.type]}: "${token.value === ' ' ? '(space)' : token.value}"`}
                    >
                      <span className="mr-1 text-xs opacity-50">{idx}</span>
                      <span>
                        {token.value === ' ' ? '␣' : token.value}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Token Stats */}
          {tokens.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {(Object.keys(tokenStats) as Token['type'][]).map((type) => (
                <div
                  key={type}
                  className="bg-white rounded-lg p-3 border border-gray-200"
                >
                  <p className="text-xs text-gray-500 mb-1">
                    {tokenLabels[type]}
                  </p>
                  <p className="text-lg font-semibold text-gray-900">
                    {tokenStats[type]}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="mt-6 bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-700 mb-4">Legend</h3>
          <div className="flex flex-wrap gap-3">
            {(Object.keys(tokenLabels) as Token['type'][]).map((type) => (
              <div
                key={type}
                className={`inline-flex items-center px-3 py-1.5 rounded border text-sm ${tokenColors[type]}`}
              >
                {tokenLabels[type]}
              </div>
            ))}
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <Info className="h-5 w-5 text-primary-600" />
              <h2 className="text-lg font-semibold text-gray-900">
                What is Tokenization?
              </h2>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Tokenization is the process of breaking down text into smaller
              units called tokens. These tokens are what AI models actually
              process. Different types of content (words, punctuation,
              whitespace, Chinese characters) are handled differently during
              tokenization. Understanding this helps you optimize your prompts
              and estimate costs more accurately.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <Type className="h-5 w-5 text-primary-600" />
              <h2 className="text-lg font-semibold text-gray-900">
                Token Types
              </h2>
            </div>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="font-medium text-gray-900">Words:</span>
                <span>Sequences of letters and numbers</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-medium text-gray-900">Chinese:</span>
                <span>Chinese characters (each is typically one token)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-medium text-gray-900">Whitespace:</span>
                <span>Spaces, tabs, and newlines</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-medium text-gray-900">
                  Punctuation:
                </span>
                <span>Commas, periods, quotes, etc.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-medium text-gray-900">Symbols:</span>
                <span>Special characters and operators</span>
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
                How does tokenization work?
              </h3>
              <p className="text-gray-600">
                Tokenization breaks text into smaller pieces called tokens.
                Different models use different tokenization algorithms, but
                they generally split text at word boundaries, punctuation, and
                whitespace. Some languages like Chinese may have each character
                as a separate token.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Why do spaces count as tokens?
              </h3>
              <p className="text-gray-600">
                Whitespace (spaces, tabs, newlines) are often tokenized
                separately because they carry semantic meaning in text
                structure. However, some tokenizers may combine whitespace with
                adjacent words depending on their algorithm.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Is this the same as GPT tokenization?
              </h3>
              <p className="text-gray-600">
                This viewer provides a simplified visualization of how text
                might be tokenized. Actual GPT models use more sophisticated
                subword tokenization (like BPE or tiktoken) which can split
                words into smaller pieces. For exact GPT tokenization, use
                OpenAI&apos;s official tokenizer.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How can I reduce my token count?
              </h3>
              <p className="text-gray-600">
                To reduce tokens: remove unnecessary whitespace, use shorter
                words when possible, avoid redundant information, and structure
                your prompts concisely. However, always prioritize clarity
                over token savings to ensure the AI understands your request.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
