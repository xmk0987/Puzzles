import { StyleSheet } from "react-native";

export const commonStyles = StyleSheet.create({
  container: {
    backgroundColor: "#F6F6F6",
    alignItems: "center",
    height: "100%",
  },
  header: {
    fontSize: 45,
    color: "#000000",
    textAlign: "center",
    fontFamily: "LexendGiga_400Regular",
  },
  small: {
    fontSize: 13,
  },
  medium: {
    fontSize: 30,
  },
  text: {
    fontSize: 23,
    color: "#000000",
    textAlign: "center",
    letterSpacing: 0.3,
    fontFamily: "Kodchasan_400Regular",
  },
  buttonContainer: {
    width: 240,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 20,
  },
  mgBot: {
    marginBottom: 25,
  },
  pgTop: {
    paddingTop: 50,
  },
  blackBorder: {
    borderColor: "#000000",
    borderWidth: 2,
    borderRadius: 10,
  },
  bgYellow: {
    backgroundColor: "#FFD600",
  },
  flex1: {
    flex: 1,
  },
  loading: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    height: "100%",
  },
});
