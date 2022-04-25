import React, { useState } from 'react'
import "../../css/homeGerent.css";
import axios from "axios";
import {Form, InputsContainer, Button, MessageNoGood, Tittle} from '../../elements/Forms';
import ComponentInput from '../../elements/Input';
import ComponentTextArea from '../../elements/TextArea';
import swal from 'sweetalert';

export default function AltaClase() {

    const [nombre, setNombre] = useState({ campo: '', valido: null });
    const [descripcion, setDescripcion] = useState({ campo: '', valido: null });
    const [exito, setExito] = useState(null);



    function submitHandler(e) {
        e.preventDefault();

        const clase = {
            nombre: e.target.elements.nombre.value,
            descripcion: e.target.elements.descripcion.value,
        }
        if(nombre.valido === 'true' && descripcion.valido === 'true'){
            saveData(clase);
        }else{
            setExito('false');
        }
        
    }

    const saveData = async (clase) => {
        await axios.post('http://localhost:4000/api/reg/clas', clase)
            .then(({ data }) => {
                console.log(data)
                swal({
                    text: `La clase se a registrado con exito`,
                    icon: "success",
                    button: "Aceptar"
                })
                setNombre({campo: '', valido: ''});
                setDescripcion({campo: '', valido: ''});
            })
            .catch(({ response }) => {
                console.log(response)
                swal({
                    text: `Algo a salido mal`,
                    icon: "success",
                    button: "error"
                })
            })
    }

    const expressions = {
        nombre: /^[a-zA-ZÀ-ÿ\s]{1,300}$/, // Letras y espacios, pueden llevar acentos.
    }

    return (
        <div className="panel__item">
            <Form onSubmit={submitHandler}>
                <Tittle>Alta de una clase</Tittle>
                <InputsContainer>
                    <ComponentInput
                        state={nombre}
                        setState={setNombre}
                        titulo="Nombre de la clase"
                        type="text"
                        id="nombre"
                        messageError="Este campo solo puede contener letras"
                        expresionReg={expressions.nombre}
                    />

                    <ComponentTextArea
                        state={descripcion}
                        setState={setDescripcion}
                        titulo="Descripcion de la clase"
                        type="text"
                        id="descripcion"
                        messageError="Este campo solo puede contener letras"
                        expresionReg={expressions.nombre}
                    />
                </InputsContainer>
                <MessageNoGood valido={exito}>Por favor llenar todos los campos correctamente</MessageNoGood>
                <Button type="submit">Registrar</Button>
            </Form>
        </div>

    )
}
