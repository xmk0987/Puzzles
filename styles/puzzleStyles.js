import { StyleSheet } from "react-native";

export const puzzleStyles = StyleSheet.create({
  header: {
    marginTop: 60,
  },
  puzzleContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 2
  },
  puzzle: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  piecesContainer: {
    width: "90%",
    height: "42%"
  },
  footer: {
    marginTop: 100, // Adjust spacing between piecesContainer and footer
    alignItems: "center", // Center the button horizontally
  },
  image: {
    flex: 1, // Ensures the image takes up the entire space of its container
    width: undefined, // Allow width to be automatically determined by flex
    height: undefined, // Allow height to be automatically determined by flex
  },
});
