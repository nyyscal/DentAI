"use server"

import { Gender } from "@prisma/client"
import { prisma } from "../prisma"
import { generateAvatar } from "../utils"
import { revalidatePath } from "next/cache"
import { currentUser } from "@clerk/nextjs/server"

export async function getDoctors(){
  try {
    const doctors = await prisma.doctor.findMany({
      include:{
        _count:{
          select:{
            appointment:true
          }}
      },
      orderBy: {createdAt:"desc"}
    })
    return doctors.map((doctor) =>({...doctor, appointmentCount: doctor._count.appointment}))
  } catch (error) {
    console.log("Error fetching doctors: ",error)
    throw new Error("Failed to fetch doctors")
  }
}

interface CreateDoctorInput{
  name:string,
  email:string,
  phone: string,
  speciality:string,
  gender:Gender,
  isActive:boolean
}

export async function createDoctor(input: CreateDoctorInput){
  try {
    if(!input.name || !input.email) throw new Error("Name and Email are rquired!")
     const doctor = await prisma.doctor.create({
    data:{
      ...input,
      imageUrl: generateAvatar(input.name, input.gender)
    }})
    revalidatePath("/admin")
    return doctor
  } catch (error:any) {
    console.log("Error in creating doctor:",error)
    if(error?.code === "P2002"){
      throw new Error("A doctor with this email already exists.")
    }
    throw new Error("Failed to create doctor.")
  }
}

interface UpdateDoctorInput extends Partial<CreateDoctorInput>{
  id:string;
}

export async function updateDoctor(input:UpdateDoctorInput){
  try {
    if(!input.name || !input.email) throw new Error("Name and email are required.")

      const currentDoctor = await prisma.doctor.findUnique({
        where:{
          id:input.id,
        },
        select:{
          email:true,
        }
      })
      if(!currentDoctor) throw new Error("Doctor not found.")
      
      if(input.email !== currentDoctor.email){
        const existingDoctor = await prisma.doctor.findUnique({
          where:{email: input.email}
        })

        if(existingDoctor){
          throw new Error("A doctor with the email already exists in the system.")
        }
      }
        const doctor = await prisma.doctor.update({
          where: {id: input.id},
          data:{
            name: input.name,
            email: input.email,
            phone: input.email,
            gender: input.gender,
            speciality: input.speciality,
            isActive: input.isActive,
          }
        })
      return doctor 
  } catch (error) {
    
  }
}