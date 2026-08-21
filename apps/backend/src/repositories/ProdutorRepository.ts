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

    async buscarPorDocumento(documento: string) {
        return this.prisma.produtor.findUnique({
            where: {
                documento
            }
        })
    }

    async listar() {
        return this.prisma.produtor.findMany()
    }

    async buscarPorId(id: string) {
        return this.prisma.produtor.findUnique({ where: { id } })
    }

    async atualizar(id:string, documento: string, nome: string){
        return this.prisma.produtor.update({
            where: {id},
            data: {documento,nome}
        })
    }

    async excluir(id: string){
        return this.prisma.produtor.delete({where: {id}})
    }
}