function sudokuSolver(board) {
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      if (board[row][col] == 0) {
        return numberProbability(board, row, col)
      }
    }
  }
  console.log(board)
}

function numberProbability(board, row, col) {
  for (let num = 1; num < 10; num++) {
    if (isValidNumber(board, num, row, col)) {
      board[row][col] = num
      if (sudokuSolver(board)) return true
    }
  }
  return false
}

function isValidNumber(board, value, row, col) {
  let targetRow = board[row].includes(value)
  let targetCol
  for (let i = 0; i < board[row].length; i++) {
    if (board[i][col] == value) {
      targetCol = true
      break
    }
  }

  if (targetRow || targetCol) return false

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let newRow = Math.floor(row / 3) * 3 + i
      let newCol = Math.floor(col / 3) * 3 + j
      if (board[newRow][newCol] == value) return false
    }
  }
  return true
}
let start = performance.now()
sudokuSolver([
  [3, 0, 0, 0, 0, 0, 0, 0, 2],
  [5, 0, 9, 1, 3, 4, 7, 6, 8],
  [4, 8, 7, 6, 2, 9, 5, 3, 1],
  [2, 0, 3, 0, 1, 5, 9, 8, 7],
  [9, 0, 4, 8, 6, 0, 1, 2, 5],
  [8, 5, 0, 0, 0, 0, 6, 4, 3],
  [1, 3, 8, 0, 4, 7, 2, 0, 6],
  [6, 9, 2, 3, 5, 1, 8, 7, 4],
  [7, 4, 5, 0, 8, 6, 3, 1, 0],
])

let end = performance.now()
console.log(end - start)
