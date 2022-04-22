import React from "react";
import './Sidebar.css';
import { NavLink } from "react-router-dom";
import * as FaIcons from 'react-icons/fa';

export default function Sidebar() {

    return (
        <div className="sidebar bg-light">
            <ul>
                <li>
                    <NavLink to="permission" className="text-dark rounded py-2 w-100 d-inline-block px-3"><FaIcons.FaExpeditedssl className="me-2" />Permissions</NavLink>
                </li>
                <li>
                    <NavLink to="role" className="text-dark rounded py-2 w-100 d-inline-block px-3"><FaIcons.FaUserTie className="me-2" />Roles</NavLink>
                </li>
                <li>
                    <NavLink to="user" className="text-dark rounded py-2 w-100 d-inline-block px-3"><FaIcons.FaUser className="me-2" />Users</NavLink>
                </li>
            </ul>
        </div>
    );

}