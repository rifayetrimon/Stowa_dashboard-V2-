import axios from 'axios';


const myaxios = axios.create({
  baseURL: 'https://stowaa.onrender.com/',
  headers:{
    "Content-Type": "application/json",
  }
});


myaxios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.token = token;
    }
    return config;
});

export default myaxios;