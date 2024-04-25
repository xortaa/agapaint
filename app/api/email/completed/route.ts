import { type NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { completed } from "@/utils/email/completed";
import * as handlebars from "handlebars";

export async function POST(request: NextRequest) {
  const emailData = await request.json();

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.ADMIN_EMAIL,
      pass: process.env.ADMIN_EMAIL_PASSWORD,
    },
  });

  const compileEmailTemplate = (
    nanoid: string,
    date: string,
    time: string,
    carManufacturer: string,
    carModel: string,
    url: string
  ) => {
    const template = handlebars.compile(completed);
    const htmlBody = template({
      nanoid: nanoid,
      date: date,
      time: time,
      carManufacturer: carManufacturer,
      carModel: carModel,
      url: url,
    });
    return htmlBody;
  };

  const mailOptions: Mail.Options = {
    from: process.env.ADMIN_EMAIL,
    to: emailData.email,
    subject: `Agapaint Appointment Confirmed for ${emailData.carManufacturer} ${emailData.carModel}`,
    html: compileEmailTemplate(
      emailData.nanoid,
      emailData.date,
      emailData.time,
      emailData.carManufacturer,
      emailData.carModel,
      emailData.url
    ),
  };

  await transport.sendMail(mailOptions);

  return NextResponse.json({ message: "Email sent" });
}
