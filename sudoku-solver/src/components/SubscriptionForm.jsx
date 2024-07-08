// src/components/SubscriptionForm.jsx
import React, { useState } from 'react';

const SubscriptionForm = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Fake API call
        setTimeout(() => {
            setMessage('Subscription successful!');
        }, 1000);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Email:
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </label>
            <button type="submit">Subscribe</button>
            {message && <p>{message}</p>}
        </form>
    );
};

export default SubscriptionForm;
