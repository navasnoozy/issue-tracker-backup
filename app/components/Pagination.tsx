"use client";

import { Button, Flex, Text } from "@radix-ui/themes";
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
  itemsPerPage,
  currentPage,
}: Props) => {
  const searchParams = useSearchParams();
  const route = useRouter();

  const pageCount = Math.ceil(itemCount / itemsPerPage);
  if (pageCount <= 1) return;

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

      <Text style={{ color: 'var(--md-sys-color-on-surface-variant)' }}>
        {searchParams.get("page") || 1} of {pageCount}
      </Text>

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