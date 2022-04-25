import React from 'react'
import "../../css/homeGerent.css";


export default function PersonalDataTeacher({ info }) {


    const fecha_nacimiento = new Date(info.fecha_nacimiento);
    const fecha_ingreso = new Date(info.fecha_ingre);


    return (
        <div className="panel__item">
            <div className='info'>
                <h1>Informacion del empleado {info.id_emp}</h1>
                <div className='info__item'>
                    <h4>
                        Nombre:
                    </h4>
                    <p>{info.nombre_emp}</p>
                </div>
                <div className='info__item'>
                    <h4>
                        Rfc:
                    </h4>
                    <p>{info.rfc}</p>
                </div>
                <div className='info__item'>
                    <h4>
                        Fecha de nacimiento:
                    </h4>
                    <p>{fecha_nacimiento.toLocaleDateString()}</p>
                </div>
                <div className='info__item'>
                    <h4>
                        Domicilio:
                    </h4>
                    <p>{info.domicilio}</p>
                </div>
                <div className='info__item'>
                    <h4>
                        Telefono:
                    </h4>
                    <p>{info.telefono}</p>
                </div>
                <div className='info__item'>
                    <h4>
                        Correo:
                    </h4>
                    <p>{info.correo}</p>
                </div>
                <div className='info__item'>
                    <h4>
                        Fecha de ingreso:
                    </h4>
                    <p>{fecha_ingreso.toLocaleDateString()}</p>
                </div>
                <div className='info__item'>
                    <h4>
                        Nss:
                    </h4>
                    <p>{info.nss}</p>
                </div>
            </div>
        </div>

    )
}