import Head from 'next/head'
import MoviesList from "../components/MoviesList";
import {useDispatch} from "react-redux";
import {setMovies} from "../store";
import {useEffect} from "react";

export default function Home({movies}) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setMovies());
  }, [])

  return (
    <>
      <Head>
        <title>Video Manolo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="main-banner animate__animated animate__fadeIn animate__slow">
        <p>Reserva las mejores películas</p>
      </div>

      <div className="main-content">
        <div className="container">
          <MoviesList />
        </div>
      </div>

      <style jsx>{`
        .main-banner{
          height: 400px;
          background-image: url('/img/movie-theater-bg.jpg');
          background-size: cover;
          background-position: center;
          
          p{
            text-align: center;
            color: white;
            padding-top: 40px;
            font-size: 30px;
          }
        }
        
        .main-content{
          background: #000;
        }
      `}</style>
    </>
  )
}
