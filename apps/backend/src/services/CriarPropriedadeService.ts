import { PropriedadeRepository } from "src/repositories/PropriedadeRepository";

interface CriarPropriedadeDTO {
    produtorId: string;
    nome: string;
    cidade: string;
    estado: string;
    areaTotal: number;
    areaAgricultavel: number;
    areaVegetacao: number;
}

export class CriarPropriedadeService {
    constructor(private readonly propriedadeRepository: PropriedadeRepository) { }

    async executar(propriedade: CriarPropriedadeDTO) {
        if ((propriedade.areaAgricultavel + propriedade.areaVegetacao) > propriedade.areaTotal) {
            throw new Error('Area agricultável somando a area de vegetação excede a area total!')
        }

        return this.propriedadeRepository.criar(propriedade)

    }
}