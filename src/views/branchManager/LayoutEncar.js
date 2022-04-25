import React, { useState } from "react";
import "../../css/homeGerent.css";
import { useNavigate } from 'react-router-dom';
//import {Menu as MunuIcon} from '@material-ui/core'

import RegisterClass from './../../components/branch_manager-manager/RegisterClass';
import RegisterActivity from './../../components/branch_manager-manager/RegisterActivity';
import ConsultClass from './../../components/branch_manager-manager/ConsultClass';
import ConsultActivity from './../../components/branch_manager-manager/ConsultActivity';
import RegisterClient from "../../components/branch_manager-manager/RegisterClient";
import ConsultClient from "../../components/branch_manager-manager/ConsultClient";
import ModifyPersonalData from "../../components/manager/ModifyPersonalData";
import ConsultAClient from "../../components/branch_manager-manager/ConsultAClient";
import MenuEncargado from "../../components/encargado/MenuEncargado";

import axios from "axios";
import RegisterPayment from "../../components/encargado/RegisterPayment";

import { ButtonClose } from "../../elements/Forms";

const LayoutEncarg = () => {
    const navigate = useNavigate();


    const [oper, setOper] = useState('');
    const [info, setInfo] = useState();

    let d = new Date();


    const loadData = async (id) => {
        await axios.post('http://localhost:4000/con/a/emp', { id: id })
            .then(result => {
                console.log(result.data)
                setInfo(result.data)
                setOper('modPerInfo')
            })
            .catch(({ response }) => {
                console.log(response)
            })
    }

    return (
        <div>
            <div className="header"></div>
            <div className='head'>
                <div className='head__tittle'>
                    <h1>Encargado</h1>
                </div>
                <div className='head__info'>
                    <div className='head__info_item fecha'>
                        <h2>22 de marzo del 2022</h2>
                    </div>
                    <div className='head__info_item'>
                        <h2>{d.getHours() + ":" + d.getMinutes()}</h2>
                    </div>
                </div>
                <div className='headClose'>
                    <button onClick={() => {
                        navigate('/')
                        localStorage.clear()
                    }} >Cerrar Sesion</button>
                </div>
            </div>
            <div className="window_panel">
                <div className='panel__options'>

                </div>
                <div >

                    {oper === '' ? <MenuEncargado setOper={setOper} loadData={loadData} /> : null}
                    {oper === 'regPago' ?
                        <div className="panel">
                            <RegisterPayment />
                            <div className='button_return'>
                                <ButtonClose onClick={() => { setOper('') }}>Regresar</ButtonClose>
                            </div>
                        </div> : null}
                    {oper === 'regCla' ?
                        <div className="panel">
                            <RegisterClass />
                            <div className='button_return'>
                                <ButtonClose onClick={() => { setOper('') }}>Regresar</ButtonClose>
                            </div>
                        </div> : null}
                    {oper === 'conCla' ?
                        <div className="panel">
                            <ConsultClass />
                            <div className='button_return'>
                                <ButtonClose onClick={() => { setOper('') }}>Regresar</ButtonClose>
                            </div>
                        </div> : null}
                    {oper === 'altAct' ?
                        <div className="panel">
                            <RegisterActivity />
                            <div className='button_return'>
                                <ButtonClose onClick={() => { setOper('') }}>Regresar</ButtonClose>
                            </div>
                        </div> : null}
                    {oper === 'conAct' ?
                        <div className="panel">
                            <ConsultActivity />
                            <div className='button_return'>
                                <ButtonClose onClick={() => { setOper('') }}>Regresar</ButtonClose>
                            </div>
                        </div> : null}
                    {oper === 'regCli' ?
                        <div className="panel">
                            <RegisterClient />
                            <div className='button_return'>
                                <ButtonClose onClick={() => { setOper('') }}>Regresar</ButtonClose>
                            </div>
                        </div> : null}
                    {oper === 'conCli' ?
                        <div className="panel">
                            <ConsultClient />
                            <div className='button_return'>
                                <ButtonClose onClick={() => { setOper('') }}>Regresar</ButtonClose>
                            </div>
                        </div> : null}
                    {oper === 'conUnCli' ?
                        <div className="panel">
                            <ConsultAClient />
                            <div className='button_return'>
                                <ButtonClose onClick={() => { setOper('') }}>Regresar</ButtonClose>
                            </div>
                        </div> : null}
                    {oper === 'modPerInfo' ?
                        <div className="panel">
                            <ModifyPersonalData info={info} refresh={loadData} />
                            <div className='button_return'>
                                <ButtonClose onClick={() => { setOper('') }}>Regresar</ButtonClose>
                            </div>
                        </div> : null}

                </div>
            </div>
        </div>
    )
}
export default LayoutEncarg;
