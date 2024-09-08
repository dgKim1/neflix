import React from 'react'
import Banner from './components/Banner/Banner';
import PopularMovieSlide from './components/PopularMovieSlide/PopularMovieSlide';
import TopRatedMovieSlide from './components/PopularMovieSlide/TopRatedMovieSlide';
function Homepage() {
  return (
    <div>
      <Banner/>
      <PopularMovieSlide/>
      <TopRatedMovieSlide/>
    </div>
  )
}

export default Homepage;
