import { Box, Card, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import { prisma } from "../../../prisma/client";
import IssueDetailsPage from "./IssueDetailsPage";
import EditButton from "./editButton";
import DeleteButton from "./DeleteButton";

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
        <EditButton id={issue.id} />
        <DeleteButton issueId={issue.id} />
      </Flex>
    </Grid>
  );
};

export default Page;
