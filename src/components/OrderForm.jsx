import React, { useState, useEffect } from 'react';
import ApiService from '../services/ApiService';
import PurchaseButton from './PurchaseButton'; // Adjust the path as necessary
import AmountInput from './AmountInput'; // Adjust the path as necessary

function OrderForm(props) {
    const [currencies, setCurrencies] = useState([]);
    const [selectedCurrency, setSelectedCurrency] = useState('');
    const [amount, setAmount] = useState('');
    const [quote, setQuote] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [submissionSuccessMessage, setSubmissionSuccessMessage] = useState('');
    useEffect(() => {
        ApiService.getCurrencies()
            .then(response => setCurrencies(response.data.data))
            .catch(error => console.log('Error fetching currencies:', error));
    }, []);

    const handleCurrencyChange = (e) => {
        setSelectedCurrency(e.target.value);
    };

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };

    const handleSubmittedOrder = async () => {
        props.onOrderSubmitted();
    };

    const handleGetQuote = async () => {
        if (!selectedCurrency || amount <= 0) {
            setErrorMessage('Please select a currency and enter a valid amount');
            return;
        }
        try {
            const response = await ApiService.getQuote(selectedCurrency, amount);
            setQuote(response.data.data);
            setErrorMessage('');
        } catch (error) {
            console.error('Error fetching quote:', error);
            setErrorMessage('Failed to fetch quote. Please try again.');
        }
    };

    const handleSubmitOrder = async () => {
        setIsSubmitting(true);
        try {
            await ApiService.saveOrder({
                currency_code: selectedCurrency,
                amount:        amount,
            });
            setSelectedCurrency('');
            setSubmissionSuccessMessage('OrderForm submitted successfully!');
            setAmount('');
            setQuote(null);
            handleSubmittedOrder();
        } catch (error) {
            console.error('Error submitting order:', error);
            setErrorMessage('Failed to submit order. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Place a Currency Order</h2>

            <div className="mb-4">
                <select
                    className="block w-full p-3 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    value={selectedCurrency} onChange={handleCurrencyChange}>
                    <option value="">Select Currency</option>
                    {currencies.map((currency, index) => (
                        <option key={index} value={currency.code}>{currency.code}</option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <AmountInput className="w-full p-2 mb-4 border border-gray-300 rounded-md" value={amount}
                             onChange={handleAmountChange} />
            </div>

            <div className="mb-6">
                <button
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={handleGetQuote}> Get Quote
                </button>
            </div>
            {errorMessage && <p className="mt-4 text-red-500">{errorMessage}</p>}
            {submissionSuccessMessage && <p className="mt-4 text-green-500">{submissionSuccessMessage}</p>}
            {quote && (
                <div className="mb-4 p-4 bg-gray-100 rounded-lg">
                    <p><strong>From (Base Currency):</strong> {quote.from_currency}</p>
                    <p><strong>To (Foreign Currency):</strong> {quote.to_currency}</p>
                    <p><strong>Amount in Foreign Currency:</strong> {quote.amount_foreign_currency}</p>
                    <p><strong>Exchange Rate:</strong> {quote.exchange_rate}</p>
                    <p><strong>Surcharge Percentage:</strong> {quote.surcharge_percentage}%</p>
                    <p><strong>Surcharge Amount:</strong> ${quote.amount_surcharge}</p>
                    <p><strong>Discount Amount:</strong> ${quote.discount_amount}</p>
                    <p><strong>Discount Percentage:</strong> {quote.discount_percentage}%</p>
                    <p><strong>Amount to pay (USD):</strong> ${quote.amount_paid}</p>
                </div>
            )}
            <div className="mb-4">
                <PurchaseButton onClick={handleSubmitOrder} isLoading={isSubmitting} />
            </div>
        </div>
    );
}

export default OrderForm;
