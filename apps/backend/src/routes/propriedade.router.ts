import {Router} from 'express'
import {prisma} from '../database/prisma'
import { PropriedadeRepository } from 'src/repositories/PropriedadeRepository'
import { PropriedadeService } from 'src/services/PropriedadeService'
import { PropriedadeController } from 'src/controllers/PropriedadeController'

const propriedadeRoutes = Router()

const propriedadeRepository = new PropriedadeRepository(prisma)
const propriedadeService = new PropriedadeService(propriedadeRepository)
const propriedadeController = new PropriedadeController(propriedadeService)

propriedadeRoutes.post('/propriedades', (req, res) => {
    propriedadeController.criar(req, res)
})

propriedadeRoutes.get('/propriedades', (req, res) => {
    propriedadeController.listar(req, res)
})

propriedadeRoutes.get('/propriedades/:id', (req, res) => {
    propriedadeController.buscarPorId(req, res)
})

propriedadeRoutes.put('/propriedades/:id', (req, res) => {
    propriedadeController.atualizar(req, res)
})

propriedadeRoutes.delete('/propriedades/:id', (req, res) => {
    propriedadeController.excluir(req, res)
})

export default propriedadeRoutes