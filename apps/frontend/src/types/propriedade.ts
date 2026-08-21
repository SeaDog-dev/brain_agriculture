export interface ProdutorResumo {
    id: string;
    nome: string;
    documento: string;
}

export interface Propriedade {
    id: string;
    produtorId: string;
    nome: string;
    cidade: string;
    estado: string;
    areaTotal: string | number;
    areaAgricultavel: string | number;
    areaVegetacao: string | number;
    produtor: ProdutorResumo;
}