import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Prompt Diff Tool - Compare AI Prompts for GPT, Claude, Gemini',
  description:
    'Compare two prompts side by side and highlight the differences. Perfect for tracking prompt iterations, changes, and version control in prompt engineering.',
  keywords: [
    'prompt diff tool',
    'AI prompt comparison',
    'prompt version control',
    'prompt engineering',
    'GPT prompt diff',
    'Claude prompt comparison',
    'Gemini prompt diff',
    'AI developer tools',
    'prompt changes',
  ],
  openGraph: {
    title: 'Prompt Diff Tool - Compare AI Prompts',
    description: 'Compare two prompts side by side and highlight the differences. Perfect for tracking prompt iterations and changes.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://aitokentools.com/tools/prompt-diff',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
