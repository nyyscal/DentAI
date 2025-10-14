import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'
import AdminDashboardClient from './AdminDashboardClient'

const AdminPage = async() => {
  const user = await currentUser()

  if(!user) redirect("/")

    const adminEmail = process.env.ADMIN_EMAIL
    const userEmail = user?.emailAddresses[0]?.emailAddress

    //user is not admin
    if(!adminEmail || userEmail !== adminEmail)  redirect("/dashboard")
  return (<>
    <div>This is admin page.</div>
    <AdminDashboardClient/>
  </>
  )
}

export default AdminPage