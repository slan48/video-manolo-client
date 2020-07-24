import React from 'react';
import Link from "next/link";
import {useDispatch, useSelector} from "react-redux";
import Router from "next/router";
import Cookies from 'js-cookie';
import {changeLoggedInState} from "../store";
import Swal from "sweetalert2";

const Header = (props) => {
  const dispatch = useDispatch();
  const loggedIn = useSelector(state => state.loggedIn);

  const handleCloseSession = (e) => {
    e.preventDefault();
    Swal.fire({
      title: 'Cerrar sesión',
      text: '¿Estás seguro que deseas cerrar la sesión?',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Cerrar sesión',
      cancelButtonColor: 'rgba(150,150,150,0.98)',
      confirmButtonColor: '#dc3545',
      focusCancel: true
    })
      .then(res => {
        console.log('cerrar seison', res);
        if (res.isConfirmed){
          Cookies.remove('token')
          dispatch(changeLoggedInState(false))
          Router.push('/');
        }
      })
  }

  return (
    <div className="container">
      <header className="animate__animated animate__fadeIn">
        <h1 onClick={() => Router.push('/')}>Video Manolo</h1>
        <ul>
          <li>
            <Link href="/">
              <a href="/">Home</a>
            </Link>
          </li>
          {!loggedIn ?
            <li>
              <Link href="/iniciar-sesion">
                <a className="btn btn-light" href="/iniciar-sesion">Iniciar sesión</a>
              </Link>
            </li>
            :
            <li>
              <a onClick={handleCloseSession} className="btn btn-danger" href="/cerrar-sesion">Cerrar sesión</a>
            </li>
          }
        </ul>
        <style jsx>{`
        h1{
          cursor: pointer;
        }

        header{
          color: #fff;
          background: #000;  
          padding: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        
        ul{
          list-style-type: none;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          padding: 0;
          margin: 0;
          
          a:not(.btn){
            padding: 0 20px;
            color: #fff;
          }
        }
      `}</style>
      </header>
    </div>
  );
};

export default Header;
