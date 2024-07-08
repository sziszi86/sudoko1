import React from 'react';

const SudokuGrid = ({ grid, onChange, errors }) => {
    const handleInputChange = (row, col, value) => {
        // Csak 1-9 közötti értékeket engedélyezünk
        if (value === '' || (/^[1-9]$/.test(value) && grid.length === 9) || (/^[1-4]$/.test(value) && grid.length === 4)) {
            onChange(row, col, value);
        }
    };

    return (
        <div className={`sudoku-grid grid-${grid.length}`}>
            {grid.map((row, rowIndex) =>
                row.map((cell, colIndex) => {
                    let className = "cell";
                    if ((colIndex + 1) % Math.sqrt(grid.length) === 0 && colIndex < grid.length - 1) {
                        className += " border-right";
                    }
                    if ((rowIndex + 1) % Math.sqrt(grid.length) === 0 && rowIndex < grid.length - 1) {
                        className += " border-bottom";
                    }
                    if (errors[rowIndex][colIndex]) {
                        className += " error";
                    }
                    return (
                        <input
                            key={`${rowIndex}-${colIndex}`}
                            type="text"
                            maxLength="1"
                            value={cell || ''}
                            onChange={(e) => handleInputChange(rowIndex, colIndex, e.target.value)}
                            className={className}
                        />
                    );
                })
            )}
        </div>
    );
};

export default SudokuGrid;
