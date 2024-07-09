import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SudokuSolverPage from './pages/SudokuSolverPage';
import './App.css';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/solver" element={<SudokuSolverPage />} />

            </Routes>
        </Router>
    );
};

export default App;
