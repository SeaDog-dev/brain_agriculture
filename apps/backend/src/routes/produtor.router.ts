import {Router} from 'express'
import {prisma} from '../database/prisma'
import { ProdutorRepository } from 'src/repositories/ProdutorRepository'
import { ProdutorService } from 'src/services/ProdutorService'
import { ProdutorController } from 'src/controllers/ProdutorController'

const produtorRoutes = Router();

const produtorRepository = new ProdutorRepository(prisma)
const produtorService = new ProdutorService(produtorRepository)
const produtorController = new ProdutorController(produtorService)

produtorRoutes.post('/produtores', (req, res) => {
    produtorController.criar(req, res)
});

produtorRoutes.get('/produtores', (req, res) => {
    produtorController.listar(req, res)
});

produtorRoutes.get('/produtores/:id', (req, res) => {
    produtorController.buscarPorId(req, res)
});

produtorRoutes.put('/produtores/:id', (req, res) => {
    produtorController.atualizar(req, res)
});

produtorRoutes.delete('/produtores/:id', (req, res) => {
    produtorController.excluir(req, res)
});

export default produtorRoutes