import React, { useState, useEffect } from 'react'
import "./../../css/homeGerent.css";
import axios from "axios";
import { Form, InputsContainer, Tittle, Button, MessageNoGood, ButtonCancel} from '../../elements/Forms';
import ComponentInput from '../../elements/Input';
import ComponentTextArea from '../../elements/TextArea';
import swal from 'sweetalert';


export default function ModClase(props) {
    
    const [nombre, setNombre] = useState({ campo: '', valido: 'true' });
    const [descripcion, setDescripcion] = useState({ campo: '', valido: 'true' });
    const [exito, setExito] = useState(null);
    

    function loadData(){
        setNombre({...nombre, campo: props.state.nombre_clase});
        setDescripcion({...descripcion, campo: props.state.descripcion_clase});
    }
    // eslint-disable-next-line
    useEffect(loadData, [])

    function submitHandler(e) {
        e.preventDefault();
        

        const clase = {
            nombre: e.target.elements.nombre.value,
            descripcion: e.target.elements.descripcion.value,
            id: props.state.id_clase
        }
        if(nombre.valido === 'true' && descripcion.valido === 'true')
        {
            saveData(clase)
            props.setEdit(null) 
        }else{
            setExito('false');
        }    
    }

    const saveData = async (clase) => {
        await axios.post('http://localhost:4000/api/mod/clas', clase)
            .then(({ data }) => {
                console.log(data)
                swal({
                    text: `La clase se a modificado con exito`,
                    icon: "success",
                    button: "Aceptar"
                })
                props.refresh()
            })
            .catch(({ response }) => {
                console.log(response)
            })
    }
    const expressions = {
        nombre: /^[a-zA-ZÀ-ÿ\s]{1,100}$/, // Letras y espacios, pueden llevar acentos.
        password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,16}$/,
        correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        telefono: /(33|55)\d{8}/,
        rfc: /^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/,
        domicilio: /\w|#/, //solo caracteres de palabra y #
        sueldo: /[0-9]{1,6}([\\.][0-9]{2})/,
        nss: /^\d{11}$/
    }
    return (
        <div className="panel__item">
            <Form onSubmit={submitHandler}>
                <Tittle>Modificar clase</Tittle>
                <InputsContainer>
                    <ComponentInput
                        state={nombre}
                        setState={setNombre}
                        titulo="Nombre"
                        type="text"
                        id="nombre"
                        messageError="Este campo solo puede contener letras, y no puede ser menor a 8 caracteres"
                        expresionReg={expressions.nombre}
                    />

                    <ComponentTextArea
                        state={descripcion}
                        setState={setDescripcion}
                        titulo="Descripcion"
                        type="text"
                        id="descripcion"
                        messageError="Este campo solo puede contener letras, y no puede ser menor a 8 caracteres"
                        expresionReg={expressions.nombre}
                    />


                </InputsContainer>
                <MessageNoGood valido={exito}>Por favor llenar todos los campos correctamente</MessageNoGood>
                <ButtonCancel onClick={()=>{ props.setEdit(null)}} >Cancelar</ButtonCancel>
                <Button type="submit">Modificar</Button>
            </Form>
        </div>
    )
}
