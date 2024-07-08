const isValid = (grid, row, col, num) => {
    for (let x = 0; x < 9; x++) {
        if (grid[row][x] === num || grid[x][col] === num) {
            return false;
        }
    }

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

const findEmptyLocation = (grid, location) => {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
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

    for (let num = 1; num <= 9; num++) {
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

export const generateSudoku = (difficulty) => {
    const emptyGrid = Array(9).fill().map(() => Array(9).fill(null));
    solveSudoku(emptyGrid);
    let numberOfCellsToRemove;

    switch (difficulty) {
        case 'easy':
            numberOfCellsToRemove = 20;
            break;
        case 'medium':
            numberOfCellsToRemove = 40;
            break;
        case 'hard':
            numberOfCellsToRemove = 60;
            break;
        default:
            numberOfCellsToRemove = 20;
    }

    const sudokuGrid = emptyGrid.map(row => row.slice());

    while (numberOfCellsToRemove > 0) {
        const row = Math.floor(Math.random() * 9);
        const col = Math.floor(Math.random() * 9);
        if (sudokuGrid[row][col] !== null) {
            sudokuGrid[row][col] = null;
            numberOfCellsToRemove--;
        }
    }

    return sudokuGrid;
};
