import { api } from "./api";

import type { Safra } from "../types/safra";

interface CriarSafra {
    propriedadeId: string;
    ano: number;
}

export async function listarSafras(): Promise<Safra[]> {
    const response = await api.get<Safra[]>("/safras");

    return response.data;
}

export async function criarSafra(
    data: CriarSafra
): Promise<Safra> {
    const response = await api.post<Safra>(
        "/safras",
        data
    );

    return response.data;
}