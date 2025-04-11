"use client";

import { Button, Flex } from "@radix-ui/themes";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  itemCount: number;
  itemsPerPage: number;
  currentPage: number;
}

const Pagination = ({
  itemCount,
  itemsPerPage: pageSize,
  currentPage,
}: Props) => {
  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount <= 1) return;
  const route = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (page: number) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", page.toString());
    const query = "?" + params;
    route.push(query);
  };

  return (
    <Flex
      align={"center"}
      justify={"center"}
      gap="2"
      className=" p-2 rounded-lg"
    >
      {/* First page */}
      <Button
        disabled={currentPage === 1}
        color="gray"
        variant="soft"
        onClick={() => handleChange(1)}
      >
        <ChevronsLeft size={24} />
      </Button>

      {/* Previous page */}
      <Button
        disabled={currentPage === 1}
        color="gray"
        variant="soft"
        onClick={() => handleChange(currentPage-1)}
      >
        <ChevronLeft size={24} />
      </Button>

      {searchParams.get("page") || 1} of {pageCount}

      {/* Next page  */}
      <Button
        disabled={currentPage === pageCount}
        color="gray"
        variant="soft"
        onClick={() => handleChange(currentPage + 1)}
      >
        <ChevronRight size={24} />
      </Button>

      {/* Last page  */}
      <Button
        disabled={currentPage === pageCount}
        color="gray"
        variant="soft"
        onClick={() => handleChange(pageCount)}
      >
        <ChevronsRight size={24} />
      </Button>
    </Flex>
  );
};

export default Pagination;
