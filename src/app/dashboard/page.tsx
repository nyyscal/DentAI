import { SignedIn, SignOutButton } from '@clerk/nextjs'
import React from 'react'

const Dashboard = () => {
  return (
    <>
    <SignedIn>
      <SignOutButton>Log Out</SignOutButton>
    </SignedIn>
    </>
  )
}

export default Dashboard