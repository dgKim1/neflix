import React from 'react'
import { Alert, Badge, Button, CloseButton, Col, Container, Modal, Row } from 'react-bootstrap';
import { useParams, useSearchParams } from 'react-router-dom';
import { useMovieDetailQuery, useMovieReviewQuery } from '../../hooks/useMovieDetail';
import { MdStars } from "react-icons/md";
import { FaPeopleGroup } from "react-icons/fa6";
import "./MovieDetailPage.style.css";
import { useState } from 'react';
import { useRecommendMoviesQuery } from '../../hooks/useMovieRecommend';
import MovieCard from '../Homepage/components/MovieCard/MovieCard';
import { useMovieVideoQuery } from '../../hooks/getMovieVideo';
import YouTube from 'react-youtube';
import { IoIosClose } from "react-icons/io";
import { useMovieGenreQuery } from '../../hooks/useMovieGenre';


function MovieDetailPage() {
  const params = useParams();
  const id = params.id;
  const {data:movie,isError,error,isLoading} = useMovieDetailQuery(id);
  const {data:related} = useRecommendMoviesQuery(id)
  const {data:reviews} = useMovieReviewQuery(id);
  const {data:video} = useMovieVideoQuery(id);
  const [toggle,setToggle] = useState(false);
  const [isReview,setIsReview] = useState(true);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  

  
  if(isError) return <Alert varient="danger">{error.message}</Alert>;



  if(isLoading) return <h1>Loading ....</h1>;
  return (
    <Container>
      <Row>
      <Col lg={4}><img src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2/${movie?.belongs_to_collection.poster_path}`}></img></Col>
      <Col lg={6}>
      {
          movie?.genres.map((genre)=>(
            <Badge bg='danger' className='badge'>{genre.name}</Badge>
          ))
        }
        <h1>{movie?.title}</h1>
        <div className='vote-area'>
          <div className='star-imoticon'><MdStars/>{Math.round(movie?.vote_average*10)/10}</div>
          <div><FaPeopleGroup/>{movie?.vote_count}</div>
          <div>{
          movie?.adult?
           (<img width={15} src='https://i.namu.wiki/i/oue1NCn0ejKPZgHqsUYAer_tvO-7Jarrq_6uqUT4Gkm9H3P0ADs9F-4-TU4R_RXPHXc06RcD9FrWlAlcQYH7fQ.svg'></img>)
           :null
          }</div>

        </div>
        <div className='overview'>{movie.overview}</div>
        <div className='detail-budget'>
        <Badge bg='danger' className='badge'>Budget</Badge>$ {movie.budget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}<br/>
        <Badge bg='danger' className='badge'>Revenue</Badge>$ {movie.revenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}<br/>
        <Badge bg='danger' className='badge'>Release Date</Badge>{movie.release_date}<br/>
        <Badge bg='danger' className='badge'>Run time</Badge>{movie.runtime} 분
        <Button variant="light" onClick={handleShow} className='preview'>예고편 보기</Button>
        </div>
      </Col>
      <div className='review-related'>
      <Button variant="light" onClick={()=>setIsReview(true)}>Review</Button>
      <Button variant="light" onClick={()=>setIsReview(false)}>Related Videos</Button>
      </div>
      </Row>
      <Modal show={show} onHide={handleClose} >
    <YouTube videoId={video?.[0].key}/>
  </Modal>
      <Row>
        {
          isReview ? 
          (<h1 className='category'>{`Review(${reviews?.length})`}</h1>)
          :(<h1 className='category'>{`Related Movies(${related?.length})`}</h1>)
        }
        {
          isReview ? 
          reviews?.map((review)=>(
            <div className='review-box'>
              <h3>{review.author}</h3>
              <p>
                {
                  review.content.length >= 300? (toggle ? review.content :review.content.substr(0,300)): review.content
                }</p>
                {
                  review.content.length >= 300 ? (<a className="toggle-bttn" onClick={()=>setToggle(!toggle)}>{toggle?"접기":"더보기"}</a>) : null
                }
            </div>  
            )) : (

              <Container>
                
                  <Row>
                    {
                  related?.map((movie)=>(
                    <Col lg={6} xs={12}>
                    <MovieCard movie={movie}/>
                    </Col>
                  ))}
                  </Row>
                
              </Container>
            )
          
        }
      
      </Row>
    </Container>
  )
}

export default MovieDetailPage;
