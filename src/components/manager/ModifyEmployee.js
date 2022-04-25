import React, { useState, useEffect } from 'react'
import "../../css/homeGerent.css";
import axios from "axios";
import { Form, InputsContainer, TittleInput, InputItem, Input, Select, Option, MessageError, Button, MessageGood, MessageNoGood, ButtonCancel} from '../../elements/Forms';
import ComponentInput from '../../elements/Input';
import swal from 'sweetalert';


export default function ModifyEmployee(props) {
    const [nombre, setNombre] = useState({ campo: '', valido: 'true' });
    const [rfc, setRfc] = useState({ campo: '', valido: 'true' });
    const [fechaNac, setFechaNac] = useState({ campo: '', valido: 'true' });
    const [domicilio, setDomicilio] = useState({ campo: '', valido: 'true' });
    const [telefono, setTelefono] = useState({ campo: '', valido: 'true' });
    const [correo, setCorreo] = useState({ campo: '', valido: 'true' });
    const [sueldo, setSueldo] = useState({ campo: '', valido: 'true' });
    const [nss, setNss] = useState({ campo: '', valido: 'true' });
    const [contrasenia, setContrasenia] = useState({ campo: '', valido: 'true' });
    const [exito, setExito] = useState(null);
    
    const [rol, setRol] = useState(null);

    function loadData(){
        let fecha = props.state.fecha_nacimiento.split("T");
        setRol(props.state.tipo_empleado);

        setNombre({...nombre, campo: props.state.nombre_emp});
        setRfc({...rfc, campo: props.state.rfc});
        setFechaNac({...fechaNac, campo: fecha[0]});
        setDomicilio({...domicilio, campo: props.state.domicilio});
        setTelefono({...telefono, campo: props.state.telefono});
        setCorreo({...correo, campo: props.state.correo});
        setSueldo({...sueldo, campo: props.state.sueldo});
        setNss({...nss, campo: props.state.nss});
        setContrasenia({...contrasenia, campo: props.state.password});
    }
    // eslint-disable-next-line
    useEffect(loadData, [])

    function submitHandler(e) {
        e.preventDefault();
        

        const empleado = {
            nombre: e.target.elements.nombre.value,
            rfc: e.target.elements.rfc.value,
            fecha_nac: e.target.elements.fecha_nac.value,
            domicilio: e.target.elements.domicilio.value,
            telefono: e.target.elements.telefono.value,
            correo: e.target.elements.correo.value,
            sueldo: e.target.elements.sueldo.value,
            nss: e.target.elements.nss.value,
            contrasenia: e.target.elements.contrasenia.value,
            rol: e.target.elements.rol.value,
            id: props.state.id_emp
        }
        if(
            nombre.valido === 'true' &&
            rfc.valido === 'true' &&
            domicilio.valido === 'true' &&
            telefono.valido === 'true' &&
            correo.valido === 'true' &&
            sueldo.valido === 'true' &&
            nss.valido === 'true' &&
            contrasenia.valido === 'true'
        ){
            saveData(empleado)
            props.setEdit(null)
            
        }else{
            setExito('false');
        }    
    }

    const saveData = async (empleado) => {
        await axios.post('http://localhost:4000/api/mod/emp', empleado)
            .then(({ data }) => {
                console.log(data)
                swal({
                    text: `El empleado se a modificado con exito`,
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
        rfc: /^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/,
        domicilio: /\w|#/, //solo caracteres de palabra y #
        sueldo: /[0-9]{1,6}([\\.][0-9]{2})/,
        nss: /^\d{11}$/
    }
    return (
        <div className="panel__item">
            <Form onSubmit={submitHandler}>
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
                        <Input value={fechaNac.campo} onChange={(e)=>{ setFechaNac({...fechaNac, campo: e.target.value})}} name="username" type="date" id="fecha_nac" placeholder="" />
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
                        type="text"
                        id="contrasenia"
                        messageError="La contraseña debe contener al menos una mayuscula, una minuscula, un digito y un caracter especial"
                        expresionReg={expressions.password}
                    />

                    <InputItem>
                        <TittleInput>Tipo de empledo:</TittleInput>
                        <Select name="rol">
                            <Option selected={rol==='gerent'? "selected":""} value="gerent">Gerente</Option>
                            <Option selected={rol==='encarg'? "selected":""} value="encarg">Encargado de sucursal</Option>
                            <Option selected={rol==='maestro'? "selected":""} value="maestro">Maestro</Option>
                        </Select>
                    </InputItem>


                </InputsContainer>
                <MessageGood valido={exito}>Registro exitoso</MessageGood>
                <MessageNoGood valido={exito}>Por favor llenar todos los campos correctamente</MessageNoGood>
                <ButtonCancel onClick={()=>{ props.setEdit(null)}} >Cancelar</ButtonCancel>
                <Button type="submit">Modificar</Button>
            </Form>
        </div>
    )
}
