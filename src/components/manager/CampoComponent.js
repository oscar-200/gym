import React, { useState, useEffect } from 'react'
import "../../css/homeGerent.css";
import axios from "axios";
import { Form, InputsContainer, TittleInput, InputItem, Select, Option, Button, ButtonCancel, MessageNoGood, Tittle } from '../../elements/Forms';
import ComponentInput from '../../elements/Input';
import swal from 'sweetalert';

export default function CampoComponent( {dato, type, tittle, tittle_input, campo, expression, id, setEdit, refresh} ) {
    const [data, setData] = useState({ campo: dato, valido: null });
    const [exito, setExito] = useState(null);

    const submitHandler = (e) =>{
        e.preventDefault();
        const datos = {
            campo: campo,
            new_dato: e.target.elements.id.value,
            id: id 
        }
        if(data.valido === 'true'){
            console.log(datos)
            save(datos);
        }
        else{
            setExito('false');
        }
    }

    const save = async (datos) => {
        await axios.post('http://localhost:4000/mod/campo/gerent', datos)
            .then(({ data }) => {
                console.log(data)
                swal({
                    text: `El campo se a modificado con exito`,
                    icon: "success",
                    button: "Aceptar"
                })
                setEdit('false');
                refresh(datos.id);
            })
            .catch(({ response }) => {
                console.log(response)
            })
    }

    return (
        <div className="panel__item">
            <Form onSubmit={submitHandler}>
                <Tittle>{tittle}</Tittle>
                <InputsContainer>
                    <InputItem>
                        <ComponentInput
                            state={data}
                            setState={setData}
                            titulo={tittle_input}
                            type={type}
                            id="id"
                            messageError="Dato no valido"
                            expresionReg={expression}
                        />
                    </InputItem>
                </InputsContainer>
                <ButtonCancel onClick={() => { setEdit('false') }} >Cancelar</ButtonCancel>
                <MessageNoGood valido={exito}>Por favor llenar todos los campos correctamente</MessageNoGood>
                <Button type="submit">Editar</Button>
            </Form>
        </div>

    )
}
