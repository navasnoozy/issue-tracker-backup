import { Box, Card, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import { prisma } from "../../../prisma/client";
import IssueDetailsPage from "./IssueDetailsPage";
import EditButton from "./editButton";
import DeleteButton from "./DeleteButton";
import { getServerSession } from "next-auth";
import AssigneeSelect from "../_components/SelectAssignee";
import { title } from "process";

export interface Props {
  params: Promise<{ id: string }>;
}

const Page = async ({ params }: Props) => {
  const { id } = await params;
  const session = await getServerSession();
  const authenticated = !!session;

  const issue = await prisma.issue.findUnique({
    where: {
      id: id,
    },
  });

  if (!issue) notFound();

  return (
    <Grid
      width="100vw "
      className="place-items-center gap-4 "
      columns={{ md: "4fr 1fr" }}
    >
      <Box className=" w-[100%] lg:max-w-3xl  space-y-4">
        <IssueDetailsPage issue={issue} />
      </Box>
      <Flex direction="column" gap="2" className="w-sm lg:max-w-3xl  space-y-4">
        <AssigneeSelect issue={issue} />
        <EditButton id={issue.id} session={authenticated} />
        <DeleteButton issueId={issue.id} session={authenticated} />
      </Flex>
    </Grid>
  );
};

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const issue = await prisma.issue.findUnique ({
    where : {
      id: id
    }
  })

  return {
    title: issue?.title,
    description:'Details of '+ issue?.title
  }
}

export default Page;
