import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SudokuGrid from '../components/SudokuGrid';
import Modal from '../components/Modal';
import { solveSudoku, generateSudoku, isValidSudoku } from '../utils/sudokuSolver';

const SudokuSolverPage = () => {
    const emptyGrid4x4 = Array(4).fill().map(() => Array(4).fill(null));
    const emptyGrid9x9 = Array(9).fill().map(() => Array(9).fill(null));
    const emptyErrors4x4 = Array(4).fill().map(() => Array(4).fill(false));
    const emptyErrors9x9 = Array(9).fill().map(() => Array(9).fill(false));
    const location = useLocation();
    const initialDifficulty = location.state?.difficulty || 'easy';

    const [difficulty, setDifficulty] = useState(initialDifficulty);
    const [grid, setGrid] = useState(() => {
        const savedGrid = JSON.parse(localStorage.getItem('sudoku-grid'));
        const savedDifficulty = localStorage.getItem('sudoku-difficulty') || initialDifficulty;
        setDifficulty(savedDifficulty);
        return savedGrid || generateSudoku(savedDifficulty === 'easy' ? 4 : 9);
    });
    const [errors, setErrors] = useState(grid.length === 4 ? emptyErrors4x4 : emptyErrors9x9);
    const [message, setMessage] = useState('');
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        localStorage.setItem('sudoku-grid', JSON.stringify(grid));
        localStorage.setItem('sudoku-difficulty', difficulty);
    }, [grid, difficulty]);

    useEffect(() => {
        if (difficulty === 'easy') {
            setGrid(generateSudoku(4));
            setErrors(emptyErrors4x4);
        } else {
            setGrid(generateSudoku(9));
            setErrors(emptyErrors9x9);
        }
    }, [difficulty]);

    const handleChange = (row, col, value) => {
        const newGrid = grid.map((r, rowIndex) =>
            r.map((cell, colIndex) => (rowIndex === row && colIndex === col ? (value ? parseInt(value) : null) : cell))
        );
        setGrid(newGrid);
        setErrors(isValidSudoku(newGrid));
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
            setErrors(grid.length === 4 ? emptyErrors4x4 : emptyErrors9x9); // Clear errors after solving
            setMessage('Sudoku solved!');
            setShowModal(true);
        } else {
            setMessage('This Sudoku puzzle is unsolvable.');
            setErrors(errors);
            setShowModal(true);
        }
    };

    const handleReset = () => {
        if (grid.length === 4) {
            setGrid(emptyGrid4x4);
            setErrors(emptyErrors4x4);
        } else {
            setGrid(emptyGrid9x9);
            setErrors(emptyErrors9x9);
        }
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
                    <option value="easy">Easy (4x4)</option>
                    <option value="hard">Hard (9x9)</option>
                </select>
            </label>
            <SudokuGrid grid={grid} onChange={handleChange} errors={errors} />
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