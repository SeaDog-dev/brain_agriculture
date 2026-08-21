import { PrismaClient } from "generated/prisma/client";

interface ICriarCultura {
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

}