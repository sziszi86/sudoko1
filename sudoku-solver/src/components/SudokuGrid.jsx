// src/components/SudokuGrid.jsx
import React from 'react';

const SudokuGrid = ({ grid, onChange }) => {
    return (
        <div className="sudoku-grid">
            {grid.map((row, rowIndex) =>
                row.map((cell, colIndex) => (
                    <input
                        key={`${rowIndex}-${colIndex}`}
                        type="number"
                        min="1"
                        max="9"
                        value={cell || ''}
                        onChange={(e) => onChange(rowIndex, colIndex, e.target.value)}
                    />
                ))
            )}
        </div>
    );
};

export default SudokuGrid;
