import React, { useEffect, useState } from "react";

import { commonStyles } from "../styles/commonStyles";
import {
  View,
  TouchableOpacity,
  Text,
  ImageBackground,
  ScrollView,
} from "react-native";
import { oldPuzzlesStyle } from "../styles/oldPuzzlesStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";

const OldPuzzles = ({ navigation }) => {
  const [puzzles, setPuzzles] = useState([]);

  // Fetch all existing puzzles to state
  useEffect(() => {
    const fetchPuzzles = async () => {
      try {
        const puzzlesString = await AsyncStorage.getItem("puzzles");
        if (puzzlesString !== null) {
          const newPuzzles = JSON.parse(puzzlesString);
          setPuzzles(newPuzzles);
        }
      } catch (error) {
        console.error("Error fetching puzzles:", error);
      }
    };

    fetchPuzzles();
  }, []);

  return (
    <View style={commonStyles.container}>
      <View style={oldPuzzlesStyle.headerContainer}>
        <Text style={[commonStyles.header, commonStyles.medium]}>Puzzles</Text>
      </View>
      <ScrollView
        contentContainerStyle={[
          commonStyles.scrollViewContent,
          oldPuzzlesStyle.bodyContainer,
        ]}
      >
        {puzzles &&
          puzzles.map((puzzle) => (
            <TouchableOpacity
              style={oldPuzzlesStyle.item}
              onPress={() =>
                navigation.navigate("Puzzle", {
                  imageUri: puzzle.imageUri,
                  pieceAmount: puzzle.pieceAmount,
                })
              }
            >
              <ImageBackground
                source={{ uri: puzzle.imageUri }}
                style={oldPuzzlesStyle.itemImage}
              ></ImageBackground>
              <View style={oldPuzzlesStyle.itemTextContainer}>
                <Text
                  style={[
                    commonStyles.header,
                    commonStyles.small,
                    oldPuzzlesStyle.headerText,
                  ]}
                >
                  fdfd
                </Text>
                <Text
                  style={[
                    commonStyles.header,
                    commonStyles.small,
                    oldPuzzlesStyle.headerText,
                  ]}
                >
                  {puzzle.pieceAmount}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
      </ScrollView>
      <View style={oldPuzzlesStyle.footerContainer}>
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

export default OldPuzzles;
