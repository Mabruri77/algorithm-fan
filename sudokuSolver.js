function sudokuSolver(board) {
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      if (board[row][col] == 0) return findValidNumber(board, row, col)
    }
  }
  return true
}

function findValidNumber(board, row, col) {
  for (let value = 1; value < 10; value++) {
    if (isValid(board, row, col, value)) {
      board[row][col] = value
      if (sudokuSolver(board)) return true
    }
  }
  board[row][col] = 0
  return false
}

function isValid(board, row, col, value) {
  for (let target of board[row]) {
    if (target == value) return false
  }
  for (let i = 0; i < board.length; i++) {
    let target = board[i][col]
    if (target == value) return false
  }
  let countRow = Math.floor(row / 3) * 3
  let countCol = Math.floor(col / 3) * 3
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[countRow + i][countCol + j] == value) return false
    }
  }
  return true
}

// Example usage:
const unsolvedSudoku = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9],
]

sudokuSolver(unsolvedSudoku, 0, 0)
console.log(unsolvedSudoku)
