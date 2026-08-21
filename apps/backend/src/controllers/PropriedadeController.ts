import { Request, Response } from "express";
import { PropriedadeService } from "src/services/PropriedadeService";

export class PropriedadeController {
    constructor(private readonly criarPropriedadeService: PropriedadeService) { }

    async criar(req: Request, res: Response) {
        const propriedade = req.body;

        const propriedadeResponse = await this.criarPropriedadeService.executar(propriedade)
        return res.status(201).json(propriedadeResponse)
    }

    async listar(req: Request, res: Response) {
        
    }
}