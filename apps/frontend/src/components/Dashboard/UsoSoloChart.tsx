import {
    Cell,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
} from "recharts";

interface UsoSoloChartProps {
    agricultavel: number;
    vegetacao: number;
}

export default function UsoSoloChart({
    agricultavel,
    vegetacao,
}: UsoSoloChartProps) {
    const data = [
        {
            name: "Agricultável",
            value: agricultavel,
        },
        {
            name: "Vegetação",
            value: vegetacao,
        },
    ];

    return (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                >
                    {data.map((_, index) => (
                        <Cell key={index} />
                    ))}
                </Pie>

                <Tooltip />
            </PieChart>
        </ResponsiveContainer>
    );
}