import nodemailer from "nodemailer";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { prisma } from "@/prisma/client";
import { User } from "@prisma/client";
import hmtlContent from '@/app/components/verifyEmailTemplate'


const sendMail = async (user: User) => {
  const token = await crypto.randomBytes(32).toString("hex");
  const hashedToken = await bcrypt.hash(token, 10);
  const expires = new Date(Date.now()+ 60 * 60 * 1000)

  await prisma.verificationToken.create({
    data: {
      identifier: user.email,
      token: hashedToken,
      expires
    },
  });

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  console.log(transporter);

  const res = await transporter.sendMail({
    from: "nn@gmail.com",
    to: user.email,
    subject: "Issue Tracker - verify your email id ✔",
    html: 
  });

  return res;
};

export default sendMail;




  