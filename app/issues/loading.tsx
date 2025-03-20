import { Button, Skeleton, Table } from "@radix-ui/themes";

const LoadingIssuesPage = () => {
  const skeletonRows = [1, 2, 3, 4];
  return (
    <div className="space-y-5 max-w-7xl w-[100%] ">
        <div ><Button  color="gray" variant="soft"><Skeleton  className="w-10" /></Button></div>
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
          {skeletonRows.map((skel) => (
            <Table.Row key={skel}>
              <Table.RowHeaderCell>
                <Skeleton />
              </Table.RowHeaderCell>
              <Table.Cell>
                <Skeleton />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <Skeleton />
              </Table.Cell>
              <Table.Cell>
                <Skeleton />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
    </div>
  );
};

export default LoadingIssuesPage;
