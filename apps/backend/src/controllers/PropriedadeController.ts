import { Request, Response } from "express";
import { CriarPropriedadeService } from "src/services/CriarPropriedadeService";

export class PropriedadeController {
    constructor(private readonly criarPropriedadeService: CriarPropriedadeService) { }

    async criar(req: Request, res: Response) {
        const propriedade = req.body;

        const propriedadeResponse = await this.criarPropriedadeService.executar(propriedade)
        return res.status(201).json(propriedadeResponse)
    }
}