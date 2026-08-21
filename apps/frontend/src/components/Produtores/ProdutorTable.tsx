import type { Produtor } from "../../types/produtor";

interface ProdutorTableProps {
    produtores: Produtor[];
    onEdit:(produtor: Produtor) => void;
}

export default function ProdutorTable({
    produtores,
    onEdit
}: ProdutorTableProps) {
    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Documento</th>
                        <th>Ações</th>
                    </tr>
                </thead>

                <tbody>
                    {produtores.map((produtor) => (
                        <tr key={produtor.id}>
                            <td>{produtor.nome}</td>
                            <td>{produtor.documento}</td>
                            <td>
                                <button 
                                    type="button"
                                    onClick={() => onEdit(produtor)}
                                >
                                    Editar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}