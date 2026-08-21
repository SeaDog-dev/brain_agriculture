import { CulturaRepository } from "src/repositories/CulturaRepository";

interface ICriarCulturaDTO {
    safraId: string,
    nome: string,
}

interface IAtualizarCulturaDTO {
    safraId: string,
    nome: string,
}

export class CulturaService {
    constructor(private readonly culturaRepository: CulturaRepository) { }

    async criar(cultura: ICriarCulturaDTO){
        return this.culturaRepository.criar(cultura)
    }

    async listar(){
        return this.culturaRepository.listar()
    }

    async buscarPorId(id: string){
        return this.culturaRepository.buscarPorId(id)
    }

    async atualizar(id: string, cultura: IAtualizarCulturaDTO){
        return this.culturaRepository.atualizar(id, cultura)
    }

    async excluir(id: string){
        return this.culturaRepository.excluir(id)
    }
}