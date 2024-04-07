import { type NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { Next } from "react-bootstrap/esm/PageItem";
// import emailTemplate from "../../../utils/email/emailTemplate.hbs";
import { emailTemplate } from "@/utils/email/emailTemplate";
import * as handlebars from "handlebars";

export async function POST(request: NextRequest) {
  const emailData = await request.json();

  return NextResponse.json(emailData);

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.ADMIN_EMAIL,
      pass: process.env.ADMIN_EMAIL_PASSWORD,
    },
  });

  const compileEmailTemplate = (
    nanoid: string,
    // date: string,
    // time: string,
    // carManufacturer: string,
    // carModel: string,
    // url: string,
    // services: 
  ) => {
    const template = handlebars.compile(emailTemplate);
    const htmlBody = template({
      nanoid: nanoid,
    });
    return htmlBody;
  };

  const mailOptions: Mail.Options = {
    from: process.env.ADMIN_EMAIL,
    to: emailData.email,
    subject: `Agapaint Appointment Approved for ${emailData.carManufacturer} ${emailData.carModel}`,
    html: compileEmailTemplate(emailData.nanoid),
  };

  // export function compileWelcomeTemplate(nanoid: string) {
  //   const template = handlebars.compile(emailTemplate);
  //   const htmlBody = template({
  //     nanoid: nanoid,
  //   });
  //   return htmlBody;
  // }

  // const sendMailPromise = () =>
  //   new Promise<string>((resolve, reject) => {
  //     transport.sendMail(mailOptions, function (err) {
  //       if (!err) {
  //         resolve("Email sent");
  //       } else {
  //         reject(err.message);
  //       }
  //     });
  //   });

  // try {
  //   await sendMailPromise();
  //   return NextResponse.json({ message: "Email sent" });
  // } catch (err) {
  //   return NextResponse.json({ error: err }, { status: 500 });
  // }

  await transport.sendMail(mailOptions);

  return NextResponse.json({ message: "Email sent" });
}
