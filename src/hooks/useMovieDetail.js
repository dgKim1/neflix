import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchMovieDetail =(id)=>{
    return api.get(`movie/${id}`);
}

const fetchMovieReview =(id)=>{
    return api.get(`movie/${id}/reviews`);
}



export const useMovieDetailQuery = (id)=>{
    return useQuery({
        queryKey: ['movie-detail',id],
        queryFn: ()=>fetchMovieDetail(id),
        select: (result)=> result.data,
        staleTime: 300000
    });
}

export const useMovieReviewQuery = (id) => {
    return useQuery({
        queryKey: ["movie-review",id],
        queryFn: ()=>fetchMovieReview(id),
        select: (result)=> result.data.results,
        staleTime: 300000
    })
}