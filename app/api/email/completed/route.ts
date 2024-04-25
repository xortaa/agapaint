import { type NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { completed } from "@/utils/email/completed";
import * as handlebars from "handlebars";

export async function POST(request: NextRequest) {
  try {
    const emailData = await request.json();

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_EMAIL_PASSWORD,
      },
    });

    const compileEmailTemplate = (nanoid: string) => {
      const template = handlebars.compile(completed);
      const htmlBody = template({
        nanoid: nanoid,
      });
      return htmlBody;
    };

    const mailOptions: Mail.Options = {
      from: process.env.ADMIN_EMAIL,
      to: emailData.email,
      subject: `Agapaint Appointment Completed for ${emailData.carManufacturer} ${emailData.carModel}`,
      html: compileEmailTemplate(emailData.nanoid),
    };

    await transport.sendMail(mailOptions);

    return NextResponse.json({ message: "Email sent" });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Cant send email", { status: 500 });
  }
}
