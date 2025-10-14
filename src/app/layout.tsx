import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import UserSync from "@/components/UserSync";
import {Toaster} from "react-hot-toast"
import TanStackProviders from "@/components/providers/TanStackProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DentWise - AI Powered Dental Assistant",
  description: "Your Personal Dental Health Care",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TanStackProviders>
    <ClerkProvider
    appearance={{
      variables:{
        colorPrimary:"#e78a53",
        colorBackground: "#f3f4f6",
        colorText: "#111827",
        colorTextSecondary: "#6b7280",
        colorInputBackground: "#f3f4f6",
      }
    }}>
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
        >
        <UserSync/>
        <Toaster 
        position="bottom-right"
        reverseOrder={false}/>
        {children}
      </body>
    </html>
    </ClerkProvider>
    </TanStackProviders>
  );
}
