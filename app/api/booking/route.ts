import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, when, reason } = await request.json();

    const formattedDate = new Date(when).toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    // Send confirmation email to the user
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: [email],
      subject: "Booking Request Received - The Quiet Space",
      html: `
        <h2>Thank you for your booking request, ${name}!</h2>
        <p>We have received your request for a session with the following details:</p>
        <ul>
          <li><strong>Requested Date/Time:</strong> ${formattedDate}</li>
          <li><strong>Topic:</strong> ${reason}</li>
        </ul>
        <p>We will review your request and get back to you shortly to confirm the session.</p>
        <p>If you need to make any changes, please reply to this email.</p>
        <br/>
        <p>Best regards,</p>
        <p>The Quiet Space Team</p>
      `,
    });

    // Send notification to admin
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: ["prajanova-connect@outlook.com"],
      subject: "New Booking Request",
      html: `
        <h2>New Booking Request Received</h2>
        <p>A new booking request has been submitted with the following details:</p>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Requested Date/Time:</strong> ${formattedDate}</li>
          <li><strong>Topic:</strong> ${reason}</li>
        </ul>
        <p>Please review and respond to the client as soon as possible.</p>
      `,
    });

    return NextResponse.json(
      { message: "Booking request sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending booking email:", error);
    return NextResponse.json(
      { error: "Failed to process booking request" },
      { status: 500 }
    );
  }
}
