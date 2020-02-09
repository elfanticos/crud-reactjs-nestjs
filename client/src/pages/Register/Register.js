import React, {useState} from 'react';
import {useHistory} from "react-router-dom";
import UserService from '../../providers/user.service';

const Register = () => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const history = useHistory();

    const registerUser = async (event) => {
      event.preventDefault();
      try {
        const dataParams = {email, password};
        const register = await UserService.register(dataParams);
        localStorage.setItem('id' , register._id);
        history.push('/')
      } catch (error) {
          console.log(error);
      }
    }

    const handlerChange = (event) => {
      const {name, value} = event.target;
      if (name === 'email') {
        setEmail(value);
      } else {
        setPassword(value);
      }
    }

    const handlerRedicted = () => {
        history.push('/login');
    }

    return (
      <div className="d-flex flex-column align-items-center margin-top-120">
        <header>
            <h1>Registro</h1>
        </header>
        <section>
            <div>
                <form onSubmit={registerUser}>
                    <div className="form-group">
                        <label htmlFor="email">Correo</label>
                        <input type="email" className="form-control" name="email" onKeyUp={handlerChange} aria-describedby="email"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input type="password" className="form-control" name="password" onKeyUp={handlerChange}/>
                    </div>
                    <div className="d-flex justify-content-between">
                        <button type="submit" className="btn btn-primary">Confirmar</button>
                        <button type="button" className="btn" onClick={handlerRedicted}>Login</button>
                    </div>
                </form>
            </div>
        </section>
      </div>
    );
  }

export default Register;