import { Alert } from 'react-bootstrap';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import MovieCard from '../MovieCard/MovieCard';
import "./TopRatedMovieSlide.style.css";
import { useMovieTopRatedQuery } from '../../../../hooks/useMovieTopRatedQuery';

const TopRatedMovieSlide = ()=>{

    const {data:top,isError,error,isLoading} = useMovieTopRatedQuery();

    if(isLoading) return <h1>Loading ....</h1>;
    if(isError) return <Alert varient="danger">{error.message}</Alert>;


    const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 6,
        slidesToSlide: 6 // optional, default to 1.
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
        slidesToSlide: 2 // optional, default to 1.
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1 // optional, default to 1.
      }
    }

    return (
      <div>
        <h3>Top Rated Movies</h3>
    <Carousel
    infinite={true}
    centerMode={true}
    itemClass="movie-slider p-1"
    containerClass='carousel-container'
    responsive={responsive}
  >
    {top.results.map((movie,index)=>(
        <MovieCard movie={movie} key={index}/>
    ))}
  </Carousel>
  </div>
  );
}

export default TopRatedMovieSlide;