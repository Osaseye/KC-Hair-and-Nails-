import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

type ButtonProps = {
  children: ReactNode
  href?: string
  to?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary'
}

export default function Button({ children, href, to, onClick, variant = 'primary' }: ButtonProps) {
  const base = 'inline-flex items-center justify-center rounded-full px-6 py-3 font-semibold transition-all duration-200 '
  const style =
    variant === 'primary'
      ? 'bg-pink-500 text-black hover:bg-pink-400'
      : 'border border-pink-500 text-white hover:bg-white hover:text-black'

  if (to) {
    return (
      <Link to={to} className={`${base}${style}`}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={`${base}${style}`}>
        {children}
      </a>
    )
  }

  return (
    <button type="button" onClick={onClick} className={`${base}${style}`}>
      {children}
    </button>
  )
}
