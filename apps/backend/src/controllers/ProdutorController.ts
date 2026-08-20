import { Request, Response } from "express";
import { CriarProdutorService } from "src/services/CriarProdutorService";

export class ProdutorController {
    constructor(private readonly criarProdutorService: CriarProdutorService) { }

    async criar(req: Request, res: Response) {
        const { documento, nome } = req.body;

        const produtor = await this.criarProdutorService.executar({
            documento,
            nome
        })
        return res.status(201).json(produtor)
    }
}