import { Button, Card } from "@radix-ui/themes";
import Link from "next/link";
import { HiOutlinePencilSquare as Pencil } from "react-icons/hi2";


const EditButton = async ({id}:{id:string})=>{
  
    return (
        <Card className="w-full lg:max-w-3xl  space-y-4">
            <Button size='3' ><Link className="flex gap-2 items-center" href={`/issues/${id}/edit`}><Pencil />Edit Issue</Link></Button>
        </Card>
    )
};
export default EditButton;