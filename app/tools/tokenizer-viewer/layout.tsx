import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tokenizer Viewer - Visualize Tokenization for GPT, Claude, Gemini',
  description:
    'Visualize how text is split into tokens. Understand tokenization for better prompt engineering, cost optimization, and AI development.',
  keywords: [
    'tokenizer viewer',
    'tokenization',
    'AI tokenization',
    'GPT tokenizer',
    'Claude tokenizer',
    'Gemini tokenizer',
    'token visualization',
    'prompt engineering',
    'AI developer tools',
  ],
  openGraph: {
    title: 'Tokenizer Viewer - Visualize Tokenization',
    description: 'Visualize how text is split into tokens. Understand tokenization for better prompt engineering and cost optimization.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://aitokentools.com/tools/tokenizer-viewer',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
