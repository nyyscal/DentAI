import CTA from "@/components/landing/CTA";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import PricingSection from "@/components/landing/PricingSection";
import WhatToAsk from "@/components/landing/WhatToAsk";
import { Footer } from "react-day-picker";

export default function Home() {
  return (
   <div className="min-h-screen bg-background">
   <Header/>
   <Hero/>
   <HowItWorks/>
   <WhatToAsk/>
   <PricingSection/>
   <CTA/>
   <Footer/>
   </div>
  )
}
