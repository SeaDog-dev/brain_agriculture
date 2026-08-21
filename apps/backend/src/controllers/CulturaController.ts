import { Request, Response } from 'express'
import { CriarCulturaService } from 'src/services/CriarCulturaService'

export class CulturaController {
    constructor(private readonly criarCulturaService: CriarCulturaService) { }

    async criar(req: Request, res: Response){
        const cultura = req.body

        const culturaResponse = await this.criarCulturaService.executar(cultura)
        return res.status(201).json(culturaResponse)
    }
}