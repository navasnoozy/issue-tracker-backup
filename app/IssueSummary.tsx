import { prisma } from "@/prisma/client";
import { Status } from "@prisma/client";
import { Card, Flex, Text, Avatar } from "@radix-ui/themes";
import Link from "next/link";

const IssueSummary = async () => {
  const open = await prisma.issue.count({ where: { status: "OPEN" } });
  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const closed = await prisma.issue.count({ where: { status: "CLOSED" } });

  const summaryCards: {
    label: string;
    count: number;
    status: Status;
    className: string
  }[] = [
    { label: "Open", count: open, status: "OPEN" , className: "bg-red-200" },
    { label: "In Progress", count: inProgress, status: "IN_PROGRESS" ,className: "bg-yellow-200"},
    { label: "Closed", count: closed, status: "CLOSED",className: "bg-green-200" },
  ];

  return (
    <Flex gap="2">
      {summaryCards.map((card) => (
        <Link key={card.status} href={`/issues?status=${card.status}`}>
        <Card   className={card.className}>
          <Flex gap='2' align={"center"} >
            <Text as="div" size="2" weight="bold">
             {card.label}
            </Text>
            <Text className="w-8 h-8 border border-gray-400 rounded-full flex items-center justify-center">{card.count}</Text>
          </Flex>
        </Card>
        </Link>
      ))}
    </Flex>
  );
};

export default IssueSummary;
