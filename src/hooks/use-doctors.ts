"use client"

import { createDoctor, getAvailableDoctors, getDoctors, updateDoctor } from "@/lib/actions/doctors"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"

export function useGetDoctors(){
  const result = useQuery({
    queryKey:["getDoctors"],
    queryFn: getDoctors,
  })
  return result
}

export function useCreateDoctor(){
  const queryClient = useQueryClient()
  const result = useMutation({
    mutationFn: createDoctor,
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:["getDoctors"]}),
      toast.success("Doctor created succesfully.",{ 
      style: {
      borderRadius: '10px',
      background: '#333',
      color: '#fff',
    },})
    },
    onError:(error)=>{ 
      console.log("Error while creating doctor.",error),
      toast.error("Error while creating a doctor.")
    }
  })
  return result
}
export function useUpdateDoctor(){
  const queryClient = useQueryClient()
  const result = useMutation({
    mutationFn: updateDoctor,
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:["getDoctors"]}),
      toast.success("Doctor created succesfully.",{ 
      style: {
      borderRadius: '10px',
      background: '#333',
      color: '#fff',
    },})
    },
    onError:(error)=>{ 
      console.log("Error while updating doctor.",error),
      toast.error("Error while updating a doctors info.")
    }
  })
  return result
}

export function useAvailableDoctors(){
  const result = useQuery({
    queryKey:["getAvailableDoctors"],
    queryFn: getAvailableDoctors,
  })
  return result;
}