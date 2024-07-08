import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SudokuGrid from '../components/SudokuGrid';
import Modal from '../components/Modal';
import { solveSudoku, generateSudoku } from '../utils/sudokuSolver';

const SudokuSolverPage = () => {
    const emptyGrid = Array(9).fill().map(() => Array(9).fill(null));
    const location = useLocation();
    const initialDifficulty = location.state?.difficulty || 'easy';

    const [difficulty, setDifficulty] = useState(initialDifficulty);
    const [grid, setGrid] = useState(() => {
        const savedGrid = JSON.parse(localStorage.getItem('sudoku-grid'));
        return savedGrid || generateSudoku(initialDifficulty);
    });
    const [message, setMessage] = useState('');
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        localStorage.setItem('sudoku-grid', JSON.stringify(grid));
    }, [grid]);

    useEffect(() => {
        setGrid(generateSudoku(difficulty));
    }, [difficulty]);

    const handleChange = (row, col, value) => {
        const newGrid = grid.map((r, rowIndex) =>
            r.map((cell, colIndex) => (rowIndex === row && colIndex === col ? (value ? parseInt(value) : null) : cell))
        );
        setGrid(newGrid);
    };

    const handleSolve = () => {
        const gridCopy = grid.map(row => row.slice());
        if (solveSudoku(gridCopy)) {
            setGrid(gridCopy);
            setMessage('Sudoku solved!');
            setShowModal(true);
        } else {
            setMessage('This Sudoku puzzle is unsolvable.');
            setShowModal(true);
        }
    };

    const handleReset = () => {
        setGrid(emptyGrid);
        setMessage('');
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div>
            <label>
                Difficulty:
                <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </label>
            <SudokuGrid grid={grid} onChange={handleChange} />
            <button onClick={handleSolve}>Solve</button>
            <button onClick={handleReset}>Reset</button>
            <Modal
                show={showModal}
                onClose={handleCloseModal}
                title={message === 'Sudoku solved!' ? 'Success' : 'Error'}
                message={message}
            />
        </div>
    );
};

export default SudokuSolverPage;
