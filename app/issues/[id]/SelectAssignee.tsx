"use client";
import useUsers from "@/app/hooks/useUsers";
import { Select, Spinner } from "@radix-ui/themes";

const AssigneeSelect = () => {
  const { data : users, error, isLoading } = useUsers();

  if (error) return null

  return (
    <Select.Root size="3">
      <Select.Trigger placeholder='Assignee'>
        {isLoading && <Spinner />}
      </Select.Trigger>
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggetions</Select.Label>
          {users?.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
