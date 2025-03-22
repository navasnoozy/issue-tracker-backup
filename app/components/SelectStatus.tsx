import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";

const SelectStatus = ({ status }: { status?: Status }) => {
  return (
    <Select.Root  defaultValue={status} >
      <Select.Trigger />
      <Select.Content>
        <Select.Group>
          <Select.Label>Status</Select.Label>
          {Object.values(Status).map((statusValue) => (
            <Select.Item key={statusValue} value={statusValue}>
              {statusValue.replace("_", " ")} 
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default SelectStatus;
