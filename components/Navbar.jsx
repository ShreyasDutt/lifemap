import React from 'react'
import {
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { ModeToggle } from './ModeToggle'
import { Button } from './ui/button'
import Link from 'next/link'
const Navbar = () => {
  return (
    <div className='flex items-center justify-between px-10 py-5 shadow'>

        <p>LifeMap</p>
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

    </div>
  )
}

export default Navbar