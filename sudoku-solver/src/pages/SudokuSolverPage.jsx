// src/pages/SudokuSolverPage.jsx
import React, { useState, useEffect } from 'react';
import SudokuGrid from '../components/SudokuGrid';
import { solveSudoku, isValidSudoku } from '../utils/sudokuSolver';

const SudokuSolverPage = () => {
    const [grid, setGrid] = useState(Array(9).fill(Array(9).fill(null)));
    const [message, setMessage] = useState('');

    useEffect(() => {
        const savedGrid = JSON.parse(localStorage.getItem('sudoku-grid'));
        if (savedGrid) {
            setGrid(savedGrid);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('sudoku-grid', JSON.stringify(grid));
    }, [grid]);

    const handleChange = (row, col, value) => {
        const newGrid = [...grid];
        newGrid[row] = [...newGrid[row]];
        newGrid[row][col] = value ? parseInt(value) : null;
        setGrid(newGrid);
    };

    const handleSolve = () => {
        const solvedGrid = solveSudoku(grid);
        if (solvedGrid) {
            setGrid(solvedGrid);
            setMessage('Sudoku solved!');
        } else {
            setMessage('This Sudoku puzzle is unsolvable.');
        }
    };

    const handleReset = () => {
        setGrid(Array(9).fill(Array(9).fill(null)));
        setMessage('');
    };

    return (
        <div>
            <SudokuGrid grid={grid} onChange={handleChange} />
            <button onClick={handleSolve}>Solve</button>
            <button onClick={handleReset}>Reset</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default SudokuSolverPage;
