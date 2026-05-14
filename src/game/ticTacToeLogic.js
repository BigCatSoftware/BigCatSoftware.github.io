// Game logic and AI heuristic ported verbatim from the main-branch TicTacToe.jsx.
// Same 8 winning lines, same player-X / AI-O, same "win > block > center > corner > edge"
// AI priority order. The Phaser scene imports these for behavior identical to the
// React/CSS implementation.

export const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

export function checkWinner(squares) {
  for (let i = 0; i < WINNING_LINES.length; i++) {
    const [a, b, c] = WINNING_LINES[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

export function findWinningLine(squares) {
  for (let i = 0; i < WINNING_LINES.length; i++) {
    const [a, b, c] = WINNING_LINES[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return WINNING_LINES[i]
    }
  }
  return null
}

export function getEmptySquares(squares) {
  return squares.map((square, index) => square === null ? index : null).filter(val => val !== null)
}

export function makeAIMove(squares) {
  const emptySquares = getEmptySquares(squares)
  if (emptySquares.length === 0) return squares

  // Simple AI strategy: try to win, then block, then take center, then corners, then edges
  const newSquares = [...squares]

  // Try to win
  for (let i = 0; i < emptySquares.length; i++) {
    const index = emptySquares[i]
    newSquares[index] = 'O'
    if (checkWinner(newSquares) === 'O') {
      return newSquares
    }
    newSquares[index] = null
  }

  // Try to block player from winning
  for (let i = 0; i < emptySquares.length; i++) {
    const index = emptySquares[i]
    newSquares[index] = 'X'
    if (checkWinner(newSquares) === 'X') {
      newSquares[index] = 'O'
      return newSquares
    }
    newSquares[index] = null
  }

  // Take center if available
  if (squares[4] === null) {
    newSquares[4] = 'O'
    return newSquares
  }

  // Take corners
  const corners = [0, 2, 6, 8]
  for (let corner of corners) {
    if (squares[corner] === null) {
      newSquares[corner] = 'O'
      return newSquares
    }
  }

  // Take any remaining edge
  const edges = [1, 3, 5, 7]
  for (let edge of edges) {
    if (squares[edge] === null) {
      newSquares[edge] = 'O'
      return newSquares
    }
  }

  return newSquares
}
