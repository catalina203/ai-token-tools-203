import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Context Length Checker - AI Model Context Window Checker',
  description:
    'Check if your prompt fits within the context limits of various AI models. Avoid truncation issues and ensure your content fits within model constraints for GPT, Claude, Gemini and more.',
  keywords: [
    'context length checker',
    'AI model context window',
    'GPT context length',
    'Claude context window',
    'Gemini context length',
    'LLM context limit',
    'prompt truncation',
    'AI developer tools',
    'context window checker',
  ],
  openGraph: {
    title: 'Context Length Checker - AI Model Context Window Checker',
    description: 'Check if your prompt fits within the context limits of various AI models. Avoid truncation issues and ensure your content fits within model constraints.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://aitokentools.com/tools/context-length-checker',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
