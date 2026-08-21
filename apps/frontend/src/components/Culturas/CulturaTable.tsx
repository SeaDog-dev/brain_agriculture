import type { Cultura } from "../../types/cultura";

interface CulturaTableProps {
    culturas: Cultura[];
    onEdit: (cultura: Cultura) => void;
    onDelete: (cultura: Cultura) => void;
}

export default function CulturaTable({
    culturas,
    onEdit,
    onDelete,
}: CulturaTableProps) {
    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Cultura</th>
                        <th>Safra</th>
                        <th>Propriedade</th>
                        <th>Localização</th>
                        <th>Ações</th>
                    </tr>
                </thead>

                <tbody>
                    {culturas.map((cultura) => (
                        <tr key={cultura.id}>
                            <td>{cultura.nome}</td>

                            <td>
                                {cultura.safra.ano}
                            </td>

                            <td>
                                {cultura.safra.propriedade.nome}
                            </td>

                            <td>
                                {cultura.safra.propriedade.cidade} -{" "}
                                {cultura.safra.propriedade.estado}
                            </td>

                            <td>
                                <div className="table-actions">
                                    <button
                                        type="button"
                                        onClick={() => onEdit(cultura)}
                                    >
                                        Editar
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => onDelete(cultura)}
                                    >
                                        Excluir
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}