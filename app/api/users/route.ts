import { userSchema } from "@/app/validation";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import delay  from 'delay'
import sendMail from "./sendMail";

//FETCH ALL USERS
export async function GET(req: NextRequest) {
  const users = await prisma.user.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return NextResponse.json(users);
}

//CREATE USER
export async function POST(req: NextRequest) {

  delay(2000)
  const body = await req.json();

  const validate = userSchema.safeParse(body);
  if (validate.error)
    return NextResponse.json(validate.error.errors, { status: 401 });

  const { name, email, password } = body;

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
      {message:'Email ID already registered'},
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password:hashedPassword
      },
    });

    // const res = await sendMail (newUser);

    if (newUser) return NextResponse.json({message:'User creation successfull',userId:newUser.id},{ status:201});

  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
