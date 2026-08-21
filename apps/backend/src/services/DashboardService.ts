import { DashboardRepository } from "src/repositories/DashboardRepository";

interface DashboardResults {
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

export class DashboardService {
    constructor(private readonly dashboardRepository: DashboardRepository) { }

    async getData(): Promise<DashboardResults> {
        return this.dashboardRepository.getDados()
    }
}