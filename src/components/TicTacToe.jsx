import { useState } from 'react'
import { checkWinner, makeAIMove } from '../game/ticTacToeLogic'
import {
  playClickSound,
  playCelebrationSounds,
  playVictorySounds,
  triggerConfetti,
} from '../hooks/useSound'
import './TicTacToe.css'

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [gameStatus, setGameStatus] = useState('playing') // 'playing', 'won', 'draw'
  const [winner, setWinner] = useState(null)
  const [showVictoryCelebration, setShowVictoryCelebration] = useState(false)
  const [winCount, setWinCount] = useState(0)
  const [isPlayerTurn, setIsPlayerTurn] = useState(true)
  const [isThinking, setIsThinking] = useState(false)

  const handleClick = (index) => {
    if (board[index] || gameStatus !== 'playing' || !isPlayerTurn || isThinking) return

    const newBoard = board.slice()
    newBoard[index] = 'X'
    setBoard(newBoard)
    setIsPlayerTurn(false)
    setIsThinking(true)

    // Play player click sound
    playClickSound(true)

    // Check if player won
    const gameWinner = checkWinner(newBoard)
    if (gameWinner) {
      setWinner(gameWinner)
      setGameStatus('won')
      const newWinCount = winCount + 1
      setWinCount(newWinCount)

      // Show special victory celebration on 3rd win
      if (newWinCount === 3) {
        setShowVictoryCelebration(true)
        // Immediate victory music for mobile
        playVictorySounds()
      }

      // Trigger confetti and celebration sounds
      playCelebrationSounds()
      triggerConfetti()

      // Delayed victory sequence on 3rd+ win
      if (newWinCount >= 3) {
        setTimeout(() => {
          playVictorySounds()
        }, 2000) // Delay to let regular celebration finish
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
      playClickSound(false)

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
    setShowVictoryCelebration(false)
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

      {showVictoryCelebration && (
        <div className="victory-celebration">
          <div
            className="celebration-message"
            onClick={() => {
              // Trigger victory music on click for mobile (gesture replay)
              playVictorySounds()
            }}
          >
            <h4>🏆 VICTORY MASTER! 🏆</h4>
            <p>🎉 You've achieved 3 wins! 🎉</p>
            <p>🎵 🎶 🎵</p>
            <div className="celebration-emoji">
              🎊🎉🎈🎁🎂🎯🎪🎭🎨🎪🎊
            </div>
            <button
              className="celebration-button"
              onClick={() => setShowVictoryCelebration(false)}
            >
              🎊 Awesome! 🎊
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
    </div>
  )
}

export default TicTacToe
