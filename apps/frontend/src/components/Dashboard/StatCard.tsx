interface StatCardProps {
    title: string;
    value: string | number;
}

export default function StatCard({ title, value }: StatCardProps) {
    return (
        <div className="stat-card">
            <span>{title}</span>
            <strong>{value}</strong>
        </div>
    );
}