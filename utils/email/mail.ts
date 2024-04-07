// import nodemailer from "nodemailer";
// import * as handlebars from "handlebars";
// import { emailTemplate } from "./emailTemplate";

// export async function sendMail({
//   to,
//   name,
//   subject,
//   body,
// }: {
//   to: string;
//   name: string;
//   subject: string;
//   body: string;
// }) {
//   const transport = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.ADMIN_EMAIL,
//       pass: process.env.ADMIN_EMAIL_PASSWORD,
//     },
//   });
//   try {
//     const testResult = await transport.verify();
//     console.log(testResult);
//   } catch (error) {
//     console.error({ error });
//     return;
//   }

//   try {
//     const sendResult = await transport.sendMail({
//       from: process.env.ADMIN_EMAIL,
//       to,
//       subject,
//       html: body,
//     });
//     console.log(sendResult);
//   } catch (error) {
//     console.log(error);
//   }
// }

// export function compileWelcomeTemplate(nanoid: string) {
//   const template = handlebars.compile(emailTemplate);
//   const htmlBody = template({
//     nanoid: nanoid,
//   });
//   return htmlBody;
// }
