import { Button, Table, Text } from "@radix-ui/themes";
import CustomLink from "../components/CustomLink";
import NextLink from "next/link";
import { prisma } from "@/prisma/client";
import StatusBadge from "../components/issueStatusBadge";
import { notFound } from "next/navigation";

//Issue Table List Page
const IssuesPage = async () => {

  const issues = await prisma.issue.findMany();

  if (!issues) notFound();

  return (
    <div className="space-y-5 max-w-7xl w-[100%] ">
      <div>
       
        <Button>
          <NextLink href={"/issues/addnewissue"}>Create Issue</NextLink>
        </Button>
      </div>
      <div>
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="hidden md:table-cell">
                Description
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Created</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
          {issues.length === 0  && <Table.Row >
            <Table.Cell justify={"center"}  colSpan={3}> <Text color="gray" weight="medium" align="center">
                Issue list is empty
              </Text></Table.Cell>
            </Table.Row>}
          
            {issues.map((issue) => (
              <Table.Row key={issue.id}>
                <Table.RowHeaderCell>
                 <CustomLink href={`/issues/${issue.id}`}>{issue.title}</CustomLink>
                </Table.RowHeaderCell>

                <Table.Cell>
                  <StatusBadge status={issue.status} />
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  {issue.description}
                </Table.Cell>
                <Table.Cell>{issue.createdAt.toDateString()}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </div>
    </div>
  );
};

export default IssuesPage;

export const dynamic = 'force-dynamic'
