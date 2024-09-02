import React, { useState } from 'react'
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies';
import { Alert } from 'react-bootstrap';
import "./Banner.style.css";


function Banner() {
  const {data,isLoading,error,isError} = usePopularMoviesQuery();

  if (matchMedia("screen and (max-width: 600px)").matches) {
    console.log("hello");
  }

  if(isLoading){
    return (<h1>...Loading...</h1>);
  }
  if(isError){
    return (<Alert variant='danger'>{error.message}</Alert>);
  }
  return(
    <div
    className='banner'
    style={
      {
    backgroundImage: "url("+`https://media.themoviedb.org/t/p/w300_and_h450_bestv2/${data.results[0].poster_path}`+")"
      }
    }
    >
    <div className='text-white text-area'>
      <h1>{data.results[0].title}</h1>
      <p>{data.results[0].overview}</p>

    </div>
  </div>);
}

export default Banner;
