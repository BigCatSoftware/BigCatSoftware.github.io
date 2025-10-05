import { useState, useEffect } from 'react'
import './TicTacToe.css'

const TicTacToe = ({ onGameWin, onThemeChange, currentTheme, onPlayClickSound }) => {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [gameStatus, setGameStatus] = useState('playing') // 'playing', 'won', 'draw'
  const [winner, setWinner] = useState(null)
  const [showThemeOption, setShowThemeOption] = useState(false)
  const [winCount, setWinCount] = useState(0)
  const [isPlayerTurn, setIsPlayerTurn] = useState(true)
  const [isThinking, setIsThinking] = useState(false)

  // Reset everything on page load
  useEffect(() => {
    // Reset win count to 0
    setWinCount(0)
    localStorage.removeItem('tic-tac-toe-wins')
    
    // Reset theme to default when win count is 0
    if (onThemeChange) {
      onThemeChange('default')
    }
  }, [])

  // Reset theme to default when win count becomes 0
  useEffect(() => {
    if (winCount === 0 && onThemeChange) {
      onThemeChange('default')
    }
  }, [winCount, onThemeChange])

  const checkWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]
      }
    }
    return null
  }

  const getEmptySquares = (squares) => {
    return squares.map((square, index) => square === null ? index : null).filter(val => val !== null)
  }

  const makeAIMove = (squares) => {
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

  const handleClick = (index) => {
    if (board[index] || gameStatus !== 'playing' || !isPlayerTurn || isThinking) return

    const newBoard = board.slice()
    newBoard[index] = 'X'
    setBoard(newBoard)
    setIsPlayerTurn(false)
    setIsThinking(true)

    // Play player click sound
    if (onPlayClickSound) {
      onPlayClickSound(true)
    }

    // Check if player won
    const gameWinner = checkWinner(newBoard)
    if (gameWinner) {
      setWinner(gameWinner)
      setGameStatus('won')
      setShowThemeOption(true)
      const newWinCount = winCount + 1
      setWinCount(newWinCount)
      localStorage.setItem('tic-tac-toe-wins', newWinCount.toString())
      
      // Trigger confetti and sound effects
      if (onGameWin) {
        onGameWin(gameWinner, newWinCount)
      }
      return
    }

    // Check for draw
    if (newBoard.every(square => square !== null)) {
      setGameStatus('draw')
      setIsThinking(false)
      return
    }

    // AI makes move after 1 second delay
    setTimeout(() => {
      const aiBoard = makeAIMove(newBoard)
      setBoard(aiBoard)
      setIsThinking(false)
      setIsPlayerTurn(true)

      // Play AI click sound
      if (onPlayClickSound) {
        onPlayClickSound(false)
      }

      // Check if AI won
      const aiWinner = checkWinner(aiBoard)
      if (aiWinner) {
        setWinner(aiWinner)
        setGameStatus('won')
        return
      }

      // Check for draw
      if (aiBoard.every(square => square !== null)) {
        setGameStatus('draw')
      }
    }, 1000)
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setGameStatus('playing')
    setWinner(null)
    setShowThemeOption(false)
    setIsPlayerTurn(true)
    setIsThinking(false)
  }

  const renderSquare = (index) => {
    const isDisabled = gameStatus !== 'playing' || !isPlayerTurn || isThinking || board[index] !== null
    return (
      <button
        className={`square ${board[index] ? `square-${board[index].toLowerCase()}` : ''} ${isThinking ? 'thinking' : ''}`}
        onClick={() => handleClick(index)}
        disabled={isDisabled}
      >
        {board[index]}
      </button>
    )
  }

  const getStatusMessage = () => {
    if (gameStatus === 'won') {
      if (winner === 'X') {
        return `🎉 You Win! 🎉`
      } else {
        return `🤖 AI Wins! 🤖`
      }
    } else if (gameStatus === 'draw') {
      return "It's a Draw! 🤝"
    } else if (isThinking) {
      return "🤖 AI is thinking..."
    } else {
      return "Your turn! Place an X"
    }
  }

  return (
    <div className="tic-tac-toe-container">
      <div className="game-header">
        <h3>🎮 Tic-Tac-Toe vs AI</h3>
        <p className="game-instructions">
          You are X, AI is O. Win 3 games to unlock special victory sounds! 🎁
        </p>
        <div className="win-counter">
          <span className="win-count">🏆 Wins: {winCount}</span>
          {winCount >= 3 && <span className="victory-badge">🎊 Victory Master! 🎊</span>}
        </div>
        
      </div>

      <div className="game-status">
        <p className={`status-message ${gameStatus} ${isThinking ? 'thinking' : ''}`}>
          {getStatusMessage()}
        </p>
      </div>

      <div className="game-board">
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>

      {showThemeOption && (
        <div className="theme-unlock">
          <div className="unlock-message">
            <h4>🎊 Congratulations! 🎊</h4>
            <p>You've unlocked the University of Washington theme!</p>
            <button 
              className="theme-button"
              onClick={() => {
                if (onGameWin) {
                  onGameWin('theme-unlock')
                }
              }}
            >
              🎨 Apply UW Theme
            </button>
          </div>
        </div>
      )}

      <div className="game-controls">
        <button className="reset-button" onClick={resetGame}>
          🔄 New Game
        </button>
        <button 
          className="reset-stats-button" 
          onClick={() => {
            setWinCount(0)
            localStorage.removeItem('tic-tac-toe-wins')
            // Reset theme to default when resetting stats
            if (onThemeChange) {
              onThemeChange('default')
            }
          }}
        >
          📊 Reset Stats
        </button>
      </div>

      <div className="game-footer">
        <p className="easter-egg-hint">
          💡 This is an easter egg! Win 3 games to hear the victory celebration! 🎉
        </p>
      </div>

      {/* Theme Swap Button - Bottom Right */}
      <div className="theme-swap-container">
        <button 
          className={`theme-swap-button ${winCount >= 1 ? 'enabled' : 'disabled'}`}
          onClick={() => onThemeChange(currentTheme === 'uw' ? 'default' : 'uw')}
          disabled={winCount < 1}
          title={winCount < 1 ? 'Win a game to unlock theme switching!' : 'Switch theme'}
        >
          {currentTheme === 'uw' ? '🎨 Default' : '🏛️ UW'}
        </button>
        {winCount < 1 && (
          <div className="theme-lock-hint">
            <span>🔒 Win to unlock</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default TicTacToe
