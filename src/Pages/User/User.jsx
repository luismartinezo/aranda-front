
import React, { useState, useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';

export default function User() {
  const baseUrl = "https://localhost:7221/api/users";
  const [error] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState([]);

  const getUsers = () => {
    fetch(baseUrl)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setData(result);
        },
        (error) => {
          setIsLoaded(true);
          setData(error);
        }
      )
  };
  // Si existe cookies deja pasar al home y no deja regresar al login
  useEffect(() => {
    getUsers();
  }, []);
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <><button className="btn btn-primary mr-10"><FaIcons.FaPlusCircle className="me-2" />Add</button>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">LastName</th>
            <th scope="col">Address</th>
            <th scope="col">Telephone</th>
            <th scope="col">Email</th>
            <th scope="col">Age</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map(users => (
            <tr key={users.id}>
              <th scope="row">{users.id}</th>
              <td>{users.name}</td>
              <td>{users.full_Names}</td>
              <td>{users.address}</td>
              <td>{users.telephone}</td>
              <td>{users.email}</td>
              <td>{users.age}</td>
              <td>
                <button className="btn btn-warning">Edit</button>
                <button className="btn btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table></>
    )
  }
}