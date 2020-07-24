import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {changeLoggedInState, setMovie, wrapper} from "../../store";
import Loader from "../../components/Loader";
import {useRouter} from "next/router";
import cookies from "next-cookies";
import Swal from "sweetalert2";
import {AuthToken} from "../../lib/auth_token";
import Router from "next/router";
import axios from "../../lib/axios";
import Link from "next/link";

export const getServerSideProps = wrapper.getServerSideProps(
  (context) => {
    console.log('2. Page.getServerSideProps uses the store to dispatch things');
    const auth = new AuthToken(cookies(context).token);
    if (auth.isValid()){
      context.store.dispatch(changeLoggedInState(true));
    } else{
      context.store.dispatch(changeLoggedInState(false));
    }

    return {
      props: {token: auth.token ? auth.token : ""}
    }
  }
);

const Movie = ({token}) => {
  const dispatch = useDispatch();
  const { movieId } = useRouter().query

  const movie = useSelector(state => state.selectedMovie)
  const loggedIn = useSelector(state => state.loggedIn);
  const [loadingHttpRequest, setLoadingHttpRequest] = useState(false);
  const [reservationInfo, setReservationInfo] = useState(null);

  useEffect(() => {
    dispatch(setMovie(movieId));
  }, [reservationInfo])

  const handleStartReservation = async (e) => {
    e.preventDefault();
    if (!loggedIn) return Router.push('/iniciar-sesion')

    setLoadingHttpRequest(true)
    axios.defaults.headers.common['Authorization'] = token;

    try{
      const res = await axios.post('reservations/start', {movieId: movie._id});
      setReservationInfo(res.data.reservation);
      setLoadingHttpRequest(false)
    } catch (e) {
      console.log(e);
      Swal.fire({
        title: "Ha ocurrido un error",
        text: e.response ? e.response.data.message : e.message,
        icon: "error"
      })
      setLoadingHttpRequest(false)
    }
  }

  const handleCompleteReservation = async (e) => {
    e.preventDefault();
    if (!loggedIn) return Router.push('/iniciar-sesion')

    setLoadingHttpRequest(true)
    axios.defaults.headers.common['Authorization'] = token;

    try{
      const res = await axios.patch('reservations/complete/' + reservationInfo._id);
      setReservationInfo(res.data.reservation);
      setLoadingHttpRequest(false)
    } catch (e) {
      console.log(e);
      Swal.fire({
        title: "Ha ocurrido un error",
        text: e.response ? e.response.data.message : e.message,
        icon: "error"
      })
      setLoadingHttpRequest(false)
    }
  }

  return (
    <>
      <div className="single-movie-page">
        <div className="container">
          {!movie ?
            <div className="loader-container">
              <Loader />
            </div>
            :
            <div className="row animate__animated animate__fadeIn">
              <div className="col-md-4">
                <img className="movie-image" src={movie.image} alt=""/>
              </div>
              <div className="col-md-8">
                {!reservationInfo &&
                  <div className="movie-info-box">
                    <h2>{movie.title}</h2>
                    <p>{movie.description}</p>
                    <p className="movie-addional-info">
                      Actores: {movie.actors.map((actor, index) => movie.actors.length === (index + 1) ? actor : actor + ', ')}
                      <br />
                      Director: {movie.directors.map((actor, index) => movie.directors.length === (index + 1) ? actor : actor + ', ')}
                    </p>
                    <p>
                      Cantidad disponible para reserva: {movie.stock}
                    </p>
                    <button onClick={handleStartReservation} className="btn btn-light" disabled={loadingHttpRequest || movie.stock === 0}>
                      {movie.stock > 0 ? 'Reservar' : 'No hay stock disponible'}
                    </button>
                  </div>
                }
                {reservationInfo && reservationInfo.status === 'pending' &&
                  <div className="movie-info-box">
                    <h2>Reservación iniciada: {movie.title}</h2>
                    <p>{movie.description}</p>
                    <hr/>
                    <p>
                      <span className="font-weight-bold">Nota:</span><br />
                      La reserva ha iniciado correctamente, en este momento tienes 5 minutos para completar la reservación haciendo clic
                      en el siguiente botón. Una vez transcurridos los 5 minutos, en caso de no completarse la reserva, se liberará la película para ser reservada nuevamente.
                    </p>
                    <button onClick={handleCompleteReservation} className="btn btn-success" disabled={loadingHttpRequest}>Completar reserva</button>
                  </div>
                }
                {reservationInfo && reservationInfo.status === 'reserved' &&
                  <div className="movie-info-box">
                    <p className="font-weight-bold">¡Felicidades!</p>
                    <h2>Has reservado exitosamente: {movie.title}</h2>
                    <p>Número de reserva: {reservationInfo._id}</p>
                    <hr/>
                    <Link href="/">
                      <button className="btn btn-light" disabled={loadingHttpRequest}>Volver al listado de películas</button>
                    </Link>
                  </div>
                }
              </div>
            </div>
          }
        </div>
      </div>
      <style jsx>{`
        .single-movie-page{
          padding: 50px 0;
        }

        .movie-image{
          width: 100%;
        }

        .movie-info-box{
          border: 1px solid #797979;
          background: #3e3e3e;
          padding: 30px;
          color: #fff;
        }
        
        hr{
          border-color: #fff;
        }
      `}</style>
    </>
  );
};

export default Movie;
