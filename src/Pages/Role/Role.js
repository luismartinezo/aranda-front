import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import * as FaIcons from 'react-icons/fa';
import { Table, Button, Container, Modal, ModalBody, ModalHeader, ModalFooter, FormGroup } from 'reactstrap';

const Role = () => {
  const baseUrl = "https://localhost:7221/api/roles";
  const [error] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState([]);
  const [modalInsert, setModalInsert] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  const [form, setForm] = useState({
    id: '',
    name: '',
    description: ''
  })

  const handleInputChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  // Mostrar y Cerrar el Modal
  const showCloseModalInsert = () => {
    setModalInsert(!modalInsert);
  };
  const showCloseModalEdit = () => {
    setModalEdit(!modalEdit);
  };
  const showCloseModalDelete = () => {
    setModalDelete(!modalDelete);
  };

  // Get all Roles
  const getRoles = async () => {
    await fetch(baseUrl)
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
  // Add Role
  const addRole = async () => {
    delete form.id;
    await axios.post(baseUrl, form)
      .then(response => {
        setData(data.concat(response.data));
        showCloseModalInsert();
      }).catch(error => {
        console.error(error);
      })
  };
  // Update Role
  const updateRole = async () => {
    await axios.put(baseUrl+"/"+ form.id,form)
      .then(response => {
        var result = response.data;
        var dataAux = data;
        dataAux.map(role=>{
          if (role.id===form.id) {
            role.name = result.name;
            role.description = result.description;
          }
        });
        showCloseModalEdit();
      }).catch(error => {
        console.error(error);
      })
  };

  // Delete Role
  const deleteRole = async () => {
    await axios.delete(baseUrl+"/"+ form.id)
      .then(response => {
        setData(data.filter(role=>role.id!== response.data));
        showCloseModalDelete();
      }).catch(error => {
        console.error(error);
      })
  };

  const selectRole = (role, caso) => {
    setForm(role);
    (caso==="Edit")? 
    showCloseModalEdit(): showCloseModalDelete();
  }
  useEffect(() => {
    getRoles();
  }, []);
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <Container>
          <br /><Button color="success" onClick={() => showCloseModalInsert()}><FaIcons.FaPlusCircle className="me-2" />Add</Button><br /><br />
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Description</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data.map(roles => (
                <tr key={roles.id}>
                  <th>{roles.id}</th>
                  <td>{roles.name}</td>
                  <td>{roles.description}</td>
                  <td>
                    <button className="btn btn-warning" onClick={() => selectRole(roles, "Edit")}>Edit</button>{" "}
                    <button className="btn btn-danger" onClick={() => selectRole(roles, "Delete")}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
        <Modal isOpen={modalInsert}>
          <ModalHeader>
            <div><h3>Insert Roles</h3></div>
          </ModalHeader>

          <ModalBody>
          <FormGroup>
              <input
                className="form-control"
                readOnly
                hidden
                name="id"
                type="text"
                value={form && form.id}
              />
            </FormGroup>
            <FormGroup>
              <label>
                name:
              </label>
              <input
                className="form-control"
                name="name"
                type="text"
                required
                onChange={handleInputChange}
              />
            </FormGroup>

            <FormGroup>
              <label>
                description:
              </label>
              <input
                className="form-control"
                name="description"
                required
                type="text"
                onChange={handleInputChange}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => addRole()}
            >
              Insert
            </Button>
            <Button
              className="btn btn-danger"
              onClick={() => showCloseModalInsert()}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        
        {/* Modal Update */}
        <Modal isOpen={modalEdit}>
          <ModalHeader>
            <div><h3>Update Roles</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
                Id:
              </label>
              <input
                className="form-control"
                readOnly
                name="id"
                type="text"
                value={form && form.id}
              />
            </FormGroup>

            <FormGroup>
              <label>
                name:
              </label>
              <input
                className="form-control"
                name="name"
                type="text"
                value={form && form.name}
                required
                onChange={handleInputChange}
              />
            </FormGroup>

            <FormGroup>
              <label>
                description:
              </label>
              <input
                className="form-control"
                name="description"
                required
                type="text"
                value={form && form.description}
                onChange={handleInputChange}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => updateRole()}
            >
              Update
            </Button>
            <Button
              className="btn btn-danger"
              onClick={() => showCloseModalEdit()}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        
                {/* Delete */}
        <Modal isOpen={modalDelete}>
          <ModalBody>
            <FormGroup>
              <label>
                ¿sure you want to delete the role {form && form.name}?
              </label>
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => deleteRole()}
            >
              Yes
            </Button>
            <Button
              className="btn btn-danger"
              onClick={() => showCloseModalDelete()}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </>
    )
  }
}
export default Role;