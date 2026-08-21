import React, { useEffect } from "react";
import { api } from "../services/api";

export default () => {
    useEffect(() => {
        const carregarProdutores = async () =>{
            const result = await api.get('/produtores')
            console.log(result.data)
        }

        carregarProdutores()
    }, [])
    return(
        <>
            <h1>Produtores</h1>
        </>
    )
}