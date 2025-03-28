import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useState } from "react";

const SelectStatus = ({ status}: { status?: Status}) => {
  const [selectedStatus, setSelectedStatus] = useState(status);
  console.log(selectedStatus);
  

  const color =
    selectedStatus === "CLOSED"
      ? "crimson"
      : selectedStatus === "IN_PROGRESS"
      ? "orange"
      : "green";

      const handleChange = (value :Status)=>{
        setSelectedStatus(value);
      }

  return (
    <>
      <Select.Root
        onValueChange={handleChange}
        defaultValue={status}
        
      >
        <Select.Trigger  color={color} variant="soft"  />
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
    </>
  );
};

export default SelectStatus;
