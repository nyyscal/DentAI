import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useCreateDoctor } from '@/hooks/use-doctors'
import { formatPhoneNumber } from '@/lib/utils'
import { Gender } from '@prisma/client'
import React, { useState } from 'react'

interface AddDoctorDialogProps{
  isOpen: boolean,
  onClose: ()=>void
}

const AddDoctorDialog = ({isOpen, onClose}:AddDoctorDialogProps) => {
  const [newDoctor, setNewDoctor] = useState({
    name:"",
    email:"",
    phone:"",
    speciality:"",
    gender:"MALE" as Gender,
    isActive:true
  })

  const createDoctorMutation = useCreateDoctor()

  const handlePhoneChange = (value:string) => {
    const formattedValue = formatPhoneNumber(value)
    setNewDoctor({...newDoctor, phone: formattedValue})
  }

  const handleSave = () => {
    createDoctorMutation.mutate({...newDoctor},{
      onSuccess:()=> handleClose(),
      onError:(error)=> console.log("Error when creaing doctor:",error)
    })
  }

  const handleClose = () => {
    onClose();
    setNewDoctor({
    name:"",
    email:"",
    phone:"",
    speciality:"",
    gender:"MALE",
    isActive:true
    })
  }
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className='sm: max-w-[500px]'>
        <DialogHeader>
          <DialogTitle>Add New Doctor</DialogTitle>
          <DialogDescription>Add a new doctor to your system.</DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='new-name'>Name *</Label>
              <Input id='new-name' value={newDoctor.name} onChange={(e)=> setNewDoctor({...newDoctor, name:e.target.value})} placeholder='Dr. Kaushal Malla'/>
            </div>
            <div className='space-y-2'>
              <Label htmlFor='new-speciality'>Speciality *</Label>
              <Input id='new-speciality' value={newDoctor.speciality} onChange={(e)=> setNewDoctor({...newDoctor, speciality:e.target.value})} placeholder='Cardiologist'/>
            </div>
          </div>
          <div className='space-y-2'>
              <Label htmlFor='new-email'>Email *</Label>
              <Input id='new-email' value={newDoctor.email} onChange={(e)=> setNewDoctor({...newDoctor, email:e.target.value})} placeholder='doctor@example.com'/>
          </div>
          <div className='space-y-2'>
              <Label htmlFor='new-phone'>Phone *</Label>
              <Input id='new-phone' value={newDoctor.phone} onChange={(e)=>handlePhoneChange(e.target.value)} placeholder='+977 65665365'/>
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='new-gender'>Gender</Label>
              <Select value={newDoctor.gender || ""}
              onValueChange={(value)=> setNewDoctor({...newDoctor, gender: value as Gender})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='MALE'>Male</SelectItem>
                  <SelectItem value='FEMALE'>Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='space-y-2'>
              <Label htmlFor='new-status'>Status</Label>
              <Select value={newDoctor.isActive ? "active" : "inactive"}
              onValueChange={(value)=> setNewDoctor({...newDoctor, isActive: value === "active"})}
              >
                <SelectTrigger>
                  <SelectValue/>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='active'>
                    <div className='size-2 bg-green-400 rounded-full animate-pulse'/>Active</SelectItem>
                  <SelectItem value='inactive'>
                    <div className='size-2 bg-red-400 rounded-full animate-pulse'/>Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant={"outline"}
          onClick={handleClose}
          >
            Cancel
          </Button>
          <Button onClick={handleSave} className='bg-primary hover:bg-primary/90' disabled={!newDoctor.name || !newDoctor.email || !newDoctor.speciality || createDoctorMutation.isPending}>
          {createDoctorMutation.isPending ? "Adding..." : "Add Doctor"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddDoctorDialog