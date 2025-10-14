import { useGetDoctors } from '@/hooks/use-doctors'
import React, { useState } from 'react'

const DoctorsManagement = () => {
  const {data:doctors = []} = useGetDoctors()

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen]= useState(false)
  const [selectedDoctor,setSelectedDoctor] = useState(null)

  return (
    <div>DoctorsManagement</div>
  )
}

export default DoctorsManagement