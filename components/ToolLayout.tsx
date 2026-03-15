import { ReactNode } from 'react'
import { Metadata } from 'next'

interface ToolLayoutProps {
  children: ReactNode
  title: string
  description: string
}

export default function ToolLayout({ children, title, description }: ToolLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {title}
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              {description}
            </p>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}
