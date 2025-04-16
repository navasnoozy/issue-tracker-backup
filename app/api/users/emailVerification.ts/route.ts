import generateTemplate from "@/app/components/verifyEmailTemplate";
import { prisma } from "@/prisma/client";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST (req:NextRequest) {
    const user = await req.json();

  const token = await crypto.randomBytes(32).toString("hex");
  const hashedToken = await bcrypt.hash(token, 10);
  const expires = new Date(Date.now() + 60 * 60 * 1000);

  await prisma.verificationToken.create({
    data: {
      identifier: user.id,
      token: hashedToken,
      expires,
    },
  });

  const hmtlContent: string = generateTemplate(
    user.name,
    `http://localhost:3000/signup/verify-Email?token=${hashedToken}`
  );

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


  const res = await transporter.sendMail({
    from: "nn@gmail.com",
    to: "aswathin44@gmail.com",
    subject: "Issue Tracker - verify your email id ✔",
    html: hmtlContent,
  });

  return NextResponse.json(res)
};

