import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setMovie} from "../../store";
import Loader from "../../components/Loader";
import {useRouter} from "next/router";

const Movie = () => {
  const dispatch = useDispatch();
  const { movieId } = useRouter().query
  useEffect(() => {
    dispatch(setMovie(movieId));
  }, [])

  const movie = useSelector(state => state.selectedMovie)

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
                <div className="movie-info-box">
                  <h2>{movie.title}</h2>
                  <p>{movie.description}</p>
                  <p className="movie-addional-info">
                    Actores: {movie.actors.map((actor, index) => movie.actors.length === (index + 1) ? actor : actor + ', ')}
                    <br />
                    Director: {movie.directors.map((actor, index) => movie.directors.length === (index + 1) ? actor : actor + ', ')}
                  </p>
                  <button className="btn btn-light">Reservar</button>
                </div>
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
      `}</style>
    </>
  );
};

export default Movie;
