import { ProdutorRepository } from "src/repositories/ProdutorRepository";
import { isCPF, isCNPJ } from "validation-br";

interface CriarProdutorDTO {
    documento: string;
    nome: string;
}

export class ProdutorService {
    constructor(private readonly produtorRepository: ProdutorRepository) { }

    async criar({documento, nome}: CriarProdutorDTO) {
        const produtorExistente = await this.produtorRepository.buscarPorDocumento(documento)
        if(produtorExistente){
            throw new Error('Já existe um produtor com este documento!')
        }

        if(!isCNPJ(documento) && !isCPF(documento)){
            throw new Error('Documento Inválido !')
        }

        return this.produtorRepository.criar(documento, nome)
    }

    async listar() {
        return this.produtorRepository.listar();
    }

    async buscarPorId(id: string) {
        return this.produtorRepository.buscarPorId(id);
    }

    async atualizar(id: string, documento: string, nome: string) {
        return this.produtorRepository.atualizar(id, documento, nome)
    }

    async excluir(id: string) {
        return this.produtorRepository.excluir(id)
    }
}