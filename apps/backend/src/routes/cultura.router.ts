import {Router} from 'express'
import {prisma} from '../database/prisma'
import { CulturaRepository } from 'src/repositories/CulturaRepository'
import { CulturaService } from 'src/services/CulturaService'
import { CulturaController } from 'src/controllers/CulturaController'

const culturaRoutes = Router()

const culturaRepository = new CulturaRepository(prisma)
const culturaService = new CulturaService(culturaRepository)
const culturaController = new CulturaController(culturaService)

culturaRoutes.post('/culturas', (req, res) => {
    culturaController.criar(req, res)
})

culturaRoutes.get('/culturas', (req, res) => {
    culturaController.listar(req, res)
})

culturaRoutes.get('/culturas/:id', (req, res) => {
    culturaController.buscarPorId(req, res)
})

culturaRoutes.put('/culturas/:id', (req, res) => {
    culturaController.atualizar(req, res)
})

culturaRoutes.delete('/culturas/:id', (req, res) => {
    culturaController.excluir(req, res)
})

export default culturaRoutes