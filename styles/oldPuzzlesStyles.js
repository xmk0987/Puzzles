import { StyleSheet } from "react-native";

export const oldPuzzlesStyle = StyleSheet.create({
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  bodyContainer: {
    flex: 2,
    width: "100%",
    maxHeight: "50%",
    alignItems: "center",
    gap: 20,

  },
  scrollViewContent: {
    flex: 1,
    width: "100%",
    backgroundColor: "green",
  },
  footerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    width: "80%",
    height: 100,
    backgroundColor: "red",
    flexDirection: "row",
    borderWidth: 2,
    borderColor: "black",
  },
  itemImage: {
    flex: 1,
  },
  itemTextContainer: {
    flex: 2,
    backgroundColor: "yellow",
  },
  headerText: {
    padding: 10,
    textAlign: "left",
  },
});
