import { useQuery } from '@tanstack/react-query'
import api from '../utils/api';

const fetchSearchMovie = ({keyword,page}) => {
    return keyword ? api.get(`/search/movie?query=${keyword}&page=${page}`)
    :api.get(`/movie/popular?page=${page}`);
};
const fetchAllMovie = ({keyword}) => {
    return keyword ? api.get(`/search/movie?query=${keyword}`)
    :api.get(`/movie/popular?query=${keyword}`);
};

export const useSearchAllMovieQuery = ({keyword}) => {
    return useQuery({
        queryKey: ['movie-keyword',{keyword}],
        queryFn: () => fetchAllMovie({keyword}),
        select: (result) => result.data
    });
};

export const useSearchMovieQuery = ({keyword,page}) => {
    return useQuery({
        queryKey: ['movie-keyword',{keyword,page}],
        queryFn: () => fetchSearchMovie({keyword,page}),
        select: (result) => result.data
    });
};