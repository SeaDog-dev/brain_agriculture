export interface PropriedadeResumo {
    id: string;
    nome: string;
    cidade: string;
    estado: string;
}

export interface SafraResumo {
    id: string;
    ano: number;
    propriedade: PropriedadeResumo;
}

export interface Cultura {
    id: string;
    safraId: string;
    nome: string;
    safra: SafraResumo;
}