import React, { useState } from 'react'
import "../../css/homeGerent.css";
import axios from "axios";
import { Form, InputsContainer, TittleInput, InputItem, Input, MessageError, Button, MessageNoGood, Tittle } from '../../elements/Forms';
import ComponentInput from '../../elements/Input';
import swal from 'sweetalert';
import LoadId from './../../elements/LoadId'


export default function RegisterClient() {
    const [nombre, setNombre] = useState({ campo: '', valido: null });
    const [domicilio, setDomicilio] = useState({ campo: '', valido: null });
    const [telefono, setTelefono] = useState({ campo: '', valido: null });
    const [correo, setCorreo] = useState({ campo: '', valido: null });
    const [contrasenia, setContrasenia] = useState({ campo: '', valido: null });
    const [fechaNac, setFechaNac] = useState({ campo: '', valido: 'true' });
    const [exito, setExito] = useState(null);

    const [idCliente, setIdCliente] = useState();

    function submitHandler(e) {
        e.preventDefault();
        const d = new Date();
        let cad = d.toLocaleDateString();
        let vec = cad.split("/");
        let fecha = `${vec[2]}-${vec[1].padStart(2, "0")}-${vec[0].padStart(2, "0")}`

        const cliente = {
            id: idCliente,
            nombre: e.target.elements.nombre.value,
            domicilio: e.target.elements.domicilio.value,
            telefono: e.target.elements.telefono.value,
            correo: e.target.elements.correo.value,
            fecha_nac: e.target.elements.fecha_nac.value,
            fecha_ing: fecha,
            contrasenia: e.target.elements.contrasenia.value,
        }
        if (
            nombre.valido === 'true' &&
            domicilio.valido === 'true' &&
            telefono.valido === 'true' &&
            correo.valido === 'true' &&
            contrasenia.valido === 'true'
        ) {
            saveData(cliente)
            setExito('true')
        } else {
            setExito('false');
        }
    }

    const saveData = async (cliente) => {
        await axios.post('http://localhost:4000/api/reg/client', cliente)
            .then(({ data }) => {
                console.log(data)
                swal({
                    text: `El cliente a sido registrado con exito`,
                    icon: "success",
                    button: "Aceptar"
                })
                setNombre({ campo: '', valido: '' })
                setDomicilio({ campo: '', valido: '' })
                setTelefono({ campo: '', valido: '' })
                setCorreo({ campo: '', valido: '' })
                setContrasenia({ campo: '', valido: '' })
                setFechaNac({ campo: '', valido: '' })
                setIdCliente(idCliente+1)
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
        nombre: /^[a-zA-ZÀ-ÿ\s]{8,40}$/, // Letras y espacios, pueden llevar acentos.
        password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,16}$/,
        /*-Minimo 8 caracteres Maximo 16
        -Al menos una letra mayúscula
        -Al menos una letra minucula
        -Al menos un dígito
        -No espacios en blanco
        -Al menos 1 caracter especial*/
        correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        telefono: /(33|55)\d{8}/,
        domicilio: /\w|#/, //solo caracteres de palabra y #
        sueldo: /[0-9]{1,6}([\\.][0-9]{2})/,
    }
    return (
        <div className="panel__item">
            <LoadId tittle='ID de cliente' llave='id_cliente' tabla='clientes' setDato={setIdCliente} dato={idCliente}/>
            <Form onSubmit={submitHandler}>
                <Tittle>Registrar Cliente</Tittle>
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
                        <Input value={fechaNac.campo} onChange={(e) => { setFechaNac({ ...fechaNac, campo: e.target.value }) }} required name="username" type="date" id="fecha_nac" placeholder="" />
                        <MessageError>Mensaje de error</MessageError>
                    </InputItem>

                    <ComponentInput
                        state={contrasenia}
                        setState={setContrasenia}
                        titulo="Contraseña"
                        type="password"
                        id="contrasenia"
                        messageError="La contraseña debe contener al menos una mayuscula, una minuscula, un digito y un caracter especial"
                        expresionReg={expressions.password}
                    />

                </InputsContainer>
                <MessageNoGood valido={exito}>Por favor llenar todos los campos correctamente</MessageNoGood>
                <Button type="submit">Registrar</Button>
            </Form>
        </div>
    )
}
