import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import './Main.css';
import UserService from '../../providers/user.service';

const Main = () => {
    const history = useHistory();
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({});

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const rpta = await UserService.userList();
        setUsers(rpta || []);
        setUser((rpta.find(row => row._id === localStorage.getItem('id'))) || {});
    }


    const registerUser = () => {
        history.push('/user/register');
    }

    const closeSession = () => {
        localStorage.removeItem('id');
        history.push('/');
    }

    const editUser = (selectUser) => {
        history.push(`user/${selectUser._id}/edit`);
    }

    const removeUser = async (selectUser) => {
        await UserService.removeUser(selectUser._id);
        const rpta = await UserService.userList();
        if (localStorage.getItem('id') === selectUser._id) {
            localStorage.removeItem('id');
        }
        setUsers(rpta);
    }

    return (
        <div>
            <div className="d-flex justify-content-end toolbar">
                <div>
                    <ul>
                        <li>{user.name || ''} {user.lastName || ''}</li>
                        <li>{user.email}</li>
                        <li><button type="button" className="btn btn-info" onClick={closeSession}>Cerrar sessión</button> </li>
                    </ul>
                </div>
            </div>
            <div className="page-main">
                <div className="title-main">
                    <header>
                        <h1>Lista de usuarios</h1>
                    </header>
                </div>
                <div>
                    <div className="margin-bottom">
                        <button type="button" className="btn btn-primary" onClick={registerUser}>Registrar</button>
                    </div>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <td>Id</td>
                                <td>Nombres</td>
                                <td>Apellidos</td>
                                <td>Correo</td>
                                <td>Acciones</td>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => {
                                return (
                                    <tr key={user._id}>
                                        <td>{user._id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.lastName}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <button type="button" className="btn btn-warning margin-right" onClick={() => {
                                                editUser(user)
                                            }}>Editar</button>
                                            <button type="button" className="btn btn-danger" onClick={() => {
                                                removeUser(user)
                                            }}>Eliminar</button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    );
}

export default Main;