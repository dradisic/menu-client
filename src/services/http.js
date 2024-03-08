// src/services/http.js
import axios from 'axios';

const http = axios.create({
    baseURL: process.env.REACT_APP_API_URL, // Your API base URL from environment variables
    headers: {
        'Content-Type': 'application/json',
        // Any other headers
    }
});

export default http;
