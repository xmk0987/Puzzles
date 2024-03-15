import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActionSheetIOS,
  Button,
  Image,
  ImageBackground,
} from "react-native";
import { newStyles } from "../styles/newPuzzleStyles";
import { commonStyles } from "../styles/commonStyles";
import * as ImagePicker from "expo-image-picker";

const NewPuzzle = ({ navigation }) => {
  const [pieces, setPieces] = useState(36);
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // Check if permission has been granted
    const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      // If not granted, request permission
      const { status: newStatus } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (newStatus !== "granted") {
        // If permission not granted, display an alert and return
        Alert.alert(
          "Permission required",
          "Please allow access to your media library to pick an image."
        );
        return;
      }
    }
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onPress = () =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["1000", "100", "64", "36", "25", "9", "Cancel"],
        cancelButtonIndex: 6, // Index of the Cancel button
        destructiveButtonIndex: -1, // No destructive button
        userInterfaceStyle: "dark",
      },
      (buttonIndex) => {
        if (buttonIndex !== 6) {
          setPieces(
            Number(["1000", "100", "64", "36", "25", "9"][buttonIndex])
          );
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
