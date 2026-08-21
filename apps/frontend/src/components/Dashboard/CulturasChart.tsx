import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

interface CulturasChartProps {
    data: {
        cultura: string;
        quantidade: number;
    }[];
}

export default function CulturasChart({
    data,
}: CulturasChartProps) {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="cultura" />

                <YAxis allowDecimals={false} />

                <Tooltip />

                <Bar
                    dataKey="quantidade"
                    name="Culturas"
                />
            </BarChart>
        </ResponsiveContainer>
    );
}