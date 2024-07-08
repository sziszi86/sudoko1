import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SudokuGrid from '../components/SudokuGrid';
import Modal from '../components/Modal';
import { solveSudoku, generateSudoku, isValidSudoku } from '../utils/sudokuSolver';

const generateEmptyGrid = (size) => {
    return Array(size).fill().map(() => Array(size).fill(null));
};

const initializeErrors = (size) => {
    return Array(size).fill().map(() => Array(size).fill(false));
};

const SudokuSolverPage = () => {
    const location = useLocation();
    const initialDifficulty = location.state?.difficulty || 'easy';
    const initialSize = initialDifficulty === 'easy' ? 4 : 9;

    const [difficulty, setDifficulty] = useState(initialDifficulty);
    const [grid, setGrid] = useState(() => generateEmptyGrid(initialSize));
    const [errors, setErrors] = useState(() => initializeErrors(initialSize));
    const [solvedGrid, setSolvedGrid] = useState(null);
    const [message, setMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [userInputs, setUserInputs] = useState(() => generateEmptyGrid(initialSize));

    useEffect(() => {
        localStorage.setItem('sudoku-grid', JSON.stringify(grid));
        localStorage.setItem('sudoku-difficulty', difficulty);
    }, [grid, difficulty]);

    useEffect(() => {
        const size = difficulty === 'easy' ? 4 : 9;
        setGrid(generateEmptyGrid(size));
        setErrors(initializeErrors(size));
        setSolvedGrid(null);
        setUserInputs(generateEmptyGrid(size)); // Reset user inputs when difficulty changes
    }, [difficulty]);

    const handleChange = (row, col, value) => {
        const newGrid = grid.map((r, rowIndex) =>
            r.map((cell, colIndex) => (rowIndex === row && colIndex === col ? (value ? parseInt(value) : null) : cell))
        );
        setGrid(newGrid);
        setErrors(isValidSudoku(newGrid));
        setSolvedGrid(null); // Reset solvedGrid on user input
    };

    const handleSolve = () => {
        const gridCopy = grid.map(row => row.slice());
        const errors = isValidSudoku(gridCopy);
        if (errors.flat().includes(true)) {
            setMessage('This Sudoku puzzle is incorrect.');
            setErrors(errors);
            setShowModal(true);
        } else if (solveSudoku(gridCopy)) {
            setGrid(gridCopy);
            setSolvedGrid(gridCopy); // Set the solved grid to highlight generated cells
            setErrors(initializeErrors(grid.length)); // Clear errors after solving
            setMessage('Sudoku solved!');
            setShowModal(true);
        } else {
            setMessage('This Sudoku puzzle is unsolvable.');
            setErrors(errors);
            setShowModal(true);
        }
    };

    const handleReset = () => {
        const size = difficulty === 'easy' ? 4 : 9;
        setGrid(generateEmptyGrid(size));
        setErrors(initializeErrors(size));
        setMessage('');
        setSolvedGrid(null); // Reset solvedGrid on reset
        setUserInputs(generateEmptyGrid(size)); // Reset user inputs on reset
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div>
            <label>
                Difficulty:
                <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                    <option value="easy">Easy (4x4)</option>
                    <option value="hard">Hard (9x9)</option>
                </select>
            </label>
            <SudokuGrid grid={grid} onChange={handleChange} errors={errors} solvedGrid={solvedGrid} userInputs={userInputs} setUserInputs={setUserInputs} />
            <div className="flex">
                <button className="btn-primary" onClick={handleSolve}>Megoldás</button>
                <button onClick={handleReset}>Reset</button>
            </div>
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
