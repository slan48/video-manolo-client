import React from 'react';
import Link from "next/link";
import { useSelector } from "react-redux";
import Router from "next/router";

const Header = (props) => {
  const loggedIn = useSelector(state => state.loggedIn);

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
                <a href="/iniciar-sesion">Iniciar sesión</a>
              </Link>
            </li>
            :
            <li>
              <a href="/cerrar-sesion">Cerrar sesión</a>
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
          
          a{
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
