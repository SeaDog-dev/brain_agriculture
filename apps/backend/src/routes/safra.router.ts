import { Router } from "express";
import { prisma } from '../database/prisma'
import { SafraRepository } from "src/repositories/SafraRepository";
import { SafraService } from "src/services/SafraService";
import { SafraController } from "src/controllers/SafraController";

const safraRoutes = Router()

const safraRepository = new SafraRepository(prisma)
const safraService = new SafraService(safraRepository)
const safraController = new SafraController(safraService)

safraRoutes.post('/safras', (req, res) => {
    safraController.criar(req, res)
})

safraRoutes.get('/safras', (req, res) => {
    safraController.listar(req, res)
})

safraRoutes.get('/safras/:id', (req, res) => {
    safraController.buscarPorId(req, res)
})

safraRoutes.put('/safras/:id', (req, res) => {
    safraController.atualizar(req, res)
})

safraRoutes.delete('/safras/:id', (req, res) => {
    safraController.excluir(req, res)
})

export default safraRoutes