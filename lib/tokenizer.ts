/**
 * Tokenizer utilities for estimating token counts
 * Based on OpenAI's GPT tokenization patterns
 */

// Average characters per token for different languages
const CHARS_PER_TOKEN = {
  english: 4,
  chinese: 2.5,
  mixed: 3.5,
  code: 3,
}

/**
 * Detect text language type
 */
function detectLanguageType(text: string): keyof typeof CHARS_PER_TOKEN {
  const chineseChars = (text.match(/[\u4e00-\u9fa5]/g) || []).length
  const codeChars = (text.match(/[{}[\];(),.=+\-*/<>!&|^%]/g) || []).length
  const totalChars = text.length

  if (chineseChars / totalChars > 0.3) {
    return 'chinese'
  }
  if (codeChars / totalChars > 0.1) {
    return 'code'
  }
  return 'mixed'
}

/**
 * Estimate token count from text
 * This is an approximation based on character count
 */
export function estimateTokenCount(text: string): number {
  if (!text || text.trim().length === 0) {
    return 0
  }

  const languageType = detectLanguageType(text)
  const charsPerToken = CHARS_PER_TOKEN[languageType]

  // Base calculation
  let tokenCount = Math.ceil(text.length / charsPerToken)

  // Adjust for whitespace (tokens often split on whitespace)
  const whitespaceCount = (text.match(/\s/g) || []).length
  tokenCount += Math.floor(whitespaceCount / 4)

  // Adjust for special characters and punctuation
  const specialChars = (text.match(/[.,!?;:'"()-]/g) || []).length
  tokenCount += Math.floor(specialChars / 3)

  return Math.max(1, tokenCount)
}

/**
 * Tokenize text into individual tokens (simulated)
 * Returns an array of token objects with value and type
 */
export interface Token {
  value: string
  type: 'word' | 'whitespace' | 'punctuation' | 'symbol' | 'chinese'
  index: number
}

export function tokenizeText(text: string): Token[] {
  const tokens: Token[] = []
  let index = 0

  // Simple regex-based tokenization
  const regex = /([\u4e00-\u9fa5])|(\s+)|([a-zA-Z0-9_]+)|([.,!?;:'"()-])|(.)/g
  let match

  while ((match = regex.exec(text)) !== null) {
    let value = match[0]
    let type: Token['type']

    if (match[1]) {
      type = 'chinese'
    } else if (match[2]) {
      type = 'whitespace'
    } else if (match[3]) {
      type = 'word'
    } else if (match[4]) {
      type = 'punctuation'
    } else {
      type = 'symbol'
    }

    tokens.push({ value, type, index })
    index++
  }

  return tokens
}

/**
 * Get token statistics
 */
export interface TokenStats {
  totalTokens: number
  estimatedChars: number
  languageType: string
  breakdown: {
    words: number
    chinese: number
    whitespace: number
    punctuation: number
    symbols: number
  }
}

export function getTokenStats(text: string): TokenStats {
  const tokens = tokenizeText(text)
  const languageType = detectLanguageType(text)

  const breakdown = {
    words: tokens.filter((t) => t.type === 'word').length,
    chinese: tokens.filter((t) => t.type === 'chinese').length,
    whitespace: tokens.filter((t) => t.type === 'whitespace').length,
    punctuation: tokens.filter((t) => t.type === 'punctuation').length,
    symbols: tokens.filter((t) => t.type === 'symbol').length,
  }

  return {
    totalTokens: estimateTokenCount(text),
    estimatedChars: text.length,
    languageType,
    breakdown,
  }
}

/**
 * Format token count with commas
 */
export function formatTokenCount(count: number): string {
  return count.toLocaleString()
}

/**
 * Check if text exceeds context length
 */
export function checkContextLength(
  text: string,
  maxContextLength: number
): {
  isValid: boolean
  tokenCount: number
  remainingTokens: number
  percentage: number
} {
  const tokenCount = estimateTokenCount(text)
  const remainingTokens = maxContextLength - tokenCount
  const percentage = Math.min(100, (tokenCount / maxContextLength) * 100)

  return {
    isValid: tokenCount <= maxContextLength,
    tokenCount,
    remainingTokens,
    percentage,
  }
}
