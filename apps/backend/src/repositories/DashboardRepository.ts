import { PrismaClient } from "generated/prisma/client";

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

export class DashboardRepository {

    constructor(private readonly prisma: PrismaClient) { }

    async getDados(): Promise<DashboardResults> {

        const [
            produtores,
            propriedades,
            hectares,
            porEstado,
            porCultura,
            usoSolo
        ] = await Promise.all([
            this.prisma.produtor.count(),
            this.prisma.propriedade.count(),
            this.prisma.propriedade.aggregate({
                _sum: {
                    areaTotal: true
                }
            }),
            this.prisma.propriedade.groupBy({
                by: ['estado'],
                _count: { _all: true },
                orderBy: { estado: 'asc' }
            }),
            this.prisma.cultura.groupBy({
                by: ['nome'],
                _count: { _all: true },
                orderBy: { nome: 'asc' }
            }),
            this.prisma.propriedade.aggregate({
                _sum: {
                    areaAgricultavel: true,
                    areaVegetacao: true
                }
            })
        ]);

        return {
            produtores,
            propriedades,
            hectares: Number(hectares._sum.areaTotal ?? 0),
            porEstado: porEstado.map(item => ({
                estado: item.estado,
                quantidade: item._count._all
            })),
            porCultura: porCultura.map(item => ({
                cultura: item.nome,
                quantidade: item._count._all
            })),
            usoSolo: {
                agricultavel: Number(usoSolo._sum.areaAgricultavel ?? 0),
                vegetacao: Number(usoSolo._sum.areaVegetacao ?? 0)
            }
        };
    }
}