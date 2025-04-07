"use client";
import { Select } from "@radix-ui/themes";

const AssigneeSelect = () => {
  return (
    <Select.Root size='3' defaultValue="1">
      <Select.Trigger  />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggetions</Select.Label>
          <Select.Item className="hidden" value="1">Navas</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
