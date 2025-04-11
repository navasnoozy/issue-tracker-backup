import { Button, Flex, Table, Text } from "@radix-ui/themes";
import CustomLink from "../components/CustomLink";
import NextLink from "next/link";
import { prisma } from "@/prisma/client";
import StatusBadge from "../components/issueStatusBadge";
import { notFound } from "next/navigation";
import IssueStatusFilter from "./_components/IssueStatusFilter";
import { Issue, Status } from "@prisma/client";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";

interface Props {
  searchParams: Promise<{
    status: Status;
    sort: keyof Issue;
    direction: "asc" | "desc";
  }>;
}

//Issue Table List Page
const IssuesPage = async ({ searchParams }: Props) => {
  let { status, sort, direction = "asc" } = await searchParams;

  //Filter by Status
  let statusFilter = Object.values(Status).includes(status)
    ? status
    : undefined;

  //Sorting
  const validDirections = ["asc", "desc"];
  const order = validDirections.includes(direction) ? direction : undefined;
  let orderBy = sort ? { [sort]: order } : undefined;
  let issues = await prisma.issue.findMany({
    where: {
      status: statusFilter,
    },
    orderBy,
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
                        sort: column.value,
                        direction:
                          column.value && direction === "asc" ? "desc" : "asc",
                      },
                    }}
                  >
                    {column.label}
                    {column.value !== sort && <FaSort className="inline" />}
                    {column.value === sort &&
                      (order === "asc" ? (
                        <FaSortUp className="inline" />
                      ) : (
                        <FaSortDown className="inline" />
                      ))}
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
