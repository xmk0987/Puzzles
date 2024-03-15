import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from "react-native";
import { commonStyles } from "../styles/commonStyles";
import { puzzleStyles } from "../styles/puzzleStyles";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";

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

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const setupPuzzle = async () => {
    const allPieces = await getPieces();
    const theGrid = await generatePuzzleGrid();
    setGrid(theGrid);
    setPieces(allPieces);
    const shuffled = shuffleArray([...allPieces]); // Create a shallow copy of pieces array before shuffling
    setShuffledPieces(shuffled);
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
          const pieceWithCoordinates = {
            ...maniResult,
            x: j,
            y: i,
          };
          allPieces.push(pieceWithCoordinates);
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
    const targetWidth = Math.floor(screenWidth * 0.95); // Resize to 95% of screen width
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
        grid.push({ x: j, y: i, piece: null });
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

  return (
    <View style={commonStyles.container}>
      <View style={puzzleStyles.header}></View>
      <View style={puzzleStyles.puzzleContainer}>
        {grid &&
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
              <Text>
                {spot.x} {spot.y}
              </Text>
            </View>
          ))}
      </View>
      <View style={puzzleStyles.piecesContainer}>
        {pieces &&
          shuffledPieces.map((piece, index) => (
            <ImageBackground
              key={index}
              source={{ uri: piece.uri }}
              style={[
                {
                  width: pieceWidth,
                  height: pieceHeight,
                },
              ]}
            >
              <Text>
                {piece.x} {piece.y}
              </Text>
            </ImageBackground>
          ))}
      </View>
      <View style={puzzleStyles.footer}>
        <TouchableOpacity
          style={[
            commonStyles.buttonContainer,
            commonStyles.mgBot,
            commonStyles.blackBorder,
          ]}
          onPress={() => navigation.goBack()}
        >
          <Text style={[commonStyles.text, commonStyles.buttonText]}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Puzzle;
