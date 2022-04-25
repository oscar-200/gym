import React, { useEffect, useState } from 'react'
import HomeClient from '../../components/home/HomeClient';
import "./../../css/Home.css";
import About from '../../components/home/About';
import Instalaciones from '../../components/home/Instalaciones';
import Contact from '../../components/home/Contact';
import Footer from '../../components/home/Footer';
import ConsultarActividades from '../../components/client/ConsultActivityClient';
import ConsultRegister from '../../components/client/ConsultRegister';
import { ButtonClose } from '../../elements/Forms';
import axios from "axios";
import ClientInformation from '../../components/branch_manager-manager/ClientInformation';


const LayoutClient = () => {
  const [showMenu, setShowMenu] = useState('');
  const [info, setInfo] = useState();
  const [nombre, setNombre] = useState();



  const lookForClient =() => {
    const auth = JSON.parse(localStorage.getItem('auth'))
    const vec = auth.split("-");
    const id = vec[1];
    axios.post('http://localhost:4000/con/a/client', { id: id})
      .then(({ data }) => {
        console.log(data)
        setInfo(data)
        setNombre(data.nombre_cliente)
      })
      .catch(({ response }) => {
        console.log(response)
      })
  }

  useEffect(lookForClient,[])


  return (
    <div>
      {showMenu === '' ?
        <div>
          <HomeClient setMenu={setShowMenu} menu={showMenu} nombre={nombre}/>
          <About />
          <Instalaciones />
          <Contact />
          <Footer />
        </div>
        : null}
      {showMenu === 'conAct' ?
        <div>
          <div className="header"></div>
          <div className='reg_tittle'>
            <h1>Catalogo de actividades</h1>
          </div>
          <ConsultarActividades />
          <div className='button_return'>
            <ButtonClose onClick={() => { setShowMenu('') }}>Regresar</ButtonClose>
          </div>
        </div> : null}
      {showMenu === 'conReg' ?
        <div>
          <div className="header"></div>
          <div className='reg_tittle'>
            <h1>Actividades agendadas</h1>
          </div>
          <ConsultRegister />
          <div className='button_return'>
            <ButtonClose onClick={() => { setShowMenu('') }}>Regresar</ButtonClose>
          </div>
        </div> : null}
      {showMenu === 'perInfo' ?
        <div>
          <div className="header"></div>
          <div className='reg_tittle'>
            <h1>Informacion personal</h1>
          </div>
          <ClientInformation info={info} regresar={setShowMenu} />
          <div className='button_return'>
            <ButtonClose onClick={() => { setShowMenu('') }}>Regresar</ButtonClose>
          </div>
        </div> : null}
    </div>
  )
}
export default LayoutClient;