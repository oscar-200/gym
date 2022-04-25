import React, { useState, useEffect } from 'react'
import "../../css/homeGerent.css";
import axios from "axios";
import { Form, InputsContainer, TittleInput, InputItem, Select, Option, Button, MessageNoGood, Tittle } from '../../elements/Forms';
import ComponentInput from '../../elements/Input';
import ComponentInputTime from '../../elements/InputTime';
import swal from 'sweetalert';
import ClientInformation from './ClientInformation';

export default function ConsultAClient() {

    const [idCliente, setIdCliente] = useState({ campo: '', valido: null });
    const [exito, setExito] = useState(null);
    const [cliente, setCliente] = useState();
    const [clientFound, setClientFount] = useState('false');

    async function submitHandler(e) {
        e.preventDefault();  
        if (!(idCliente.valido === 'true' )){
            setExito('false');
        } else {
            lookForClient(e.target.elements.id_cliente.value);
            setExito('true');
        }
    }

    const lookForClient = async (id) => {
        await axios.post('http://localhost:4000/con/a/client', { id: id })
            .then(({ data }) => {
                console.log(data)
                if(data.length === 0){
                    swal({
                        text: `Inexistencia del ID de cliente`,
                        icon: "error",
                        button: "Aceptar"
                    })
                }
                else{
                    setIdCliente({ campo: '', valido: '' });
                    setCliente(data)
                    setClientFount('true')
                }
            })
            .catch(({ response }) => {
                console.log(response)
                swal({
                    text: `Algo a salido mal`,
                    icon: "error",
                    button: "Aceptar"
                })
            })
    }

    const expressions = {
        id: /^(^(\d){1,5})+$/
    }

    return (
        <div className="panel__item">
            {clientFound === 'true' ? <ClientInformation info={cliente} regresar={setClientFount}/> :
            <Form onSubmit={submitHandler}>
                <Tittle>Consulta de un cliente</Tittle>
                <InputsContainer>
                    <InputItem>
                        <ComponentInput
                            state={idCliente}
                            setState={setIdCliente}
                            titulo="Id del cliente"
                            type="text"
                            id="id_cliente"
                            messageError="Dato no valido"
                            expresionReg={expressions.id}
                        />
                    </InputItem>
                </InputsContainer>
                <MessageNoGood valido={exito}>Por favor llenar todos los campos correctamente</MessageNoGood>
                <Button type="submit">Buscar</Button>
            </Form>}
        </div>

    )
}
