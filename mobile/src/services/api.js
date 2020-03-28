import axios from 'axios';

const api = axios.create({
    baseURL: 'https://stack11-backend.herokuapp.com/'
});

export default api;