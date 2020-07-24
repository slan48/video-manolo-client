import React, {useEffect, useState} from 'react';
import Link from "next/link";
import axios from "../lib/axios";
import Swal from "sweetalert2";
import Cookies from 'js-cookie';
import {changeLoggedInState, wrapper} from "../store";
import {useDispatch} from "react-redux";
import Router from "next/router";
import cookies from "next-cookies";
import {AuthToken} from "../lib/auth_token";

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

const registro = ({auth}) => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    rut: "",
    address: "",
    phone: ""
  });

  const [loadingHttpRequest, setLoadingHttpRequest] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  useEffect(() => {
    const {email, password, name, rut, address, phone} = form;
    if (email.length && password.length && name.length && rut.length && address.length && phone.length){
      setSubmitDisabled(false)
    } else{
      setSubmitDisabled(true)
    }
  }, [form.email, form.password, form.name, form.rut, form.address, form.phone])

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoadingHttpRequest(true);
    axios.post('users/register', form)
      .then(async res => {
        Cookies.set('token', res.data.token)
        dispatch(changeLoggedInState(true));
        setLoadingHttpRequest(false)
        await Router.push('/')
        Swal.fire({
          title: "Registro exitoso",
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
    <div className="register-page">
      <div className="container">
        <div className="form-box">
          <h2>Regístrate</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input onChange={handleChange} type="text" name="email" placeholder="Correo electrónico" className="form-control" />
            </div>
            <div className="form-group">
              <input onChange={handleChange} type="password" name="password" placeholder="Contraseña" className="form-control" />
            </div>
            <div className="form-group">
              <input onChange={handleChange} type="text" name="name" placeholder="Nombre completo" className="form-control" />
            </div>
            <div className="form-group">
              <input onChange={handleChange} type="text" name="rut" placeholder="RUT" className="form-control" />
            </div>
            <div className="form-group">
              <input onChange={handleChange} type="text" name="address" placeholder="Dirección" className="form-control" />
            </div>
            <div className="form-group">
              <input onChange={handleChange} type="text" name="phone" placeholder="Teléfono" className="form-control" />
            </div>
            <button disabled={loadingHttpRequest || submitDisabled} type="submit" className="btn btn-light">Registrarse</button>
            <p>¿Ya tienes una cuenta? <Link href="/iniciar-sesion"><a href="/iniciar-sesion">Inicia sesión</a></Link></p>
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

export default registro;
