// app/page.tsx

import { Button } from "@radix-ui/themes";
import Pagination from "./components/Pagination";

async function Home() {
  return (
    <div>
      <Button>Dashbaord</Button>
      <Pagination itemCount={10} itemsPerPage={1} currentPage={1} />
    </div>
  );
}

export default Home;
