import Link from 'next/link'
import { LucideIcon } from 'lucide-react'

interface ToolCardProps {
  title: string
  description: string
  href: string
  icon: LucideIcon
}

export default function ToolCard({ title, description, href, icon: Icon }: ToolCardProps) {
  return (
    <Link
      href={href}
      className="group relative flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-primary-300"
    >
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600 group-hover:bg-primary-100 transition-colors">
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
          {title}
        </h3>
      </div>
      <p className="text-gray-600 text-sm leading-relaxed">
        {description}
      </p>
      <div className="mt-auto pt-2">
        <span className="text-sm font-medium text-primary-600 group-hover:text-primary-700">
          Try it now &rarr;
        </span>
      </div>
    </Link>
  )
}
