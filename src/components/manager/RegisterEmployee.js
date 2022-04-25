import React, { useState } from 'react'
import axios from "axios";
import { Form, InputsContainer, TittleInput, InputItem, Input, Select, Option, MessageError, Button, MessageNoGood, Tittle } from '../../elements/Forms';
import ComponentInput from '../../elements/Input';
import swal from 'sweetalert';


export default function RegisterEmployee() {
    const [nombre, setNombre] = useState({ campo: '', valido: null });
    const [rfc, setRfc] = useState({ campo: '', valido: null });
    const [domicilio, setDomicilio] = useState({ campo: '', valido: null });
    const [telefono, setTelefono] = useState({ campo: '', valido: null });
    const [correo, setCorreo] = useState({ campo: '', valido: null });
    const [sueldo, setSueldo] = useState({ campo: '', valido: null });
    const [nss, setNss] = useState({ campo: '', valido: null });
    const [contrasenia, setContrasenia] = useState({ campo: '', valido: null });
    const [fechaNac, setFechaNac] = useState({ campo: '', valido: 'true' });
    const [exito, setExito] = useState(null);

    function submitHandler(e) {
        e.preventDefault();
        const d = new Date();
        let cad=d.toLocaleDateString();
        let vec=cad.split("/");
        let fecha = `${vec[2]}-${vec[1].padStart(2, "0")}-${vec[0].padStart(2, "0")}`

        const empleado = {
            nombre: e.target.elements.nombre.value,
            rfc: e.target.elements.rfc.value,
            fecha_nac: e.target.elements.fecha_nac.value,
            domicilio: e.target.elements.domicilio.value,
            telefono: e.target.elements.telefono.value,
            correo: e.target.elements.correo.value,
            sueldo: e.target.elements.sueldo.value,
            fecha_ing: fecha,
            nss: e.target.elements.nss.value,
            contrasenia: e.target.elements.contrasenia.value,
            rol: e.target.elements.rol.value
        }
        if (
            nombre.valido === 'true' &&
            rfc.valido === 'true' &&
            domicilio.valido === 'true' &&
            telefono.valido === 'true' &&
            correo.valido === 'true' &&
            sueldo.valido === 'true' &&
            nss.valido === 'true' &&
            contrasenia.valido === 'true'
        ) {
            saveData(empleado)
        } else {
            setExito('false');
        }
    }

    const saveData = async (empleado) => {
        await axios.post('http://localhost:4000/api/reg/emp', empleado)
            .then(({ data }) => {
                console.log(data)
                swal({
                    text: `El empleado se a registrado con exito`,
                    icon: "success",
                    button: "Aceptar"
                })
                setNombre({ campo: '', valido: '' })
                setRfc({ campo: '', valido: '' })
                setDomicilio({ campo: '', valido: '' })
                setTelefono({ campo: '', valido: '' })
                setCorreo({ campo: '', valido: '' })
                setSueldo({ campo: '', valido: '' })
                setNss({ campo: '', valido: '' })
                setContrasenia({ campo: '', valido: '' })
                setFechaNac({ campo: '', valido: '' })
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
        rfc: /^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/,
        /*-Los primeros 3 "persona moral" o 4 "persona física" caracteres en mayúsculas.
        -Fecha válida (aunque para simplificarlo, no se están validando meses con menos de 31 días).
        -El dígito verificador sea un dígito o una letra A.
        -Permitiendo que haya guiones y/o espacios entre las partes.
        -Capturando cada parte en un grupo.
        */
        domicilio: /\w|#/, //solo caracteres de palabra y #
        sueldo: /[0-9]{1,6}([\\.][0-9]{2})/,
        nss: /^\d{11}$/
    }
    return (
        <div className="panel__item">
            <Form onSubmit={submitHandler}>
                <Tittle>Registrar Empleado</Tittle>
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
                        state={rfc}
                        setState={setRfc}
                        titulo="Rfc"
                        type="text"
                        id="rfc"
                        messageError="No es un rfc valido"
                        expresionReg={expressions.rfc}
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
                        state={domicilio}
                        setState={setDomicilio}
                        titulo="Domicilio"
                        type="text"
                        id="domicilio"
                        messageError="Solo se puede usar # como caracteres especiales"
                        expresionReg={expressions.domicilio}
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
                        state={sueldo}
                        setState={setSueldo}
                        titulo="Sueldo"
                        type="text"
                        id="sueldo"
                        messageError="Cifra no valida, Debe incluir 2 cifras de centavos"
                        expresionReg={expressions.sueldo}
                    />

                    <ComponentInput
                        state={nss}
                        setState={setNss}
                        titulo="Nss"
                        type="text"
                        id="nss"
                        messageError="nss no valido"
                        expresionReg={expressions.nss}
                    />

                    <ComponentInput
                        state={contrasenia}
                        setState={setContrasenia}
                        titulo="Contraseña"
                        type="password"
                        id="contrasenia"
                        messageError="La contraseña debe contener al menos una mayuscula, una minuscula, un digito y un caracter especial"
                        expresionReg={expressions.password}
                    />

                    <InputItem>
                        <TittleInput>Tipo de empledo:</TittleInput>
                        <Select name="rol">
                            <Option value="gerente">Gerente</Option>
                            <Option value="encargado">Encargado de sucursal</Option>
                            <Option value="maestro">Maestro</Option>
                        </Select>
                    </InputItem>


                </InputsContainer>
                <MessageNoGood valido={exito}>Por favor llenar todos los campos correctamente</MessageNoGood>
                <Button type="submit">Registrar</Button>
            </Form>
        </div>
    )
}
