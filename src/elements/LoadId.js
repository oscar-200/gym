import React, { useEffect } from 'react'
import axios from 'axios'
import { Dato } from '../components/encargado/paymentElements/Info'

export default function LoadId({tittle, llave, tabla, setDato, dato}) {

    const loadId = () => {
        const body = {
            llave: llave,
            tabla: tabla
        }

        axios.post('http://localhost:4000/load/id',body)
            .then(result => {
                let dato = result.data[0];
                setDato(dato[llave]+1)
            }).catch(resp => {
                console.log(resp);
            })
    }

    useEffect(loadId,[llave, tabla, setDato])



    return (
        <Dato><b>{`${tittle}: ${dato}`}</b></Dato>
    )
}
