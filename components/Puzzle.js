import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  PanResponder,
  ImageBackground,
  Animated,
} from "react-native";
import { commonStyles } from "../styles/commonStyles";
import { puzzleStyles } from "../styles/puzzleStyles";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import { Piece } from "../classes/Piece";
import { GridSpot } from "../classes/Spot";

const Puzzle = ({ navigation, route }) => {
  const pieceAmountOptions = {
    100: { rowCols: 10 },
    64: { rowCols: 8 },
    36: { rowCols: 6 },
    25: { rowCols: 5 },
    9: { rowCols: 3 },
  };

  const { imageUri, pieceAmount } = route.params;
  const [pieces, setPieces] = useState([]);
  const [shuffledPieces, setShuffledPieces] = useState([]);
  const [image, setImage] = useState(null);
  const [grid, setGrid] = useState([]);
  const [numCols, setNumCols] = useState(
    pieceAmount ? pieceAmountOptions[pieceAmount].rowCols : 0
  );
  const [pieceHeight, setPieceHeight] = useState(0);
  const [pieceWidth, setPieceWidth] = useState(0);
  const [piecePositions, setPiecePositions] = useState({});

  const getPanResponder = (index) =>
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        const { x0, y0, dx, dy } = gesture;
        const { x, y } = piecePositions[index] || { x: 0, y: 0 };

        setPiecePositions({
          ...piecePositions,
          [index]: { x: x + dx, y: y + dy },
        });
      },
      onPanResponderRelease: () => {
        // You can perform any actions you want when the user releases the piece
      },
    });

  // Setting up the puzzle piezes and generating the puzzle grid
  const setupPuzzle = async () => {
    const allPieces = await getPieces();
    const theGrid = await generatePuzzleGrid();
    setGrid(theGrid);
    setPieces(allPieces);
    const initialPositions = {};
    allPieces.forEach((piece, index) => {
      initialPositions[index] = {
        x: pieceWidth * piece.answer.j,
        y: pieceHeight * piece.answer.i,
      };
    });
    setPiecePositions(initialPositions);

    const shuffled = shuffleArray([...allPieces]); // Create a shallow copy of pieces array before shuffling
    setShuffledPieces(shuffled);
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const getPieces = async () => {
    const allPieces = [];

    try {
      for (let i = 0; i < numCols; i++) {
        for (let j = 0; j < numCols; j++) {
          const maniResult = await manipulateAsync(
            image.uri,
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

          const newPiece = new Piece(
            { i, j },
            { x: pieceWidth * j, y: pieceHeight * i },
            maniResult.uri,
            maniResult.width,
            maniResult.height
          );
          allPieces.push(newPiece);
        }
      }
      return allPieces;
    } catch (error) {
      console.error("Error occurred during image manipulation:", error);
    }
  };

  const resizeImage = async () => {
    const screenWidth = Dimensions.get("window").width;
    const screenHeight = Dimensions.get("window").height;
    const targetWidth = Math.floor(screenWidth * 0.9); // Resize to 95% of screen width
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

  const generatePuzzleGrid = async () => {
    const grid = [];
    for (let i = 0; i < numCols; i++) {
      for (let j = 0; j < numCols; j++) {
        const gridSpot = new GridSpot({ j, i }, null);
        grid.push(gridSpot);
      }
    }
    return grid;
  };

  useEffect(() => {
    resizeImage();
  }, []);

  useEffect(() => {
    if (pieceWidth !== 0 && pieceHeight !== 0 && image) {
      setupPuzzle();
    }
  }, [image, pieceWidth, pieceHeight]);

  const renderPiece = (piece, index, getPanResponder) => {
    return (
      <Image
        key={index}
        source={{ uri: piece.getImageUri() }}
        style={[
          {
            width: piece.getHeight(),
            height: piece.getWidth(),
            borderWidth: 1,
            borderColor: "black",
          },
          piecePositions[index] && {
            position: "absolute",
            left: piecePositions[index].x,
            top: piecePositions[index].y,
          },
        ]}
        {...getPanResponder(index).panHandlers}
      />
    );
  };

  return (
    <View style={commonStyles.container}>
      <View style={puzzleStyles.header}></View>
      <View style={puzzleStyles.puzzleContainer}>
        {grid &&
          pieces &&
          pieces.length > 0 &&
          grid.map((spot, index) => (
            <View
              key={index}
              style={[
                {
                  width: pieceWidth,
                  height: pieceHeight,
                  borderWidth: 1,
                  borderColor: "black",
                },
              ]}
            >
              <Image style={commonStyles.flex1}></Image>
            </View>
          ))}
      </View>
      <View style={puzzleStyles.piecesContainer}>
        {pieces &&
          shuffledPieces.map((piece, index) =>
            renderPiece(piece, index, getPanResponder)
          )}
      </View>
    </View>
  );
};

export default Puzzle;
