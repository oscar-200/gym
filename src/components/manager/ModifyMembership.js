import React, { useState, useEffect } from 'react'
import "./../../css/homeGerent.css";
import axios from "axios";
import { Form, InputsContainer, Tittle, TittleInput, InputItem, Input, Select, Option, MessageError, Button, MessageGood, MessageNoGood, ButtonCancel} from '../../elements/Forms';
import ComponentInput from '../../elements/Input';
import ComponentTextArea from '../../elements/TextArea';
import swal from 'sweetalert';


export default function ModifyMembership(props) {
    
    const [nombre, setNombre] = useState({ campo: '', valido: "true" });
    const [costo, setCosto] = useState({ campo: '', valido: "true" });
    const [cantMeses, setCantMeses] = useState({ campo: '', valido: "true" });

    const [exito, setExito] = useState(null);

    const [isDuracion, setIsDuracion] = useState('');

    const vecDuracion = props.state.duracion.split('-');
    

    function loadData(){
        setNombre({...nombre, campo: props.state.nombre_membresia});
        setCosto({...costo, campo: props.state.costo});
        if(vecDuracion[1] === 'mes')
            setCantMeses({...cantMeses, campo: vecDuracion[0]});
        setIsDuracion(vecDuracion[1]);
    }
    // eslint-disable-next-line
    useEffect(loadData, [])

    function submitHandler(e){
        e.preventDefault();
        const duracion = e.target.elements.duracion.value;

        let duracion_final;
        if(duracion==='mes'){
            const meses = e.target.elements.cant_meses.value;
            duracion_final = `${meses}-${duracion}`
        }
        else{
            duracion_final = `${1}-${duracion}`
        }
        const membresia = {
            duracion: duracion_final,
            nombre: e.target.elements.nombre.value,
            costo: e.target.elements.costo.value,
            id: props.state.id_membresia
        }
        if (
            nombre.valido === 'true' &&
            costo.valido === 'true' &&
            cantMeses.valido === 'true'
        ) {
            saveData(membresia)
            props.setEdit(null) 
        } else {
            setExito('false');
            console.log(nombre.valido + " " + costo.valido + " " + cantMeses.valido)
        }   
    }

    const saveData = async (membresia) => {
        await axios.post('http://localhost:4000/api/mod/memb', membresia)
            .then(({ data }) => {
                console.log(data)
                swal({
                    text: `La membresia se a modificado con exito`,
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
        nombre: /^[a-zA-ZÀ-ÿ\s]{3,35}$/, // Letras y espacios, pueden llevar acentos.
        costo: /^(^(\d){1,5})+$/,
        duracion: /^(?:(?:^)([1-9]|[+]\d|1[01]|1[02]|1[03]|1[04]|1[05])(?!.*,\1(?:,|$)))+$/,
        meses: /^(?:(?:^)([1-9]|[+]\d|1[01])(?!.*,\1(?:,|$)))+$/
    }
    return (
        <div className="panel__item">
            <Form onSubmit={submitHandler}>
                <Tittle>Modificar membresia</Tittle>
                <InputsContainer>
                    <ComponentInput
                        state={nombre}
                        setState={setNombre}
                        titulo="Nombre"
                        type="text"
                        id="nombre"
                        messageError="Este campo solo puede contener letras, y no puede ser menor a 3 caracteres"
                        expresionReg={expressions.nombre}
                    />

                    <InputItem>
                        <TittleInput>Duracion:</TittleInput>
                        <Select defaultValue={vecDuracion[1]} id="duracion" onChange={(event) => setIsDuracion(event.target.value)}>
                            <Option value="dia">Dia</Option>
                            <Option value="mes">Meses</Option>
                            <Option value="anio">Anual</Option>
                        </Select>
                    </InputItem>

                    <ComponentInput
                        state={costo}
                        setState={setCosto}
                        titulo="Costo"
                        type="text"
                        id="costo"
                        messageError="Cifra no valida"
                        expresionReg={expressions.costo}
                    />

                    {isDuracion === 'mes'?
                        <ComponentInput
                            state={cantMeses}
                            setState={setCantMeses}
                            titulo="Cantidad de meses"
                            type="text"
                            id="cant_meses"
                            messageError="No puede ser mayor a 11 dias o menor que 1"
                            expresionReg={expressions.meses}
                        /> : null}

                </InputsContainer>
                <MessageNoGood valido={exito}>Por favor llenar todos los campos correctamente</MessageNoGood>
                <ButtonCancel onClick={()=>{ props.setEdit(null)}} >Cancelar</ButtonCancel>
                <Button type="submit">Modificar</Button>
            </Form>
        </div>
    )
}
