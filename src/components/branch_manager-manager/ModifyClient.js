import React, { useState, useEffect } from 'react'
import "../../css/homeGerent.css";
import axios from "axios";
import { Form, InputsContainer,Tittle, TittleInput, InputItem, Input, Select, Option, MessageError, Button, MessageGood, MessageNoGood, ButtonCancel } from '../../elements/Forms';
import ComponentInput from '../../elements/Input';
import swal from 'sweetalert';


export default function ModifyEmployee(props) {
    const [nombre, setNombre] = useState({ campo: '', valido: 'true' });
    const [fechaNac, setFechaNac] = useState({ campo: '', valido: 'true' });
    const [domicilio, setDomicilio] = useState({ campo: '', valido: 'true' });
    const [telefono, setTelefono] = useState({ campo: '', valido: 'true' });
    const [correo, setCorreo] = useState({ campo: '', valido: 'true' });
    const [contrasenia, setContrasenia] = useState({ campo: '', valido: 'true' });
    const [exito, setExito] = useState(null);


    function loadData() {
        let fecha = props.state.fecha_nacimiento.split("T");
        setNombre({ ...nombre, campo: props.state.nombre_cliente });
        setFechaNac({ ...fechaNac, campo: fecha[0] });
        setDomicilio({ ...domicilio, campo: props.state.domicilio_cliente });
        setTelefono({ ...telefono, campo: props.state.telefono_cliente });
        setCorreo({ ...correo, campo: props.state.correo_cliente });
        setContrasenia({ ...contrasenia, campo: props.state.contrasenia });
    }
    // eslint-disable-next-line
    useEffect(loadData, [])

    function submitHandler(e) {
        e.preventDefault();


        const cliente = {
            nombre: e.target.elements.nombre.value,
            fecha_nac: e.target.elements.fecha_nac.value,
            domicilio: e.target.elements.domicilio.value,
            telefono: e.target.elements.telefono.value,
            correo: e.target.elements.correo.value,
            contrasenia: e.target.elements.contrasenia.value,
            id: props.state.id_cliente
        }
        if (
            nombre.valido === 'true' &&
            domicilio.valido === 'true' &&
            telefono.valido === 'true' &&
            correo.valido === 'true' &&
            contrasenia.valido === 'true'
        ) {
            saveData(cliente)
            props.setEdit(null)

        } else {
            setExito('false');
        }
    }

    const saveData = async (cliente) => {
        await axios.post('http://localhost:4000/api/mod/client', cliente)
            .then(({ data }) => {
                console.log(data)
                swal({
                    text: `El cliente se a modificado con exito`,
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
        nombre: /^[a-zA-ZÀ-ÿ\s]{8,40}$/, // Letras y espacios, pueden llevar acentos.
        password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,16}$/,
        correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        telefono: /(33|55)\d{8}/,
        domicilio: /\w|#/ //solo caracteres de palabra y #
    }
    return (
        <div className="panel__item">
        
            <Form onSubmit={submitHandler}>
            <Tittle>Modificar cliente</Tittle>
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

                    <ComponentInput
                        state={telefono}
                        setState={setTelefono}
                        titulo="Telefono"
                        type="text"
                        id="telefono"
                        messageError="No es un numero de telefono valido"
                        expresionReg={expressions.telefono}
                    />

                    <ComponentInput
                        state={correo}
                        setState={setCorreo}
                        titulo="Correo"
                        type="text"
                        id="correo"
                        messageError="No es un correo valido"
                        expresionReg={expressions.correo}
                    />

                    <ComponentInput
                        state={domicilio}
                        setState={setDomicilio}
                        titulo="Domicilio"
                        type="text"
                        id="domicilio"
                        messageError="Solo se puede usar # como caracteres especiales"
                        expresionReg={expressions.domicilio}
                    />

                    <InputItem>
                        <TittleInput>Fecha de nacimiento:</TittleInput>
                        <Input
                            value={fechaNac.campo}
                            onChange={(e) => { setFechaNac({ ...fechaNac, campo: e.target.value }) }}
                            required
                            name="username"
                            type="date"
                            id="fecha_nac"
                            placeholder="" />
                        <MessageError>Mensaje de error</MessageError>
                    </InputItem>

                    <ComponentInput
                        state={contrasenia}
                        setState={setContrasenia}
                        titulo="Contraseña"
                        type="text"
                        id="contrasenia"
                        messageError="La contraseña debe contener al menos una mayuscula, una minuscula, un digito y un caracter especial"
                        expresionReg={expressions.password}
                    />


                </InputsContainer>
                <MessageGood valido={exito}>Registro exitoso</MessageGood>
                <MessageNoGood valido={exito}>Por favor llenar todos los campos correctamente</MessageNoGood>
                <Button type="submit">Modificar</Button>
                <ButtonCancel onClick={() => { props.setEdit(null) }} >Cancelar</ButtonCancel>
            </Form>
        </div>
    )
}
