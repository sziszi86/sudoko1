import React from 'react';

const SudokuGrid = ({ grid, onChange }) => {
    return (
        <div className="sudoku-grid">
            {grid.map((row, rowIndex) =>
                row.map((cell, colIndex) => {
                    let className = "";
                    if ((colIndex + 1) % 3 === 0 && colIndex < 8) {
                        className += " border-right";
                    }
                    if ((rowIndex + 1) % 3 === 0 && rowIndex < 8) {
                        className += " border-bottom";
                    }
                    return (
                        <input
                            key={`${rowIndex}-${colIndex}`}
                            type="number"
                            min="1"
                            max="9"
                            value={cell || ''}
                            onChange={(e) => onChange(rowIndex, colIndex, e.target.value)}
                            className={className}
                        />
                    );
                })
            )}
        </div>
    );
};

export default SudokuGrid;
