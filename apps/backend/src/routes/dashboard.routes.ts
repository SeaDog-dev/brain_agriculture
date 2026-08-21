import {Router} from 'express'
import {prisma} from '../database/prisma'
import { DashboardRepository } from 'src/repositories/DashboardRepository'
import { DashboardService } from 'src/services/DashboardService'
import { DashboardController } from 'src/controllers/DashboardController'

const dashboardRoutes = Router()

const dashboardRepository = new DashboardRepository(prisma)
const dashboardService = new DashboardService(dashboardRepository)
const dashboardController = new DashboardController(dashboardService)

dashboardRoutes.get('/dashboard', (req, res) => {
    dashboardController.getDados(req, res)
})

export default dashboardRoutes