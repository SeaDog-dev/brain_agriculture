import { ProdutorRepository } from "src/repositories/ProdutorRepositoru";

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

        return this.produtorRepository.criar(documento, nome)
    }
}