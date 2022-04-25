import React, { useState, useEffect } from 'react'
import "../../css/homeGerent.css";
import { OptionsContainer, OptionMenu } from './../../elements/Options'
import { Form, InputsContainer, TittleInput, InputItem, Input, Select, Option, MessageError, Button, MessageNoGood, Tittle } from './../../elements/Forms';
import { Dato, Separador } from './paymentElements/Info'
import ComponentInput from '../../elements/Input';
import ComponentInputTotal from '../../elements/InputTotal';
import axios from "axios";
import swal from 'sweetalert';

export default function RegisterPayment() {

    const [show, setShow] = useState('');
    const [nombre, setNombre] = useState({ campo: '', valido: null });
    const [recibido, setRecibido] = useState({ campo: '', valido: null });
    const [cantDias, setCantDias] = useState({ campo: '1', valido: null });
    const [exito, setExito] = useState(null);
    const [membresias, setMembresias] = useState([]);
    const [isDuracion, setIsDuracion] = useState('');
    const [cliente, setCliente] = useState();
    const [total, setTotal] = useState();
    const [costo, setCosto] = useState();

    const id_emp = () => {
        const auth = JSON.parse(localStorage.getItem('auth'))
        const vec = auth.split("-");
        const id = vec[1];
        return id;
    }


    const loadMembresias = () => {
        axios.get('http://localhost:4000/membresias')
            .then(result => {
                setMembresias(result.data)
                setTotal(result.data[0].costo)
                setCosto(result.data[0].costo)
                console.log(result.data[0].costo)
            })
    }

    useEffect(loadMembresias, [])

    const actualizarPago = (costo) => {
        setTotal('' + (parseInt(costo)));
    }

    const expressions = {
        nombre: /^[a-zA-ZÀ-ÿ\s]{8,40}$/
    }

    const submitHandlerMenu = (e) => {
        e.preventDefault();
        if (nombre.valido === 'true') {
            lookForClient(e.target.elements.nombre.value);
        }
        else {
            setExito('false');
        }
    }

    const submitHandlerMenuNoClient = (e) => {
        e.preventDefault();
        if (nombre.valido === 'true') {
            verificarNoClient(nombre.campo);
        }
        else {
            setExito('false');
        }
    }

    const submitHandlerPayment = (e) => {
        e.preventDefault();
        const vec_value = e.target.elements.id.value.split('|');
        const id_membresia = vec_value[0];
        if ((cantDias.valido === 'true' || vec_value[1] !== '1-dia')
            && recibido.valido === 'true'
            && parseInt(recibido.campo) > parseInt(total)) {

            const d = new Date();
            let cad = d.toLocaleDateString();
            let vec_date = cad.split("/");
            let fecha = `${vec_date[2]}-${vec_date[1].padStart(2, "0")}-${vec_date[0].padStart(2, "0")}`



            let cantidad = '1';

            if (vec_value[1] === '1-dia') {
                cantidad = e.target.elements.cant_dias.value;
            }

            const payment = {
                fecha: fecha,
                cantidad: cantidad,
                id_membresia: id_membresia,
                id_empleado: id_emp(),
                id_cliente: "" + cliente.id_cliente
            }
            console.log(payment);
            saveDataPago(payment);
            setExito('true')
        }
        else {
            setExito('false');
            if (parseInt(recibido.campo) < parseInt(total)) {
                setRecibido({ valido: 'false' });
            }
        }
    }

    const submitHandlerPaymentNoClient = (e) => {
        e.preventDefault();
        const vec_value = e.target.elements.id.value.split('|');
        const id_membresia = vec_value[0];
        if ((cantDias.valido === 'true' || vec_value[1] !== '1-dia')
            && recibido.valido === 'true'
            && parseInt(recibido.campo) > parseInt(total)) {

            const d = new Date();
            let cad = d.toLocaleDateString();
            let vec_date = cad.split("/");
            let fecha = `${vec_date[2]}-${vec_date[1].padStart(2, "0")}-${vec_date[0].padStart(2, "0")}`



            let cantidad = '1';

            if (vec_value[1] === '1-dia') {
                cantidad = e.target.elements.cant_dias.value;
            }

            const payment = {
                nombre: nombre.campo,
                id_membresia: id_membresia,
                id_empleado: id_emp(),
                cantidad: cantidad,
                fecha: fecha,
            }
            console.log(payment);
            saveDataPagoNoClient(payment);
            setExito('true')
        }
        else {
            setExito('false');
            if (parseInt(recibido.campo) < parseInt(total)) {
                setRecibido({ valido: 'false' });
            }
        }
    }

    const saveDataPago = async (payment) => {
        await axios.post('http://localhost:4000/api/reg/pago', payment)
            .then(({ data }) => {
                console.log(data)

                let nombreMembresia;
                membresias.forEach(element => {
                    if (parseInt(element.id_membresia) === parseInt(payment.id_membresia)) {
                        nombreMembresia = element.nombre_membresia;
                    }
                });

                swal({
                    title: 'Voucher',
                    text: `GYM Bonita --- ${payment.fecha}\n\n
                            ---------------------------------------\n
                            Id cliente: ${cliente.id_cliente} \n
                            Nombre cliente: ${cliente.nombre_cliente}\n
                            ---------------------------------------\n
                            ${payment.cantidad} - ${nombreMembresia}\n
                            Total: ${total}\n\n
                            ---------------------------------------\n
                            Cantidad recibida: ${recibido.campo}\n
                            Cambio a devolver: ${parseInt(recibido.campo) - parseInt(total)}`,
                    button: "Cerrar"
                })
                setNombre({ campo: '', valido: '' })
                setRecibido({ campo: '', valido: '' })
                setShow('');
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

    const saveDataPagoNoClient = async (payment) => {
        await axios.post('http://localhost:4000/api/reg/pago/noclient', payment)
            .then(({ data }) => {
                console.log(data)

                let nombreMembresia;
                membresias.forEach(element => {
                    if (parseInt(element.id_membresia) === parseInt(payment.id_membresia)) {
                        nombreMembresia = element.nombre_membresia;
                    }
                });

                swal({
                    title: 'Voucher',
                    text: `GYM Bonita --- ${payment.fecha}\n\n
                            ---------------------------------------\n
                            Nombre: ${nombre.campo}\n
                            ---------------------------------------\n
                            ${payment.cantidad} - ${nombreMembresia}\n
                            Total: ${total}\n\n
                            ---------------------------------------\n
                            Cantidad recibida: ${recibido.campo}\n
                            Cambio a devolver: ${parseInt(recibido.campo) - parseInt(total)}`,
                    button: "Cerrar"
                })
                setNombre({ campo: '', valido: '' })
                setRecibido({ campo: '', valido: '' })
                setShow('');
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

    const lookForClient = async (nombre) => {
        await axios.post('http://localhost:4000/search/a/client', { nombre: nombre })
            .then(({ data }) => {
                console.log(data)
                setCliente(data)
                if (data.length === 0) {
                    swal({
                        text: `Inexistencia de nombre del cliente`,
                        icon: "error",
                        button: "Aceptar"
                    })
                }
                else {
                    verificar(data.id_cliente)
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

    const verificar = async (id) => {
        if (await membresiaActiva(id) === 'false') {
            setShow('registered_found');
        }
        else {
            swal({
                text: `El cliente ya cuenta con una membresia activa`,
                icon: "error",
                button: "Aceptar"
            })
            setNombre({ campo: '', valido: '' })
        }
    }

    const verificarNoClient = async (nombre) => {
        if (await membresiaActivaNoClient(nombre) === 'false') {
            setShow('noRegisteredForm');
        }
        else {
            swal({
                text: `El cliente ya cuenta con una membresia activa`,
                icon: "error",
                button: "Aceptar"
            })
            setNombre({ campo: '', valido: '' })
        }
    }

    const membresiaActiva = async (id) => {
        const activa = await axios.post('http://localhost:4000/pagos/cliente', { id: id })
            .then(({ data }) => {
                if (data.length !== 0) {
                    const date = new Date();
                    //date.setMonth(date.getMonth() + 9)
                    const data_fecha = new Date(data.fecha);
                    console.log(data)

                    const vec_duracion = data.duracion.split('-');
                    if (vec_duracion[1] === 'mes') {
                        console.log(data_fecha)
                        data_fecha.setMonth(data_fecha.getMonth() + parseInt(vec_duracion[0]))
                        console.log(data_fecha)
                    } else if (vec_duracion[1] === 'dia') {
                        console.log(data_fecha)
                        data_fecha.setDate(data_fecha.getDate() + parseInt(data.cantidad))
                        console.log(data_fecha)
                    }
                    else {
                        data_fecha.setFullYear(data_fecha.getFullYear() + 1)
                    }
                    console.log("fecha membre: " + data_fecha)
                    console.log("fecha actual: " + date)

                    if (data_fecha > date) {
                        return 'true';
                    }
                    else {
                        return 'false';
                    }
                }
                return 'false';
            })
            .catch(({ response }) => {
                console.log(response)
                swal({
                    text: `Algo a salido mal`,
                    icon: "error",
                    button: "Aceptar"
                })
            })
        return activa;
    }

    const membresiaActivaNoClient = async (nombre) => {
        const activa = await axios.post('http://localhost:4000/pagos/nocliente', { nombre: nombre })
            .then(({ data }) => {
                if (data.length !== 0) {
                    const date = new Date();
                    //date.setMonth(date.getMonth() + 2)
                    const data_fecha = new Date(data.fecha);
                    console.log(data)

                    const vec_duracion = data.duracion.split('-');
                    if (vec_duracion[1] === 'mes') {
                        console.log(data_fecha)
                        data_fecha.setMonth(data_fecha.getMonth() + parseInt(vec_duracion[0]))
                        console.log(data_fecha)
                    } else if (vec_duracion[1] === 'dia') {
                        console.log(data_fecha)
                        data_fecha.setDate(data_fecha.getDate() + parseInt(data.cantidad))
                        console.log(data_fecha)
                    }
                    else {
                        data_fecha.setFullYear(data_fecha.getFullYear() + 1)
                    }
                    console.log("fecha membre: " + data_fecha)
                    console.log("fecha actual: " + date)

                    if (data_fecha > date) {
                        return 'true';
                    }
                    else {
                        return 'false';
                    }
                }
                return 'false';
            })
            .catch(({ response }) => {
                console.log(response)
                swal({
                    text: `Algo a salido mal`,
                    icon: "error",
                    button: "Aceptar"
                })
            })
        return activa;
    }

    return (
        <div className="panel__item">
            {show === '' ?
                <div>
                    <OptionsContainer>
                        <OptionMenu onClick={() => setShow('registered')}>Pago de un cliente registrado</OptionMenu>
                        <OptionMenu onClick={() => setShow('notRegistered')}>Pago de un cliente no registrado</OptionMenu>
                    </OptionsContainer>
                </div> :
                null
            }
            {show === 'registered' ?
                <div>
                    <Form onSubmit={submitHandlerMenu}>
                        <Tittle>Pago de un cliente registrado</Tittle>
                        <InputsContainer>
                            <ComponentInput
                                state={nombre}
                                setState={setNombre}
                                titulo="Nombre"
                                type="text"
                                id="nombre"
                                messageError="No es un nombre valido"
                                expresionReg={expressions.nombre}
                            />
                        </InputsContainer>
                        <MessageNoGood valido={exito}>Por favor llenar todos los campos correctamente</MessageNoGood>
                        <Button type="submit">Buscar</Button>
                    </Form>
                </div>
                : null
            }
            {show === 'registered_found' ?
                <div>
                    <Form onSubmit={submitHandlerPayment}>
                        <Tittle>Registrar pago</Tittle>
                        <InputsContainer>
                            <InputItem>
                                <Dato><b>Id Cliente:</b>{` ${cliente.id_cliente}`}</Dato>
                                <Dato><b>Nombre:</b>{' ' + cliente.nombre_cliente}</Dato>
                                <br />
                                <TittleInput>Duracion:</TittleInput>
                                <Select
                                    id="id"
                                    onChange={(event) => {
                                        const vec_e = event.target.value.split('|');
                                        setIsDuracion(vec_e[1]);
                                        setCantDias({ campo: '1' });
                                        setCosto(vec_e[2])
                                        actualizarPago(vec_e[2])
                                    }}>
                                    {membresias.map((membresia, index) => (
                                        <Option key={membresia.id_membresia} value={membresia.id_membresia + "|" + membresia.duracion + "|" + membresia.costo}>{membresia.nombre_membresia}</Option>
                                    ))}
                                </Select>

                                {isDuracion === '1-dia' ?
                                    <ComponentInputTotal
                                        state={cantDias}
                                        setState={setCantDias}
                                        titulo="Cantidad de dias"
                                        type="text"
                                        id="cant_dias"
                                        messageError="No puede ser mayor a 25 dias o menor que 1"
                                        expresionReg={/^(?:(?:^)([1-9]|[+]\d|2[01|02|03|04|05]|1[01|02|03|04|05|06|07|08|09])(?!.*,\1(?:,|$)))+$/}
                                        total={total}
                                        setTotal={setTotal}
                                        costo={costo}
                                    />
                                    : <br />
                                }
                                <Separador />
                                <Dato><b>Total a pagar:</b>{' $' + total + ' pesos'}</Dato>
                                <ComponentInput
                                    state={recibido}
                                    setState={setRecibido}
                                    titulo="Monto recibido"
                                    type="text"
                                    id="dinero_ingresado"
                                    messageError="Cantidad no valida"
                                    expresionReg={/^(^(\d){1,5})+$/}
                                />
                            </InputItem>
                        </InputsContainer>
                        <MessageNoGood valido={exito}>Por favor llenar todos los campos correctamente</MessageNoGood>
                        <Button type="submit">Realizar pago</Button>
                    </Form>
                </div>
                : null
            }

            {show === 'notRegistered' ?
                <div>
                    <Form onSubmit={submitHandlerMenuNoClient}>
                        <Tittle>Pago de un cliente no registrado</Tittle>
                        <InputsContainer>
                            <ComponentInput
                                state={nombre}
                                setState={setNombre}
                                titulo="Nombre"
                                type="text"
                                id="nombre"
                                messageError="No es un nombre valido"
                                expresionReg={expressions.nombre}
                            />
                        </InputsContainer>
                        <MessageNoGood valido={exito}>Por favor llenar todos los campos correctamente</MessageNoGood>
                        <Button type="submit">Ingresar</Button>
                    </Form>
                </div>
                : null
            }
            {show === 'noRegisteredForm' ?
                <div>
                <Form onSubmit={submitHandlerPaymentNoClient}>
                        <Tittle>Registrar pago</Tittle>
                        <InputsContainer>
                            <InputItem>
                                <Dato><b>Nombre:</b>{' ' + nombre.campo}</Dato>
                                <br />
                                <TittleInput>Duracion:</TittleInput>
                                <Select
                                    id="id"
                                    onChange={(event) => {
                                        const vec_e = event.target.value.split('|');
                                        setIsDuracion(vec_e[1]);
                                        setCantDias({ campo: '1' });
                                        setCosto(vec_e[2])
                                        actualizarPago(vec_e[2])
                                    }}>
                                    {membresias.map((membresia, index) => (
                                        <Option key={membresia.id_membresia} value={membresia.id_membresia + "|" + membresia.duracion + "|" + membresia.costo}>{membresia.nombre_membresia}</Option>
                                    ))}
                                </Select>

                                {isDuracion === '1-dia' ?
                                    <ComponentInputTotal
                                        state={cantDias}
                                        setState={setCantDias}
                                        titulo="Cantidad de dias"
                                        type="text"
                                        id="cant_dias"
                                        messageError="No puede ser mayor a 25 dias o menor que 1"
                                        expresionReg={/^(?:(?:^)([1-9]|[+]\d|2[01|02|03|04|05]|1[01|02|03|04|05|06|07|08|09])(?!.*,\1(?:,|$)))+$/}
                                        total={total}
                                        setTotal={setTotal}
                                        costo={costo}
                                    />
                                    : <br />
                                }
                                <Separador />
                                <Dato><b>Total a pagar:</b>{' $' + total + ' pesos'}</Dato>
                                <ComponentInput
                                    state={recibido}
                                    setState={setRecibido}
                                    titulo="Monto recibido"
                                    type="text"
                                    id="dinero_ingresado"
                                    messageError="Cantidad no valida"
                                    expresionReg={/^(^(\d){1,5})+$/}
                                />
                            </InputItem>
                        </InputsContainer>
                        <MessageNoGood valido={exito}>Por favor llenar todos los campos correctamente</MessageNoGood>
                        <Button type="submit">Realizar pago</Button>
                    </Form>
                </div>
                : null
            }
        </div>
    )
}
