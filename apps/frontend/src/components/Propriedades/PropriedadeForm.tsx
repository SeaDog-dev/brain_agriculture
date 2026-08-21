import { type FormEvent, useEffect, useState } from "react";

import { criarPropriedade, atualizarPropriedade } from "../../services/propriedadeService"
import { listarProdutores } from "../../services/produtorService";
import type { Produtor } from "../../types/produtor";
import type { Propriedade } from "../../types/propriedade";

interface PropriedadeFormProps {
    propriedade?: Propriedade;
    onSuccess: () => void;
    onCancel: () => void;
}

export default function PropriedadeForm({
    propriedade,
    onSuccess,
    onCancel,
}: PropriedadeFormProps) {
    const [produtores, setProdutores] = useState<Produtor[]>([]);

    const [produtorId, setProdutorId] = useState(propriedade?.produtorId ?? "");
    const [nome, setNome] = useState(propriedade?.nome ?? "");
    const [cidade, setCidade] = useState(propriedade?.cidade ?? "");
    const [estado, setEstado] = useState(propriedade?.estado ?? "");
    const [areaTotal, setAreaTotal] = useState(propriedade?.areaTotal ?? "");
    const [areaAgricultavel, setAreaAgricultavel] = useState(propriedade?.areaAgricultavel ?? "");
    const [areaVegetacao, setAreaVegetacao] = useState(propriedade?.areaVegetacao ?? "");

    const [loading, setLoading] = useState(false);
    const [loadingProdutores, setLoadingProdutores] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadProdutores() {
            try {
                setLoading(true);

                if (propriedade) {
                    await atualizarPropriedade(propriedade.id, {
                        nome: nome.trim(),
                        cidade: cidade.trim(),
                        estado: estado.trim().toUpperCase(),
                        areaTotal: Number(areaTotal),
                        areaAgricultavel: Number(areaAgricultavel),
                        areaVegetacao: Number(areaVegetacao),
                    });
                } else {
                    await criarPropriedade({
                        produtorId,
                        nome: nome.trim(),
                        cidade: cidade.trim(),
                        estado: estado.trim().toUpperCase(),
                        areaTotal: Number(areaTotal),
                        areaAgricultavel: Number(areaAgricultavel),
                        areaVegetacao: Number(areaVegetacao),
                    });
                }

                onSuccess();
            } catch (error) {
                console.error(error);

                setError(
                    propriedade
                        ? "Não foi possível atualizar a propriedade."
                        : "Não foi possível cadastrar a propriedade."
                );
            } finally {
                setLoading(false);
            }
        }

        loadProdutores();
    }, []);

    async function handleSubmit(
        event: FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        setError("");

        if (
            !produtorId ||
            !nome.trim() ||
            !cidade.trim() ||
            !estado.trim() ||
            !areaTotal ||
            !areaAgricultavel ||
            !areaVegetacao
        ) {
            setError("Preencha todos os campos.");
            return;
        }

        try {
            setLoading(true);

            await criarPropriedade({
                produtorId,
                nome: nome.trim(),
                cidade: cidade.trim(),
                estado: estado.trim().toUpperCase(),
                areaTotal: Number(areaTotal),
                areaAgricultavel: Number(areaAgricultavel),
                areaVegetacao: Number(areaVegetacao),
            });

            onSuccess();
        } catch (error) {
            console.error(error);

            setError(
                "Não foi possível cadastrar a propriedade."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="form-panel">
            <h2>
                {propriedade
                    ? "Editar propriedade"
                    : "Nova propriedade"}
            </h2>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="produtor">
                        Produtor
                    </label>

                    <select
                        id="produtor"
                        value={produtorId}
                        onChange={(event) =>
                            setProdutorId(event.target.value)
                        }
                        disabled={loadingProdutores || !!propriedade}
                    >
                        <option value="">
                            {loadingProdutores
                                ? "Carregando produtores..."
                                : "Selecione um produtor"}
                        </option>

                        {produtores.map((produtor) => (
                            <option
                                key={produtor.id}
                                value={produtor.id}
                            >
                                {produtor.nome}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="nome">
                        Nome da propriedade
                    </label>

                    <input
                        id="nome"
                        type="text"
                        value={nome}
                        onChange={(event) =>
                            setNome(event.target.value)
                        }
                        placeholder="Ex.: Fazenda São João"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="cidade">
                        Cidade
                    </label>

                    <input
                        id="cidade"
                        type="text"
                        value={cidade}
                        onChange={(event) =>
                            setCidade(event.target.value)
                        }
                        placeholder="Digite a cidade"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="estado">
                        Estado
                    </label>

                    <input
                        id="estado"
                        type="text"
                        maxLength={2}
                        value={estado}
                        onChange={(event) =>
                            setEstado(event.target.value)
                        }
                        placeholder="PR"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="areaTotal">
                        Área total (ha)
                    </label>

                    <input
                        id="areaTotal"
                        type="number"
                        min="0"
                        step="0.01"
                        value={areaTotal}
                        onChange={(event) =>
                            setAreaTotal(event.target.value)
                        }
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="areaAgricultavel">
                        Área agricultável (ha)
                    </label>

                    <input
                        id="areaAgricultavel"
                        type="number"
                        min="0"
                        step="0.01"
                        value={areaAgricultavel}
                        onChange={(event) =>
                            setAreaAgricultavel(
                                event.target.value
                            )
                        }
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="areaVegetacao">
                        Área de vegetação (ha)
                    </label>

                    <input
                        id="areaVegetacao"
                        type="number"
                        min="0"
                        step="0.01"
                        value={areaVegetacao}
                        onChange={(event) =>
                            setAreaVegetacao(
                                event.target.value
                            )
                        }
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
                        disabled={loading || loadingProdutores}
                    >
                        {loading
                            ? "Salvando..."
                            : propriedade
                                ? "Salvar alterações"
                                : "Cadastrar"}
                    </button>
                </div>
            </form>
        </div>
    );
}