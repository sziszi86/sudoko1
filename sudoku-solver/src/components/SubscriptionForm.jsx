import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Modal from './Modal';

const SubscriptionForm = () => {
    const [email, setEmail] = useState('');
    const [difficulty, setDifficulty] = useState('easy');
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Fake API call
        setTimeout(() => {
            setShowModal(true);
        }, 1000);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        navigate('/solver', {state: {difficulty}});
    };

    return (
        <div>
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
                        <option value="hard">Hard</option>
                    </select>
                </label>
                <button className="btn-primary btn mt-20" type="submit">Subscribe</button>
            </form>
            <Modal
                show={showModal}
                onClose={handleCloseModal}
                title="Subscription Successful"
                message="You have successfully subscribed to receive Sudoku puzzles!"
            />
        </div>
    );
};

export default SubscriptionForm;
