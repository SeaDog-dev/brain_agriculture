import React, { useEffect, useState } from "react";
import { api } from "../services/api";

export default () => {
    const [produtores, setProdutores] = useState([])
    useEffect(() => {
        const carregarProdutores = async () =>{
            const result = await api.get('/produtores')
            console.log(result.data)
            setProdutores(result.data)
        }

        carregarProdutores()
    }, [])
    return(
        <>
            <h1>Produtores</h1>
            {produtores && produtores.map((item) => {
                return (<>{item.nome}</>)
            })}
        </>
    )
}