import { PrismaClient } from "generated/prisma/client";

interface ICriarCultura {
    safraId: string,
    nome: string
}

interface IAtualizarCultura {
    safraId: string,
    nome: string
}

export class CulturaRepository {
    constructor(private readonly prisma: PrismaClient) { }

    async criar(cultura: ICriarCultura) {
        return this.prisma.cultura.create({
            data: { ...cultura }
        })
    }

    async listar() {
        return await this.prisma.cultura.findMany({
            include:{
                safra:{
                    include:{
                        propriedade: true
                    }
                }
            }
        })
    }

    async buscarPorId(id: string) {
        return await this.prisma.cultura.findUnique({
            where: { id }
        })
    }

    async atualizar(id: string, cultura: IAtualizarCultura) {
        return await this.prisma.cultura.update({
            where: { id },
            data: { ...cultura }
        })
    }

    async excluir(id: string) {
        return await this.prisma.cultura.delete({
            where: { id }
        })
    }

}