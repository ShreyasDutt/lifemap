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


const Navbar = async() => {

  return (
    <div>
    <Link href={'/'} className='flex items-center justify-between px-10 py-5 shadow dark:shadow-gray-900'>
        <div className='flex items-center gap-0.5'>
      <p className='text-2xl'>LifeMap</p>
      <Earth />
        </div>
        
        <div className='flex items-center gap-3'>
            <ModeToggle/>
            <SignedOut>
            <Button asChild>
                <Link href={'/sign-in'}>Get Started</Link>
            </Button>
            </SignedOut>
            <div className='flex items-center gap-3 text-black'>
            <SignedIn>
              <UserButton />
            </SignedIn>
            </div>
            
        </div>

    </Link>
    </div>
  )
}

export default Navbar