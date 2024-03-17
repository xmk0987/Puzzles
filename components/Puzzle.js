import React, { useState, useEffect, useReducer } from "react";
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  PanResponder,
  TouchableOpacity
} from "react-native";

import { commonStyles } from "../styles/commonStyles";
import { puzzleStyles } from "../styles/puzzleStyles";

import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import { Piece } from "../classes/Piece";
import { Grid } from "../classes/Grid";

/**
 * Puzzle Component
 * @param {object} route - The route object containing navigation parameters.
 */
const Puzzle = ({ navigation, route }) => {
  // Define options for different numbers of pieces
  const pieceAmountOptions = {
    100: { rowCols: 10 },
    64: { rowCols: 8 },
    36: { rowCols: 6 },
    25: { rowCols: 5 },
    9: { rowCols: 3 },
  };

  // Destructure route parameters
  const { imageUri, pieceAmount } = route.params;

  // Reducer function to manage puzzle pieces
  const piecesReducer = (state, action) => {
    switch (action.type) {
      case "MOVE_PIECE":
        return state.map((piece) => {
          if (piece.id === action.payload.id) {
            return { ...piece, currentPos: action.payload.newPos };
          }
          return piece;
        });
      case "SET_PIECES":
        return action.payload;
      case "REMOVE_PIECE":
        return state.filter((piece) => action.payload.id !== piece.id);
      default:
        return state;
    }
  };

  // State variables
  const [pieces, dispatchPieces] = useReducer(piecesReducer, []);
  const [image, setImage] = useState(null);
  const [grid, setGrid] = useState([]);
  const [numCols, setNumCols] = useState(
    pieceAmount ? pieceAmountOptions[pieceAmount].rowCols : 0
  );
  const [pieceHeight, setPieceHeight] = useState(0);
  const [pieceWidth, setPieceWidth] = useState(0);
  const [piecesContainerPos, setPiecesContainerPos] = useState(null);
  const [done, setDone] = useState(false);

  // Function to create PanResponder for dragging puzzle pieces
  const getPanResponder = (piece) =>
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        const { dx, dy } = gesture;
        const newX = piece.currentPos.x + dx;
        const newY = piece.currentPos.y + dy;
        dispatchPieces({
          type: "MOVE_PIECE",
          payload: { id: piece.id, newPos: { x: newX, y: newY } },
        });
      },
      onPanResponderRelease: () => {
        if (grid.checkPiecePosition(piece)) {
          dispatchPieces({
            type: "REMOVE_PIECE",
            payload: { id: piece.id },
          });

          if (pieces.length === 1) {
            setDone(true);
          }
        }
      },
    });

  // Function to set up the puzzle
  const setupPuzzle = async () => {
    const allPieces = await getPieces();
    const theGrid = new Grid(numCols, pieceWidth, pieceHeight);
    await theGrid.generateGrid();
    setGrid(theGrid);
    dispatchPieces({ type: "SET_PIECES", payload: allPieces });
  };

  // Function to generate puzzle pieces from the image
  const getPieces = async () => {
    const allPieces = [];
    try {
      for (let i = 0; i < numCols; i++) {
        for (let j = 0; j < numCols; j++) {
          const maniResult = await manipulateAsync(
            imageUri,
            [
              {
                crop: {
                  height: pieceHeight,
                  width: pieceWidth,
                  originX: pieceWidth * j,
                  originY: pieceHeight * i,
                },
              },
            ],
            { format: SaveFormat.PNG }
          );
          const pieceId = `${i}-${j}`;
          const y = pieceHeight * i + 2 * i;
          const x = pieceWidth * j + 2 * j;

          const newPiece = new Piece(
            { i, j },
            { x: x, y: y },
            maniResult.uri,
            maniResult.width,
            maniResult.height,
            pieceId
          );
          allPieces.push(newPiece);
        }
      }
      return allPieces;
    } catch (error) {
      console.error("Error occurred during image manipulation:", error);
    }
  };

  // Function to resize the image for puzzle pieces
  const resizeImage = async () => {
    const screenWidth = Dimensions.get("window").width;
    const screenHeight = Dimensions.get("window").height;
    const targetWidth = Math.floor(screenWidth * 0.9);
    const targetHeight = Math.floor(screenHeight * 0.4);
    try {
      const resizedImage = await manipulateAsync(
        imageUri,
        [{ resize: { width: targetWidth, height: targetHeight } }],
        { format: SaveFormat.JPEG }
      );
      setImage(resizedImage);
      setPieceHeight(resizedImage.height / numCols);
      setPieceWidth(resizedImage.width / numCols);
    } catch (error) {
      console.error("Error occurred during image manipulation:", error);
    }
  };

  useEffect(() => {
    resizeImage();
  }, []);

  useEffect(() => {
    if (pieceWidth !== 0 && pieceHeight !== 0 && image && piecesContainerPos) {
      setupPuzzle();
    }
  }, [image, pieceWidth, pieceHeight]);

  // Function to render each puzzle piece
  const renderPiece = (piece) => {
    return (
      <View
        style={{
          width: piece.width,
          height: piece.height,
          position: "absolute", // Apply absolute positioning to allow dragging
          left: piece.currentPos.x,
          top: piece.currentPos.y,
        }}
      >
        <ImageBackground
          key={piece.pieceId}
          source={{ uri: piece.imageUri }}
          style={{ flex: 1 }}
          {...getPanResponder(piece).panHandlers}
        >
          <Text>
            {piece.answer.j}
            {piece.answer.i}
          </Text>
        </ImageBackground>
      </View>
    );
  };

  return (
    <View style={commonStyles.container}>
      <View style={puzzleStyles.header}></View>
      <View
        style={puzzleStyles.puzzleContainer}
        onLayout={(event) => {
          const layout = event.nativeEvent.layout;
          if (layout) {
            const { x, y } = layout;
          }
        }}
      >
        {grid &&
          grid.spots &&
          grid.spots.map((spot, index) => (
            <View
              key={index}
              style={[
                {
                  width: pieceWidth,
                  height: pieceHeight,
                  borderWidth: spot.piece ? 0 : 1,
                  borderColor: "black",
                  margin: spot.piece ? 0 : 1,
                },
              ]}
            >
              {spot.piece ? (
                <ImageBackground
                  source={{ uri: spot.piece.imageUri }}
                  style={commonStyles.flex1}
                ></ImageBackground>
              ) : null}
            </View>
          ))}
      </View>
      <View
        style={puzzleStyles.piecesContainer}
        onLayout={(event) => {
          const layout = event.nativeEvent.layout;
          if (layout) {
            const { x, y } = layout;
            setPiecesContainerPos({ x, y });
          }
        }}
      >
        {!done ? (
          pieces &&
          pieces.length !== 0 &&
          pieces.map((piece) => renderPiece(piece))
        ) : (
          <Text style={commonStyles.header}>Done</Text>
        )}
      </View>
      <View>
        <TouchableOpacity
          style={[
            commonStyles.buttonContainer,
            commonStyles.mgBot,
            commonStyles.blackBorder,
          ]}
          onPress={() => navigation.goBack()}
        >
          <Text style={[commonStyles.text, commonStyles.buttonText]}>
            Go back
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Puzzle;
