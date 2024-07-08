const isValid = (grid, row, col, num) => {
    const size = grid.length;
    const boxSize = Math.sqrt(size);
    for (let x = 0; x < size; x++) {
        if ((grid[row][x] === num && x !== col) || (grid[x][col] === num && x !== row)) {
            return false;
        }
    }

    const startRow = row - (row % boxSize);
    const startCol = col - (col % boxSize);
    for (let i = 0; i < boxSize; i++) {
        for (let j = 0; j < boxSize; j++) {
            if (grid[i + startRow][j + startCol] === num && (i + startRow !== row || j + startCol !== col)) {
                return false;
            }
        }
    }

    return true;
};

const findEmptyLocation = (grid, location) => {
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid.length; col++) {
            if (grid[row][col] === null) {
                location[0] = row;
                location[1] = col;
                return true;
            }
        }
    }
    return false;
};

export const solveSudoku = (grid) => {
    const location = [0, 0];
    if (!findEmptyLocation(grid, location)) {
        return true;
    }

    const row = location[0];
    const col = location[1];
    const size = grid.length;

    for (let num = 1; num <= size; num++) {
        if (isValid(grid, row, col, num)) {
            grid[row][col] = num;
            if (solveSudoku(grid)) {
                return true;
            }
            grid[row][col] = null;
        }
    }
    return false;
};

export const generateSudoku = (size) => {
    const emptyGrid = Array(size).fill().map(() => Array(size).fill(null));
    solveSudoku(emptyGrid);
    let numberOfCellsToRemove;

    switch (size) {
        case 4:
            numberOfCellsToRemove = 4; // Adjust this number as needed
            break;
        case 9:
            numberOfCellsToRemove = 40; // Adjust this number as needed
            break;
        default:
            numberOfCellsToRemove = 20;
    }

    const sudokuGrid = emptyGrid.map(row => row.slice());

    while (numberOfCellsToRemove > 0) {
        const row = Math.floor(Math.random() * size);
        const col = Math.floor(Math.random() * size);
        if (sudokuGrid[row][col] !== null) {
            sudokuGrid[row][col] = null;
            numberOfCellsToRemove--;
        }
    }

    return sudokuGrid;
};

export const isValidSudoku = (grid) => {
    const size = grid.length;
    const errors = Array(size).fill().map(() => Array(size).fill(false));

    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            const num = grid[row][col];
            if (num !== null) {
                grid[row][col] = null; // Temporarily empty the cell
                if (!isValid(grid, row, col, num)) {
                    errors[row][col] = true;
                }
                grid[row][col] = num; // Restore the cell
            }
        }
    }

    return errors;
};
