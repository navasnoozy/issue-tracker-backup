import { Box, Skeleton } from "@radix-ui/themes";

const IssueFormSkeleton = ()=>{
    return (
        <Box className="max-w-xl w-[100%] space-y-5  p-6 rounded-md">
        <Skeleton height='30px' />
        <Skeleton height='70vh' />
       </Box>
    )
};

export default IssueFormSkeleton