import React, {useEffect} from 'react';
import Cookies from 'universal-cookie';
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import './Navbar.css';
export default function Navbar() {
    const cookies = new Cookies();

  const navigation = useNavigate();

  //   Elimina las cookies
  const cerrarSesion = () => {
    cookies.remove("id", { path: "/"});
    cookies.remove("name", {path: "/" });
    cookies.remove("full_Names", {path: "/"});
    cookies.remove("address", {path: "/"});
    cookies.remove("telephone", {path: "/"});
    cookies.remove("email", {path: "/"});
    cookies.remove("age", {path: "/"});
    cookies.remove("username", {path: "/"});
    cookies.remove("password", {path: "/"});
    navigation('/');
  };
   // Si no existe cookies redirect al login
   useEffect(() => {
    if (!cookies.get("id")) {
      navigation('/');
    }
  }, []);
    return (
        <div className="container-fluid">
          <a href="/home" className="navbar-brand">ArandaSoft</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
            <div className="dropdown">
                Bienvenido &nbsp;&nbsp;
              <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
              {cookies.get('full_Names')}
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li className="dropdown-item" href="#">Perfil</li>
                <li className="dropdown-item" href="#">Another action</li>
                <li className="dropdown-item" onClick={()=>cerrarSesion()}>Cerrar Sesión</li>
              </ul>
          </div>
  <hr />
        </div>
        
    )
}

