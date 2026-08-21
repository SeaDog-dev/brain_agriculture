import { type FormEvent, useEffect, useState } from "react";

import { criarSafra } from "../../services/safra.service";
import { listarPropriedades } from "../../services/propriedadeService";

import type { Propriedade } from "../../types/propriedade";

interface SafraFormProps {
    onSuccess: () => void;
    onCancel: () => void;
}

export default function SafraForm({
    onSuccess,
    onCancel,
}: SafraFormProps) {
    const [propriedades, setPropriedades] = useState<
        Propriedade[]
    >([]);

    const [propriedadeId, setPropriedadeId] = useState("");
    const [ano, setAno] = useState("");

    const [loading, setLoading] = useState(false);
    const [loadingPropriedades, setLoadingPropriedades] =
        useState(true);

    const [error, setError] = useState("");

    useEffect(() => {
        async function carregarPropriedades() {
            try {
                const response =
                    await listarPropriedades();

                setPropriedades(response);
            } catch (error) {
                console.error(error);

                setError(
                    "Não foi possível carregar as propriedades."
                );
            } finally {
                setLoadingPropriedades(false);
            }
        }

        carregarPropriedades();
    }, []);

    async function handleSubmit(
        event: FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        setError("");

        if (!propriedadeId || !ano) {
            setError("Preencha todos os campos.");
            return;
        }

        try {
            setLoading(true);

            await criarSafra({
                propriedadeId,
                ano: Number(ano),
            });

            onSuccess();
        } catch (error) {
            console.error(error);

            setError(
                "Não foi possível cadastrar a safra."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="form-panel">
            <h2>Nova safra</h2>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="propriedade">
                        Propriedade
                    </label>

                    <select
                        id="propriedade"
                        value={propriedadeId}
                        onChange={(event) =>
                            setPropriedadeId(
                                event.target.value
                            )
                        }
                        disabled={loadingPropriedades}
                    >
                        <option value="">
                            {loadingPropriedades
                                ? "Carregando..."
                                : "Selecione uma propriedade"}
                        </option>

                        {propriedades.map((propriedade) => (
                            <option
                                key={propriedade.id}
                                value={propriedade.id}
                            >
                                {propriedade.nome}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="ano">
                        Ano
                    </label>

                    <input
                        id="ano"
                        type="number"
                        min="2000"
                        max="2100"
                        value={ano}
                        onChange={(event) =>
                            setAno(event.target.value)
                        }
                        placeholder="2026"
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
                            loadingPropriedades
                        }
                    >
                        {loading
                            ? "Cadastrando..."
                            : "Cadastrar"}
                    </button>
                </div>
            </form>
        </div>
    );
}