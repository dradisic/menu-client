import React from 'react';

function PurchaseButton({ onClick, isLoading }) {
    return (
        <button onClick={onClick} disabled={isLoading}>
            {isLoading ? 'Processing...' : 'Purchase'}
        </button>
    );
}

export default PurchaseButton;
