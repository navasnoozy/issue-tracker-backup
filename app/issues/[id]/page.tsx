import { Box, Card, Flex, Heading, Separator, Text } from "@radix-ui/themes";
import { prisma } from "../../../prisma/client";
import { notFound } from "next/navigation";
import StatusBadge from "@/app/components/issueStatusBadge";

interface PropsType {
  params: Promise<{ id: string }>;
}

const IssueDetailsPage = async ({ params }: PropsType) => {
  const { id } = await params;

  const issue = await prisma.issue.findUnique({
    where: {
      id: id,
    },
  });

  if (!issue) notFound;

  return (
    <Card className=" w-[100%] space-y-4">
      <Flex justify={"between"} className="flex-col md:flex-row">
      <Flex className="flex-col h-full gap-2 ">
        <Heading>{issue?.title}</Heading>
        <StatusBadge status={issue!.status} />
        </Flex>
     

        <Flex className="flex-col h-full ">
          <Text>
            <span className="text-gray-500">Created At :</span>{" "}
            {issue?.createdAt.toDateString()}
          </Text>
          <Text className="hidden md:block">
            <span className="text-gray-500">Upated At :</span>{" "}
            {issue?.updatedAt.toDateString()}
          </Text>
        </Flex>
      </Flex>
 
      <Card className=" bg-gray-200"  size="1">
        {issue?.description}
      </Card>
    </Card>
  );
};

export default IssueDetailsPage;
