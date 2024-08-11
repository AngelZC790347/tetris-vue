const ramdoms = [
  [8, 12, 9, 13],
  [0, 4, 8, 12],
  [8, 12, 13, 14],
  [7, 10, 11, 14],
  [10, 11, 13, 14],
  [7, 10, 11, 14],
  [11, 13, 14, 15],
];
export const GameState = {
  PAUSED: 0,
  PLAYING: 1,
  GAMEOVER: 2,
  WIN:3
};

export function randomBlock() {
  let block = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  ramdoms[Math.floor(Math.random() * ramdoms.length)].forEach((n) => {
    block[Math.floor(n / 4)][n % 4] = 1;
  });
  return block;
}

export function isInSafeArea(map, posX, posY, block) {
  let indexX;
  let indexY = block.findLastIndex((v) => v.some((n) => n === 1));
  indexX = block.reduce((v) => {
    console.log(v);
    return v;
  });
  return { indexX, indexY };
}
