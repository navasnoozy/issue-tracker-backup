'use client'
import { Card } from "@radix-ui/themes";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from "recharts";

interface Props {
    statusCount:{
     open: number;
     inProgress: number;
     closed: number;
    }
 }

const IssueChart = ({statusCount:{ open, inProgress, closed }}: Props) => {

    const data = [
        {label:'Open', value:open},
        {label:'In Progress', value:inProgress},
        {label:'Closed', value:closed}
    ]

  return (
    <Card className="w-full h-full" >
      <ResponsiveContainer width={'100%'} height={300}>
        <BarChart data={data}>
            <XAxis dataKey='label' />
            <YAxis />
            <Bar dataKey='value' barSize={20} style={{fill:'var(--accent-9)'}} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IssueChart;
