import {Router} from 'express'
import {prisma} from '../database/prisma'
import { CulturaRepository } from 'src/repositories/CulturaRepository'
import { CriarCulturaService } from 'src/services/CriarCulturaService'
import { CulturaController } from 'src/controllers/CulturaController'

const culturaRoutes = Router()

const culturaRepository = new CulturaRepository(prisma)
const criarCulturaService = new CriarCulturaService(culturaRepository)
const culturaController = new CulturaController(criarCulturaService)

culturaRoutes.post('/culturas', (req, res) => {
    culturaController.criar(req, res)
})

export default culturaRoutes