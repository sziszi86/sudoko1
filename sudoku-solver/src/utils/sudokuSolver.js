// src/utils/sudokuSolver.js

const isValid = (grid, row, col, num) => {
    // Ellenőrzi a sort
    for (let x = 0; x < 9; x++) {
        if (grid[row][x] === num) {
            return false;
        }
    }

    // Ellenőrzi az oszlopot
    for (let x = 0; x < 9; x++) {
        if (grid[x][col] === num) {
            return false;
        }
    }

    // Ellenőrzi a 3x3-as rácsot
    const startRow = row - (row % 3);
    const startCol = col - (col % 3);
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (grid[i + startRow][j + startCol] === num) {
                return false;
            }
        }
    }

    return true;
};

export const solveSudoku = (grid) => {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (grid[row][col] === null) {
                for (let num = 1; num <= 9; num++) {
                    if (isValid(grid, row, col, num)) {
                        grid[row][col] = num;
                        if (solveSudoku(grid)) {
                            return grid;
                        }
                        grid[row][col] = null;
                    }
                }
                return null;
            }
        }
    }
    return grid;
};

export const isValidSudoku = (grid) => {
    // Ellenőrzi az egész rácsot
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (grid[row][col] !== null) {
                const num = grid[row][col];
                grid[row][col] = null;
                if (!isValid(grid, row, col, num)) {
                    return false;
                }
                grid[row][col] = num;
            }
        }
    }
    return true;
};
