import { auth } from '@clerk/nextjs/server'
import React from 'react'
import ProPlanRequired from '../../components/voice/ProPlanRequired'
import Navbar from '@/components/Navbar'
import WelcomeSection from '@/components/voice/WelcomeSection'
import FeatureCards from '@/components/voice/FeatureCards'
import VapiWidget from '@/components/voice/VapiWidget'

const VoicePage = async() => {
  const {has} = await auth()
  const hasProPlan = has({plan:"ai_basics"}) || has({plan:"ai_pro"})

  if(!hasProPlan) return <ProPlanRequired/>
  return (
    <div className='min-h-screen bg-background'>
      <Navbar/>
      <div className='max-w-7xl mx-auto px-8 py-6 pt-24'>
        <WelcomeSection/>
        <FeatureCards/>
      </div>

      <VapiWidget/>
    </div>
  )
}

export default VoicePage