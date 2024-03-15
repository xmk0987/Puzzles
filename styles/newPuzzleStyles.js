import { StyleSheet } from "react-native";

export const newStyles = StyleSheet.create({
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  bodyContainer: {
    flex: 1.7,
  },
  footerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: 240,
    height: 240,
    marginTop: 20,
    marginBottom: 4,
  },
  pieceAmountContainer: {
    width: 240,
    height: 120,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    paddingRight: 20,
    paddingLeft: 20,
  },
  piecesText: {
    fontSize: 20,
    flex: 1,
    fontFamily: "Kodchasan_700Bold",
    textAlign: "left",
    paddingLeft: 20,
  },
  pieceBtnContainer: {
    flex: 1,
    backgroundColor: "#FFC531",
    borderRadius: 10,
    color: "black",
    zIndex: 5,
  },
  buttonText: {
    fontSize: 20,
    fontFamily: "Kodchasan_500Medium",
  },
  emptyImage: {
    flex: 1,
    backgroundColor: "lightgrey"
  }
});
