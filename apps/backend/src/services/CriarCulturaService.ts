import { CulturaRepository } from "src/repositories/CulturaRepository";

interface ICriarCulturaDTO {
    safraId: string,
    nome: string,
}

export class CriarCulturaService {
    constructor(private readonly culturaRepository: CulturaRepository) { }

    async executar(cultura: ICriarCulturaDTO){
        return this.culturaRepository.criar(cultura)
    }
}