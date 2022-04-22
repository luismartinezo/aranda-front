import React, { useEffect } from "react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Role from "../Role/Role";
import User from "../User/User";
import Permissions from "../Permissions/Permissions";
import NotFound from '../NotFound/NotFound';
import '../../App.css';
import {
  Routes,
  Route
} from "react-router-dom";

const Home = (props) => {
  const cookies = new Cookies();

  const navigation = useNavigate();


  // Si no existe cookies redirect al login
  useEffect(() => {
    if (!cookies.get("id")) {
      navigation('/');
    }
  }, []);

  return (
    <><div className="nav">
    </div><div className="flex">
        <Sidebar />
        <div className="container w-100">
          <Navbar />
          <Routes>
            <Route path="/role" element={<Role />} />
            <Route path="/user" element={<User />} />
            <Route path="/permission/*" element={<Permissions />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div></>


  );

}
export default Home;
