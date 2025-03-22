import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useState } from "react";

const SelectStatus = ({ status }: { status?: Status }) => {
  const [selectedStatus, setSelectedStatus] = useState(status);
  const color =
    selectedStatus === "CLOSED"
      ? "crimson"
      : selectedStatus === "IN_PROGRESS"
      ? "orange"
      : "green";

  return (
    <>
      <Select.Root
        onValueChange={(value) => setSelectedStatus(value as Status)}
        defaultValue={status}
      >
        <Select.Trigger color={color} variant="soft" />
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
      {/* Hidden input to submit form data */}
      <input className="hidden" name="status" value={selectedStatus} />
    </>
  );
};

export default SelectStatus;
