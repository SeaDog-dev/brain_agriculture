import {Router} from 'express'
import {prisma} from '../database/prisma'
import { PropriedadeRepository } from 'src/repositories/PropriedadeRepository'
import { CriarPropriedadeService } from 'src/services/CriarPropriedadeService'
import { PropriedadeController } from 'src/controllers/PropriedadeController'

const propriedadeRoutes = Router()

const propriedadeRepository = new PropriedadeRepository(prisma)
const criarPropriedadeService = new CriarPropriedadeService(propriedadeRepository)
const propriedadeController = new PropriedadeController(criarPropriedadeService)

propriedadeRoutes.post('/propriedades', (req, res) => {
    propriedadeController.criar(req, res)
})

export default propriedadeRoutes