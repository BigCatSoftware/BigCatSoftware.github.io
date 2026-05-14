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

// Internal layout. Tiles render in a 3x3 grid centered in the canvas.
// Tile dimensions are computed from canvas size at scene create() so the
// board scales when the wrapper resizes. No juice in this commit; pieces
// appear instantly, tiles are static.
const TILE_RADIUS_PX = 10
const TILE_GAP_PX = 12
const PIECE_STROKE_PX = 10
const PIECE_INSET_PX = 28

export class BoardScene extends Phaser.Scene {
  constructor(config = {}) {
    super({ key: 'BoardScene' })
    this.onTileClick = config.onTileClick ?? (() => {})
    this.tileSprites = []
    this.pieceSprites = []
    this.tileSize = 0
  }

  create() {
    const { width, height } = this.scale.gameSize

    // Compute tile size from canvas dimensions so the board fills the
    // square wrapper regardless of viewport.
    const board = Math.min(width, height)
    this.tileSize = Math.floor((board - TILE_GAP_PX * 2) / 3)
    const tileFill = this.tileSize - TILE_GAP_PX

    this.#generateTextures(tileFill)
    this.#placeTiles(width, height, board)
  }

  #generateTextures(size) {
    // Tile texture
    const tileGfx = this.add.graphics()
    tileGfx.fillStyle(COLORS.surface, 1)
    tileGfx.fillRoundedRect(0, 0, size, size, TILE_RADIUS_PX)
    tileGfx.lineStyle(1, COLORS.surface2, 1)
    tileGfx.strokeRoundedRect(0.5, 0.5, size - 1, size - 1, TILE_RADIUS_PX)
    tileGfx.generateTexture('tile', size, size)
    tileGfx.destroy()

    // X piece texture
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

    // O piece texture
    const oGfx = this.add.graphics()
    oGfx.lineStyle(PIECE_STROKE_PX, COLORS.accent2, 1)
    oGfx.strokeCircle(size / 2, size / 2, size / 2 - PIECE_INSET_PX)
    oGfx.generateTexture('o-piece', size, size)
    oGfx.destroy()
  }

  #placeTiles(width, height, boardPx) {
    const startX = (width - boardPx) / 2 + this.tileSize / 2 + TILE_GAP_PX / 2
    const startY = (height - boardPx) / 2 + this.tileSize / 2 + TILE_GAP_PX / 2

    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        const index = row * 3 + col
        const x = startX + col * this.tileSize
        const y = startY + row * this.tileSize

        const tile = this.add.image(x, y, 'tile')
        tile.setInteractive({ useHandCursor: true })
        tile.on('pointerdown', () => this.onTileClick(index))

        this.tileSprites[index] = { sprite: tile, x, y }
        this.pieceSprites[index] = null
      }
    }
  }

  // Called from React after every board state change. Adds or removes
  // piece sprites to mirror the board array. No animation yet.
  updateBoard(board) {
    for (let i = 0; i < 9; i++) {
      const existing = this.pieceSprites[i]
      const cell = board[i]
      if (cell && !existing) {
        const { x, y } = this.tileSprites[i]
        const textureKey = cell === 'X' ? 'x-piece' : 'o-piece'
        const piece = this.add.image(x, y, textureKey)
        this.pieceSprites[i] = piece
      } else if (!cell && existing) {
        existing.destroy()
        this.pieceSprites[i] = null
      }
    }
  }
}
