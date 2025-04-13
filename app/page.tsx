// app/page.tsx

import { prisma } from "@/prisma/client";
import { Issue } from "@prisma/client";
import { Avatar, Card, Flex, Heading, Table } from "@radix-ui/themes";
import CustomLink from "./components/CustomLink";
import StatusBadge from "./components/issueStatusBadge";

async function Home() {
  const latestIssues = await prisma.issue.findMany({
    take: 5,
    include: {
      assignToUser: true,
    },
  });

  return (
 
      <Card >
        <Heading mb='2' size='4'>Latest Issues</Heading>
        <Table.Root>
          <Table.Header>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Assignee</Table.ColumnHeaderCell>
          </Table.Header>

          <Table.Body>
            {latestIssues.map((issue) => (
              <Table.Row key={issue.id} >
                <Table.RowHeaderCell>
                  <Flex direction='column' gap='2'>
                  <CustomLink href={`/issues/${issue.id}`}>{issue.title}</CustomLink>
                  <StatusBadge status={issue.status} />
                  </Flex>
                </Table.RowHeaderCell>
                <Table.Cell>
                  {issue.assignToUser && <Avatar
                    size="2"
                    referrerPolicy="no-referrer"
                    src={issue.assignToUser?.image!}
                    radius="full"
                    fallback="No image"
                  />}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Card>
 
  );
}

export default Home;
