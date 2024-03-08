import React, { useState, useEffect } from 'react';
import ApiService from '../services/ApiService';

function OrdersList({ onSelectOrder }) {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        ApiService.getOrders()
            .then(response => {
                setOrders(response.data.data);
            })
            .catch(error => console.error('Error fetching orders', error));
    }, []);
    useEffect(() => {
    }, [orders]);
    return (
        <ul className="mt-6 border-t border-gray-200 divide-y divide-gray-200">
            {orders.map((order, index) => (
                <li key={order.id} className={`p-4 hover:bg-gray-50 ${index % 2 ? 'bg-gray-50' : 'bg-white'}`} onClick={() => onSelectOrder(order)}>
                     {order.amount_foreign_currency} {order.currency_code} - ${order.amount_paid}
                </li>
            ))}
        </ul>
    );
}

export default OrdersList;