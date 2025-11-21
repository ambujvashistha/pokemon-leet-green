import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

// SIMPLE + CLEAN POKEDEX SCREEN (JS VERSION)
export default function PokedexScreen() {
  const [pokemonId, setPokemonId] = useState(1);

  const handelNext = () => {
    setPokemonId((prev) => prev + 1);
  };
  const handelPrev = () => {
    if (pokemonId == 1) {
      setPokemonId((prev) => prev);
    } else {
      setPokemonId((prev) => prev - 1);
    }
  };
  return (
    <View style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Pokédex</Text>
      </View>

      {/* Display Box */}
      <View style={styles.displayBox}>
        {/* Replace this with whatever you want to show */}
        <Image
          source={{
            uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemonId}.png`,
            // uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/.png`,
            width: 130,
            height: 130,
          }}
        />
        <Text style={styles.displayText}>Your Display Here</Text>
      </View>

      {/* Buttons Row */}
      <View style={styles.buttonsRow}>
        <TouchableOpacity style={styles.btn} onPress={handelPrev}>
          <Text style={styles.btnText}>◀</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>Select</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={handelNext}>
          <Text style={styles.btnText}>▶</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D90000", // Pokédex red
    padding: 20,
    justifyContent: "flex-start",
  },
  header: {
    paddingVertical: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
  },
  displayBox: {
    marginTop: 20,
    height: 360,
    backgroundColor: "#E9F5FF",
    borderRadius: 12,
    borderWidth: 4,
    borderColor: "#0A0A0A",
    justifyContent: "center",
    alignItems: "center",
  },
  displayText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
  },
  btn: {
    backgroundColor: "#222",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  btnText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
