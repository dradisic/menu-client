import React from 'react';

function OrderDetail({ order }) {
    if (!order) {
        return <p>Please select an order to view its details.</p>;
    }

    return (order &&
        <div className="mt-6 p-4 bg-white rounded-lg shadow-lg">
            <h2>Order Detail</h2>
            <p>Order ID: {order.id}</p>
            <p>Currency Code: {order.currency_code}</p>
            <p>Exchange Rate: {order.exchange_rate}</p>
            <p>Surcharge Percentage: {order.surcharge_percentage}%</p>
            <p>Amount Surcharge: ${order.amount_surcharge}</p>
            <p>Amount in Foreign Currency: {order.amount_foreign_currency}</p>
            <p>Amount Paid: ${order.amount_paid}</p>

            {/* Conditionally render discount information if available */}
            {order.discount_amount && (
                <p>Discount Amount: ${order.discount_amount}</p>
            )}
            {order.discount_percentage && (
                <p>Discount Percentage: {order.discount_percentage}%</p>
            )}
        </div>
    )
}

export default OrderDetail;