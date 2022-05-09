import React, { useState, useEffect } from 'react'
import "../../css/homeGerent.css";
import axios from "axios";
import { Form, InputsContainer, TittleInput, InputItem, Select, Option, Button, MessageNoGood, Tittle } from '../../elements/Forms';
import ComponentInput from '../../elements/Input';
import ComponentInputTime from '../../elements/InputTime';
import swal from 'sweetalert';

export default function AltaClase() {

    const [maestro, setMaestro] = useState([])
    const [clase, setClase] = useState([])

    const [cupos, setCupos] = useState({ campo: '', valido: null });
    const [hraInicio, setHraInicio] = useState({ campo: '', valido: null });
    const [hraFin, setHraFin] = useState({ campo: '', valido: null });
    const [exito, setExito] = useState(null);

    const [idActividad, setIdActividad] = useState();

    const loadDataMaestros = () => {
        axios.get('http://localhost:4000/maestros')
            .then(result => {
                setMaestro(result.data)
            })
    }
    const loadDataClases = () => {
        axios.get('http://localhost:4000/clases')
            .then(result => {
                setClase(result.data)
            })
    }
    const loadId = () => {
        const body = {
            llave: 'id_actividad',
            tabla: 'actividad'
        }

        axios.post('http://localhost:4000/load/id',body)
            .then(result => {
                console.log(result)
                setIdActividad(result.data[0].id_actividad+1)
            }).catch(resp => {
                console.log(resp);
            })
    }

    useEffect(loadId, [])
    useEffect(loadDataMaestros, [])
    useEffect(loadDataClases, [])

    async function submitHandler(e) {
        e.preventDefault();


        const actividad = {
            id_actividad: idActividad,
            id_clase: e.target.elements.id_clase.value,
            id_maestro: e.target.elements.id_maestro.value,
            cupos: e.target.elements.cupos.value,
            hra_ini: e.target.elements.hra_ini.value,
            hra_fin: e.target.elements.hra_fin.value
        }
        const fecha = new Date(`2022-03-30T${actividad.hra_ini}:00.000Z`);
        const fecha2 = new Date(`2022-03-30T${actividad.hra_fin}:00.000Z`);
        const dif = (fecha2.getTime() - fecha.getTime()) * 0.000000277778;
        if (!(dif > 1 && dif < 2.00001)) {
            swal({
                text: `Las horas entre la hora de inicio y la hora de fin deben estar en el rango de 1 a 2 horas.\n Y la hora inicio tiene que ser menor a la hora final`,
                icon: "error",
                button: "Aceptar"
            })
            setExito('false');
        }
        else if (await maestroEsDisponible(actividad.hra_ini, actividad.hra_fin, actividad.id_maestro) === 'false') {
            swal({
                text: `El maestro ya tiene ocupado el horario ingresado`,
                icon: "error",
                button: "Aceptar"
            })
        }
        else if (await horarioEsDisponible(actividad.hra_ini, actividad.hra_fin) === 'false') {
            swal({
                text: `No hay salas disponibles para este horario`,
                icon: "error",
                button: "Aceptar"
            })
        }
        else if (!(cupos.valido === 'true' && hraInicio.valido === 'true' && hraFin.valido === 'true')) {
            setExito('false');
        } else {
            saveData(actividad);
            setExito('true');
        }
    }

    const maestroEsDisponible = async (hraInicio, hraFin, id) => {
        const body = { hraInicio, hraFin, id }
        console.log(body)
        const disponible = await axios.post('http://localhost:4000/disp/maestro', body)
            .then(({ data }) => {
                console.log(data)
                if (data.length >= 1)
                    return 'false'
                else
                    return 'true'
            })
            .catch(({ response }) => {
                console.log(response)
            })
        return disponible
    }

    const horarioEsDisponible = async (hraInicio, hraFin) => {
        const body = { hraInicio, hraFin }
        console.log(body)
        const disponible = await axios.post('http://localhost:4000/disp/horario', body)
            .then(({ data }) => {
                console.log(data)
                if (data.length >= 3)
                    return 'false'
                else
                    return 'true'
            })
            .catch(({ response }) => {
                console.log(response)
            })
        return disponible
    }

    const saveData = async (actividad) => {
        await axios.post('http://localhost:4000/api/reg/act', actividad)
            .then(({ data }) => {
                console.log(data)
                setCupos({ campo: '', valido: '' });
                setHraInicio({ campo: '', valido: '' });
                setHraFin({ campo: '', valido: '' });
                swal({
                    text: `La actividad se a registrado con exito`,
                    icon: "success",
                    button: "Aceptar"
                })
                setIdActividad(idActividad+1)
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
        nombre: /^[a-zA-ZÀ-ÿ\s]{1,300}$/, // Letras y espacios, pueden llevar acentos.
        cupos: /^(?:(?:^)([1-9]|[12]\d|3[00])(?!.*,\1(?:,|$)))+$/,
        hra: /^[^$%&|<>#]*$/
    }

    return (
        <div className="panel__item">
            <Form onSubmit={submitHandler}>
                <Tittle>Alta de una Actividad</Tittle>
                <InputsContainer>
                    <InputItem>
                        <TittleInput><b>ID de actividad: {idActividad}</b></TittleInput>
                        <br />
                        <TittleInput>Clase:</TittleInput>
                        <Select name="id_clase">
                            {clase.map((user, index) => (
                                <Option key={user.id_clase} value={user.id_clase}>{`${user.id_clase} - ${user.nombre_clase}`}</Option>
                            ))}
                        </Select>
                        <TittleInput>Maestro:</TittleInput>
                        <Select name="id_maestro">
                            {maestro.map((user, index) => (
                                <Option key={user.id_emp} value={user.id_emp}>{`${user.id_emp} - ${user.nombre_emp}`}</Option>
                            ))}
                        </Select>
                        <ComponentInput
                            state={cupos}
                            setState={setCupos}
                            titulo="Cupos"
                            type="text"
                            id="cupos"
                            messageError="dato no valido, no tiene que ser mayor a 30"
                            expresionReg={expressions.cupos}
                        />

                        <ComponentInputTime
                            state={hraInicio}
                            setState={setHraInicio}
                            titulo="Hora de inicio"
                            type="time"
                            id="hra_ini"
                            messageError="caracteres no validos"
                            expresionReg={expressions.hra}
                            max="21:00"
                            min="09:00"
                        />

                        <ComponentInputTime
                            state={hraFin}
                            setState={setHraFin}
                            titulo="Hora de fin"
                            type="time"
                            id="hra_fin"
                            messageError="caracteres no validos"
                            expresionReg={expressions.hra}
                            max="22:00"
                            min="10:00"
                        />
                    </InputItem>
                </InputsContainer>
                <MessageNoGood valido={exito}>Por favor llenar todos los campos correctamente</MessageNoGood>
                <Button type="submit">Registrar</Button>
            </Form>
        </div>

    )
}
