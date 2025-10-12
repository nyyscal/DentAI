import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, SignOutButton, SignUpButton } from "@clerk/nextjs";

export default function Home() {
  return (
   <div>
    <h1>Home Page</h1>
    <SignedOut>
    <SignUpButton mode="modal">Sign Up</SignUpButton>
    </SignedOut>

    <SignedIn>
      <SignOutButton >Log out</SignOutButton>
    </SignedIn>
   </div>
  )
}
