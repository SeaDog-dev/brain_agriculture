import {Router} from 'express'
import {prisma} from '../database/prisma'
import { ProdutorRepository } from 'src/repositories/ProdutorRepositoru'
import { CriarProdutorService } from 'src/services/CriarProdutorService'
import { ProdutorController } from 'src/controllers/ProdutorController'

const produtorRoutes = Router();

const produtorRepository = new ProdutorRepository(prisma)
const criarProdutorService = new CriarProdutorService(produtorRepository)
const produtorController = new ProdutorController(criarProdutorService)

produtorRoutes.post('/produtores', (req, res) => {
    produtorController.criar(req, res)
});

produtorRoutes.get('/produtores', (req, res) => {
    res.json({message: "Bão ço"})
})

export default produtorRoutes