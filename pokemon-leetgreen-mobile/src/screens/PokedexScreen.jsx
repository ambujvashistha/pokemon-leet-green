import React, { useEffect, useState } from "react";
import { useAudioPlayer } from "expo-audio";

const audioSource = require("../../assets/sounds/select.wav");

import { useFonts } from "expo-font";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

export default function PokedexScreen() {
  const select = useAudioPlayer(audioSource);

  const [fontsLoaded] = useFonts({
    pokefont: require("../../assets/pokefont.otf"),
  });

  const [pokemonId, setPokemonId] = useState(1);
  const [name, setName] = useState();
  const [data, setData] = useState();
  const [search, setSearch] = useState(false);

  useEffect(() => {
    const getPokemon = async () => {
      const resp = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
      );
      const json = await resp.json();
      setData(json);
      setName(json.name.toUpperCase());
    };

    getPokemon();
  }, [pokemonId]);

  const handleNext = () => {
    setPokemonId((prev) => prev + 1);
    select.seekTo(0);
    select.play();
  };
  const handleSearch = () => {
    setSearch((prev) => !prev);
    select.seekTo(0);
    select.play();
  };
  const handlePrev = () => {
    if (pokemonId > 1) {
      setPokemonId((prev) => prev - 1);
    }
    select.seekTo(0);
    select.play();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Pokédex</Text>
      </View>

      <View style={styles.displayBox}>
        <Image
          source={{
            uri: data?.sprites?.other["official-artwork"]?.front_default,
          }}
          style={styles.bgImage}
        />

        <Image
          source={{
            uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`,
            width: 250,
            height: 250,
          }}
        />

        <Text style={styles.displayText}>{name}</Text>
      </View>

      <View style={styles.buttonsRow}>
      
      
        <TouchableOpacity style={styles.btn} onPress={handlePrev}>
          <Text style={styles.btnText}>◀</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            select.seekTo(0);
            select.play();
          }}
        >
          <Text style={styles.btnText}>Select</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.srchbtn,
            { paddingHorizontal: 10, paddingVertical: 10 },
          ]}
          onPress={handleSearch}
        >
          <Image
            source={require("../../assets/btn-icons/search_button.png")}
            style={{ width: 40, height: 40 }}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.controlsWrapper}>
        {search ? (
          <View></View>
        ) : (
          <View style={styles.dpad}>
            <TouchableOpacity
              style={[styles.dpadButton, styles.dpadUp]}
              onPress={() => {
                select.seekTo(0);
                select.play();
              }}
            >
              <Text style={styles.dpadText}>▲</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.dpadButton, styles.dpadDown]}
              onPress={() => {
                select.seekTo(0);
                select.play();
              }}
            >
              <Text style={styles.dpadText}>▼</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.dpadButton, styles.dpadLeft]}
              onPress={handlePrev}
            >
              <Text style={styles.dpadText}>◀</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.dpadButton, styles.dpadRight]}
              onPress={handleNext}
            >
              <Text style={styles.dpadText}>▶</Text>
            </TouchableOpacity>
          </View>
        )}
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
    fontFamily: "pokefont",
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
    overflow: "hidden",
    borderTopColor: "#000000",
    borderBottomColor: "#a44f00ff",
  },
  displayText: {
    fontFamily: "pokefont",
    fontSize: 28,
    fontWeight: "bold",
    color: "#000000",
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
    alignItems: "center",
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
  bgImage: {
    position: "absolute",
    width: 400,
    height: 400,
    opacity: 0.2,
    resizeMode: "contain",
    top: 10,
  },
  controlsWrapper: {
    // flexDirection: "row",
    // justifyContent: "space-between",
    // marginTop: 25,
    alignItems: "center",
    marginTop: 30,
    // alignItems: "center",
    // justifyContent: "center",
  },
  dpad: {
    width: 260,
    height: 200,
    borderRadius: 80,
    backgroundColor: "#2a2a2a",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    borderWidth: 2,
    borderColor: "#444",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 6,
    borderBottomColor: "#696464ff",
  },
  dpadButton: {
    width: 60,
    height: 60,
    borderRadius: 25,
    backgroundColor: "#473f3fff",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    borderWidth: 1,
    borderColor: "#666",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
  },
  dpadUp: { top: 18 },
  dpadDown: { bottom: 18 },
  dpadLeft: { left: 18 },
  dpadRight: { right: 18 },
  srchbtn: {
    backgroundColor: "#7AC74C",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
  },
});
