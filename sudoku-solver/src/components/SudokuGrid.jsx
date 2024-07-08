import React from 'react';

const SudokuGrid = ({ grid, onChange }) => {
    const handleInputChange = (row, col, value) => {
        // Csak 1-9 közötti értékeket engedélyezünk
        if (value === '' || (/^[1-9]$/.test(value))) {
            onChange(row, col, value);
        }
    };

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
