import { Request, Response } from 'express'
import { SafraService } from 'src/services/SafraService'

export class SafraController {
    constructor(private readonly safraService: SafraService) { }

    async criar(req: Request, res: Response) {
        const safra = req.body

        const safraResponse = await this.safraService.criar(safra)
        return res.status(201).json(safraResponse)
    }

    async listar(req: Request, res: Response) {
        const response = await this.safraService.listar()
        return res.status(200).json(response)
    }

    async buscarPorId(req: Request, res: Response) {
        if (!req.params.id) {
            return res.status(400).json({ message: "missing parameters" })
        }
        const id = req.params.id.toString()
        const propriedades = await this.safraService.buscarPorId(id)
        return res.status(200).json(propriedades)
    }

    async atualizar(req: Request, res: Response) {
        const propriedade = req.body
        if (!req.params.id) {
            return res.status(400).json({ message: "missing parameters" })
        }
        const id = req.params.id.toString()
        const propriedadeResponse = await this.safraService.atualizar(id, propriedade)
        return res.status(200).json(propriedadeResponse)
    }

    async excluir(req: Request, res: Response) {
        if (!req.params.id) {
            return res.status(400).json({ message: "missing parameters" })
        }
        const id = req.params.id.toString()
        await this.safraService.excluir(id)
        return res.status(200).json({})
    }
}