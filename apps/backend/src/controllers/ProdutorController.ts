import { Request, Response } from "express";
import { ProdutorService } from "src/services/ProdutorService";

export class ProdutorController {
    constructor(private readonly produtorService: ProdutorService) { }

    async criar(req: Request, res: Response) {
        const { documento, nome } = req.body;

        const produtor = await this.produtorService.criar({
            documento,
            nome
        })
        return res.status(201).json(produtor)
    }

    async listar(req: Request, res: Response) {
        if (!req.headers['id']) {
            const response = await this.produtorService.listar()
            return res.status(200).json(response)
        }
        const id = req.headers['id'].toString()
        const produtores = await this.produtorService.buscarPorId(id)
        return res.status(200).json(produtores)
    }

    async atualizar(req: Request, res: Response) {
        const { documento, nome } = req.body
        if (!req.headers['id']) {
            return res.status(400).json({ message: "missing parameters" })
        }
        const id = req.headers['id'].toString()

        const produtor = await this.produtorService.atualizar(id, documento, nome)
        res.status(201).json(produtor)
    }

    async excluir(req: Request, res: Response) {
        if (!req.headers['id']) {
            return res.status(400).json({ message: "missing parameters" })
        }
        const id = req.headers['id'].toString()
        await this.produtorService.excluir(id)
        return res.status(200).json({})
    }
}