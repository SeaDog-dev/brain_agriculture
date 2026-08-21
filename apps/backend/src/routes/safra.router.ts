import { Router } from "express";
import { prisma } from '../database/prisma'
import { SafraRepository } from "src/repositories/SafraRepository";
import { CriarSafraService } from "src/services/CriarSafraService";
import { SafraController } from "src/controllers/SafraController";

const safraRoutes = Router()

const safraRepository = new SafraRepository(prisma)
const criarSafraService = new CriarSafraService(safraRepository)
const safraController = new SafraController(criarSafraService)

safraRoutes.post('/safras', (req, res) => {
    safraController.criar(req, res)
})

export default safraRoutes