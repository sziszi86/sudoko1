import React, { useState, useEffect } from 'react';
import SudokuGrid from '../components/SudokuGrid';
import { solveSudoku, generateSudoku } from '../utils/sudokuSolver';

const SudokuSolverPage = () => {
    const emptyGrid = Array(9).fill().map(() => Array(9).fill(null));

    const [difficulty, setDifficulty] = useState('easy');
    const [grid, setGrid] = useState(() => {
        const savedGrid = JSON.parse(localStorage.getItem('sudoku-grid'));
        return savedGrid || emptyGrid;
    });
    const [message, setMessage] = useState('');

    useEffect(() => {
        localStorage.setItem('sudoku-grid', JSON.stringify(grid));
    }, [grid]);

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
        } else {
            setMessage('This Sudoku puzzle is unsolvable.');
        }
    };

    const handleReset = () => {
        setGrid(generateSudoku(difficulty));
        setMessage('');
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
            {message && <p>{message}</p>}
        </div>
    );
};

export default SudokuSolverPage;
