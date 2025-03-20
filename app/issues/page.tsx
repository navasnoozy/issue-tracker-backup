import { Button, Table } from "@radix-ui/themes";
import Link from "next/link";
import { prisma } from "../../prisma/client";
import StatusBadge from "../components/issueStatusBadge";

const IssuesPage = async () => {
  let issues = await prisma.issue.findMany();

  return (
    <div className="space-y-5 max-w-7xl w-[100%] ">
      <div>
        {" "}
        <Button>
          <Link href="/issues/addnewissue">Create new issue</Link>
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
            {issues.map((issue) => (
              <Table.Row key={issue.id}>
                <Table.RowHeaderCell>{issue.title}</Table.RowHeaderCell>
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
