import React from 'react'
import {
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { ModeToggle } from './ModeToggle'
import { Button } from './ui/button'
import Link from 'next/link'
import { Earth } from 'lucide-react'

const Navbar = async () => {
  return (
    <header className="w-full shadow-sm dark:shadow-gray-900 bg-white dark:bg-black">
      <nav className="max-w-7xl mx-auto px-6 md:px-10 py-5 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Earth className="w-6 h-6 text-white" />
          <span className="text-2xl font-semibold text-neutral-800 dark:text-neutral-100">
            LifeMap
          </span>
        </Link>

        {/* Controls */}
        <div className="flex items-center gap-4">
          <ModeToggle />
          <SignedOut>
            <Button asChild>
              <Link href="/sign-in">Get Started</Link>
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
