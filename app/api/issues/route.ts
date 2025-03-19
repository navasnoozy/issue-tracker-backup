import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { createIssueSchema } from "../../validation";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validate = createIssueSchema.safeParse(body);

    if (!validate.success)
      return NextResponse.json(validate.error.errors, { status: 400 });

    const newIssue = await prisma.issue.create({
      data: {
        title: body.title,
        description: body.description,
      },
    });
    return NextResponse.json(newIssue, { status: 201 });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return NextResponse.json(error.message);
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
