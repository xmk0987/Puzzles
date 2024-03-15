import React from "react";

import { View, Text, TouchableOpacity } from "react-native";

import { commonStyles } from "../styles/commonStyles";
import { homeStyles } from "../styles/homeStyles";

const Home = ({ navigation }) => {
  return (
    <View style={commonStyles.container}>
      <View style={homeStyles.headerView}>
        <Text style={commonStyles.header}>Puzzles</Text>
      </View>
      <View style={homeStyles.descView}>
        <Text style={commonStyles.text}>Create puzzles from your images.</Text>
      </View>
      <View style={homeStyles.buttonView}>
        <TouchableOpacity
          style={[
            commonStyles.buttonContainer,
            commonStyles.mgBot,
            commonStyles.blackBorder,
            commonStyles.bgYellow

          ]}
          onPress={() => navigation.navigate("NewPuzzle")}
        >
          <Text style={[commonStyles.text, commonStyles.buttonText]}>
            New Puzzle
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            commonStyles.buttonContainer,
            commonStyles.mgBot,
            commonStyles.blackBorder,
            commonStyles.bgYellow

          ]}
          onPress={() => navigation.navigate("Puzzles")}
        >
          <Text style={[commonStyles.text, commonStyles.buttonText]}>
            Puzzles
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;
