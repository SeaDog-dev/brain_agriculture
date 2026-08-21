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

interface IAtualizarPropriedade {
    nome?: string;
    cidade?: string;
    estado?: string;
    areaTotal?: number;
    areaAgricultavel?: number;
    areaVegetacao?: number;
}

export class PropriedadeService {
    constructor(private readonly propriedadeRepository: PropriedadeRepository) { }

    async criar(propriedade: CriarPropriedadeDTO) {
        // if ((propriedade.areaAgricultavel + propriedade.areaVegetacao) > propriedade.areaTotal) {
        //     throw new Error('Area agricultável somando a area de vegetação excede a area total!')
        // }
        this.validarArea(propriedade.areaAgricultavel, propriedade.areaVegetacao, propriedade.areaTotal)
        return this.propriedadeRepository.criar(propriedade)

    }

    async listar() {
        return this.propriedadeRepository.listar()
    }

    async buscarPorId(id: string) {
        return this.propriedadeRepository.buscarPorId(id)
    }

    validarArea(agricultável: any, vegetacao: any, total: any) {
        if (Number(agricultável) + Number(vegetacao) > Number(total)) {
            throw new Error('Área agricultável somada à área de vegetação excede a área total!');
        }
    }

    async atualizar(id: string, propriedade: IAtualizarPropriedade) {
        const propriedadeAtual = await this.buscarPorId(id)
        const areaAgricultavel = propriedade.areaAgricultavel ?? Number(propriedadeAtual?.areaAgricultavel)
        const areaVegetacao = propriedade.areaVegetacao ?? Number(propriedadeAtual?.areaVegetacao)
        const areaTotal = propriedade.areaTotal ?? Number(propriedadeAtual?.areaTotal)
        this.validarArea(areaAgricultavel, areaVegetacao, areaTotal)
        return this.propriedadeRepository.atualizar(id, propriedade)
    }

    async excluir(id: string) {
        return this.propriedadeRepository.excluir(id)
    }
}