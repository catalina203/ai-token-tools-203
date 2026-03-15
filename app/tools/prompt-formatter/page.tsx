'use client'

import { useState, useCallback } from 'react'
import { AlignLeft, Copy, Check, Info, Trash2, Plus } from 'lucide-react'
import { copyToClipboard } from '@/lib/utils'

type MessageRole = 'system' | 'user' | 'assistant'

interface Message {
  id: string
  role: MessageRole
  content: string
}

export default function PromptFormatterPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'system',
      content:
        'You are a helpful assistant that provides clear and concise answers.',
    },
    { id: '2', role: 'user', content: 'Hello! Can you help me with something?' },
  ])
  const [copied, setCopied] = useState(false)

  const addMessage = useCallback((role: MessageRole) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      role,
      content: '',
    }
    setMessages((prev) => [...prev, newMessage])
  }, [])

  const updateMessage = useCallback((id: string, content: string) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, content } : msg))
    )
  }, [])

  const updateRole = useCallback((id: string, role: MessageRole) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, role } : msg))
    )
  }, [])

  const removeMessage = useCallback((id: string) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id))
  }, [])

  const clearAll = useCallback(() => {
    setMessages([])
  }, [])

  const formattedOutput = useCallback(() => {
    return messages
      .filter((msg) => msg.content.trim())
      .map((msg) => `<${msg.role}>\n${msg.content}\n</${msg.role}>`)
      .join('\n\n')
  }, [messages])

  const jsonOutput = useCallback(() => {
    return JSON.stringify(
      messages
        .filter((msg) => msg.content.trim())
        .map((msg) => ({ role: msg.role, content: msg.content })),
      null,
      2
    )
  }, [messages])

  const handleCopy = useCallback(async () => {
    const success = await copyToClipboard(formattedOutput())
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }, [formattedOutput])

  const roleColors: Record<MessageRole, string> = {
    system: 'bg-purple-50 border-purple-200 text-purple-800',
    user: 'bg-blue-50 border-blue-200 text-blue-800',
    assistant: 'bg-green-50 border-green-200 text-green-800',
  }

  const roleLabels: Record<MessageRole, string> = {
    system: 'System',
    user: 'User',
    assistant: 'Assistant',
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 bg-primary-100 rounded-xl mb-4">
            <AlignLeft className="h-8 w-8 text-primary-600" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Prompt Formatter
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Format your prompts with proper structure for system, user, and
            assistant messages. Improve prompt organization.
          </p>
        </div>

        {/* Main Tool */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
          {/* Add Buttons */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => addMessage('system')}
              className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-purple-100 text-purple-700 text-sm font-medium hover:bg-purple-200 transition-colors"
            >
              <Plus className="h-4 w-4" /> System Message
            </button>
            <button
              onClick={() => addMessage('user')}
              className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-blue-100 text-blue-700 text-sm font-medium hover:bg-blue-200 transition-colors"
            >
              <Plus className="h-4 w-4" /> User Message
            </button>
            <button
              onClick={() => addMessage('assistant')}
              className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-green-100 text-green-700 text-sm font-medium hover:bg-green-200 transition-colors"
            >
              <Plus className="h-4 w-4" /> Assistant Message
            </button>
            <button
              onClick={clearAll}
              className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-red-100 text-red-700 text-sm font-medium hover:bg-red-200 transition-colors ml-auto"
            >
              <Trash2 className="h-4 w-4" /> Clear All
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Messages
              </label>
              {messages.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                  <p className="text-gray-500">
                    No messages yet. Add a message to get started.
                  </p>
                </div>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={`rounded-xl border p-4 ${roleColors[message.role]}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <select
                        value={message.role}
                        onChange={(e) =>
                          updateRole(message.id, e.target.value as MessageRole)
                        }
                        className="text-sm font-medium bg-white border border-gray-200 rounded px-2 py-1"
                      >
                        <option value="system">System</option>
                        <option value="user">User</option>
                        <option value="assistant">Assistant</option>
                      </select>
                      <button
                        onClick={() => removeMessage(message.id)}
                        className="text-gray-500 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <textarea
                      value={message.content}
                      onChange={(e) =>
                        updateMessage(message.id, e.target.value)
                      }
                      placeholder={`Enter ${message.role} message...`}
                      className="block w-full rounded-lg border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm min-h-[80px] resize-y bg-white"
                    />
                  </div>
                ))
              )}
            </div>

            {/* Output Section */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  Formatted Output
                </label>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" /> Copy
                    </>
                  )}
                </button>
              </div>

              {/* XML Format */}
              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-2">XML Format</p>
                <pre className="bg-gray-900 text-gray-100 rounded-xl p-4 overflow-x-auto text-sm font-mono min-h-[150px]">
                  {formattedOutput() || '// Add messages to see formatted output'}
                </pre>
              </div>

              {/* JSON Format */}
              <div>
                <p className="text-xs text-gray-500 mb-2">JSON Format</p>
                <pre className="bg-gray-900 text-gray-100 rounded-xl p-4 overflow-x-auto text-sm font-mono min-h-[150px]">
                  {jsonOutput() || '// Add messages to see JSON output'}
                </pre>
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
                Message Roles
              </h2>
            </div>
            <div className="space-y-3 text-sm text-gray-600">
              <div>
                <span className="font-medium text-purple-700">System:</span>
                <p>
                  Sets the behavior and context for the AI. Use this to define
                  the AI&apos;s personality, constraints, and overall approach.
                </p>
              </div>
              <div>
                <span className="font-medium text-blue-700">User:</span>
                <p>
                  The input or question from the user. This is what you want
                  the AI to respond to.
                </p>
              </div>
              <div>
                <span className="font-medium text-green-700">Assistant:</span>
                <p>
                  The AI&apos;s response. Include this for few-shot prompting or
                  to continue a conversation.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <AlignLeft className="h-5 w-5 text-primary-600" />
              <h2 className="text-lg font-semibold text-gray-900">
                Best Practices
              </h2>
            </div>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-primary-600">•</span>
                <span>
                  Start with a clear system message to set expectations
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-600">•</span>
                <span>Use specific, detailed instructions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-600">•</span>
                <span>Include examples for complex tasks</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-600">•</span>
                <span>Break down multi-step tasks into clear steps</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-600">•</span>
                <span>Test and iterate on your prompts</span>
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
                What is the system message for?
              </h3>
              <p className="text-gray-600">
                The system message sets the overall behavior and context for
                the AI. It&apos;s used to define the AI&apos;s role, personality,
                constraints, and any special instructions that should apply to
                the entire conversation. A good system message helps the AI
                understand how to approach all subsequent user messages.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                When should I include assistant messages?
              </h3>
              <p className="text-gray-600">
                Include assistant messages when you want to provide examples
                of desired responses (few-shot prompting) or when continuing
                an existing conversation. This helps the AI understand the
                format and style you&apos;re looking for in its responses.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Which output format should I use?
              </h3>
              <p className="text-gray-600">
                Use the XML format for general readability and when sharing
                prompts with others. Use the JSON format when integrating with
                APIs or when you need a structured data format. Both represent
                the same information in different ways.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How do I write effective system messages?
              </h3>
              <p className="text-gray-600">
                Effective system messages are clear, specific, and concise.
                Define the AI&apos;s role explicitly, set any constraints or rules,
                and provide context about the task. Avoid ambiguity and test
                different variations to see what works best for your use case.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
