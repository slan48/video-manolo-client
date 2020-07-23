import React from 'react';
import {useSelector} from "react-redux";
import Link from "next/link";
import Loader from "./Loader";

const MoviesList = () => {
  const movies = useSelector(state => state.movies)
  return (
    <>
      <div className="movies-list-component">
        {movies && movies.length ?
          <div className="row">
            {movies.map(movie => (
              <div key={movie._id} className="col-md-3">
                <div className="movies-list-item" style={{backgroundImage: `url(${movie.image})`}}>
                  <div className="movie-info-container">
                    <h4>{movie.title}</h4>
                    <div className="movie-info-inner">
                      <p>{movie.description}</p>
                      <Link href="/movies/[movieId]" as={`/movies/${movie._id}`}>
                        <a className="btn btn-outline-light" href={`/movies/${movie._id}`}>
                          Ver más
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          :
          <div className="loader-container">
            <Loader />
          </div>
        }
      </div>
      <style jsx>{`
         .movies-list-component{
          padding: 50px 0;          
         }
         
        .movies-list-item{
          height: 300px;
          margin-bottom: 30px;
          position: relative;
          transition: all 0.3s ease;
         
          
          .movie-info-inner{
            text-align: center;
            opacity: 0;
            transition: all 0.5s ease;
            position: absolute;
            padding-bottom: 20px;
          }
          
          &:hover{
            transform: scale(1.1); 
           
            .movie-info-inner{
              position: static;
              opacity: 1;
            }
          }
        }
        
        .movie-info-container{
          position: absolute;
          bottom: 0;
          left: 0;
          height: 50%;
          width: 100%;
          background-image: linear-gradient(180deg,transparent,rgba(0,0,0,.8));
          border-radius: inherit;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          flex-direction: column;
          color:#fff;
        }
      `}</style>
    </>
  );
};

export default MoviesList;
