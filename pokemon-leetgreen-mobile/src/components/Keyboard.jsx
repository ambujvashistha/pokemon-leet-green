import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const letters = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ", ..."0123456789"];

export default function PokedexKeyboardScreen({ navigation }) {
  const [input, setInput] = useState("");

  const press = (key) => {
    setInput((prev) => prev + key);
  };

  const deleteLast = () => {
    setInput((prev) => prev.slice(0, -1));
  };

  const submit = () => {
    navigation.navigate("Pokedex", { searchValue: input });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search</Text>

      <View style={styles.inputBox}>
        <Text style={styles.inputText}>{input}</Text>
      </View>

      <View style={styles.keyboard}>
        {letters.map((key) => (
          <TouchableOpacity
            key={key}
            style={styles.key}
            onPress={() => press(key)}
          >
            <Text style={styles.keyText}>{key}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.bottomRow}>
        <TouchableOpacity style={styles.actionBtn} onPress={deleteLast}>
          <Text style={styles.actionText}>Delete</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionBtn} onPress={submit}>
          <Text style={styles.actionText}>OK</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#D90000" },
  title: { fontSize: 24, color: "white", fontWeight: "bold" },
  inputBox: {
    marginTop: 20,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
  },
  inputText: { fontSize: 22, fontWeight: "bold" },
  keyboard: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 30,
    justifyContent: "center",
  },
  key: {
    width: "18%",
    backgroundColor: "#222",
    paddingVertical: 12,
    margin: 4,
    borderRadius: 8,
    alignItems: "center",
  },
  keyText: { color: "white", fontSize: 18, fontWeight: "bold" },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  actionBtn: {
    backgroundColor: "#333",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  actionText: { color: "white", fontWeight: "bold", fontSize: 18 },
});
