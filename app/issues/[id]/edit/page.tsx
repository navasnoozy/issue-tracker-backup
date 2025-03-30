
import { prisma } from "@/prisma/client";
import { notFound } from "next/navigation";
import IssueForm from "@/app/issues/_components/IssueForm";
import { PropsType } from "../page";



// EDIT ISSUE
const IssueEditPage = async ({params}:PropsType) => {

  const {id } = await params

   if (!id) return 'Invalid Id' 

const issue = await prisma.issue.findUnique({
  where:{
    id:id
  }
})

  if (!issue) {
    notFound();
  }

  return <IssueForm issue={issue} />;
};

export default IssueEditPage;
