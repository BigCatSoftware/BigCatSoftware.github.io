import Phaser from 'phaser'

// Catppuccin Latte tokens as Phaser color ints. Keep these in sync with
// the @theme block in src/index.css if either source ever changes.
const COLORS = {
  bg:        0xeff1f5,
  surface:   0xccd0da,
  surface2:  0xbcc0cc,
  accent:    0x7287fd,
  accent2:   0xfe640b,
  text:      0x4c4f69,
  textMuted: 0x6c6f85,
}

const TILE_RADIUS_PX = 10
const TILE_GAP_PX = 12
const PIECE_STROKE_PX = 10
const PIECE_INSET_PX = 28
const GLOW_PADDING_PX = 20
const BREATHING_DURATION = 1800
const BREATHING_SCALE = 1.02
const HOVER_SCALE = 1.05
const HOVER_DURATION = 180
const X_DROP_DURATION_1 = 200
const X_DROP_DURATION_2 = 80
const O_SWIRL_DURATION = 320
const FLASH_DURATION = 300
const PULSE_PER_TILE_MS = 180
const PULSE_DURATION_MS = 320
const SHIMMER_DURATION_MS = 250
const PARTICLES_PER_TILE = 18
const CAMERA_SHAKE_WIN_MS = 220
const CAMERA_SHAKE_INTENSITY = 0.0125
const CAMERA_SHAKE_LOSS_INTENSITY = 0.008
const DRAW_WIGGLE_DEG = 4
const DRAW_WIGGLE_DURATION_MS = 80
const PARTICLE_TEXTURE_PX = 10

export class BoardScene extends Phaser.Scene {
  constructor(config = {}) {
    super({ key: 'BoardScene' })
    this.onTileClick = config.onTileClick ?? (() => {})
    this.reducedMotion = config.reducedMotion ?? false
    this.tileSprites = []
    this.pieceSprites = []
    this.tileSize = 0
  }

  create() {
    const { width, height } = this.scale.gameSize
    const board = Math.min(width, height)
    this.tileSize = Math.floor((board - TILE_GAP_PX * 2) / 3)
    const tileFill = this.tileSize - TILE_GAP_PX

    this.#generateTextures(tileFill)
    this.#placeTiles(width, height, board)
  }

  #generateTextures(size) {
    // Tile
    const tileGfx = this.add.graphics()
    tileGfx.fillStyle(COLORS.surface, 1)
    tileGfx.fillRoundedRect(0, 0, size, size, TILE_RADIUS_PX)
    tileGfx.lineStyle(1, COLORS.surface2, 1)
    tileGfx.strokeRoundedRect(0.5, 0.5, size - 1, size - 1, TILE_RADIUS_PX)
    tileGfx.generateTexture('tile', size, size)
    tileGfx.destroy()

    // X piece
    const xGfx = this.add.graphics()
    xGfx.lineStyle(PIECE_STROKE_PX, COLORS.accent, 1)
    xGfx.beginPath()
    xGfx.moveTo(PIECE_INSET_PX, PIECE_INSET_PX)
    xGfx.lineTo(size - PIECE_INSET_PX, size - PIECE_INSET_PX)
    xGfx.moveTo(size - PIECE_INSET_PX, PIECE_INSET_PX)
    xGfx.lineTo(PIECE_INSET_PX, size - PIECE_INSET_PX)
    xGfx.strokePath()
    xGfx.generateTexture('x-piece', size, size)
    xGfx.destroy()

    // O piece
    const oGfx = this.add.graphics()
    oGfx.lineStyle(PIECE_STROKE_PX, COLORS.accent2, 1)
    oGfx.strokeCircle(size / 2, size / 2, size / 2 - PIECE_INSET_PX)
    oGfx.generateTexture('o-piece', size, size)
    oGfx.destroy()

    // Lavender glow (soft rounded rect, larger than tile, used beneath on hover)
    const glowSize = size + GLOW_PADDING_PX * 2
    const glowGfx = this.add.graphics()
    glowGfx.fillStyle(COLORS.accent, 0.45)
    glowGfx.fillRoundedRect(0, 0, glowSize, glowSize, TILE_RADIUS_PX + 6)
    glowGfx.generateTexture('glow', glowSize, glowSize)
    glowGfx.destroy()

    // Particle (small white circle, tinted by emitter)
    const partGfx = this.add.graphics()
    partGfx.fillStyle(0xffffff, 1)
    partGfx.fillCircle(PARTICLE_TEXTURE_PX / 2, PARTICLE_TEXTURE_PX / 2, PARTICLE_TEXTURE_PX / 2)
    partGfx.generateTexture('particle', PARTICLE_TEXTURE_PX, PARTICLE_TEXTURE_PX)
    partGfx.destroy()
  }

  #placeTiles(width, height, boardPx) {
    const startX = (width - boardPx) / 2 + this.tileSize / 2 + TILE_GAP_PX / 2
    const startY = (height - boardPx) / 2 + this.tileSize / 2 + TILE_GAP_PX / 2

    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        const index = row * 3 + col
        const x = startX + col * this.tileSize
        const y = startY + row * this.tileSize

        // Glow first so it renders beneath the tile
        const glow = this.add.image(x, y, 'glow').setAlpha(0)

        const tile = this.add.image(x, y, 'tile')
        tile.setInteractive({ useHandCursor: true })
        tile.on('pointerdown', () => this.onTileClick(index))
        tile.on('pointerover', () => this.#hoverIn(index))
        tile.on('pointerout', () => this.#hoverOut(index))

        // Continuous breathing scale 1.0 to 1.02, staggered across tiles.
        // Skipped entirely under prefers-reduced-motion.
        const breathingTween = this.reducedMotion
          ? null
          : this.tweens.add({
              targets: tile,
              scale: BREATHING_SCALE,
              duration: BREATHING_DURATION,
              yoyo: true,
              repeat: -1,
              ease: 'Sine.easeInOut',
              delay: index * 200,
            })

        this.tileSprites[index] = { sprite: tile, x, y, glow, breathingTween, hoverTween: null }
        this.pieceSprites[index] = null
      }
    }
  }

  #hoverIn(index) {
    if (this.pieceSprites[index]) return
    const entry = this.tileSprites[index]
    if (this.reducedMotion) {
      entry.sprite.setScale(HOVER_SCALE)
      entry.glow.setAlpha(1)
      return
    }
    entry.breathingTween?.pause()
    if (entry.hoverTween) entry.hoverTween.stop()
    entry.hoverTween = this.tweens.add({
      targets: entry.sprite,
      scale: HOVER_SCALE,
      duration: HOVER_DURATION,
      ease: 'Sine.easeOut',
    })
    this.tweens.add({
      targets: entry.glow,
      alpha: 1,
      duration: HOVER_DURATION,
      ease: 'Sine.easeOut',
    })
  }

  #hoverOut(index) {
    if (this.pieceSprites[index]) return
    const entry = this.tileSprites[index]
    if (this.reducedMotion) {
      entry.sprite.setScale(1.0)
      entry.glow.setAlpha(0)
      return
    }
    if (entry.hoverTween) entry.hoverTween.stop()
    entry.hoverTween = this.tweens.add({
      targets: entry.sprite,
      scale: 1.0,
      duration: HOVER_DURATION,
      ease: 'Sine.easeOut',
      onComplete: () => entry.breathingTween?.resume(),
    })
    this.tweens.add({
      targets: entry.glow,
      alpha: 0,
      duration: HOVER_DURATION,
      ease: 'Sine.easeOut',
    })
  }

  #flashTile(index, color) {
    const tile = this.tileSprites[index].sprite
    const startColor = Phaser.Display.Color.IntegerToColor(color)
    const endColor = Phaser.Display.Color.IntegerToColor(COLORS.surface)

    this.tweens.addCounter({
      from: 0,
      to: 100,
      duration: FLASH_DURATION,
      ease: 'Sine.easeOut',
      onUpdate: (tween) => {
        const blended = Phaser.Display.Color.Interpolate.ColorWithColor(
          startColor,
          endColor,
          100,
          tween.getValue(),
        )
        tile.setTint(Phaser.Display.Color.GetColor(blended.r, blended.g, blended.b))
      },
      onComplete: () => tile.clearTint(),
    })
  }

  // Called from React after every board state change.
  updateBoard(board) {
    for (let i = 0; i < 9; i++) {
      const existing = this.pieceSprites[i]
      const cell = board[i]

      if (cell && !existing) {
        const entry = this.tileSprites[i]

        // Reset any active hover state and pause breathing while occupied
        if (entry.hoverTween) entry.hoverTween.stop()
        entry.breathingTween?.pause()
        entry.sprite.setScale(1.0)
        entry.glow.setAlpha(0)
        entry.sprite.disableInteractive()

        const textureKey = cell === 'X' ? 'x-piece' : 'o-piece'
        const piece = this.add.image(entry.x, entry.y, textureKey)
        this.pieceSprites[i] = piece

        if (this.reducedMotion) {
          piece.setScale(1.0)
        } else if (cell === 'X') {
          // Drop with bounce: scale 0.3 -> 1.1 -> 1.0
          piece.setScale(0.3)
          this.tweens.chain({
            targets: piece,
            tweens: [
              { scale: 1.1, duration: X_DROP_DURATION_1, ease: 'Back.easeOut' },
              { scale: 1.0, duration: X_DROP_DURATION_2, ease: 'Sine.easeInOut' },
            ],
          })
          this.#flashTile(i, COLORS.accent)
        } else {
          // Swirl in: rotation -180 -> 0, scale 0 -> 1
          piece.setScale(0).setAngle(-180)
          this.tweens.add({
            targets: piece,
            scale: 1,
            angle: 0,
            duration: O_SWIRL_DURATION,
            ease: 'Sine.easeOut',
          })
          this.#flashTile(i, COLORS.accent2)
        }
      } else if (!cell && existing) {
        // Reset to empty: destroy piece, resume breathing, re-enable hover
        existing.destroy()
        this.pieceSprites[i] = null
        const entry = this.tileSprites[i]
        entry.sprite.setAngle(0)
        entry.sprite.setScale(1.0)
        entry.sprite.clearTint()
        entry.sprite.setInteractive({ useHandCursor: true })
        entry.breathingTween?.resume()
      }
    }
  }

  // Called from React when game state transitions to 'won' or 'draw'.
  // outcome: { kind: 'win' | 'loss' | 'draw', winningLine?: number[] }
  playOutcome(outcome) {
    if (this.reducedMotion) {
      // Mark the winning line statically, skip particles/shake/wiggle.
      if (outcome.kind === 'win' || outcome.kind === 'loss') {
        const color = outcome.kind === 'win' ? COLORS.accent : COLORS.surface2
        outcome.winningLine?.forEach((i) => this.tileSprites[i].sprite.setTint(color))
      }
      return
    }
    if (outcome.kind === 'win') {
      this.#celebrateLine(outcome.winningLine, true)
    } else if (outcome.kind === 'loss') {
      this.#celebrateLine(outcome.winningLine, false)
    } else if (outcome.kind === 'draw') {
      this.#drawWiggle()
    }
  }

  #celebrateLine(line, isPlayer) {
    if (!line) return
    const pulseColor = isPlayer ? COLORS.accent : COLORS.surface2
    const particleColors = isPlayer
      ? [COLORS.accent, COLORS.accent2]
      : [COLORS.surface2, COLORS.textMuted]
    const shakeIntensity = isPlayer ? CAMERA_SHAKE_INTENSITY : CAMERA_SHAKE_LOSS_INTENSITY

    this.cameras.main.shake(CAMERA_SHAKE_WIN_MS, shakeIntensity)

    // Line pulse, tile by tile
    line.forEach((tileIndex, i) => {
      this.time.delayedCall(i * PULSE_PER_TILE_MS, () => {
        this.#pulseTile(tileIndex, pulseColor)
      })
    })

    // After pulse, lift and shimmer the winning tiles + particle bursts
    const shimmerDelay = line.length * PULSE_PER_TILE_MS
    this.time.delayedCall(shimmerDelay, () => {
      line.forEach((tileIndex) => {
        const entry = this.tileSprites[tileIndex]
        this.tweens.add({
          targets: entry.sprite,
          scale: 1.12,
          duration: SHIMMER_DURATION_MS,
          yoyo: true,
          repeat: isPlayer ? 1 : 0,
          ease: 'Sine.easeInOut',
        })
        this.#burstParticles(entry.x, entry.y, particleColors)
      })
    })
  }

  #pulseTile(index, color) {
    const tile = this.tileSprites[index].sprite
    const flashColor = Phaser.Display.Color.IntegerToColor(color)
    const baseColor = Phaser.Display.Color.IntegerToColor(COLORS.surface)

    this.tweens.addCounter({
      from: 0,
      to: 100,
      duration: PULSE_DURATION_MS,
      yoyo: true,
      ease: 'Sine.easeInOut',
      onUpdate: (tween) => {
        const blended = Phaser.Display.Color.Interpolate.ColorWithColor(
          baseColor,
          flashColor,
          100,
          tween.getValue(),
        )
        tile.setTint(Phaser.Display.Color.GetColor(blended.r, blended.g, blended.b))
      },
      onComplete: () => tile.clearTint(),
    })
  }

  #burstParticles(x, y, colors) {
    const emitter = this.add.particles(x, y, 'particle', {
      speed: { min: 140, max: 280 },
      angle: { min: 220, max: 320 }, // upper hemisphere in Phaser angle space (270 = up)
      scale: { start: 0.9, end: 0 },
      alpha: { start: 1, end: 0 },
      lifespan: { min: 600, max: 900 },
      gravityY: 360,
      tint: colors,
      quantity: PARTICLES_PER_TILE,
      emitting: false,
    })
    emitter.explode(PARTICLES_PER_TILE, x, y)
    // Self-destruct after particles finish
    this.time.delayedCall(1100, () => emitter.destroy())
  }

  #drawWiggle() {
    this.tileSprites.forEach(({ sprite }) => {
      this.tweens.add({
        targets: sprite,
        angle: { from: 0, to: DRAW_WIGGLE_DEG },
        duration: DRAW_WIGGLE_DURATION_MS,
        yoyo: true,
        repeat: 3,
        ease: 'Sine.easeInOut',
        onComplete: () => sprite.setAngle(0),
      })
    })
  }
}
