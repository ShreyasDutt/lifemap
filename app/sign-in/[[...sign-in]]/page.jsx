"use client"
import { SignIn } from '@clerk/nextjs'
import { useTheme } from 'next-themes';
import { RoughNotation } from 'react-rough-notation'

export default function Page() {
const { theme } = useTheme();
const borderColor = theme === 'dark' ? 'white' : 'black';
  return (
    <div className='flex flex-col items-center justify-center mt-20'>
        <RoughNotation type="box" show={true} color={borderColor} padding={4}>
        <SignIn />
        </RoughNotation>
    </div>
  )
}