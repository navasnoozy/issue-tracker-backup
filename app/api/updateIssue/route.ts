import { prisma } from "@/prisma/client";
import { Issue } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { IssueSchema } from "@/app/validation";

// UPDATE ISSUE
export async function PATCH(req: NextRequest) {
  const body: Issue = await req.json();
  console.log("body data ", body);

  const validate = IssueSchema.safeParse(body);

  if (!validate.success)
    return NextResponse.json(validate.error.errors, { status: 400 });

  const issue = await prisma.issue.update({
    where: {
      id: body.id,
    },
    data: {
      title: body.title,
      description: body.description,
      status: body.status,
    },
  });

  return NextResponse.json(issue, { status: 200, statusText: "succsess" });
}

//update Issue