import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#4DA3FF", "#22c55e", "#f97316", "#ef4444"];

const AnalyticsChart = ({ leads }: any) => {
  const total = leads.length;
  const contacted = leads.filter((l: any) => l.status === "Contacted").length;
  const installed = leads.filter((l: any) => l.status === "Installed").length;
  const cancelled = leads.filter((l: any) => l.status === "Cancelled").length;

  const data = [
    { name: "New", value: total },
    { name: "Contacted", value: contacted },
    { name: "Installed", value: installed },
    { name: "Cancelled", value: cancelled },
  ];

  return (
    <div style={{ width: "100%", height: 300, marginTop: 20 }}>
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#4DA3FF" />
        </BarChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie data={data} dataKey="value" outerRadius={80}>
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AnalyticsChart;