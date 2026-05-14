import { useEffect, useRef, useState } from 'react'
import Phaser from 'phaser'
import { motion } from 'framer-motion'
import { checkWinner, findWinningLine, makeAIMove } from '../game/ticTacToeLogic'
import { BoardScene } from '../game/PhaserBoardScene'
import {
  playClickSound,
  playCelebrationSounds,
  playVictorySounds,
  triggerConfetti,
} from '../hooks/useSound'

const CANVAS_PX = 480

export default function TicTacToe() {
  const containerRef = useRef(null)
  const gameRef = useRef(null)
  const sceneRef = useRef(null)
  const handlerRef = useRef(() => {})

  const [board, setBoard] = useState(Array(9).fill(null))
  const [gameStatus, setGameStatus] = useState('playing') // 'playing' | 'won' | 'draw'
  const [winner, setWinner] = useState(null)
  const [isPlayerTurn, setIsPlayerTurn] = useState(true)
  const [isThinking, setIsThinking] = useState(false)
  const [winCount, setWinCount] = useState(0)
  const [showVictoryCelebration, setShowVictoryCelebration] = useState(false)
  const [reducedMotion] = useState(() =>
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches,
  )

  // Mount the Phaser game once on first render. The scene receives a stable
  // callback that delegates to handlerRef.current so the scene never sees
  // stale React state.
  useEffect(() => {
    if (!containerRef.current) return

    const scene = new BoardScene({
      onTileClick: (index) => handlerRef.current(index),
      reducedMotion,
    })
    sceneRef.current = scene

    const game = new Phaser.Game({
      type: Phaser.AUTO,
      parent: containerRef.current,
      transparent: true,
      backgroundColor: 0x00000000,
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: CANVAS_PX,
        height: CANVAS_PX,
      },
      scene,
      pixelArt: false,
      antialias: true,
    })
    gameRef.current = game

    return () => {
      game.destroy(true)
      gameRef.current = null
      sceneRef.current = null
    }
  }, [])

  // Mirror board state into the Phaser scene whenever it changes.
  useEffect(() => {
    sceneRef.current?.updateBoard(board)
  }, [board])

  // Tile click handler. handlerRef is reassigned on every render so the
  // closure always sees the latest state when the scene fires the event.
  handlerRef.current = (index) => {
    if (board[index] || gameStatus !== 'playing' || !isPlayerTurn || isThinking) return

    const newBoard = board.slice()
    newBoard[index] = 'X'
    setBoard(newBoard)
    setIsPlayerTurn(false)
    setIsThinking(true)

    playClickSound(true)

    const gameWinner = checkWinner(newBoard)
    if (gameWinner) {
      setWinner(gameWinner)
      setGameStatus('won')
      const newWinCount = winCount + 1
      setWinCount(newWinCount)

      sceneRef.current?.playOutcome({ kind: 'win', winningLine: findWinningLine(newBoard) })

      if (newWinCount === 3) {
        setShowVictoryCelebration(true)
        playVictorySounds() // immediate, mobile-gesture path
      }

      playCelebrationSounds()
      triggerConfetti()

      if (newWinCount >= 3) {
        setTimeout(() => playVictorySounds(), 2000)
      }
      return
    }

    if (newBoard.every((cell) => cell !== null)) {
      setGameStatus('draw')
      setIsThinking(false)
      sceneRef.current?.playOutcome({ kind: 'draw' })
      return
    }

    // AI moves after 1s (preserved verbatim from main)
    setTimeout(() => {
      const aiBoard = makeAIMove(newBoard)
      setBoard(aiBoard)
      setIsThinking(false)
      setIsPlayerTurn(true)

      playClickSound(false)

      const aiWinner = checkWinner(aiBoard)
      if (aiWinner) {
        setWinner(aiWinner)
        setGameStatus('won')
        sceneRef.current?.playOutcome({ kind: 'loss', winningLine: findWinningLine(aiBoard) })
        return
      }
      if (aiBoard.every((cell) => cell !== null)) {
        setGameStatus('draw')
        sceneRef.current?.playOutcome({ kind: 'draw' })
      }
    }, 1000)
  }

  function resetGame() {
    setBoard(Array(9).fill(null))
    setGameStatus('playing')
    setWinner(null)
    setShowVictoryCelebration(false)
    setIsPlayerTurn(true)
    setIsThinking(false)
  }

  function statusMessage() {
    if (gameStatus === 'won') return winner === 'X' ? 'You win!' : 'AI wins.'
    if (gameStatus === 'draw') return 'Draw.'
    if (isThinking) return 'Thinking...'
    return 'Your turn. Place an X.'
  }

  return (
    <section id="play" className="bg-bg text-text py-24 md:py-28">
      <div className="mx-auto max-w-3xl px-6 md:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-mono text-sm font-medium uppercase tracking-[0.22em] text-text-muted">
            AN ASIDE
          </p>
          <h2 className="mt-2 font-display font-semibold leading-[1.15] tracking-[-0.01em] text-[clamp(2.5rem,4vw,3.75rem)]">
            Tic Tac Toe.
          </h2>
          <p className="mt-3 text-lg text-text-muted">Three in a row. You are X.</p>
        </motion.div>

        <a
          href="#credentials"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-1/2 focus:z-50 focus:-translate-x-1/2 focus:rounded-md focus:bg-bg focus:px-4 focus:py-2 focus:font-medium focus:text-text focus:shadow-lifted focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-bg"
        >
          Skip game
        </a>

        <p className="mt-10 font-mono text-sm uppercase tracking-[0.18em] text-text-muted" aria-live="polite">
          {statusMessage()}
        </p>

        <div className="mx-auto mt-6 aspect-square w-full max-w-[480px]">
          <div
            ref={containerRef}
            className="h-full w-full"
            role="application"
            aria-label="Interactive tic tac toe game. Use the New Game button below to reset. Skip game link above moves focus past the section."
          />
        </div>

        <button
          type="button"
          onClick={resetGame}
          className="mt-8 inline-flex items-center gap-2 rounded-lg border-2 border-border px-6 py-3 font-medium text-text transition-colors duration-[220ms] hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        >
          New Game
        </button>

        <p className="mt-6 font-mono text-xs uppercase tracking-[0.18em] text-text-muted">
          Wins: {winCount}
        </p>
      </div>

      {showVictoryCelebration && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Victory Master"
          onClick={() => playVictorySounds()}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-md rounded-2xl border border-border bg-surface p-8 text-center shadow-lifted"
          >
            <p className="font-mono text-sm font-medium uppercase tracking-[0.22em] text-text-muted">
              VICTORY MASTER
            </p>
            <h3 className="mt-3 font-display text-3xl font-semibold leading-[1.15]">
              Three wins in a session.
            </h3>
            <p className="mt-4 text-text-muted">
              Tap anywhere outside this card to replay the victory sound.
            </p>
            <button
              type="button"
              onClick={() => setShowVictoryCelebration(false)}
              className="mt-6 inline-flex items-center gap-2 rounded-lg border-2 border-border px-5 py-2.5 text-sm font-medium transition-colors hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
