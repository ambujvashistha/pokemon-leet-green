import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import PokedexScreen from "./src/screens/PokedexScreen";

export default function App() {
  return <PokedexScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
