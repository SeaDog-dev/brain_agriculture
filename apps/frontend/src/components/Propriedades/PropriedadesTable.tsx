import type { Propriedade } from "../../types/propriedade";

interface PropriedadeTableProps {
    propriedades: Propriedade[];
    onEdit: (propriedade: Propriedade) => void;
    onDelete: (propriedade: Propriedade) => void;
}

export default function PropriedadeTable({
    propriedades,
    onEdit,
    onDelete
}: PropriedadeTableProps) {
    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Propriedade</th>
                        <th>Produtor</th>
                        <th>Localização</th>
                        <th>Área total</th>
                        <th>Área agricultável</th>
                        <th>Ações</th>
                    </tr>
                </thead>

                <tbody>
                    {propriedades.map((propriedade) => (
                        <tr key={propriedade.id}>
                            <td>{propriedade.nome}</td>

                            <td>
                                {propriedade.produtor.nome}
                            </td>

                            <td>
                                {propriedade.cidade} -{" "}
                                {propriedade.estado}
                            </td>

                            <td>
                                {propriedade.areaTotal} ha
                            </td>

                            <td>
                                {propriedade.areaAgricultavel} ha
                            </td>

                            <td>
                                <div className="table-actions">
                                    <button
                                        type="button"
                                        onClick={() => onEdit(propriedade)}
                                    >
                                        Editar
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => onDelete(propriedade)}
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