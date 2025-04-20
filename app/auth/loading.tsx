import {
  Box,
  Button,
  Flex,
  Skeleton
} from "@radix-ui/themes";

const LoadingAuthPage = () => {
  return (
    <Flex
      direction="column"
      gap="3"
      maxWidth="340px"
      className="w-full p-7 border border-gray-200 rounded-lg"
    >
      <Skeleton height="30px" />

      <Box>
        <Skeleton height="60vh" maxHeight='300px' />
      </Box>

      <Button type="submit" className="text-center !mt-3 ">
        <Skeleton />
      </Button>

      <Flex align="center" gap="2">
        <Skeleton />
      </Flex>
    </Flex>
  );
};

export default LoadingAuthPage;
