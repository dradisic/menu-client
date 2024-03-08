import React from 'react';

function AmountInput({ value, onChange }) {
    return (
        <input
            type="number"
            value={value}
            onChange={onChange}
            placeholder="Amount"
            min="0"
        />
    );
}

export default AmountInput;
