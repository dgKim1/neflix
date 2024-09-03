import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchPopularMovies = () => {
    return api.get(`/discover/movie`);
}

export const usePopularMoviesQuery=() => {
    return useQuery({
        queryKey: ['movie-popular'],
        queryFn: fetchPopularMovies,
        select: (result) => result.data

    });
}