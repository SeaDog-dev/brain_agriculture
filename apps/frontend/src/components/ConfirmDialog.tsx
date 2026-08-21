interface ConfirmDialogProps {
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
    loading?: boolean;
}

export default function ConfirmDialog({
    title,
    message,
    onConfirm,
    onCancel,
    loading = false,
}: ConfirmDialogProps) {
    return (
        <div className="dialog-overlay">
            <div className="dialog">
                <h2>{title}</h2>

                <p>{message}</p>

                <div className="dialog-actions">
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={loading}
                    >
                        Cancelar
                    </button>

                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={loading}
                    >
                        {loading ? "Excluindo..." : "Excluir"}
                    </button>
                </div>
            </div>
        </div>
    );
}