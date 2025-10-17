import AppointmentConfirmationEmail from "@/components/emails/AppointmentConfirmationEmail";
import resend from "@/lib/resend";
import { NextResponse } from "next/server";

export async function POST(request:Request){
  try {
    const body = await request.json()
    const {userEmail,doctorName,appointmentDate, appointmentType,appointmentTime,duration,price} = body
     // validate required fields
    if (!userEmail || !doctorName || !appointmentDate || !appointmentTime) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    //send email
    const {data,error} = await resend.emails.send({
      from: "DentAI <no-reply@resend.dev>",
      to:[userEmail],
      subject:"Appointment Confirmation - DentAI",
      react: AppointmentConfirmationEmail({doctorName,appointmentDate, appointmentType,appointmentTime,duration,price})
    })
if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json(
      { message: "Email sent successfully", emailId: data?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}