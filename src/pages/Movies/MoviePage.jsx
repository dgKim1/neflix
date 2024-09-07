import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { useSearchAllMovieQuery, useSearchMovieQuery } from '../../hooks/useSearchMovie';
import { Alert, Button, Col, Container, Dropdown, DropdownButton, Row, Spinner } from 'react-bootstrap';
import MovieCard from '../Homepage/components/MovieCard/MovieCard';
import ReactPaginate from 'react-paginate';
import { MdFilterAlt } from "react-icons/md";
import "./MoviePage.style.css";
import { useMovieGenreQuery } from '../../hooks/useMovieGenre';
import { FaCaretUp } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa";


function MoviePage(){
  const [query,setQuery] = useSearchParams();
  const [page,setPage] = useState(1);
  const [sortName,setSortName] = useState(null);
  const [sortTitle,setSortTitle] = useState("Sort");
  const [genreId,setGenreId] = useState(null);
  let keyword = query?.get('q');


  const {data:original,isLoading,isError,error} = useSearchMovieQuery({keyword,page});
  const {data:allData} = useSearchAllMovieQuery();
  const [copyData,setCopyData] = useState([]);
  const {data:genres} = useMovieGenreQuery();

  const handlePageClick = ({selected})=>{
    setPage(selected+1);
  }

  const handleSelect = (e)=>{
    setSortName(e);
    sortAndFilter(original?.results)

  }
  const genreFilter = (id)=>{
    setGenreId(id);
    setCopyData(original?.results.filter((movie) =>movie.genre_ids.includes(id)));
      }




  const sortAndFilter= (movies)=>{
    let filteredMovies = movies;
    if(genreId!==null) filteredMovies = movies.filter((movie) =>movie.genre_ids.includes(genreId));
    //장르 필터링 + sorting
    if(sortName==="popup") {
      setCopyData(filteredMovies.sort(
      function (a, b) {
        return a.popularity-b.popularity;
      }
    ));
    }
    else if(sortName==="popdown") {
      setCopyData(filteredMovies.sort(
      function (a, b) {
        return b.popularity-a.popularity;
      }
    ));
    }
    else if(sortName==="voteup") {
      setCopyData(filteredMovies.sort(
      function (a, b) {
        return a.vote_average-b.vote_average;
      }
    ));
    }
    else if(sortName==="votedown") {
      setCopyData(filteredMovies.sort(
      function (a, b) {
        return b.vote_average-a.vote_average;
      }
    ));
    }
    //기본 장르 필터링
    else{
      setCopyData(filteredMovies)
    }
  }


  useEffect(() => {
    if (original?.results) {
        sortAndFilter(original?.results);
    }
}, [original, sortName, genreId]);

useEffect(() => {
    setPage(1);
    setGenreId(null);
}, [keyword]);



  




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
        <DropdownButton title={sortTitle} className='dropdown' onSelect={handleSelect} variant='secondary'>
        <Dropdown.Item eventKey={"popup"} onClick={()=>setSortTitle("Popularity Desc")} >Popularity{<FaCaretUp color='#212529' style={{background: "transparent"}}/>}</Dropdown.Item>
        <Dropdown.Item  eventKey={"popdown"} onClick={()=>setSortTitle("Popularity Asc")}>Popularity{<FaCaretDown color='#212529' style={{background: "transparent"}}/>}</Dropdown.Item>
        <Dropdown.Item eventKey={"voteup"} onClick={()=>setSortTitle("Vote Desc")}>Vote{<FaCaretUp color='#212529' style={{background: "transparent"}}/>}</Dropdown.Item>
        <Dropdown.Item eventKey={"votedown"} onClick={()=>setSortTitle("Vote Asc")} >Vote{<FaCaretDown color='#212529' style={{background: "transparent"}}/>}</Dropdown.Item>
    </DropdownButton>
        
        </Col>
        <Col lg={8} xs={12}>
          <div className='genre-bttns'>
            <Button variant='danger' className='genre-bttns' 
            onClick={()=>{
              setPage(1);
              }}>
              All</Button>
            {
              genres?.map((genre)=>
              (
              <Button variant="danger" className='genre-bttns' onClick={()=>{
                genreFilter(genre.id)
                setPage(1);
              }}>{genre.name}</Button>
              )
              )
            }
          </div>
        <Row>
          { copyData.length!=0&&
          copyData.map(
            (movie,index) => (
              <Col key={index} lg={4} xs={6}>
              <MovieCard movie={movie} className="movie-card"/>
              </Col>
            )
          )
            }
            {
              copyData.length==0&&original?.results.map(
                (movie,index) => (
                  <Col key={index} lg={4} xs={6}>
                  <MovieCard movie={movie} className="movie-card"/>
                  </Col>
                )
              )
            }
        </Row>
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
        </Col>


      </Row>
    </Container>
  );
          }
export default MoviePage;
