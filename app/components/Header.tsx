import Link from 'next/link'
import { SunIcon as SolarIcon } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-purple-800 shadow">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <SolarIcon className="h-8 w-8 text-yellow-400" />
            <span className="text-2xl font-bold text-white">SolanaSwap DevNet</span>
          </Link>
          <ul className="flex space-x-4">
            <li><Link href="/" className="text-white hover:text-yellow-400">Home</Link></li>
            <li><Link href="https://solfaucet.com/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-yellow-400">DevNet Faucet</Link></li>
            <li><Link href="/about" className="text-white hover:text-yellow-400">About</Link></li>
            <li><Link href="/contact" className="text-white hover:text-yellow-400">Contact</Link></li>
          </ul>
        </div>
      </nav>
    </header>
  )
}

