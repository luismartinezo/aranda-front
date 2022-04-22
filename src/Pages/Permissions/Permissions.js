import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Container, Modal, ModalBody, ModalHeader, ModalFooter, FormGroup } from 'reactstrap';
import * as FaIcons from 'react-icons/fa';

const Permission = () => {
    const baseUrl = "https://localhost:7221/api/permissions";
    const [error] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState([]);

    const [form, setForm] = useState({
        id: '',
        name: '',
        description: '',
        modalInsert: false
    })

    // const state = {
    //     data: data,
    //     form: {
    //         id: '',
    //         name: '',
    //         description: '',
    //     },
    //     modalInsert: false
    // };

    const insert = () => {
        var newValue = { ...this.state.form };
        newValue.id = this.state.data.length + 1;
        var lista = this.state.data;
        lista.push(newValue);
        this.setData({ modalInsert: false, data: lista });
    }
    const handleInputChange = (e) => {
        if (e.target.value === 'nombre') {
            setForm({
                ...form,
                [e.target.name]: e.target.value
            });
        }
    }
    const showModalInsert = () => {
        setData({ modalInsert: true });
    };

    const closeModalInsert = () => {
        setData({ modalInsert: false });
    };
    const getPermissions = () => {
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
        getPermissions();
    }, []);
    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <><Container>
                <br /><Button color="success" onClick={() => showModalInsert()}><FaIcons.FaPlusCircle className="me-2" />Add</Button><br /><br />
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
                        {/* {data.map(roles => (
                            <tr key={roles.id}>
                                <th>{roles.id}</th>
                                <td>{roles.name}</td>
                                <td>{roles.description}</td>
                                <td>
                                    <Button className="warning">Edit</Button>{" "}
                                    <Button className="danger">Delete</Button>
                                </td>
                            </tr>
                        ))} */}
                            <tr key='1'>
                                <th>1</th>
                                <td>admin</td>
                                <td>administrador</td>
                                <td>
                                    <Button className="warning">Edit</Button>{" "}
                                    <Button className="danger">Delete</Button>
                                </td>
                            </tr>
                    </tbody>
                </Table>
            </Container>
                <Modal isOpen={data.modalInsert}>
                    <ModalHeader>
                        <div><h3>Insert Permissions</h3></div>
                    </ModalHeader>

                    <ModalBody>
                        <FormGroup>
                            <label>
                                Id:
                            </label>

                            <input
                                className="form-control"
                                readOnly
                                type="text"
                                value={data.length + 1}
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
                                type="text"
                                onChange={handleInputChange}
                            />
                        </FormGroup>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            color="primary"
                            onClick={() => insert()}
                        >
                            Insertar
                        </Button>
                        <Button
                            className="btn btn-danger"
                            onClick={() => closeModalInsert()}
                        >
                            Cancelar
                        </Button>
                    </ModalFooter>
                </Modal></>
        )
    }
}

export default Permission;