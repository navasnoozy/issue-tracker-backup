import { Box, Skeleton } from "@radix-ui/themes"

const LoadingCreateIssue = ()=>{
    return (
        <Box width='100%'>
         <Skeleton height='10vh' />
        </Box>
    )
};

export default LoadingCreateIssue;