import axios from 'axios';

const api = axios.create({
    baseURL: "https://foggy-melon.glitch.me"
});

export default api;