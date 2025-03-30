import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { id } = await req.json();

  if (!id) return NextResponse.json({ error: "Id not found" }, { status: 404 });

  const issue = await prisma.issue.findUnique({
    where: {
      id: id,
    },
  });

  if (!issue) {
    console.log("Issue not found");
    return NextResponse.json({ error: "Issue not found" },{status:404});
  };

  return NextResponse.json(issue)
}
