import { type FormEvent, useState } from "react";
import { criarProdutor, atualizarProdutor } from "../../services/produtorService";
import type { Produtor } from "../../types/produtor";

interface ProdutorFormProps {
    produtor?: Produtor;
    onSuccess: () => void;
    onCancel: () => void;
}

export default function ProdutorForm({
    produtor,
    onSuccess,
    onCancel,
}: ProdutorFormProps) {
    const [nome, setNome] = useState(produtor?.nome ?? "");
    const [documento, setDocumento] = useState(produtor?.documento ?? "");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setError("");

        if (!nome.trim() || !documento.trim()) {
            setError("Preencha todos os campos.");
            return;
        }

        try {
            setLoading(true);

            if (produtor) {
                await atualizarProdutor(produtor.id, {
                    nome: nome.trim(),
                    documento: documento.trim(),
                });
            } else {
                await criarProdutor({
                    nome: nome.trim(),
                    documento: documento.trim(),
                });
            }

            onSuccess();
        } catch (error) {
            console.error(error);

            setError(
                produtor
                    ? "Não foi possível atualizar o produtor."
                    : "Não foi possível cadastrar o produtor."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="form-panel">
            <h2>
                {produtor ? "Editar produtor" : "Novo produtor"}
            </h2>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="nome">
                        Nome
                    </label>

                    <input
                        id="nome"
                        type="text"
                        value={nome}
                        onChange={(event) =>
                            setNome(event.target.value)
                        }
                        placeholder="Digite o nome"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="documento">
                        CPF / CNPJ
                    </label>

                    <input
                        id="documento"
                        type="text"
                        value={documento}
                        onChange={(event) =>
                            setDocumento(event.target.value)
                        }
                        placeholder="Digite o CPF ou CNPJ"
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
                        disabled={loading}
                    >
                        {loading
                            ? "Salvando..."
                            : produtor
                                ? "Salvar alterações"
                                : "Cadastrar"}
                    </button>
                </div>
            </form>
        </div>
    );
}