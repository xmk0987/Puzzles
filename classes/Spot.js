export class GridSpot {
  constructor(answer, piece, pieceWidth, pieceHeight) {
    this.answer = { i: answer.i, j: answer.j };
    this.piece = piece;
    this.area = {
      minX: answer.j,
      minY: answer.i,
      maxX: (answer.j + 1) * pieceWidth, // Adjusted the calculation
      maxY: (answer.i + 1) * pieceHeight,
    };
    this.pieceHeight = pieceHeight;
  }

  setPiece(piece) {
    this.piece = piece;
  }

  getPiece() {
    return this.piece;
  }

  getArea() {
    return this.area;
  }

  getPos() {
    return this.position;
  }

  isAnswer(answer) {
    return this.answer.i === answer.i && this.answer.j === answer.j;
  }
}
