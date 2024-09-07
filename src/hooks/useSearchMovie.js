import { useQuery } from '@tanstack/react-query'
import api from '../utils/api';

const fetchSearchMovie = ({keyword,page}) => {
    return keyword ? api.get(`/search/movie?query=${keyword}&page=${page}`)
    :api.get(`/movie/popular?page=${page}`);
};
const fetchAllMovie = () => {
    return api.get(`/movie/popular`);
};

export const useSearchAllMovieQuery = () => {
    return useQuery({
        queryKey: ['movie-keyword'],
        queryFn: () => fetchAllMovie(),
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