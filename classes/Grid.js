import { GridSpot } from "./Spot";

export class Grid {
  constructor(rowCols, pieceWidth, pieceHeight, spots) {
    this.spots = spots || [];
    this.rowCols = rowCols;
    this.pieceWidth = pieceWidth;
    this.pieceHeight = pieceHeight;
  }

  async generateGrid() {
    for (let i = 0; i < this.rowCols; i++) {
      for (let j = 0; j < this.rowCols; j++) {
        const gridSpot = new GridSpot(
          { j, i },
          null,
          this.pieceWidth,
          this.pieceHeight
        );
        this.spots.push(gridSpot);
      }
    }
  }

  getHeight() {
    return this.rowCols * this.pieceHeight;
  }

  checkPiecePosition = (piece) => {
    const { x, y } = piece.currentPos;
    const height = this.getHeight();
    const midYpoint = y + height + this.pieceHeight / 2;
    const midXpoint = x + this.pieceWidth / 2;
    for (let spot of this.spots) {
      const { minX, minY, maxX, maxY } = spot.getArea();
      if (
        midXpoint >= minX &&
        midXpoint <= maxX &&
        midYpoint >= minY &&
        midYpoint <= maxY
      ) {
        if (spot.isAnswer(piece.answer)) {
          spot.setPiece(piece);
          return true;
        }
        return false;
      }
    }
  };
}
