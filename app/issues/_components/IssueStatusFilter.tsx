'use client'

import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

const IssueStatusFilter = () => {
   const router = useRouter()

  const status: { label: string; value?: Status }[] = [
    { label: "All" },
    { label: "Open", value: "OPEN" },
    { label: "In Progress", value: "IN_PROGRESS" },
    { label: "Closed", value: "CLOSED" },
  ];

  const handleChange = (status: string)=>{
       const query = status && `?status=${status}`;
       router.push("/issues"+query)
  }

  return (
    <Select.Root defaultValue="ALL" onValueChange={handleChange}>
      <Select.Trigger placeholder="Filter by Status" />
      <Select.Content>
        {status.map((status) => (
          <Select.Item key={status.label} value={status.value || "ALL"}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
