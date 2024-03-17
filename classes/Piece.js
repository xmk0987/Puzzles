export class Piece {
  constructor(answer, coords, uri, width, height, pieceId) {
    this.answer = { i: answer.i, j: answer.j };
    this.currentPos = { x: coords.x, y: coords.y };
    (this.imageUri = uri), (this.height = height), (this.width = width);
    this.id = pieceId;
  }

  movePiece(newX, newY) {
    this.currentPos.x = newX;
    this.currentPos.y = newY;
  }

  getCurrentPos() {
    return this.currentPos;
  }

  getAnswer() {
    return this.answer;
  }
  getImageUri() {
    return this.imageUri;
  }

  // Function to get the height of the piece
  getHeight() {
    return this.height;
  }

  // Function to get the width of the piece
  getWidth() {
    return this.width;
  }

  isAnswer(answer) {
    if (this.answer.i === answer.i && this.answer.j === answer.j) {
      return true;
    }
    return false;
  }
}
