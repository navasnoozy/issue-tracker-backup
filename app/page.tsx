// app/page.tsx

import { Flex } from "@radix-ui/themes";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";

async function Home() {


  return (
    <Flex direction='column' gap='3' align={"center"}>
    <IssueSummary />
    <LatestIssues />
    </Flex>
  )

}

export default Home;
