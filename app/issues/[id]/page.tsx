import { Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import { prisma } from "../../../prisma/client";
import IssueDetailsPage from "./IssueDetailsPage";
import EditButton from "./editButton";

export interface PropsType {
  params: Promise<{ id: string }>;
}

const Page = async ({ params }: PropsType) => {

  const { id } = await params;
    
  const issue = await prisma.issue.findUnique({
    where: {
      id: id,
    },
  });

  if (!issue)  notFound();
  
  return (
    <Grid  width='100vw ' className="place-items-center gap-4 " columns={{md:"2"}}>
      <IssueDetailsPage issue={issue} />
      <EditButton id={issue.id} />
    </Grid>
  )
};

export default Page;
