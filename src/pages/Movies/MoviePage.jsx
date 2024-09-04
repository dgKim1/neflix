import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { useSearchMovieQuery } from '../../hooks/useSearchMovie';
import { Alert, Col, Container, Row, Spinner } from 'react-bootstrap';
import MovieCard from '../Homepage/components/MovieCard/MovieCard';
import ReactPaginate from 'react-paginate';
import "./MoviePage.style.css";



function MoviePage() {
  const [query,setQuery] = useSearchParams();
  const [page,setPage] = useState(1);
  const filters = ['인기순','장르순'];
  const [filter ,setFilter]= useState("인기순");
  const keyword = query.get('q');

  const {data,isLoading,isError,error} = useSearchMovieQuery({keyword,page});
  const handlePageClick = ({selected})=>{
    setPage(selected+1);
  }

  const getSelect = () => {
    var select = document.getElementById('filter');
    var option = select.options[select.selectedIndex].value;
    setFilter(option);
  }
  

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
          <select name='filter' id='filter' className='select-filter' onChange={getSelect}>
            {
              filters.map((filter)=> 
              (<option value={filter}>{filter}</option>))
            }
          </select>
        
        </Col>
        <Col lg={8} xs={12}>
        <Row>
          {data?.results.map((movie,index) => (
            <Col key={index} lg={4} xs={12}>
            <MovieCard movie={movie}/>
            </Col>
          ))}
        </Row>
        <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={data?.total_pages}
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
  )
}

export default MoviePage;
