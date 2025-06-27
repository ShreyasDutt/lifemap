import {
  ClerkProvider,
} from '@clerk/nextjs'
import { Comic_Neue } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Toaster } from "@/components/ui/sonner"


const caveat = Comic_Neue({
  subsets: ["latin"],
  weight: "400",
});

export const metadata = {
  title: 'LifeMap 🌍',
  description: 'LifeMap',
}

export default function RootLayout({children}) {
  return (
        <ClerkProvider
    >
     <html lang="en" className={caveat.className} suppressHydrationWarning>
        <body className={`antialiased font-bold`}>
            <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
          <Navbar/>
          {children}
          <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}