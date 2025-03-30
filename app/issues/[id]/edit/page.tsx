// app/ issues/ [id]/edit/page. tsx file
import { prisma } from "@/prisma/client";
import { notFound } from "next/navigation";
import DynamicIssueForm from "../../_components/DynamicIssueForm";
import { PropsType } from "../page";

// EDIT ISSUE
const IssueEditPage = async ({ params }: PropsType) => {
  const { id } = await params;

  if (!id) return "Invalid Id";

  const issue = await prisma.issue.findUnique({
    where: {
      id: id,
    },
  });

  if (!issue) {
    notFound();
  }

  return <DynamicIssueForm issue={issue} />;
};

export default IssueEditPage;
