import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { useSearchAllMovieQuery, useSearchMovieQuery } from '../../hooks/useSearchMovie';
import { Alert, Button, Col, Container, Dropdown, Row, Spinner } from 'react-bootstrap';
import MovieCard from '../Homepage/components/MovieCard/MovieCard';
import ReactPaginate from 'react-paginate';
import { MdFilterAlt } from "react-icons/md";
import "./MoviePage.style.css";
import { useMovieGenreQuery } from '../../hooks/useMovieGenre';


function MoviePage(){
  const [query,setQuery] = useSearchParams();
  const [page,setPage] = useState(1);
  const [filter,setFilter] = useState(null);
  const [isSort,setIsSort] = useState(false);
  const [isFilter,setIsFilter] = useState(false);

  const keyword = query.get('q');

  const {data:original,isLoading,isError,error} = useSearchMovieQuery({keyword,page});
  const {data:allData} = useSearchAllMovieQuery({keyword});
  const {data:genres} = useMovieGenreQuery();
  const handlePageClick = ({selected})=>{
    setPage(selected+1);
  }



  const sortPopularity= ()=>{
    setPage(1);
    if(page===1) {
      setFilter(original?.results.sort(
      function (a, b) {
        if (a.popularity < b.popularity) {
          return 1;
        }
        if (a.popularity > b.popularity) {
          return -1;
        }
        // a must be equal to b
        return 0;
      }
    ));
    }
    if(!isSort) setIsSort(true);
    setIsFilter(false);
  }


  const genreFilter = (id)=>{
    setFilter(allData?.results.filter((movie) =>movie.genre_ids.includes(id)));
     setIsFilter(true);
      }
  useEffect(()=>{
    isSort&&setFilter(original?.results.sort(
      function (a, b) {
        if (a.popularity < b.popularity) {
          return 1;
        }
        if (a.popularity > b.popularity) {
          return -1;
        }
        // a must be equal to b
        return 0;
      }
    ));
  },[page])


  useEffect(()=>{
    setFilter(null);
  },[isSort,page])



  if(isLoading){
    return (
      <div className='spinner-area'>
        <Spinner
        animation='border'
        variant='danger'
        style={{width: "5rem"}}
        
        />
      </div>
    );
  }

  if(isError){
    return <Alert variant="danger">{error.message}</Alert>
  }




  return (
    <Container>
      <Row>
        <Col lg={4} xs={12}>
        <Dropdown className='dropdown'>
      <Dropdown.Toggle variant="secondary" id="dropdown-basic"> 
        Sort&nbsp;<MdFilterAlt style={ {background: "#6c757d"}} className='filter-icon'/>
      </Dropdown.Toggle>

      <Dropdown.Menu>
      <Dropdown.Item onClick={()=>{
        setIsSort(false)
        setPage(1);
        }}>Original</Dropdown.Item>
        <Dropdown.Item onClick={sortPopularity}>Popularity</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
        
        </Col>
        <Col lg={8} xs={12}>
          <div className='genre-bttns'>
            <Button variant='danger' className='genre-bttns' 
            onClick={()=>{
              setIsSort(false);
              setIsFilter(false);
              setPage(1);
              }}>
              All</Button>
            {
              genres?.map((genre)=>
              (
              <Button variant="danger" className='genre-bttns' onClick={()=>genreFilter(genre.id)}>{genre.name}</Button>
              )
              )
            }
          </div>
        <Row>
          { filter&&
          filter.map(
            (movie,index) => (
              <Col key={index} lg={4} xs={6}>
              <MovieCard movie={movie} className="movie-card"/>
              </Col>
            )
          )
            }
            {
            filter===null&&
          original.results.map((movie,index) => (
            <Col key={index} lg={4} xs={6}>
            <MovieCard movie={movie} className="movie-card"/>
            </Col>
          )) 
          }
        </Row>
        {
          !isFilter &&
        <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={original?.total_pages}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
        forcePage={page-1}
      />
        }
        </Col>


      </Row>
    </Container>
  );
          }
export default MoviePage;
