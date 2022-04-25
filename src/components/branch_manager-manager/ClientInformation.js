import React from 'react'
import "./../../css/infoClient.css"
import { Form, Button } from '../../elements/Forms';

export default function ClientInformation({ info, regresar }) {
    const fecha_ingreso = new Date(info.fecha_ingreso);
    const fecha_nacimiento = new Date(info.fecha_nacimiento);

    const submitHandler = (e) => {
        e.preventDefault();
        regresar('');
    }


    return (
        <div className='info'>
            <h1>Informacion del cliente {info.id_cliente}</h1>
            <div className='info__item'>
                <h4>
                    Nombre del cliente:
                </h4>
                <p>{info.nombre_cliente}</p>
            </div>
            <div className='info__item'>
                <h4>
                    Domicilio del cliente:
                </h4>
                <p>{info.domicilio_cliente}</p>
            </div>
            <div className='info__item'>
                <h4>
                    Telefono del cliente:
                </h4>
                <p>{info.telefono_cliente}</p>
            </div>
            <div className='info__item'>
                <h4>
                    Correo del cliente:
                </h4>
                <p>{info.correo_cliente}</p>
            </div>
            <div className='info__item'>
                <h4>
                    Fecha de ingreso:
                </h4>
                <p>{fecha_ingreso.toLocaleDateString()}</p>
            </div>
            <div className='info__item'>
                <h4>
                    Fecha de nacimiento:
                </h4>
                <p>{fecha_nacimiento.toLocaleDateString()}</p>
            </div>
            <div className='info__item'>
                <h4>
                    status:
                </h4>
                <p>{info.status}</p>
            </div>
            <div className='info__item'>
                <h4>
                    empleado:
                </h4>
                <p>{info.id_emp}</p>
            </div>
        </div>

    )
}