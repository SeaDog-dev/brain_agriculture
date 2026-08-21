import { PrismaClient } from "generated/prisma/client";

interface ICriarSafra {
    propriedadeId: string,
    ano: number,
}

interface IAtualizarSafra {
    propriedadeId?: string,
    ano?: number,
}

export class SafraRepository {
    constructor(private readonly prisma: PrismaClient) { }

    async criar(safra: ICriarSafra) {
        return this.prisma.safra.create({
            data: { ...safra }
        })
    }

    async listar() {
        return await this.prisma.safra.findMany({
            include:{propriedade: true}
        })
    }

    async buscarPorId(id: string) {
        return await this.prisma.safra.findUnique({ where: { id } })
    }

    async atualizar(id: string, safra: IAtualizarSafra) {
        return await this.prisma.safra.update({
            where: { id },
            data: { ...safra }
        })
    }

    async excluir(id: string) {
        return await this.prisma.safra.delete({ where: { id } })
    }
}