'use client'

import { useState, useMemo } from 'react'
import { GitCompare, Info, Copy, Check } from 'lucide-react'
import { diffLines, Change } from 'diff'
import { copyToClipboard } from '@/lib/utils'

export default function PromptDiffPage() {
  const [originalText, setOriginalText] = useState(
    'You are a helpful assistant. Answer questions clearly and concisely.'
  )
  const [modifiedText, setModifiedText] = useState(
    'You are an expert AI assistant. Provide detailed, accurate answers with examples when helpful.'
  )
  const [copied, setCopied] = useState(false)

  const diffResult: Change[] = useMemo(() => {
    return diffLines(originalText, modifiedText)
  }, [originalText, modifiedText])

  const stats = useMemo(() => {
    let added = 0
    let removed = 0
    let unchanged = 0

    diffResult.forEach((part) => {
      const lines = part.value.split('\n').filter((l) => l.length > 0).length
      if (part.added) {
        added += lines
      } else if (part.removed) {
        removed += lines
      } else {
        unchanged += lines
      }
    })

    return { added, removed, unchanged }
  }, [diffResult])

  const handleCopyDiff = async () => {
    const diffText = diffResult
      .map((part) => {
        const prefix = part.added ? '+ ' : part.removed ? '- ' : '  '
        return part.value
          .split('\n')
          .map((line) => (line ? prefix + line : ''))
          .join('\n')
      })
      .join('')

    const success = await copyToClipboard(diffText)
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 bg-primary-100 rounded-xl mb-4">
            <GitCompare className="h-8 w-8 text-primary-600" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Prompt Diff Tool
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Compare two prompts side by side and highlight the differences.
            Perfect for tracking prompt iterations.
          </p>
        </div>

        {/* Main Tool */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
          {/* Stats */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-lg">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span className="text-sm font-medium text-green-700">
                {stats.added} added
              </span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-red-50 rounded-lg">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span className="text-sm font-medium text-red-700">
                {stats.removed} removed
              </span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
              <div className="w-3 h-3 bg-gray-400 rounded"></div>
              <span className="text-sm font-medium text-gray-600">
                {stats.unchanged} unchanged
              </span>
            </div>
            <button
              onClick={handleCopyDiff}
              className="flex items-center gap-1 ml-auto text-sm text-primary-600 hover:text-primary-700"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" /> Copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" /> Copy Diff
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Original */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Original Prompt
              </label>
              <textarea
                value={originalText}
                onChange={(e) => setOriginalText(e.target.value)}
                placeholder="Enter original prompt..."
                className="block w-full rounded-lg border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 min-h-[200px] resize-y font-mono"
              />
            </div>

            {/* Modified */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Modified Prompt
              </label>
              <textarea
                value={modifiedText}
                onChange={(e) => setModifiedText(e.target.value)}
                placeholder="Enter modified prompt..."
                className="block w-full rounded-lg border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 min-h-[200px] resize-y font-mono"
              />
            </div>
          </div>

          {/* Diff View */}
          <div className="mt-8">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Difference View
            </label>
            <div className="bg-gray-900 rounded-xl p-4 overflow-x-auto">
              <pre className="text-sm font-mono whitespace-pre-wrap">
                {diffResult.map((part, index) => {
                  const lines = part.value.split('\n')
                  return lines.map((line, lineIndex) => {
                    if (!line && lineIndex === lines.length - 1) return null
                    const bgColor = part.added
                      ? 'bg-green-900/50'
                      : part.removed
                      ? 'bg-red-900/50'
                      : ''
                    const textColor = part.added
                      ? 'text-green-400'
                      : part.removed
                      ? 'text-red-400'
                      : 'text-gray-300'
                    const prefix = part.added
                      ? '+ '
                      : part.removed
                      ? '- '
                      : '  '
                    return (
                      <div
                        key={`${index}-${lineIndex}`}
                        className={`${bgColor} px-2 -mx-2`}
                      >
                        <span className={textColor}>
                          {prefix}
                          {line || ' '}
                        </span>
                      </div>
                    )
                  })
                })}
              </pre>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <Info className="h-5 w-5 text-primary-600" />
              <h2 className="text-lg font-semibold text-gray-900">
                Why Compare Prompts?
              </h2>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Comparing prompts helps you understand what changes improve or
              degrade performance. It&apos;s essential for prompt engineering
              workflows, A/B testing, and maintaining version control of your
              prompts. By visualizing differences, you can quickly identify
              what modifications were made between iterations.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <GitCompare className="h-5 w-5 text-primary-600" />
              <h2 className="text-lg font-semibold text-gray-900">
                Diff Legend
              </h2>
            </div>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded flex items-center justify-center text-white text-xs">
                  +
                </div>
                <span>Green (+) - Content added in modified version</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded flex items-center justify-center text-white text-xs">
                  -
                </div>
                <span>Red (-) - Content removed from original</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-400 rounded flex items-center justify-center text-white text-xs">
                  {' '}
                </div>
                <span>Gray - Unchanged content</span>
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
                What is prompt diffing?
              </h3>
              <p className="text-gray-600">
                Prompt diffing is the process of comparing two versions of a
                prompt to identify what has changed. It shows additions,
                deletions, and unchanged content, making it easy to track
                modifications and understand the evolution of your prompts.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How can this help with prompt engineering?
              </h3>
              <p className="text-gray-600">
                When iterating on prompts, it&apos;s easy to lose track of what
                changes were made. This tool helps you document changes, compare
                performance between versions, and collaborate with team members
                by clearly showing what was modified in each iteration.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Can I compare more than two prompts?
              </h3>
              <p className="text-gray-600">
                This tool compares two prompts at a time. For tracking multiple
                versions, we recommend comparing sequentially (v1 vs v2, then
                v2 vs v3) or using the copy feature to save diffs for
                documentation purposes.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Is my prompt data secure?
              </h3>
              <p className="text-gray-600">
                Yes, all comparison happens locally in your browser. Your
                prompts are never sent to any server, ensuring complete privacy
                and security for your sensitive prompt content.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
