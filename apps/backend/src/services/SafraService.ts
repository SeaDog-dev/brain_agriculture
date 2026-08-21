import { SafraRepository } from "src/repositories/SafraRepository";

interface ICriarSafraDTO {
    propriedadeId: string,
    ano: number,
}

interface IAtualizarSafraDTO {
    propriedadeId: string,
    ano: number,
}

export class SafraService {
    constructor(private readonly safraRepository: SafraRepository) { }

    async criar(safra: ICriarSafraDTO) {
        return this.safraRepository.criar(safra)
    }

    async listar() {
        return this.safraRepository.listar()
    }

    async buscarPorId(id: string) {
        return this.safraRepository.buscarPorId(id)
    }

    async atualizar(id: string, safra: IAtualizarSafraDTO) {
        return this.safraRepository.atualizar(id, safra)
    }

    async excluir(id: string) {
        return this.safraRepository.excluir(id)
    }
}