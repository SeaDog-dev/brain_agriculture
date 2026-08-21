import { PrismaClient, Propriedade } from "generated/prisma/client";

interface ICriarPropriedade {
    produtorId: string;
    nome: string;
    cidade: string;
    estado: string;
    areaTotal: number;
    areaAgricultavel: number;
    areaVegetacao: number;
}

export class PropriedadeRepository {
    constructor(private readonly prisma: PrismaClient) { }

    async criar(propriedade: ICriarPropriedade) {
        return this.prisma.propriedade.create({
            data: { ...propriedade }
        })
    }
}