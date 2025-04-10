"use client";
import useUsers from "@/app/hooks/useUsers";
import { Issue } from "@prisma/client";
import { Select, Spinner } from "@radix-ui/themes";
import axios from "axios";

const AssigneeSelect = ({issue}:{issue:Issue}) => {
  const { data: users, error, isLoading } = useUsers();

  if (error) return null;

  const handleChange = async (userId: string) => {
    const assignToUserId = userId === 'unassigned' ? null : userId
    await axios.patch('/api/issue',{id:issue.id, assignToUserId})
  };

  return (
    <Select.Root size="3" defaultValue={issue.assignToUserId ?? undefined }  onValueChange={handleChange}>
      <Select.Trigger placeholder="Assign" />
    
      <Select.Content>
        <Select.Group >
          <Select.Label>Suggetions</Select.Label>
         <Select.Item value='unassigned'>Unassigned</Select.Item>
          {users?.map((user) => (
            <Select.Item  key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
     
      </Select.Content>
      
    </Select.Root>
  );
};

export default AssigneeSelect;
