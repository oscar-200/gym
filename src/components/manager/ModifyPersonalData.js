import React, { useState, useEffect } from 'react'
import "../../css/homeGerent.css";
import axios from "axios";
import swal from 'sweetalert';
import { Button } from '@material-ui/core';
import Campo from './CampoComponent'
import { Refresh } from '@material-ui/icons';


export default function ModifyPersonalData( {info, refresh} ) {
    
    //const [info, setInfo] = useState(info);

    const [edit, setEdit] = useState('false');
    const [dato, setDato] = useState();
    const [type, setType] = useState();
    const [tittle, setTittle] = useState();
    const [expression, setExpression] = useState();
    const [tittle_input, setTittle_input] = useState();
    const [campo, setCampo] = useState();

    const fecha_nacimiento = new Date(info.fecha_nacimiento);
    const fecha_ingreso = new Date(info.fecha_ingre);

    const vec_nac = fecha_nacimiento.toLocaleDateString().split('/');
    const nac_value = `${vec_nac[2]}-${vec_nac[1].padStart(2,"0")}-${vec_nac[0].padStart(2,"0")}`;

    const vec_ing = fecha_ingreso.toLocaleDateString().split('/');
    const ing_value = `${vec_ing[2]}-${vec_ing[1].padStart(2,"0")}-${vec_ing[0].padStart(2,"0")}`;

    const onClick = (dato, type, tittle_input, tittle, campo, expression) => {
        setDato(dato);
        setType(type);
        setTittle(tittle);
        setTittle_input(tittle_input);
        setCampo(campo);
        setExpression(expression);
        setEdit('true');
    }

    return (
        <div className="panel__item">
            {edit === 'true' ?
                <Campo
                    dato={dato}
                    type={type}
                    tittle={tittle}
                    tittle_input={tittle_input}
                    campo={campo} 
                    expression={expression}
                    id={info.id_emp}
                    setEdit={setEdit} 
                    refresh={refresh}/> :
                <div className='info'>
                    <h1>Informacion del empleado {info.id_emp}</h1>
                    <div className='info__item'>
                        <h4>
                            Nombre:
                        </h4>
                        <p>{info.nombre_emp}</p>
                        <div className='edit_btn'>
                            <button onClick={() =>
                                onClick(
                                    info.nombre_emp,
                                    'text',
                                    'Nombre',
                                    'Modificar nombre',
                                    "nombre_emp",
                                    /^[a-zA-ZÀ-ÿ\s]{8,40}$/
                                )}
                            >Editar</button>
                        </div>
                    </div>
                    <div className='info__item'>
                        <h4>
                            Rfc:
                        </h4>
                        <p>{info.rfc}</p>
                        <div className='edit_btn'>
                            <button onClick={() =>
                                onClick(
                                    info.rfc,
                                    'text',
                                    'Nombre',
                                    'Modificar rfc',
                                    "rfc",
                                    /^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/
                                )}
                            >Editar</button>
                        </div>
                    </div>
                    <div className='info__item'>
                        <h4>
                            Fecha de nacimiento:
                        </h4>
                        <p>{fecha_nacimiento.toLocaleDateString()}</p>
                        <div className='edit_btn'>
                            <button onClick={() =>
                                onClick(
                                    nac_value,
                                    'date',
                                    'Fecha de nacimiento',
                                    'Modificar fecha de nacimiento',
                                    "fecha_nacimiento",
                                    /^\d{4}[-/\s]?((((0[13578])|(1[02]))[-/\s]?(([0-2][0-9])|(3[01])))|(((0[469])|(11))[-/\s]?(([0-2][0-9])|(30)))|(02[-/\s]?[0-2][0-9]))$/
                                )}
                            >Editar</button>
                        </div>
                    </div>
                    <div className='info__item'>
                        <h4>
                            Domicilio:
                        </h4>
                        <p>{info.domicilio}</p>
                        <div className='edit_btn'>
                            <button onClick={() =>
                                onClick(
                                    info.domicilio,
                                    'text',
                                    'Domicilio',
                                    'Modificar domicilio',
                                    "domicilio",
                                    /\w|#/
                                )}
                            >Editar</button>
                        </div>
                    </div>
                    <div className='info__item'>
                        <h4>
                            Telefono:
                        </h4>
                        <p>{info.telefono}</p>
                        <div className='edit_btn'>
                            <button onClick={() =>
                                onClick(
                                    info.telefono,
                                    'text',
                                    'Telefono',
                                    'Modificar telefono',
                                    "telefono",
                                    /(33|55)\d{8}/
                                )}
                            >Editar</button>
                        </div>
                    </div>
                    <div className='info__item'>
                        <h4>
                            Correo:
                        </h4>
                        <p>{info.correo}</p>
                        <div className='edit_btn'>
                            <button onClick={() =>
                                onClick(
                                    info.correo,
                                    'email',
                                    'Correo',
                                    'Modificar correo',
                                    "correo",
                                    /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
                                )}
                            >Editar</button>
                        </div>
                    </div>
                    <div className='info__item'>
                        <h4>
                            Fecha de ingreso:
                        </h4>
                        <p>{fecha_ingreso.toLocaleDateString()}</p>
                        <div className='edit_btn'>
                            <button onClick={() =>
                                onClick(
                                    ing_value,
                                    'date',
                                    'Fecha de ingreso',
                                    'Modificar fecha de ingreso',
                                    "fecha_ingre",
                                    /^\d{4}[-/\s]?((((0[13578])|(1[02]))[-/\s]?(([0-2][0-9])|(3[01])))|(((0[469])|(11))[-/\s]?(([0-2][0-9])|(30)))|(02[-/\s]?[0-2][0-9]))$/
                                )}
                            >Editar</button>
                        </div>
                    </div>
                    <div className='info__item'>
                        <h4>
                            Nss:
                        </h4>
                        <p>{info.nss}</p>
                        <div className='edit_btn'>
                            <button onClick={() =>
                                onClick(
                                    info.nss,
                                    'text',
                                    'NSS',
                                    'Modificar nss',
                                    "nss",
                                    /^\d{11}$/
                                )}
                            >Editar</button>
                        </div>
                    </div>
                </div>}
        </div>

    )
}