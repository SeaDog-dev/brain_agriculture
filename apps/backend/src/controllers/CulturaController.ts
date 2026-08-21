import { Request, Response } from 'express'
import { CulturaService } from 'src/services/CulturaService'

export class CulturaController {
    constructor(private readonly culturaService: CulturaService) { }

    async criar(req: Request, res: Response){
        const cultura = req.body

        const culturaResponse = await this.culturaService.criar(cultura)
        return res.status(201).json(culturaResponse)
    }

    async listar(req: Request, res: Response) {
        const response = await this.culturaService.listar()
        return res.status(200).json(response)
    }

    async buscarPorId(req: Request, res: Response) {
        if (!req.params.id) {
            return res.status(400).json({ message: "missing parameters" })
        }
        const id = req.params.id.toString()
        const propriedades = await this.culturaService.buscarPorId(id)
        return res.status(200).json(propriedades)
    }

    async atualizar(req: Request, res: Response) {
        const propriedade = req.body
        if (!req.params.id) {
            return res.status(400).json({ message: "missing parameters" })
        }
        const id = req.params.id.toString()
        const propriedadeResponse = await this.culturaService.atualizar(id, propriedade)
        return res.status(200).json(propriedadeResponse)
    }

    async excluir(req: Request, res: Response) {
        if (!req.params.id) {
            return res.status(400).json({ message: "missing parameters" })
        }
        const id = req.params.id.toString()
        await this.culturaService.excluir(id)
        return res.status(200).json({})
    }
}