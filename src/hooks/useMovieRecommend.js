import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchRecommendMovies = (id) => {
    return api.get(`/discover/movie`);
}

export const useRecommendMoviesQuery=(id) => {
    return useQuery({
        queryKey: ['movie-recommend',id],
        queryFn: ()=>fetchRecommendMovies(id),
        select: (result) => result.data.results

    });
}