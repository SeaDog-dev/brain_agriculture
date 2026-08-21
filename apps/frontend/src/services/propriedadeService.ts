import { api } from "./api";

import type { Propriedade } from "../types/propriedade";

interface CriarPropriedade {
    produtorId: string;
    nome: string;
    cidade: string;
    estado: string;
    areaTotal: number;
    areaAgricultavel: number;
    areaVegetacao: number;
}

interface AtualizarPropriedade {
    nome?: string;
    cidade?: string;
    estado?: string;
    areaTotal?: number;
    areaAgricultavel?: number;
    areaVegetacao?: number;
}

export async function listarPropriedades(): Promise<Propriedade[]> {
    const response = await api.get<Propriedade[]>("/propriedades");

    return response.data;
}

export async function criarPropriedade(
    data: CriarPropriedade
): Promise<Propriedade> {
    const response = await api.post<Propriedade>(
        "/propriedades",
        data
    );

    return response.data;
}

export async function atualizarPropriedade(
    id: string,
    data: AtualizarPropriedade
): Promise<Propriedade> {
    const response = await api.put<Propriedade>(
        `/propriedades/${id}`,
        data
    );

    return response.data;
}

export async function excluirPropriedade(
    id: string
): Promise<void> {
    await api.delete(`/propriedades/${id}`);
}