export const BLOCK_SIZE = 10
export const GRAVITY = 1
export const BOARD_WIDTH = 20
export const BOARD_HEIGHT = 20
export function createBoard (width, height) {
  return Array(height).fill().map(() => Array(width).fill(0))
}
export const BLOCK_SPRITES = {
  red: './TetrisBlue.png',
  cyan: './TetrisCyan.png',
  // ghost: './TetrisGhost.png',
  green: './TetrisGreen.png',
  orange: './TetrisOrange.png',
  pink: './TetrisPink.png',
  purple: './TetrisPurple.png',
  yellow: './TetrisYellow.png',
  blue: './TetrisBlue.png'
}
export const blockImages = Object.keys(BLOCK_SPRITES).map((v)=>{
  let img = new Image()
  img.src = BLOCK_SPRITES[v]
  return img
})
