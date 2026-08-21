import { useEffect, useState } from "react";

import StatCard from "../components/Dashboard/StatCard";
import { getDashboardData } from "../services/dashboardService";
import type { DashboardData } from "../types/dashbaord";
import UsoSoloChart from "../components/Dashboard/UsoSoloChart";
import PropriedadeProEstadoChart from "../components/Dashboard/PropriedadeProEstadoChart";
import CulturasChart from "../components/Dashboard/CulturasChart";

export default function Dashboard() {
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function loadDashboard() {
            try {
                const response = await getDashboardData();

                setData(response);
            } catch (error) {
                console.error(error);

                setError(true);
            } finally {
                setLoading(false);
            }
        }

        loadDashboard();
    }, []);

    if (loading) {
        return <main className="dashboard">Carregando...</main>;
    }

    if (error || !data) {
        return (
            <main className="dashboard">
                <h1>Erro ao carregar o dashboard</h1>
                <p>Não foi possível carregar os dados.</p>
            </main>
        );
    }

    return (
        <main className="dashboard">
            <header className="dashboard-header">
                <div>
                    <h1>Dashboard</h1>
                    <p>Visão geral da sua produção agrícola</p>
                </div>
            </header>

            <section className="dashboard-stats">
                <StatCard
                    title="Produtores"
                    value={data.produtores}
                />

                <StatCard
                    title="Propriedades"
                    value={data.propriedades}
                />

                <StatCard
                    title="Área total"
                    value={`${data.hectares} ha`}
                />

                <StatCard
                    title="Área agricultável"
                    value={`${data.usoSolo.agricultavel} ha`}
                />
            </section>

            <section className="dashboard-content">
                <div className="dashboard-panel">
                    <h2>Uso do Solo</h2>

                    <UsoSoloChart
                        agricultavel={data.usoSolo.agricultavel}
                        vegetacao={data.usoSolo.vegetacao}
                    />
                </div>

                <div className="dashboard-panel">
                    <h2>Propriedades por estado</h2>

                    <PropriedadeProEstadoChart
                        data={data.porEstado}
                    />
                </div>

                <div className="dashboard-panel">
                    <h2>Culturas</h2>

                    <CulturasChart
                        data={data.porCultura}
                    />
                </div>
            </section>
        </main>
    );
}