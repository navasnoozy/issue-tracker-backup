import { prisma } from "@/prisma/client";
import { Issue } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { IssueSchema } from "@/app/validation";

// UPDATE ISSUE
export async function PATCH(req: NextRequest) {
  const body: Issue = await req.json();

  const validate = IssueSchema.safeParse(body);

  if (!validate.success)
    return NextResponse.json(validate.error.errors, { status: 400 });

  const issue = await prisma.issue.findUnique({
    where:{
      id: body.id
    }
  })

  if (!issue) return NextResponse.json({error:'Invalid Issue'},{status:404})

  const updatedIssue = await prisma.issue.update({
    where: {
      id: body.id,
    },
    data: {
      title: body.title,
      description: body.description,
      status: body.status,
    },
  });

  return NextResponse.json(updatedIssue, { status: 200, statusText: "succsess" });
}

//update Issue