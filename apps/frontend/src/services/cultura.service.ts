import { api } from "./api";

import type { Cultura } from "../types/cultura";

interface CriarCultura {
    safraId: string;
    nome: string;
}

interface IAtualizarCultura {
    safraId: string,
    nome: string
}

interface AtualizarCultura {
    safraId: string;
    nome: string;
}

export async function listarCulturas(): Promise<Cultura[]> {
    const response = await api.get<Cultura[]>("/culturas");

    return response.data;
}

export async function criarCultura(
    data: CriarCultura
): Promise<Cultura> {
    const response = await api.post<Cultura>(
        "/culturas",
        data
    );

    return response.data;
}

export async function atualizarCultura(
    id: string,
    data: AtualizarCultura
): Promise<Cultura> {
    const response = await api.put<Cultura>(
        `/culturas/${id}`,
        data
    );

    return response.data;
}

export async function excluirCultura(
    id: string
): Promise<void> {
    await api.delete(`/culturas/${id}`);
}