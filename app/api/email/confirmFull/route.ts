import { type NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { confirmFullPayment } from "@/utils/email/confirmFullPayment";
import * as handlebars from "handlebars";

export async function POST(request: NextRequest) {
  const emailData = await request.json();

  const payment1 = emailData.payments[0].amount.toFixed(2);

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
    paymentTerm: string,
    startingBalance: number,
    carType: string,
    carManufacturer: string,
    carModel: string,
    url: string,
    services: string,
    payment1: number
  ) => {
    const template = handlebars.compile(confirmFullPayment);
    const htmlBody = template({
      nanoid: nanoid,
      date: date,
      time: time,
      paymentTerm: paymentTerm,
      startingBalance: startingBalance.toFixed(2),
      carType: carType,
      carManufacturer: carManufacturer,
      carModel: carModel,
      url: url,
      services: services,
      payment1: payment1,
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
      emailData.paymentTerm,
      emailData.startingBalance,
      emailData.carType,
      emailData.carManufacturer,
      emailData.carModel,
      emailData.url,
      emailData.services,
      payment1
    ),
  };

  await transport.sendMail(mailOptions);

  return NextResponse.json({ message: "Email sent" });
}
