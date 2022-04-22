import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import md5 from "md5";

import Cookies from "universal-cookie";
import axios from "axios";
import './Login.css';
import wave from '../../Assets/img/wave.png';
import bg from '../../Assets/img/bg.svg';
import avatar from '../../Assets/img/avatar.svg';
import Title from './components/Title/Title';
import { useNavigate } from "react-router-dom";
const cookies = new Cookies();

function Login(props) {

  const baseUrl = "https://localhost:7221/api/users";
  //   Instancia para las cookies
  

  // Validacion de form
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigation = useNavigate();
  //   Almacenamos lo que el usuario este escribiendo
  const [form, setForm] = useState({
    nombre: '',
    contrasena: '',
  })

  //   Capturar y setear en el estado el valor que el usuario esta escribiendo en el form
  const handleInputChange = (event) => {
    if (event.target.value === 'nombre') {
      setForm({
        ...form,
        [event.target.name]: event.target.value,
      });
    } 
  }

  // Metodo para el inicio de sesion

  const onSubmit = (data, e) => {
    console.log(data)
    e.target.reset();
    axios.get(baseUrl + `/${data.nombre}/${md5(data.contrasena)}`)
      .then((response) => {
        return response.data;
        
      })
      .then((response) => {
        //   Si se tiene respuesta se guarda la info en las cookies
        if (response.length > 0) {
          var respuesta = response[0];
          cookies.set("id", respuesta.id, { path: "/" });
          cookies.set("name", respuesta.name, { path: "/" });
          cookies.set("password", respuesta.password, { path: "/" });
          cookies.set("full_Names", respuesta.full_Names, { path: "/" });
          cookies.set("address", respuesta.address, { path: "/" });
          cookies.set("telephone", respuesta.telephone, { path: "/" });
          cookies.set("email", respuesta.email, { path: "/" });
          cookies.set("age", respuesta.age, { path: "/" });

          alert(
            "Bienvenido: " + respuesta.full_Names
          );
          //   Redireccion al home
          navigation('/home');
        } else {
          alert("El usuario o la contraseña no son correctos");
        }
      })

      .catch((error) => {
        console.log(error);
      });
  };
  // Si existe cookies deja pasar al home y no deja regresar al login
  useEffect(() => {
    if (cookies.get("id")) {
      navigation('/home')
    }
  }, [cookies, navigation]);
  return (
    <div className="contenedor">
      <img className="wave" src={wave} alt="wave" />
      <div className="login-container">
        <div className="img">
          <img src={bg} alt="bg" />
        </div>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <img src={avatar} alt="avatar" />
          <Title text="ArandaSoft" />
          <input
            name="nombre"
            type="text"
            placeholder="Enter you user"
            className="input-control"
            onChange={handleInputChange}
            {...register("nombre", { required: true })}
          />
          {errors.nombre && <span className="alerta">This field is required</span>}
          <br></br>
          <input
            name="contrasena"
            type="password"
            placeholder="Enter you password"
            className="input-control"
            {...register("contrasena", { required: true, minLength: 6, maxLength: 20 })}
            onChange={handleInputChange}
          />
          {errors.contrasena && errors.contrasena.type === "required" && <span className="alerta">This field is required</span>}
          {errors.contrasena && errors.contrasena.type === "minLength" && <span className="alerta">Minimum 6 characters required</span>}
          {errors.contrasena && errors.contrasena.type === "maxLength" && <span className="alerta">Maximum 20 characters required</span>}
          <button className="boton" type="submit" >
            Login
          </button>
        </form>
      </div>

    </div>
  );
}
export default Login;
