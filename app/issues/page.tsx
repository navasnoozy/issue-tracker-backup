import { Button, Flex, Table, Text } from "@radix-ui/themes";
import CustomLink from "../components/CustomLink";
import NextLink from "next/link";
import { prisma } from "@/prisma/client";
import StatusBadge from "../components/issueStatusBadge";
import { notFound } from "next/navigation";
import IssueStatusFilter from "./_components/IssueStatusFilter";
import { Issue, Status } from "@prisma/client";
import { FaSort } from "react-icons/fa";

interface Props {
  searchParams: Promise<{ status: Status; orderBy: keyof Issue }>;
}

//Issue Table List Page
const IssuesPage = async ({ searchParams }: Props) => {
  let { status, orderBy } = await searchParams;

  let statusFilter = Object.values(Status).includes(status)
    ? status
    : undefined;

  let issues = await prisma.issue.findMany({
    where: {
      status: statusFilter,
    },
  });

  const tableColTitles: {
    label: string;
    value: keyof Issue;
    className?: string;
  }[] = [
    { label: "Title", value: "title" },
    { label: "Status", value: "status" },
    {
      label: "Description",
      value: "description",
      className: "hidden md:table-cell",
    },
    { label: "Created", value: "createdAt" },
  ];

  if (!issues) notFound();

  return (
    <div className="space-y-5 max-w-7xl w-[100%] ">
      <Flex justify={"between"}>
        <IssueStatusFilter />
        <Button>
          <NextLink href={"/issues/addnewissue"}>Create Issue</NextLink>
        </Button>
      </Flex>
      <div>
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              {tableColTitles.map((column) => (
                <Table.ColumnHeaderCell
                  key={column.value}
                  className={column.className}
                >
                  <NextLink
                    href={{
                      pathname: "issues",
                      query: {
                        status: status,
                        orderBy: column.value,
                      },
                    }}
                  >
                    {column.label}
                    {column.value === orderBy && <FaSort className="inline" />}
                  </NextLink>
                </Table.ColumnHeaderCell>
              ))}
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {issues.length === 0 && (
              <Table.Row>
                <Table.Cell justify={"center"} colSpan={3}>
                  {" "}
                  <Text color="gray" weight="medium" align="center">
                    {statusFilter
                      ? `No issues found with status "${statusFilter}"`
                      : "Issue list is empty"}
                  </Text>
                </Table.Cell>
              </Table.Row>
            )}

            {issues.map((issue) => (
              <Table.Row key={issue.id}>
                <Table.RowHeaderCell>
                  <CustomLink href={`/issues/${issue.id}`}>
                    {issue.title}
                  </CustomLink>
                </Table.RowHeaderCell>

                <Table.Cell>
                  <StatusBadge status={issue.status} />
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  {issue.description.substring(0, 30)}....
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

export const dynamic = "force-dynamic";
