import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

interface PropriedadeProEstadoChartProps {
    data: {
        estado: string;
        quantidade: number;
    }[];
}

export default function PropriedadeProEstadoChart({
    data,
}: PropriedadeProEstadoChartProps) {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="estado" />

                <YAxis allowDecimals={false} />

                <Tooltip />

                <Bar
                    dataKey="quantidade"
                    name="Propriedades"
                />
            </BarChart>
        </ResponsiveContainer>
    );
}