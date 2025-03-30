import { Button, Card } from "@radix-ui/themes";
import Link from "next/link";
import { HiOutlinePencilSquare as Pencil } from "react-icons/hi2";

const EditButton = async ({ id }: { id: string }) => {
  return (
    <Button size="3">
      <Link className="flex gap-2 items-center" href={`/issues/${id}/edit`}>
        <Pencil />
        Edit Issue
      </Link>
    </Button>
  );
};
export default EditButton;
