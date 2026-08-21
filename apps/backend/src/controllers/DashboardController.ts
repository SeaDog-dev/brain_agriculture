import { Request, Response } from 'express'
import { DashboardService } from 'src/services/DashboardService'

export class DashboardController {
    constructor(private readonly dashboardService: DashboardService) { }

    async getDados(req: Request, res:Response){
        const response = await this.dashboardService.getData()
        return res.status(200).json(response)
    }
}