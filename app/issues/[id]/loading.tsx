import { Box, Card, Flex, Heading, Skeleton, Text } from "@radix-ui/themes";

const LoadingIssuePage = () => {
  return (
    <Card className=" w-[100%]  lg:w-[80%] space-y-4">
      <Flex justify={"between"} width="100%">
        <Box width="50%">
          <Skeleton height="38px" />
        </Box>
        <Box width="20%">
          <Skeleton height="38px" />
        </Box>
      </Flex>

      <Card className="w-full  mt-6 prose prose-sm md:prose-lg lg:prose-2xl  ">
        <Skeleton height="30vh" />
      </Card>
    </Card>
  );
};

export default LoadingIssuePage;
