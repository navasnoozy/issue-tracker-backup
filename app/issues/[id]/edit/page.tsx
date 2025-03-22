import { Issue } from "@prisma/client";
import { PropsType } from "../page";
import { Box } from "@radix-ui/themes";
import { prisma } from "@/prisma/client";


const issueEditPage = async ({params}:PropsType)=>{

    const { id } = await params

    const issue = await prisma.issue.findUnique({
        where: {
            id: id
        }
    })

    return (
        <Box>{issue?.title}</Box>

    )
};
export default issueEditPage;