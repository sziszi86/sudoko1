import React, { useState } from 'react';

const SubscriptionForm = () => {
    const [email, setEmail] = useState('');
    const [difficulty, setDifficulty] = useState('easy');
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
            <label>
                Difficulty:
                <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </label>
            <button type="submit">Subscribe</button>
            {message && <p>{message}</p>}
        </form>
    );
};

export default SubscriptionForm;
