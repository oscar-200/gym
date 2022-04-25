import React, { useState } from "react";
import "../../css/homeGerent.css";
import { useNavigate } from 'react-router-dom'
import footerImg from "./../../assets/img/LogoBonita2.png";
import Menu from '@material-ui/icons/Menu';
import { IconButton } from '@material-ui/core'


function HomeClient({ setMenu, menu, nombre}) {
  const navigate = useNavigate();

  
    // fixed Header
    window.addEventListener("scroll", function () {
      const header = document.querySelector(".header");
      header.classList.toggle("active", window.scrollY > 0);
    });
    // Toogle Menu
    
  const [show, setShow] = useState(false);
  //const [showAction, setShowAction] = useState('');

  const onChange = (event) => {
    setMenu(event.target.value);
  }

  return (
    <div className="home" id="Home">
      <div className="home__bg">
        <div className="header d__flex align__items__center pxy__30">
          <div className="logo">
            <img src={footerImg} alt="" className="footer__img pointer" />
          </div>
          <div className="navigation pxy__30">
            <ul className="navbar d__flex">
              <a href="#Home">
                <li className="nav__items mx__15">Inicio</li>
              </a>
              <a href="#About">
                <li className="nav__items mx__15">Nosotros</li>
              </a>
              <a href="#Instalaciones">
                <li className="nav__items mx__15">Instalaciones</li>
              </a>
              <a href="#Contact">
                <li className="nav__items mx__15">Contacto</li>
              </a>
              <div className="btn-container">
                <div className="buttons">
                  <button onClick={() => {
                    navigate('/')
                    localStorage.clear()
                  }} >Cerrar sesion</button>
                  <div>
                    <select onChange={onChange}>
                      <option className="display" >Actividades</option>
                      <option value="conAct" >Oferta de actividades</option>
                      <option value="conReg">Actividades agendadas</option>
                      <option value="perInfo">Informacion personal</option>
                    </select>
                  </div>
                </div>
              </div>
            </ul>
          </div>
          {/* Toogle Menu */}
          <div className="toggle__menu">
            <IconButton edge="start" color="inherit" onClick={() => setShow(!show)}>
              <Menu style={{ color: "white", fontSize: "40px" }} />
            </IconButton>
          </div>
          {show ? (
            <div className="sideNavbar">
              <ul className="sidebar d__flex">

                <li className="sideNavbar">
                  <a href="#home">Inicio</a>
                </li>
                <li className="sideNavbar">
                  <a href="#about">Nosotros</a>
                </li>
                <li className="sideNavbar">
                  <a href="#portfolio">Instalaciones</a>
                </li>
                <li className="sideNavbar">
                  <a href="#contact">Contacto</a>
                </li>
                <div className="btn-container">
                  <div className="buttons">
                    <button onClick={() => {
                      navigate('/')
                      localStorage.clear()
                    }} >Cerrar sesion</button>
                    <div className="mini_menu">
                    <select onChange={onChange}>
                      <option className="display">Actividades</option>
                      <option value="conAct">- Oferta de actividades</option>
                      <option value="conReg">- Actividades agendadas</option>
                      <option value="perInfo">- Informacion personal</option>
                    </select>
                    </div>
                  </div>
                </div>
              </ul>
            </div>
          ) : null}
        </div>
        {/* HOME CONTENT */}
        <div className="container">
          <div className="home__content">
            <div className="home__meta">
              <h1 className="home__text pz__10">Bienvenido al gym</h1>
              <h2 className="home__text pz__10">Hola, {nombre}</h2>
              <h3 className="home__text sweet pz__10">Solo tu haces el cambio</h3>
              <h4 className="home__text pz__10">.</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeClient;
