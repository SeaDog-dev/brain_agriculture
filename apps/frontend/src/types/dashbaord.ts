export interface DashboardData {
    produtores: number;
    propriedades: number;
    hectares: number;

    porEstado: {
        estado: string;
        quantidade: number;
    }[];

    porCultura: {
        cultura: string;
        quantidade: number;
    }[];

    usoSolo: {
        agricultavel: number;
        vegetacao: number;
    };
}