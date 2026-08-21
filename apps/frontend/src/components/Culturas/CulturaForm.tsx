import { type FormEvent, useEffect, useState } from "react";

import {
    atualizarCultura,
    criarCultura,
} from "../../services/cultura.service";

import { listarSafras } from "../../services/safra.service";

import type { Safra } from "../../types/safra";
import type { Cultura } from "../../types/cultura";

interface CulturaFormProps {
    cultura?: Cultura;
    onSuccess: () => void;
    onCancel: () => void;
}

export default function CulturaForm({
    cultura,
    onSuccess,
    onCancel,
}: CulturaFormProps) {

    const [safras, setSafras] = useState<Safra[]>([]);

    const [safraId, setSafraId] = useState(
        cultura?.safraId ?? ""
    );

    const [nome, setNome] = useState(
        cultura?.nome ?? ""
    );

    const [loading, setLoading] = useState(false);
    const [loadingSafras, setLoadingSafras] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        async function loadSafras() {

            try {

                const response = await listarSafras();

                setSafras(response);

            } catch (error) {

                console.error(error);

                setError(
                    "Não foi possível carregar as safras."
                );

            } finally {

                setLoadingSafras(false);

            }
        }

        loadSafras();

    }, []);

    async function handleSubmit(
        event: FormEvent<HTMLFormElement>
    ) {

        event.preventDefault();

        setError("");

        if (!safraId || !nome.trim()) {

            setError("Preencha todos os campos.");

            return;
        }

        try {

            setLoading(true);

            if (cultura) {

                await atualizarCultura(
                    cultura.id,
                    {
                        safraId,
                        nome: nome.trim(),
                    }
                );

            } else {

                await criarCultura({
                    safraId,
                    nome: nome.trim(),
                });

            }

            onSuccess();

        } catch (error) {

            console.error(error);

            setError(
                cultura
                    ? "Não foi possível atualizar a cultura."
                    : "Não foi possível cadastrar a cultura."
            );

        } finally {

            setLoading(false);

        }
    }

    return (
        <div className="form-panel">

            <h2>
                {cultura
                    ? "Editar cultura"
                    : "Nova cultura"}
            </h2>

            <form onSubmit={handleSubmit}>

                <div className="form-group">

                    <label htmlFor="safra">
                        Safra
                    </label>

                    <select
                        id="safra"
                        value={safraId}
                        onChange={(event) =>
                            setSafraId(
                                event.target.value
                            )
                        }
                        disabled={loadingSafras}
                    >

                        <option value="">
                            {loadingSafras
                                ? "Carregando safras..."
                                : "Selecione uma safra"}
                        </option>

                        {safras.map((safra) => (

                            <option
                                key={safra.id}
                                value={safra.id}
                            >
                                {safra.propriedade?.nome} -{" "}
                                {safra.ano}
                            </option>

                        ))}

                    </select>

                </div>

                <div className="form-group">

                    <label htmlFor="nome">
                        Cultura
                    </label>

                    <input
                        id="nome"
                        type="text"
                        value={nome}
                        onChange={(event) =>
                            setNome(
                                event.target.value
                            )
                        }
                        placeholder="Ex.: Soja"
                    />

                </div>

                {error && (
                    <p className="form-error">
                        {error}
                    </p>
                )}

                <div className="form-actions">

                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={loading}
                    >
                        Cancelar
                    </button>

                    <button
                        type="submit"
                        disabled={
                            loading ||
                            loadingSafras
                        }
                    >
                        {loading
                            ? "Salvando..."
                            : cultura
                                ? "Salvar alterações"
                                : "Cadastrar"}
                    </button>

                </div>

            </form>

        </div>
    );
}