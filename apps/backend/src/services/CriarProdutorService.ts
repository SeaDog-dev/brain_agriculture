import { ProdutorRepository } from "src/repositories/ProdutorRepository";
import { isCPF, isCNPJ } from "validation-br";

interface CriarProdutoDTO {
    documento: string;
    nome: string;
}

export class CriarProdutorService {
    constructor(private readonly produtorRepository: ProdutorRepository) { }

    async executar({documento, nome}: CriarProdutoDTO) {
        const produtorExistente = await this.produtorRepository.buscarPorDocumento(documento)
        if(produtorExistente){
            throw new Error('Já existe um produtor com este documento!')
        }

        if(!isCNPJ(documento) && !isCPF(documento)){
            throw new Error('Documento Inválido !')
        }

        return this.produtorRepository.criar(documento, nome)
    }
}