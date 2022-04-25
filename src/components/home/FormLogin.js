import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import swal from "sweetalert";


export default function FormLogin() {

  const [body, setBody] = useState({ username: "", password: "" })
  const navigate = useNavigate();

  const inputChange = ({ target }) => {
    const { name, value } = target
    setBody({
      ...body,
      [name]: value
    })
  }

  const onSubmit = (e) => {

    e.preventDefault();
    console.log(body)
    axios.post('http://localhost:4000/api/login/emp', body)
      .then(({ data }) => {
        console.log(data)
        if (data.rol === "gerente") {
          localStorage.setItem('auth', `"g-${data.id}"`)
          navigate('/gerente')
        }
        else if (data.rol === "encargado") {
          localStorage.setItem('auth', `"e-${data.id}"`)
          navigate('/encargado')
        }
        else if(data.rol === "maestro"){
          localStorage.setItem('auth', `"m-${data.id}"`)
          navigate('/maestro')
        }
      })
      .catch(({ response }) => {
        console.log(response)
        axios.post('http://localhost:4000/api/login/clientes', body)
          .then(({ data }) => {
            console.log(data)
              localStorage.setItem('auth', `"c-${data.id}"`)
              navigate('/gerente')
          })
          .catch(({ response }) => {
            console.log(response)
            swal({
              text: `Usuario y/o contraseña incorrecto`,
              icon: "error",
              button: "Aceptar"
          })
          })
      })
  }
  return (

    <form onSubmit={onSubmit} className="form-login">
      <p>Inicia Sesion</p>
      <br />
      <div className="container">

        <div className="input-container">
          <p>Nombre</p>
          <input name="username" onChange={inputChange} type="text" value={body.username} id="email" placeholder="" />
        </div>

        <div className="input-container">
          <p>Contraseña</p>
          <input name="password" onChange={inputChange} type="password" value={body.password} id="password" placeholder="" />
        </div>
      </div>
      <button type="submit" className="button-form">Iniciar Sesion</button>
    </form>

  )
}
