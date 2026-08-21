import { PrismaClient, Produtor } from "generated/prisma/client";

export class ProdutorRepository {
    constructor(private readonly prisma: PrismaClient) { }

    async criar(documento: string, nome: string) {
        return this.prisma.produtor.create({
            data: {
                documento,
                nome
            }
        })
    }

    async buscarPorDocumento(documento: string){
        return this.prisma.produtor.findUnique({
            where: {
                documento
            }
        })
    }
}