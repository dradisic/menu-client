import React, { useState, useEffect } from 'react';
import OrderForm from './components/OrderForm';
import OrdersList from './components/OrdersList';
import OrderDetail from './components/OrderDetail';
import ApiService from './services/ApiService';
import './App.css';
function App() {
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [orders, setOrders] = useState([]);
    const [orderListKey, setOrderListKey] = useState(0);
    const fetchAndSetOrders = async () => {
        try {
            const response = await ApiService.getOrders();
            setOrders(response.data.data);
            setOrderListKey(prevKey => prevKey + 1);
        } catch (error) {
            console.error('Failed to fetch orders:', error);
        }
    };

    useEffect(() => {
        fetchAndSetOrders();
    }, []);

    return (
        <div className="m-8">
            <OrderForm onOrderSubmitted={fetchAndSetOrders} />
            <OrdersList key={orderListKey} orders={orders} onSelectOrder={setSelectedOrder} />
            <OrderDetail order={selectedOrder} />
        </div>
    );
}

export default App;
