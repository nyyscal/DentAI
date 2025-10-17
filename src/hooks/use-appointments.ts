"use client"

import { bookAppointment, getApointments, getBookedTimeSlots, getUserAppointments, updateAppointmentStatus } from "@/lib/actions/appointments"
import { prisma } from "@/lib/prisma"
import { AppointmentStatus } from "@prisma/client"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export function useGetAppointments(){
  const result = useQuery({
    queryKey:["getAppointments"],
    queryFn: getApointments
  })
  return result
}
export function useBookedTimeSlots(doctorId:string, date:string){
  const result = useQuery({
    queryKey:["getBookedTimeSlots"],
    queryFn: () => getBookedTimeSlots(doctorId!, date),
    enabled: !!doctorId && !!date
  })
  return result
}

export function useBookAppointment(){
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: bookAppointment,
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:["getUserAppointments"]})
    },
    onError:(error)=>console.error("Failed to book appointment:",error)
  })
}

export function useUserAppointments(){
  const result = useQuery({
    queryKey:["getUserAppointments"],
    queryFn: getUserAppointments,
  })
  return result
}

export function useUpdateAppointmentStatus(){
  const queryClient= useQueryClient()

  return useMutation({
    mutationFn: updateAppointmentStatus,
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:["getAppointments"]})
    },
    onError:(error)=> console.error("Failed to update appointments:",error)
  })
}

