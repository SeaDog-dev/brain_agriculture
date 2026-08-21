import { useEffect, useState } from "react";

import PropriedadeTable from "../components/Propriedades/PropriedadesTable";
import { listarPropriedades, excluirPropriedade } from "../services/propriedadeService";
import type { Propriedade } from "../types/propriedade";
import PropriedadeForm from "../components/Propriedades/PropriedadeForm";
import ConfirmDialog from "../components/ConfirmDialog";

export default function Propriedades() {
    const [propriedades, setPropriedades] = useState<Propriedade[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [propriedadeEditando, setPropriedadeEditando] = useState<Propriedade | null>(null);
    const [propriedadeExcluindo, setPropriedadeExcluindo] = useState<Propriedade | null>(null);

    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        async function loadPropriedades() {
            try {
                const response = await listarPropriedades();

                setPropriedades(response);
            } catch (error) {
                console.error(error);

                setError(true);
            } finally {
                setLoading(false);
            }
        }

        loadPropriedades();
    }, []);

    if (loading) {
        return (
            <main className="page">
                <h1>Propriedades</h1>
                <p>Carregando propriedades...</p>
            </main>
        );
    }

    if (error) {
        return (
            <main className="page">
                <h1>Propriedades</h1>
                <p>
                    Não foi possível carregar as propriedades.
                </p>
            </main>
        );
    }

    return (
        <main className="page">
            <header className="page-header">
                <div>
                    <h1>Propriedades</h1>

                    <p>
                        Gerencie as propriedades cadastradas.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => {
                        setPropriedadeEditando(null);
                        setShowForm(true);
                    }}
                >
                    Nova propriedade
                </button>
            </header>

            {(showForm || propriedadeEditando) && (
                <PropriedadeForm
                    propriedade={
                        propriedadeEditando ?? undefined
                    }
                    onCancel={() => {
                        setShowForm(false);
                        setPropriedadeEditando(null);
                    }}
                    onSuccess={async () => {
                        const response =
                            await listarPropriedades();

                        setPropriedades(response);

                        setShowForm(false);
                        setPropriedadeEditando(null);
                    }}
                />
            )}

            {propriedades.length === 0 ? (
                <div className="empty-state">
                    <p>
                        Nenhuma propriedade cadastrada.
                    </p>
                </div>
            ) : (
                <PropriedadeTable
                    propriedades={propriedades}
                    onEdit={(propriedade) => {
                        setPropriedadeEditando(propriedade);
                        setShowForm(false);
                    }}
                    onDelete={(propriedade) => {
                        setPropriedadeExcluindo(propriedade);
                    }}
                />
            )}
            {propriedadeExcluindo && (
                <ConfirmDialog
                    title="Excluir propriedade"
                    message={`Tem certeza que deseja excluir ${propriedadeExcluindo.nome}?`}
                    loading={deleting}
                    onCancel={() => {
                        setPropriedadeExcluindo(null);
                    }}
                    onConfirm={async () => {
                        try {
                            setDeleting(true);

                            await excluirPropriedade(
                                propriedadeExcluindo.id
                            );

                            const response =
                                await listarPropriedades();

                            setPropriedades(response);

                            setPropriedadeExcluindo(null);
                        } catch (error) {
                            console.error(error);
                        } finally {
                            setDeleting(false);
                        }
                    }}
                />
            )}
        </main>
    );
}