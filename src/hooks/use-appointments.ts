"use client"

import { getApointments } from "@/lib/actions/apiontments"
import { useQuery } from "@tanstack/react-query"

export function useGetAppointments(){
  const result = useQuery({
    queryKey:["getAppointments"],
    queryFn: getApointments
  })

  return result
}