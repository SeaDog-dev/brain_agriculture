import { Request, Response } from 'express'
import { CriarSafraService } from 'src/services/CriarSafraService'

export class SafraController {
    constructor(private readonly criarSafraService: CriarSafraService) { }

    async criar(req: Request, res: Response) {
        const safra = req.body

        const safraResponse = await this.criarSafraService.executar(safra)
        return res.status(201).json(safraResponse)
    }
}