import React from 'react';
import './SudokuGrid.css';

const SudokuGrid = ({ grid, onChange, errors, userInputs, setUserInputs, solvedGrid }) => {

    const handleInputChange = (row, col, value) => {
        // Csak 1-9 közötti értékeket engedélyezünk
        if (value === '' || (/^[1-9]$/.test(value) && grid.length === 9) || (/^[1-4]$/.test(value) && grid.length === 4)) {
            onChange(row, col, value);
            const newUserInputs = userInputs.map((r, rowIndex) =>
                r.map((cell, colIndex) => (rowIndex === row && colIndex === col ? true : cell))
            );
            setUserInputs(newUserInputs);
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
                    if (userInputs[rowIndex][colIndex]) {
                        className += " user-input";
                    }
                    if (solvedGrid && solvedGrid[rowIndex][colIndex] !== grid[rowIndex][colIndex]) {
                        className += " generated";
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
