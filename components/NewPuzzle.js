import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActionSheetIOS,
  ImageBackground,
} from "react-native";
import { newStyles } from "../styles/newPuzzleStyles";
import { commonStyles } from "../styles/commonStyles";
import * as ImagePicker from "expo-image-picker";

/**
 * NewPuzzle component for creating a new puzzle.
 * @param {object} navigation - Navigation prop for navigating between screens.
 * @returns {JSX.Element} - JSX element representing the NewPuzzle component.
 */
const NewPuzzle = ({ navigation }) => {
  // State variables for the number of pieces and selected image
  const [pieces, setPieces] = useState(36);
  const [image, setImage] = useState(null);

  // Function to pick an image from the device's media library
  const pickImage = async () => {
    const { status } = await ImagePicker.getMediaLibraryPermissionsAsync(); // Check media library permissions
    if (status !== "granted") {
      const { status: newStatus } =
        await ImagePicker.requestMediaLibraryPermissionsAsync(); // Request permission if not granted
      if (newStatus !== "granted") {
        // Display alert if permission not granted
        Alert.alert(
          "Permission required",
          "Please allow access to your media library to pick an image."
        );
        return;
      }
    }
    // Launch image library to pick an image
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // Set the picked image if not canceled
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // Function to handle button press for selecting the number of pieces
  const onPress = () =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["100", "64", "36", "25", "9", "Cancel"], // Options for the action sheet
        cancelButtonIndex: 5, // Index of the Cancel button
        destructiveButtonIndex: -1, // No destructive button
        userInterfaceStyle: "dark", // Dark mode for action sheet
      },
      (buttonIndex) => {
        if (buttonIndex !== 5) {
          // Set the number of pieces based on the selected index
          setPieces(Number(["100", "64", "36", "25", "9"][buttonIndex]));
        }
      }
    );

  return (
    <View style={commonStyles.container}>
      <View style={newStyles.headerContainer}>
        <Text
          style={[commonStyles.header, commonStyles.medium, commonStyles.pgTop]}
        >
          New Puzzle
        </Text>
      </View>
      <View style={newStyles.bodyContainer}>
        <TouchableOpacity style={newStyles.imageContainer} onPress={pickImage}>
          {image ? (
            <ImageBackground
              source={{ uri: image }}
              style={commonStyles.flex1}
              resizeMode="cover"
            />
          ) : (
            <View style={newStyles.emptyImage}></View>
          )}
          <Text style={[commonStyles.text, commonStyles.small]}>
            Choose image
          </Text>
        </TouchableOpacity>
        <View style={newStyles.pieceAmountContainer}>
          <Text style={[commonStyles.text, newStyles.piecesText]}>Pieces:</Text>
          <TouchableOpacity
            style={newStyles.pieceBtnContainer}
            onPress={onPress}
          >
            <Text style={[commonStyles.text, newStyles.buttonText]}>
              {pieces}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={newStyles.footerContainer}>
        {image ? (
          <TouchableOpacity
            style={[
              commonStyles.buttonContainer,
              commonStyles.mgBot,
              commonStyles.blackBorder,
              commonStyles.bgYellow,
            ]}
            onPress={() =>
              navigation.navigate("Puzzle", {
                imageUri: image,
                pieceAmount: pieces,
              })
            }
          >
            <Text style={[commonStyles.text, commonStyles.buttonText]}>
              Create
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[
              commonStyles.buttonContainer,
              commonStyles.mgBot,
              commonStyles.blackBorder,
            ]}
            onPress={pickImage}
          >
            <Text style={[commonStyles.text, commonStyles.buttonText]}>
              Choose Image
            </Text>
          </TouchableOpacity>
        )}
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

export default NewPuzzle;
