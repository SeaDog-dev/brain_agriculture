import { SafraRepository } from "src/repositories/SafraRepository";

interface ICriarSafraDTO {
    propriedadeId: string,
    ano: number,
}

export class CriarSafraService {
    constructor(private readonly safraRepository: SafraRepository) { }

    async executar(safra: ICriarSafraDTO) {
        return this.safraRepository.criar(safra)
    }
}