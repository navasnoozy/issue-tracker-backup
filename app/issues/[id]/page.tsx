'use server'
import { prisma } from "../../../prisma/client";
import { notFound } from "next/navigation";

interface PropsType {
  params: Promise<{ id: string }>;
}

const IssueDetailsPage = async ({ params }: PropsType) => {
  const { id } = await params 

  
   const  issue = await prisma.issue.findUnique({
        where: {
          id: id,
        },
      });



  if (!issue)  notFound;
  
  return (
    <div>
      <div>{issue?.title}</div>
      <div>{issue?.status}</div>
      <div>{issue?.description}</div>
      <div>{issue?.createdAt.toDateString()}</div>
      <div>{issue?.updatedAt.toDateString()}</div>
    </div>
  );
};

export default IssueDetailsPage;
