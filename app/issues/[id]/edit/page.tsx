import { prisma } from "@/prisma/client";
import IssueForm from "../../_components/IssueForm";
import { PropsType } from "../page";
import { notFound } from "next/navigation";


const IssueEditPage = async ({params}:PropsType)=>{

    const { id } = await params

    const issue = await prisma.issue.findUnique({
        where: {
            id: id
        }
    })

    if (!issue) return notFound

    return (
        <IssueForm issue={issue} />

    )
};
export default IssueEditPage;