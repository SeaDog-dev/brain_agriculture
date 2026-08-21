import { useEffect, useState } from "react";

import ProdutorTable from "../components/Produtores/ProdutorTable";
import ProdutorForm from "../components/Produtores/ProdutorForm";
import { listarProdutores } from "../services/produtorService";
import type { Produtor } from "../types/produtor";

export default function Produtores() {
    const [produtores, setProdutores] = useState<Produtor[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [produtorEditando, setProdutorEditando] = useState<Produtor | null>(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        async function loadProdutores() {
            try {
                const response = await listarProdutores();

                setProdutores(response);
            } catch (error) {
                console.error(error);

                setError(true);
            } finally {
                setLoading(false);
            }
        }

        loadProdutores();
    }, []);

    if (loading) {
        return (
            <main className="page">
                <h1>Produtores</h1>
                <p>Carregando produtores...</p>
            </main>
        );
    }

    if (error) {
        return (
            <main className="page">
                <h1>Produtores</h1>
                <p>Não foi possível carregar os produtores.</p>
            </main>
        );
    }

    return (
        <main className="page">
            <header className="page-header">
                <div>
                    <h1>Produtores</h1>
                    <p>Gerencie os produtores cadastrados.</p>
                </div>

                <button
                    type="button"
                    onClick={() => {
                        setProdutorEditando(null);
                        setShowForm(true);
                    }}
                >
                    Novo produtor
                </button>
            </header>

            {showForm && (
                <ProdutorForm
                    onCancel={() => setShowForm(false)}
                    onSuccess={async () => {
                        const response = await listarProdutores();

                        setProdutores(response);
                        setShowForm(false);
                    }}
                />
            )}

            {produtorEditando && (
                <ProdutorForm
                    produtor={produtorEditando}
                    onCancel={() => setProdutorEditando(null)}
                    onSuccess={async () => {
                        const response = await listarProdutores();

                        setProdutores(response);

                        setProdutorEditando(null);
                    }}
                />
            )}

            {produtores.length === 0 ? (
                <div className="empty-state">
                    <p>Nenhum produtor cadastrado.</p>
                </div>
            ) : (
                <ProdutorTable
                    produtores={produtores}
                    onEdit={(produtor) => {
                        setProdutorEditando(produtor);
                        setShowForm(false)
                    }}
                />
            )}
        </main>
    );
}