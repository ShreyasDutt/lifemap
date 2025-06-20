import React from 'react'
import {
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { ModeToggle } from './ModeToggle'
import { Button } from './ui/button'
import Link from 'next/link'
import Image from 'next/image'
import Logo from '@/public/logo.png'
import { Earth } from 'lucide-react'
const Navbar = () => {
  return (
    <Link href={'/'} className='flex items-center justify-between px-10 py-5 shadow dark:shadow-gray-900'>
        <div className='flex items-center gap-0.5'>
      <p className='text-2xl'>LifeMap</p>
      <Earth />
        </div>
        
        <div className='flex items-center gap-5'>
            <ModeToggle/>
            <SignedOut>
            <Button asChild>
                <Link href={'/sign-in'}>Get Started</Link>
            </Button>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
        </div>

    </Link>
  )
}

export default Navbar