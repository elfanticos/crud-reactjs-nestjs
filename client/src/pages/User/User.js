import React, {useState, useEffect} from 'react';
import './User.css';
import { useHistory, useParams } from 'react-router-dom';
import UserService from '../../providers/user.service';

const User = () => {
    const history = useHistory();
    const { id } = useParams();
    const [name, setName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const rpta = await UserService.searchUserId(id);
        setName(rpta.name);
        setLastName(rpta.lastName);
        setEmail(rpta.email);
        setPassword(rpta.password);
    }

    const cancel = () => {
        history.push('/');
    }

    const submitUser = async (event) => {
        event.preventDefault();
        const dataParams = { name, lastName, email, password };
        try {
            const submit = await ( id ? UserService.edit({...dataParams, _id: id}) : UserService.register(dataParams));
            console.log(submit);
            history.push('/');
        } catch (error) {
            console.log(error);
        }
    }

    const changeName = (event) => setName(event.target.value);
    const changeLastName = (event) => setLastName(event.target.value);
    const changeEmail = (event) => setEmail(event.target.value);
    const changePassword = (event) => setPassword(event.target.value);

    return (
        <div className="margin register-form">
            <div>
                <header>
                    <h1>Registro usuario</h1>
                </header>
            </div>
            <div>
                <form onSubmit={submitUser}>
                    <div className="form-group">
                        <label htmlFor="name">Nombres</label>
                        <input type="text" autoComplete="off" className="form-control" value={name} onChange={changeName} name="name" placeholder="Nombres" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Apellidos</label>
                        <input type="text" autoComplete="off" className="form-control" value={lastName} onChange={changeLastName} name="lastName" placeholder="Apellidos" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Correo</label>
                        <input type="text" autoComplete="off" className="form-control" value={email}  onChange={changeEmail} name="email" placeholder="Correo" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input type="text" autoComplete="off" className="form-control" value={password}  onChange={changePassword} name="password" placeholder="Contraseña" />
                    </div>

                    <div className="d-flex justify-content-end">
                        <button type="submit" className="btn btn-primary margin-right">Registrar</button>
                        <button type="submit" className="btn btn-secondary" onClick={cancel}>Cancelar</button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default User;