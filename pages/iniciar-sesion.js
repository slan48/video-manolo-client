import React, {useEffect, useState} from 'react';
import Link from "next/link";
import axios from "../lib/axios";
import Swal from "sweetalert2";
import Cookies from 'js-cookie';
import {changeLoggedInState, wrapper} from "../store";
import {useDispatch} from "react-redux";
import Router from "next/router";
import {AuthToken} from "../lib/auth_token";
import cookies from "next-cookies";

export const getServerSideProps = wrapper.getServerSideProps(
  (context) => {
    console.log('2. Page.getServerSideProps uses the store to dispatch things');
    const auth = new AuthToken(cookies(context).token);
    if (auth.isValid()){
      context.res.writeHead(302, {
        Location: '/',
      });
      context.res.end();
      context.store.dispatch(changeLoggedInState(true));
    } else{
      context.store.dispatch(changeLoggedInState(false));
    }
  }
);

const iniciarSesion = () => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [loadingHttpRequest, setLoadingHttpRequest] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  useEffect(() => {
    if (form.email.length && form.password.length){
      setSubmitDisabled(false)
    } else{
      setSubmitDisabled(true)
    }
  }, [form.email, form.password])

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoadingHttpRequest(true);
    axios.post('users/login', form)
      .then(async res => {
        dispatch(changeLoggedInState(true));
        setLoadingHttpRequest(false)
        await AuthToken.storeToken(res.data.token, '/');
        Swal.fire({
          title: "Inicio de sesión exitoso",
          text: 'Ahora puede reservar las películas que desee',
          icon: "success"
        })
      })
      .catch(e => {
        console.log(e);
        Swal.fire({
          title: "Ha ocurrido un error",
          text: e.response ? e.response.data.message : e.message,
          icon: "error"
        })
        setLoadingHttpRequest(false)
      })
  }

  return (
    <div className="login-page">
      <div className="container">
        <div className="form-box">
          <h2>Iniciar sesión</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input onChange={handleChange} type="text" name="email" placeholder="Correo electrónico" className="form-control" />
            </div>
            <div className="form-group">
              <input onChange={handleChange} type="password" name="password" placeholder="Contraseña" className="form-control" />
            </div>
            <button disabled={loadingHttpRequest || submitDisabled} type="submit" className="btn btn-light">Iniciar sesión</button>
            <p>¿No tienes cuenta? <Link href="/registro"><a href="/registro">Regístrate</a></Link></p>
          </form>
        </div>
      </div>

      <style jsx>{`
        .form-box{
          max-width: 400px;
          padding: 30px;
          border: 1px solid #797979;
          margin: 50px auto 50px;
          color: #fff;
          text-align: center;
          
          h2{
            margin-bottom: 50px;
          }
          
          p{
            margin-top: 50px;
          }
          
          a{
            color: #fff;
            text-decoration: underline;
          }
        }
      `}</style>
    </div>
  );
};

export default iniciarSesion;
