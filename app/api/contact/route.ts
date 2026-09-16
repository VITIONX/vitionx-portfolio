import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      name,
      email,
      company,
      projectType,
      budget,
      message,
    } = body;

    // Required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fill in all required fields.",
        },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid email address.",
        },
        { status: 400 }
      );
    }

    // --------------------------------------------------
    // 1. Send project inquiry to VITIONX
    // --------------------------------------------------

    const { data: adminData, error: adminError } =
      await resend.emails.send({
        from: "VITIONX <contact@vitionx.com>",
        to: ["ahmedsakib857@gmail.com"],
        replyTo: email,
        subject: `New Project Inquiry from ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #222; max-width: 650px; margin: 0 auto;">

            <h2 style="margin-bottom: 20px;">
              New Project Inquiry — VITIONX
            </h2>

            <p>
              <strong>Name:</strong> ${name}
            </p>

            <p>
              <strong>Email:</strong> ${email}
            </p>

            <p>
              <strong>Company / Brand:</strong>
              ${company || "Not provided"}
            </p>

            <p>
              <strong>Project Type:</strong>
              ${projectType || "Not provided"}
            </p>

            <p>
              <strong>Budget:</strong>
              ${budget || "Not provided"}
            </p>

            <div style="margin-top: 20px;">
              <strong>Message:</strong>

              <p style="white-space: pre-wrap;">
                ${message}
              </p>
            </div>

            <hr style="margin: 30px 0; border: 0; border-top: 1px solid #ddd;" />

            <p style="font-size: 13px; color: #777;">
              This message was submitted through the VITIONX portfolio website.
            </p>

          </div>
        `,
      });

    if (adminError) {
      console.error("Resend admin email error:", adminError);

      return NextResponse.json(
        {
          success: false,
          message: "Failed to send your message. Please try again.",
        },
        { status: 500 }
      );
    }

    // --------------------------------------------------
    // 2. Send automatic confirmation to the client
    // --------------------------------------------------

    const { error: clientError } = await resend.emails.send({
      from: "VITIONX <contact@vitionx.com>",
      to: [email],
      subject: "Thanks for contacting VITIONX — Project Inquiry Received",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.7; color: #222; max-width: 650px; margin: 0 auto;">

          <h2 style="margin-bottom: 10px;">
            Thank You for Contacting VITIONX
          </h2>

          <p>
            Hi ${name},
          </p>

          <p>
            Thank you for reaching out to <strong>VITIONX</strong>.
            Your project inquiry has been received successfully.
          </p>

          <p>
            I’ll review your project details and get back to you as soon as possible.
          </p>

          <div style="
            margin: 25px 0;
            padding: 20px;
            background: #f5f5f5;
            border-left: 4px solid #f26f21;
          ">

            <p style="margin: 0 0 10px;">
              <strong>Project Type:</strong>
              ${projectType || "Not provided"}
            </p>

            <p style="margin: 0;">
              <strong>Estimated Budget:</strong>
              ${budget || "Not provided"}
            </p>

          </div>

          <p>
            If you have any additional information, references, or requirements
            you'd like to share, simply reply to this email.
          </p>

          <p style="margin-top: 30px;">
            Thanks & Regards,<br />
            <strong>Sakib</strong><br />
            VITIONX — Strategic Brand Designer
          </p>

          <hr style="margin: 30px 0; border: 0; border-top: 1px solid #ddd;" />

          <p style="font-size: 13px; color: #777;">
            This is an automatic confirmation email from the VITIONX website.
          </p>

        </div>
      `,
    });

    // Client email failure should not make the inquiry look completely failed,
    // because the main inquiry was already delivered to VITIONX.
    if (clientError) {
      console.error("Resend client auto-reply error:", clientError);
    }

    // --------------------------------------------------
    // Success
    // --------------------------------------------------

    return NextResponse.json(
      {
        success: true,
        message:
          "Your project inquiry has been sent successfully. I'll get back to you soon.",
        id: adminData?.id,
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Contact API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again later.",
      },
      { status: 500 }
    );
  }
}