import { Request, Response } from "express";
import { PropriedadeService } from "src/services/PropriedadeService";

export class PropriedadeController {
    constructor(private readonly propriedadeService: PropriedadeService) { }

    async criar(req: Request, res: Response) {
        const propriedade = req.body;

        const propriedadeResponse = await this.propriedadeService.criar(propriedade)
        return res.status(201).json(propriedadeResponse)
    }

    async listar(req: Request, res: Response) {
        const response = await this.propriedadeService.listar()
        return res.status(200).json(response)
    }

    async buscarPorId(req: Request, res: Response) {
        if (!req.params.id) {
            return res.status(400).json({ message: "missing parameters" })
        }
        const id = req.params.id.toString()
        const propriedades = await this.propriedadeService.buscarPorId(id)
        return res.status(200).json(propriedades)
    }

    async atualizar(req: Request, res: Response) {
        const propriedade = req.body
        if (!req.params.id) {
            return res.status(400).json({ message: "missing parameters" })
        }
        const id = req.params.id.toString()
        const propriedadeResponse = await this.propriedadeService.atualizar(id, propriedade)
        return res.status(200).json(propriedadeResponse)
    }

    async excluir(req: Request, res: Response) {
        if (!req.params.id) {
            return res.status(400).json({ message: "missing parameters" })
        }
        const id = req.params.id.toString()
        await this.propriedadeService.excluir(id)
        return res.status(200).json({})
    }
}