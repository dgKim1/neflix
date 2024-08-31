import axios from 'axios';

const key = process.env.REACT_APP_API_KEY;
const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${key}`
    }
    
  })


  export default api;