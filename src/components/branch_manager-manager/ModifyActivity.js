import React, { useState, useEffect } from 'react'
import "./../../css/homeGerent.css";
import axios from "axios";
import { Form, InputsContainer, Tittle, TittleInput, InputItem, Input, Select, Option, MessageError, Button, MessageGood, MessageNoGood, ButtonCancel } from '../../elements/Forms';
import ComponentInput from '../../elements/Input';
import swal from 'sweetalert';


export default function ModActividad(props) {
    const [maestro, setMaestro] = useState([])
    const [clase, setClase] = useState([])


    const [cupos, setCupos] = useState({ campo: '', valido: 'true' });
    const [horaIni, setHoraIni] = useState({ campo: '', valido: 'true' });
    const [horaFin, setHoraFin] = useState({ campo: '', valido: 'true' });
    const [exito, setExito] = useState(null);

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
    function loadData() {
        setCupos({ ...cupos, campo: props.state.cupos });
        setHoraIni({ ...horaIni, campo: props.state.hra_inicio });
        setHoraFin({ ...horaFin, campo: props.state.hra_fin });
    }

    useEffect(loadDataMaestros, [])
    useEffect(loadDataClases, [])
    // eslint-disable-next-line
    useEffect(loadData, [])

    async function submitHandler(e) {
        e.preventDefault();


        const actividad = {
            id_clase: e.target.elements.id_clase.value,
            id_maestro: e.target.elements.id_maestro.value,
            cupos: e.target.elements.cupos.value,
            hra_ini: e.target.elements.hra_ini.value,
            hra_fin: e.target.elements.hra_fin.value,
            id_actividad: props.state.id_actividad
        }
        const fecha = new Date(`2022-03-30T${actividad.hra_ini.substring(0, 5)}:00.000Z`);
        const fecha2 = new Date(`2022-03-30T${actividad.hra_fin.substring(0, 5)}:00.000Z`);
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
        else if (!(cupos.valido === 'true' && horaIni.valido === 'true' && horaFin.valido === 'true')) {
            setExito('false');
        } else {
            saveData(actividad);
            setExito('true');
            props.setEdit(null);
        }
    }

    const maestroEsDisponible = async (hraInicio, hraFin, id) => {
        const body = { hraInicio, hraFin, id }
        //console.log(body)
        const disponible = await axios.post('http://localhost:4000/disp/maestro', body)
            .then(({ data }) => {
                if (data.length >= 1) {
                    if (data.length === 1) {
                        if (data[0].id_actividad === props.state.id_actividad) {
                            return 'true';
                        }
                    }
                    return 'false'
                }
                return 'true'
            })
            .catch(({ response }) => {
                console.log(response)
            })
        return disponible
    }

    const saveData = async (actividad) => {
        await axios.post('http://localhost:4000/api/mod/act', actividad)
            .then(({ data }) => {
                console.log(data)
                swal({
                    text: `La actividad se a modificado con exito`,
                    icon: "success",
                    button: "Aceptar"
                })
                props.refresh()
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
                <Tittle>Modificar clase</Tittle>
                <InputsContainer>
                    <InputItem>
                        <TittleInput>Clase:</TittleInput>
                        <Select name="id_clase">
                            {clase.map((user, index) => (
                                <Option selected={props.state.id_clase === user.id_clase ? "selected" : ""} key={user.id_clase} value={user.id_clase}>{`${user.id_clase} - ${user.nombre_clase}`}</Option>
                            ))}
                        </Select>
                        <TittleInput>Maestro:</TittleInput>
                        <Select name="id_maestro">
                            {maestro.map((user, index) => (
                                <Option selected={props.state.id_emp === user.id_emp ? "selected" : ""} key={user.id_emp} value={user.id_emp}>{`${user.id_emp} - ${user.nombre_emp}`}</Option>
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

                        <ComponentInput
                            state={horaIni}
                            setState={setHoraIni}
                            titulo="Hora de inicio"
                            type="time"
                            id="hra_ini"
                            messageError="caracteres no validos"
                            expresionReg={expressions.hra}
                        />

                        <ComponentInput
                            state={horaFin}
                            setState={setHoraFin}
                            titulo="Hora de fin"
                            type="time"
                            id="hra_fin"
                            messageError="caracteres no validos"
                            expresionReg={expressions.hra}
                        />
                    </InputItem>


                </InputsContainer>
                <MessageNoGood valido={exito}>Por favor llenar todos los campos correctamente</MessageNoGood>
                <ButtonCancel onClick={() => { props.setEdit(null) }} >Cancelar</ButtonCancel>
                <Button type="submit">Modificar</Button>
            </Form>
        </div>
    )
}
