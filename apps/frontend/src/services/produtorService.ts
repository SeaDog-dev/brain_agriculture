import { api } from "./api";

import type { Produtor } from "../types/produtor";

interface CriarProdutor {
    nome: string;
    documento: string;
}

interface AtualizarProdutor {
    nome: string;
    documento: string;
}

export async function listarProdutores(): Promise<Produtor[]> {
    const response = await api.get<Produtor[]>("/produtores");

    return response.data;
}

export async function criarProdutor(
    data: CriarProdutor
): Promise<Produtor> {
    const response = await api.post<Produtor>(
        "/produtores",
        data
    );

    return response.data;
}

export async function atualizarProdutor(
    id: string,
    data: AtualizarProdutor
): Promise<Produtor> {
    const response = await api.put<Produtor>(
        `/produtores/${id}`,
        data
    );

    return response.data;
}
