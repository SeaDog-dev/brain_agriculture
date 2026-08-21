import { useEffect, useState } from "react";

import CulturaTable from "../components/Culturas/CulturaTable";

import { excluirCultura, listarCulturas } from "../services/cultura.service";

import type { Cultura } from "../types/cultura";

import CulturaForm from "../components/Culturas/CulturaForm";
import SafraForm from "../components/Culturas/SafraForm";

export default function Culturas() {
    const [culturas, setCulturas] = useState<Cultura[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [showSafraForm, setShowSafraForm] = useState(false);
    const [culturaEditando, setCulturaEditando] = useState<Cultura | null>(null);
    const [culturaExcluindo, setCulturaExcluindo] =
        useState<Cultura | null>(null);
    const [deleting, setDeleting] = useState(false);
    const [culturaSelecionada, setCulturaSelecionada] =
        useState<Cultura | null>(null);
    const [formAberto, setFormAberto] = useState(false);

    useEffect(() => {
        async function loadCulturas() {
            try {
                const response = await listarCulturas();

                setCulturas(response);
            } catch (error) {
                console.error(error);

                setError(true);
            } finally {
                setLoading(false);
            }
        }

        loadCulturas();
    }, []);

    if (loading) {
        return (
            <main className="page">
                <h1>Culturas</h1>
                <p>Carregando culturas...</p>
            </main>
        );
    }

    if (error) {
        return (
            <main className="page">
                <h1>Culturas</h1>
                <p>
                    Não foi possível carregar as culturas.
                </p>
            </main>
        );
    }

    return (
        <main className="page">
            <header className="page-header">
                <div>
                    <h1>Culturas</h1>

                    <p>
                        Gerencie as culturas cadastradas.
                    </p>
                </div>

                <div className="page-actions">
                    <button
                        type="button"
                        onClick={() => setShowSafraForm(true)}
                    >
                        Nova safra
                    </button>

                    <button
                        type="button"
                        onClick={() => {
                            setCulturaSelecionada(null);
                            setFormAberto(true);
                        }}
                    >
                        Nova cultura
                    </button>
                </div>
            </header>

            {showSafraForm && (
                <SafraForm
                    onCancel={() => setShowSafraForm(false)}
                    onSuccess={() => {
                        setShowSafraForm(false);
                    }}
                />
            )}

            {formAberto && (
                <CulturaForm
                    cultura={culturaSelecionada ?? undefined}
                    onCancel={() => {
                        setFormAberto(false);
                        setCulturaSelecionada(null);
                    }}
                    onSuccess={async () => {
                        const response = await listarCulturas();

                        setCulturas(response);

                        setFormAberto(false);
                        setCulturaSelecionada(null);
                    }}
                />
            )}

            {culturas.length === 0 ? (
                <div className="empty-state">
                    <p>
                        Nenhuma cultura cadastrada.
                    </p>
                </div>
            ) : (
                <CulturaTable
                    culturas={culturas}
                    onEdit={(cultura) => {
                        setCulturaSelecionada(cultura);
                        setFormAberto(true);
                    }}
                    onDelete={(cultura) => {
                        setCulturaExcluindo(cultura);
                    }}
                />
            )}
            {culturaExcluindo && (
                <div className="form-panel">
                    <h2>Excluir cultura</h2>

                    <p>
                        Tem certeza que deseja excluir a cultura{" "}
                        <strong>
                            {culturaExcluindo.nome}
                        </strong>
                        ?
                    </p>

                    <div className="form-actions">
                        <button
                            type="button"
                            onClick={() =>
                                setCulturaExcluindo(null)
                            }
                            disabled={deleting}
                        >
                            Cancelar
                        </button>

                        <button
                            type="button"
                            disabled={deleting}
                            onClick={async () => {
                                try {
                                    setDeleting(true);

                                    await excluirCultura(
                                        culturaExcluindo.id
                                    );

                                    const response =
                                        await listarCulturas();

                                    setCulturas(response);

                                    setCulturaExcluindo(null);
                                } catch (error) {
                                    console.error(error);
                                } finally {
                                    setDeleting(false);
                                }
                            }}
                        >
                            {deleting
                                ? "Excluindo..."
                                : "Excluir"}
                        </button>
                    </div>
                </div>
            )}
        </main>
    );
}