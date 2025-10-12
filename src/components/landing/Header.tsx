import { SignInButton, SignUpButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'

const Header = () => {
  return (
    <nav className='fixed top right-0 left-0 z-50 px-6 py-2 border-b border-border/50 bg-background/80 backdrop-blur-md h-16'>
      <div className='max-w-6xl mx-auto flex justify-between items-center'>
        <Link href={"/"} className='flex items-center gap-2'>
        <Image src={"/logo.png"} className='w-11' width={32} height={32} alt='logo'/>
        <span className='font-semibold text-lg'>DentAI</span>
        </Link>

        <div className='hidden md:flex items-center gap-8'>
          <a href={"#"} className='text-muted-foreground hover:text-foreground'>How it Works</a>
          <a href={"#"} className='text-muted-foreground hover:text-foreground'>Pricing</a>
          <a href={"#"} className='text-muted-foreground hover:text-foreground'>About</a>
        </div>
        <div className='flex items-center gap-3'>
          <SignInButton mode='modal'>
            <Button variant={"ghost"} size={"sm"}>
              Sign In
            </Button>
          </SignInButton>
          <SignUpButton>
            <Button size={"sm"}>
              Sign Up
            </Button>
          </SignUpButton>
        </div>
      </div>
    </nav>
  )
}

export default Header