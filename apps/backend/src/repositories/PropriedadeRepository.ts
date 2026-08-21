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

interface IAtualizarPropriedade {
    nome?: string;
    cidade?: string;
    estado?: string;
    areaTotal?: number;
    areaAgricultavel?: number;
    areaVegetacao?: number;
}

export class PropriedadeRepository {
    constructor(private readonly prisma: PrismaClient) { }

    async criar(propriedade: ICriarPropriedade) {
        return this.prisma.propriedade.create({
            data: { ...propriedade }
        })
    }

    async listar() {
        return await this.prisma.propriedade.findMany()
    }

    async buscarPorId(id: string) {
        return await this.prisma.propriedade.findUnique({ where: { id } })
    }

    async atualizar(id: string, propriedade: IAtualizarPropriedade) {
        return this.prisma.propriedade.update({
            where: { id },
            data: { ...propriedade }
        })
    }

    async excluir(id: string){
        return this.prisma.propriedade.delete({where: {id}})
    }
}