import { PrismaClient } from "generated/prisma/client";

interface ICriarSafra {
    propriedadeId: string,
    ano: number,
}

export class SafraRepository {
    constructor(private readonly prisma: PrismaClient) { }

    async criar(safra: ICriarSafra) {
        return this.prisma.safra.create({
            data: { ...safra }
        })
    }
}