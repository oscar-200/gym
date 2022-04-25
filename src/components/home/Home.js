import React, { useState } from "react";
import "./../../css/Home.css";
import close from "./../../assets/img/cancelar.png";
import FormLogin from './FormLogin';
import Menu from '@material-ui/icons/Menu';
import { IconButton } from '@material-ui/core'
import logo from "./../../assets/img/LogoBonita2.png";


function Home() {

  // fixed Header
  window.addEventListener("scroll", function () {
    const header = document.querySelector(".header");
    header.classList.toggle("active", window.scrollY > 0);
  });
  // Toogle Menu

  const [show, setShow] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  function openLogin() {
    setShowLogin(!showLogin);
  }

  return (
    <div className="home" id="Home">
      {showLogin ? (
        <div className="window_login">
          <div >
            <a onClick={() => setShowLogin(!showLogin)}><img src={close} alt="" className="cancel_img" /></a>
          </div>
          <FormLogin />

        </div>
      ) : null}
      <div className="home__bg">
        <div className="header d__flex align__items__center pxy__30">
          <div className="logo">
            <img src={logo} alt="" />
          </div>
          <div className="navigation pxy__30">
            <ul className="navbar d__flex">
              <a href="#Home">
                <li className="nav__items mx__15">Home</li>
              </a>
              <a href="#About">
                <li className="nav__items mx__15">Sobre nosotros</li>
              </a>
              <a href="#Instalaciones">
                <li className="nav__items mx__15">Instalaciones</li>
              </a>
              <a href="#Contact">
                <li className="nav__items mx__15">Contact</li>
              </a>
              <div className="btn-container">
                <div className="buttons">
                  <button onClick={openLogin} >Iniciar sesion</button>
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
                    <button onClick={openLogin} >Iniciar sesion</button>
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
              <h1 className="home__text pz__10">Gym Bonita</h1>
              <h2 className="home__text pz__10">Hola!!</h2>
              <h3 className="home__text sweet pz__10">Solo tu haces el cambio.</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
