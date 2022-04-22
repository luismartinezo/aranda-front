import React from 'react';
import {
  BrowserRouter as Rutas,
  Routes,
  Route
} from "react-router-dom";
import '../App.css';
import Login from '../Pages/Login/Login';
import NotFound from '../Pages/NotFound/NotFound';
import Home from "../Pages/Home/Home";

function App() {
  return (
    <Rutas>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/home/*" element={<Home />} />
          <Route exact path="*" element={<NotFound />} />
        </Routes>
    </Rutas>

  );
}

export default App;