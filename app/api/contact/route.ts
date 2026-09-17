import { NextResponse } from "next/server";
import { Resend } from "resend";
import { prisma } from "@/lib/prisma";

const resend = new Resend(process.env.RESEND_API_KEY);

// --------------------------------------------------
// Basic in-memory rate limit
// --------------------------------------------------

const requestLog = new Map<string, number[]>();

const RATE_LIMIT_WINDOW = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 3; // Maximum 3 requests per window

function isRateLimited(ip: string): boolean {
  const now = Date.now();

  const timestamps = requestLog.get(ip) || [];

  const recentRequests = timestamps.filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW
  );

  if (recentRequests.length >= MAX_REQUESTS) {
    requestLog.set(ip, recentRequests);
    return true;
  }

  recentRequests.push(now);
  requestLog.set(ip, recentRequests);

  return false;
}

// --------------------------------------------------
// Escape user input before inserting into email HTML
// --------------------------------------------------

function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// --------------------------------------------------
// POST
// --------------------------------------------------

export async function POST(request: Request) {
  try {
    // --------------------------------------------------
    // 1. Get visitor IP
    // --------------------------------------------------

    const forwardedFor = request.headers.get("x-forwarded-for");

    const ip =
      forwardedFor?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    // --------------------------------------------------
    // 2. Rate limit
    // --------------------------------------------------

    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Too many submissions. Please wait a few minutes and try again.",
        },
        { status: 429 }
      );
    }

    // --------------------------------------------------
    // 3. Read request body
    // --------------------------------------------------

    const body = await request.json();

    const {
      name,
      email,
      company,
      projectType,
      budget,
      message,
    } = body;

    // --------------------------------------------------
    // 4. Required fields
    // --------------------------------------------------

    if (!name || !email || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fill in all required fields.",
        },
        { status: 400 }
      );
    }

    // --------------------------------------------------
    // 5. Basic email validation
    // --------------------------------------------------

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(String(email))) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid email address.",
        },
        { status: 400 }
      );
    }

    // --------------------------------------------------
    // 6. Basic length protection
    // --------------------------------------------------

    if (
      String(name).length > 100 ||
      String(email).length > 200 ||
      String(company || "").length > 200 ||
      String(projectType || "").length > 100 ||
      String(budget || "").length > 100 ||
      String(message).length > 5000
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "One or more fields are too long.",
        },
        { status: 400 }
      );
    }

    // --------------------------------------------------
    // 7. Escape values for HTML email
    // --------------------------------------------------

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeCompany = escapeHtml(company || "Not provided");
    const safeProjectType = escapeHtml(projectType || "Not provided");
    const safeBudget = escapeHtml(budget || "Not provided");
    const safeMessage = escapeHtml(message);

    // --------------------------------------------------
    // 8. Save project inquiry to database
    // --------------------------------------------------

    const inquiry = await prisma.projectInquiry.create({
      data: {
        name: String(name).trim(),
        email: String(email).trim(),
        company: company ? String(company).trim() : null,
        projectType: projectType ? String(projectType).trim() : null,
        budget: budget ? String(budget).trim() : null,
        message: String(message).trim(),
      },
    });

    // --------------------------------------------------
    // 9. Send project inquiry to VITIONX
    // --------------------------------------------------

    const { data: adminData, error: adminError } =
      await resend.emails.send({
        from: "VITIONX <contact@vitionx.com>",
        to: ["ahmedsakib857@gmail.com"],
        replyTo: String(email),
        subject: `New Project Inquiry from ${String(name).slice(0, 100)}`,
        html: `
          <div style="
            margin:0;
            padding:40px 20px;
            background:#f4f5f5;
            font-family:Arial,Helvetica,sans-serif;
            color:#1d1d1d;
          ">

            <div style="
              max-width:650px;
              margin:0 auto;
              background:#ffffff;
              border-radius:12px;
              overflow:hidden;
              border:1px solid #e5e5e5;
            ">

              <div style="
                background:#1d1d1d;
                padding:28px 30px;
              ">
                <div style="
                  color:#f26f21;
                  font-size:24px;
                  font-weight:700;
                  letter-spacing:2px;
                ">
                  VITIONX
                </div>

                <div style="
                  margin-top:8px;
                  color:#ffffff;
                  font-size:14px;
                ">
                  New Project Inquiry
                </div>
              </div>

              <div style="padding:30px;">

                <h2 style="
                  margin:0 0 24px;
                  font-size:24px;
                  color:#1d1d1d;
                ">
                  New Project Inquiry
                </h2>

                <div style="
                  border:1px solid #eeeeee;
                  border-radius:8px;
                  overflow:hidden;
                ">

                  <div style="padding:15px 18px; border-bottom:1px solid #eeeeee;">
                    <strong>Name</strong><br />
                    ${safeName}
                  </div>

                  <div style="padding:15px 18px; border-bottom:1px solid #eeeeee;">
                    <strong>Email</strong><br />
                    ${safeEmail}
                  </div>

                  <div style="padding:15px 18px; border-bottom:1px solid #eeeeee;">
                    <strong>Company / Brand</strong><br />
                    ${safeCompany}
                  </div>

                  <div style="padding:15px 18px; border-bottom:1px solid #eeeeee;">
                    <strong>Project Type</strong><br />
                    ${safeProjectType}
                  </div>

                  <div style="padding:15px 18px;">
                    <strong>Estimated Budget</strong><br />
                    ${safeBudget}
                  </div>

                </div>

                <div style="margin-top:25px;">

                  <strong>Project Message</strong>

                  <div style="
                    margin-top:10px;
                    padding:18px;
                    background:#f8f8f8;
                    border-left:4px solid #f26f21;
                    border-radius:4px;
                    white-space:pre-wrap;
                  ">
                    ${safeMessage}
                  </div>

                </div>

                <div style="
                  margin-top:30px;
                  padding-top:20px;
                  border-top:1px solid #eeeeee;
                  font-size:12px;
                  color:#777777;
                ">
                  This inquiry was submitted through the VITIONX portfolio website.
                </div>

              </div>

            </div>

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
    // 10. Send automatic confirmation to client
    // --------------------------------------------------

    const { error: clientError } = await resend.emails.send({
      from: "VITIONX <contact@vitionx.com>",
      to: [String(email)],
      subject: "Thanks for contacting VITIONX — Project Inquiry Received",
      html: `
        <div style="
          margin:0;
          padding:40px 20px;
          background:#f4f5f5;
          font-family:Arial,Helvetica,sans-serif;
          color:#1d1d1d;
        ">

          <div style="
            max-width:650px;
            margin:0 auto;
            background:#ffffff;
            border-radius:12px;
            overflow:hidden;
            border:1px solid #e5e5e5;
          ">

            <div style="
              background:#1d1d1d;
              padding:30px;
              text-align:center;
            ">
              <div style="
                color:#f26f21;
                font-size:26px;
                font-weight:700;
                letter-spacing:3px;
              ">
                VITIONX
              </div>

              <div style="
                margin-top:8px;
                color:#ffffff;
                font-size:13px;
              ">
                Strategic Brand Design
              </div>
            </div>

            <div style="padding:35px 30px;">

              <h2 style="
                margin:0 0 18px;
                font-size:25px;
                color:#1d1d1d;
              ">
                Thank You, ${safeName}
              </h2>

              <p style="margin:0 0 16px; line-height:1.7;">
                Thank you for reaching out to <strong>VITIONX</strong>.
                Your project inquiry has been received successfully.
              </p>

              <p style="margin:0; line-height:1.7;">
                I’ll review your project details and get back to you
                as soon as possible.
              </p>

              <div style="
                margin:28px 0;
                padding:20px;
                background:#f8f8f8;
                border-left:4px solid #f26f21;
                border-radius:4px;
              ">

                <p style="margin:0 0 10px;">
                  <strong>Project Type:</strong>
                  ${safeProjectType}
                </p>

                <p style="margin:0;">
                  <strong>Estimated Budget:</strong>
                  ${safeBudget}
                </p>

              </div>

              <p style="margin:0; line-height:1.7;">
                If you have any additional information, references,
                or requirements you'd like to share, simply reply to
                this email.
              </p>

              <p style="
                margin:30px 0 0;
                line-height:1.7;
              ">
                Thanks & Regards,<br />
                <strong>Sakib</strong><br />
                VITIONX — Strategic Brand Designer
              </p>

            </div>

            <div style="
              padding:20px 30px;
              background:#1d1d1d;
              color:#aaaaaa;
              text-align:center;
              font-size:12px;
            ">
              This is an automatic confirmation email from the
              VITIONX website.
            </div>

          </div>

        </div>
      `,
    });

    // The main inquiry was already delivered to VITIONX.
    if (clientError) {
      console.error("Resend client auto-reply error:", clientError);
    }

    // --------------------------------------------------
    // 11. Success
    // --------------------------------------------------

    return NextResponse.json(
      {
        success: true,
        message:
          "Your project inquiry has been sent successfully. I'll get back to you soon.",
        id: adminData?.id,
        inquiryId: inquiry.id,
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