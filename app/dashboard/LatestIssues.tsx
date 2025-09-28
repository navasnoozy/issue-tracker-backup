import  prisma  from "@/prisma/client";
import { Card, Flex, Avatar, Table, Heading, Text } from "@radix-ui/themes";
import CustomLink from "../components/CustomLink";
import StatusBadge from "../components/issueStatusBadge";

const LatestIssues = async ()=>{
    const latestIssues = await prisma.issue.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: {
          assignToUser: true,
        },
      });

      if (!latestIssues) return  <Card >No issues found</Card>

    return (
          <Card >
        <Heading mb='2' size='4'>Latest Issues</Heading>
        <Table.Root>
          <Table.Header>
            <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Assignee</Table.ColumnHeaderCell>
            </Table.Row>
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
                  {issue.assignToUser ? <Avatar
                    size="2"
                    referrerPolicy="no-referrer"
                    src={issue.assignToUser?.image ?? undefined}
                    radius="full"
                    fallback="?"
                  /> :
                  <Text style={{ color: 'var(--md-sys-color-on-surface-variant)' }}>
                    Unassigned
                  </Text>}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Card>
    )
};

export default LatestIssues;