'use client'

import { CheckCircle, AlertCircle, Info } from 'lucide-react'

interface TokenResultProps {
  tokenCount: number
  characterCount: number
  isOverLimit?: boolean
  limit?: number
  showBreakdown?: boolean
  breakdown?: {
    words?: number
    chinese?: number
    whitespace?: number
    punctuation?: number
    symbols?: number
  }
}

export default function TokenResult({
  tokenCount,
  characterCount,
  isOverLimit,
  limit,
  showBreakdown = false,
  breakdown,
}: TokenResultProps) {
  const percentage = limit ? Math.min(100, (tokenCount / limit) * 100) : 0

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        {isOverLimit ? (
          <AlertCircle className="h-5 w-5 text-red-500" />
        ) : (
          <CheckCircle className="h-5 w-5 text-green-500" />
        )}
        <h3 className="text-lg font-semibold text-gray-900">Result</h3>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-primary-50 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-1">Estimated Tokens</p>
          <p className="text-3xl font-bold text-primary-600">
            {tokenCount.toLocaleString()}
          </p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-1">Characters</p>
          <p className="text-3xl font-bold text-gray-700">
            {characterCount.toLocaleString()}
          </p>
        </div>
      </div>

      {limit && (
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Context Usage</span>
            <span className={isOverLimit ? 'text-red-600 font-medium' : 'text-gray-900'}>
              {percentage.toFixed(1)}% of {limit.toLocaleString()}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className={`h-2.5 rounded-full transition-all ${
                isOverLimit
                  ? 'bg-red-500'
                  : percentage > 80
                  ? 'bg-yellow-500'
                  : 'bg-green-500'
              }`}
              style={{ width: `${Math.min(100, percentage)}%` }}
            />
          </div>
          {isOverLimit && (
            <p className="text-sm text-red-600 mt-2 flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              Exceeds context limit by {(tokenCount - limit).toLocaleString()} tokens
            </p>
          )}
        </div>
      )}

      {showBreakdown && breakdown && (
        <div className="border-t border-gray-200 pt-4 mt-4">
          <p className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-1">
            <Info className="h-4 w-4" />
            Token Breakdown
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
            {breakdown.words !== undefined && (
              <div className="flex justify-between">
                <span className="text-gray-600">Words:</span>
                <span className="font-medium">{breakdown.words.toLocaleString()}</span>
              </div>
            )}
            {breakdown.chinese !== undefined && (
              <div className="flex justify-between">
                <span className="text-gray-600">Chinese:</span>
                <span className="font-medium">{breakdown.chinese.toLocaleString()}</span>
              </div>
            )}
            {breakdown.whitespace !== undefined && (
              <div className="flex justify-between">
                <span className="text-gray-600">Whitespace:</span>
                <span className="font-medium">{breakdown.whitespace.toLocaleString()}</span>
              </div>
            )}
            {breakdown.punctuation !== undefined && (
              <div className="flex justify-between">
                <span className="text-gray-600">Punctuation:</span>
                <span className="font-medium">{breakdown.punctuation.toLocaleString()}</span>
              </div>
            )}
            {breakdown.symbols !== undefined && (
              <div className="flex justify-between">
                <span className="text-gray-600">Symbols:</span>
                <span className="font-medium">{breakdown.symbols.toLocaleString()}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
