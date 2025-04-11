import { Button, Flex } from "@radix-ui/themes";
import { FaArrowLeft, FaChevronLeft } from "react-icons/fa";
import { HiArrowLeft, HiMiniArrowLeft } from "react-icons/hi2";
import { MdArrowLeft } from "react-icons/md";
import {
  RxArrowLeft,
  RxDoubleArrowLeft,
  RxDoubleArrowRight,
} from "react-icons/rx";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const pageCount = Math.ceil(itemCount / pageSize);

  return (
    <Flex
      align={"center"}
      gap='2'
      className="items-center justify-between  p-2 rounded-lg"
    >
      <Button disabled={currentPage===1}  color="gray" variant="soft">
        <ChevronsLeft size={24} />
      </Button>
      <Button disabled={currentPage===1} color="gray" variant="soft">
        <ChevronLeft size={24} />
      </Button>
      {currentPage} of {pageCount}
      <Button disabled={currentPage===pageCount}  color="gray" variant="soft">
        <ChevronRight size={24} />
      </Button>
      <Button disabled={currentPage===pageCount}  color="gray" variant="soft">
        <ChevronsRight size={24} />
      </Button>
    </Flex>
  );
};

export default Pagination;
