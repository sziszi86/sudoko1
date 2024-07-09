import React from 'react';
import SubscriptionForm from '../components/SubscriptionForm';
import { Link } from 'react-router-dom';
import { Analytics } from "@vercel/analytics/react"

const LandingPage = () => {
    return (
        <div>
            <h1>Welcome to Sudoku Solver</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
            <SubscriptionForm />
            <Link className="btn btn-reset mx-auto" to="/solver">Go to Sudoku Solver</Link>
            <Analytics />
        </div>

    );
};

export default LandingPage;
