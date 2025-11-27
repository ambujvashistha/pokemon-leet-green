import React, { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

export default function PokedexScreen() {
  const [fontsLoaded] = useFonts({
    pokefont: require("../../assets/pokefont.otf"),
  });
  const [pokemonId, setPokemonId] = useState(1);
  const [url, setUrl] = useState(
    `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
  );
  const [name, setName] = useState();
  const [data, setData] = useState();
  useEffect(() => {
    const getPokemon = async () => {
      const resp = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
      );
      const dota = await resp.json();
      setData(dota);
      setName(dota.name);
    };

    getPokemon();
  }, [pokemonId]);

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
      <View style={styles.header}>
        <Text style={styles.title}>Pokédex</Text>
      </View>

      <View style={styles.displayBox}>
        <Image
          source={{
            uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemonId}.png`,
            width: 130,
            height: 130,
          }}
        />
        <Text style={styles.displayText}>{name}</Text>
      </View>

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
    backgroundColor: "#D90000",
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
    fontFamily: "pokefont",
    fontSize: 28,
    fontWeight: "800",
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
