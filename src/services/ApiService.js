// src/services/ApiService.js
import axios from 'axios';

// Create an Axios instance
const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const ApiService = {
    // Rates
    getRates() {
        return apiClient.get('/rates');
    },
    getRate(id) {
        return apiClient.get(`/rates/${id}`);
    },

    // Orders
    getOrders() {
        return apiClient.get('/orders');
    },
    getOrder(id) {
        return apiClient.get(`/orders/${id}`);
    },
    saveOrder(orderData) {
        return apiClient.post('/orders', orderData);
    },

    // Quote
    getQuote(currencyCode, amount) {
        return apiClient.get('/quote', { params: { currency_code: currencyCode, amount } });
    },

    // Currencies
    getCurrencies() {
        return apiClient.get('/currencies');
    },
};
apiClient.interceptors.response.use(response => {
    // Do something with response data
    return response;
}, error => {
    // Do something with response error
    console.error('API call failed: ', error);
    return Promise.reject(error);
});
export default ApiService;
