export interface PropriedadeResumo {
    id: string;
    nome: string;
}

export interface Safra {
    id: string;
    propriedadeId: string;
    ano: number;
    propriedade?: PropriedadeResumo;
}