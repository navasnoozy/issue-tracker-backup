import { Box, Button, Card } from "@radix-ui/themes";
import Link from "next/link";
import { HiOutlinePencilSquare as Pencil } from "react-icons/hi2";


const EditButton = async ({id}:{id:string})=>{
  
    return (
        <Card className="w-full lg:max-w-3xl  space-y-4">
            <Button><Pencil /><Link href={`/issues/${id}/edit`}>Edit</Link></Button>
        </Card>
    )
};
export default EditButton;