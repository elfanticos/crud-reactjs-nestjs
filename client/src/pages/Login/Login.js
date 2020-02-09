
import React, {useState} from 'react';
import {useHistory} from "react-router-dom";
import UserService from '../../providers/user.service';

const Login = ()=> {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const history = useHistory();
    const autenticateUser = async (event) => {
      event.preventDefault();
      try {
        const user = await UserService.login({email, password});
        console.log('user => ', user);
        localStorage.setItem('id', user._id);
        history.push('/');
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
        history.push('/register');
    }

    return (
      <div className="d-flex flex-column align-items-center margin-top-120">
        <header>
            <h1>Login</h1>
        </header>
        <section>
            <div>
                <form onSubmit={autenticateUser}>
                    <div className="form-group">
                        <label htmlFor="email">Correo</label>
                        <input type="email" className="form-control" name="email" onKeyUp={handlerChange} aria-describedby="email"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input type="password" className="form-control" name="password" onKeyUp={handlerChange}/>
                    </div>
                    <div className="d-flex justify-content-between">
                        <button type="submit" className="btn btn-primary">Aceptar</button>
                        <button type="button" className="btn" onClick={handlerRedicted}>Registrar</button>
                    </div>
                </form>
            </div>
        </section>
      </div>
    );
  }

export default Login;