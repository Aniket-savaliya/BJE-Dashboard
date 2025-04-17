import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Project A', value: 400 },
  { name: 'Project B', value: 300 },
  { name: 'Project C', value: 200 },
  { name: 'Project D', value: 278 },
  { name: 'Project E', value: 189 },
];

export default function BarChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsBarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#82ca9d" />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
} 