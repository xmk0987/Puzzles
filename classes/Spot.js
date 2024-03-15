export class GridSpot {
    constructor( pos, piece) {
      this.spot = {i: pos.i , j: pos.j},
      this.piece = piece
    }
  
    getPiece() {
        return this.piece
    }
    isAnswer(answer) {
        return this.spot.i === answer.i && this.spot.j === answer.j;
      }
  }
  