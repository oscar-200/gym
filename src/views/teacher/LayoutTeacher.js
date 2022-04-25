import React, { useState, useEffect } from 'react'
import HomeTeacher from '../../components/home/HomeTeacher';
import "./../../css/Home.css";
import About from '../../components/home/About';
import Instalaciones from '../../components/home/Instalaciones';
import Contact from '../../components/home/Contact';
import Footer from '../../components/home/Footer';
import Actividades from './../../components/teacher/Actividades'
import ActividadesImpartidas from './../../components/teacher/ActividadesImpartidas'
import ClientesRegistrados from '../../components/teacher/ClientesRegistrados';
import { ButtonClose } from '../../elements/Forms';
import axios from 'axios';
import PersonalDataTeacher from '../../components/teacher/PersonalDataTeacher';

const LayoutClient = () => {
  const [showMenu, setShowMenu] = useState('');
  const [info, setInfo] = useState();


  const [idClase, setIdClase] = useState([])
  

  const onClients = (id) =>{
    setIdClase(id);
    setShowMenu('conAlums');
  }


  const loadData = () => {
    const auth = JSON.parse(localStorage.getItem('auth'))
    const vec = auth.split("-");
    const id = vec[1];
    axios.post('http://localhost:4000/con/a/emp', { id: id })
      .then(result => {
        console.log(result.data)
        setInfo(result.data)
      })
      .catch(({ response }) => {
        console.log(response)
      })
  }

  useEffect(loadData, []);

  return (
    <div>
      {showMenu === '' ?
        <div>
          <HomeTeacher setMenu={setShowMenu} menu={showMenu} />
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
            <h1>Oferta de actividades</h1>
          </div>
          <Actividades />
          <div className='button_return'>
            <ButtonClose onClick={() => { setShowMenu('') }}>Regresar</ButtonClose>
          </div>
          <br />
        </div> : null}
      {showMenu === 'conReg' ?
        <div>
          <div className="header"></div>
          <div className='reg_tittle'>
            <h1>Clases que imparte</h1>
          </div>
          <ActividadesImpartidas onClients={onClients}/>
          <div className='button_return'>
            <ButtonClose onClick={() => { setShowMenu('') }}>Regresar</ButtonClose>
          </div>
          <br />
        </div> : null}
      {showMenu === 'conAlums' ?
        <div>
          <div className="header"></div>
          <div className='reg_tittle'>
            <h1>Alumnos registrados</h1>
          </div>
          <ClientesRegistrados idClase={idClase}/>
          <div className='button_return'>
            <ButtonClose onClick={() => { setShowMenu('conReg') }}>Regresar</ButtonClose>
          </div>
          <br />
        </div> : null}
        {showMenu === 'perData' ?
        <div>
          <div className="header"></div>
          <div className='reg_tittle'>
            <h1>Informacion personal</h1>
          </div>
          <PersonalDataTeacher info={info} />
          <div className='button_return'>
            <ButtonClose onClick={() => { setShowMenu('') }}>Regresar</ButtonClose>
          </div>
          <br />
        </div> : null}
    </div>
  )
}
export default LayoutClient;