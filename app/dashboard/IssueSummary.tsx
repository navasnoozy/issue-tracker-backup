import { Status } from "@prisma/client";
import { Card, Flex, Grid, Text } from "@radix-ui/themes";
import { AlertCircle, CheckCircle, Clock } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

interface Props {
  statusCount: {
    open: number;
    inProgress: number;
    closed: number;
  };
}

const IssueSummary = async ({
  statusCount: { open, inProgress, closed },
}: Props) => {
  const summaryCards: {
    label: string;
    count: number;
    status: Status;
    className: string;
    icon: ReactNode
  }[] = [
    {
      label: "Open",
      count: open,
      status: "OPEN",
      className: "",
      icon: <AlertCircle style={{ color: 'var(--status-open)' }} size={18} />,
    },
    {
      label: "In Progress",
      count: inProgress,
      status: "IN_PROGRESS",
      className: "",
      icon: <Clock style={{ color: 'var(--status-in-progress)' }} size={18} />
    },
    {
      label: "Closed",
      count: closed,
      status: "CLOSED",
      className: "",
      icon: <CheckCircle style={{ color: 'var(--status-closed)' }} size={18} />
    },
  ];

  const getCardBackground = (status: Status) => {
    const backgrounds = {
      OPEN: 'var(--status-open-container)',
      IN_PROGRESS: 'var(--status-in-progress-container)',
      CLOSED: 'var(--status-closed-container)'
    };
    return backgrounds[status];
  };

  return (
    <Grid columns={{sm:'3'}} gap="2" justify={"between"}>
      {summaryCards.map((card) => (
        <Link key={card.status} href={`/issues?status=${card.status}`}>
          <Card 
            style={{ 
              backgroundColor: getCardBackground(card.status),
              borderColor: 'var(--md-sys-color-outline-variant)' 
            }}
          >
            <Flex gap="2" align={"center"} wrap='nowrap'>
                <Text> {card.icon}</Text>
              <Text as="div" size="2" weight="bold" wrap='nowrap' >
               {card.label}
              </Text>
              <Text 
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ 
                  backgroundColor: 'var(--md-sys-color-surface)',
                  border: '1px solid var(--md-sys-color-outline-variant)' 
                }}
              >
                {card.count}
              </Text>
            </Flex>
          </Card>
        </Link>
      ))}
    </Grid>
  );
};

export default IssueSummary;