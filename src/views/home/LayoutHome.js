import About from "./../../components/home/About";
import Contact from "./../../components/home/Contact";
import Footer from "./../../components/home/Footer";
import Home from "./../../components/home/Home";
import Instalaciones from "./../../components/home/Instalaciones";
import React from 'react'

export default function NoLogin() {
  return (
    <div className="App">
      <Home />
      <About />
      <Instalaciones />
      <Contact />
      <Footer />
    </div>
  )
}
