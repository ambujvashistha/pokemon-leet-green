import React, { useEffect, useState } from "react";
import { useAudioPlayer } from "expo-audio";
import { useFonts } from "expo-font";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from "react-native";

const audioSource = require("../../assets/sounds/select.wav");
const { width, height } = Dimensions.get("window");

export default function PokedexScreen() {
  const select = useAudioPlayer(audioSource);
  const [glow, setGlow] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => setGlow((g) => !g), 400);
    return () => clearInterval(interval);
  }, []);

  const [fontsLoaded] = useFonts({
    pokefont: require("../../assets/pokefont.otf"),
  });

  const [pokemonId, setPokemonId] = useState(1);
  const [name, setName] = useState();
  const [data, setData] = useState();
  const [search, setSearch] = useState(false);
  const [searchText, setSearchText] = useState("");

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

  const handlePrev = () => {
    if (pokemonId > 1) {
      setPokemonId((prev) => prev - 1);
    }
    select.seekTo(0);
    select.play();
  };

  const handleSearch = () => {
    setSearch((prev) => !prev);
    select.seekTo(0);
    select.play();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Pokédex</Text>
        <View style={[styles.indicator, glow && styles.indicatorGlow]} />
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
          }}
          style={styles.pokemonSprite}
        />

        <Text style={styles.displayText}>{name}</Text>
      </View>

      {search ? (
        <View style={styles.buttonsRow}>
          <View style={styles.searchLeftSide}>
            <View style={styles.inputBox}>
              <TextInput
                style={styles.inputText}
                placeholder="Search Pokémon"
                placeholderTextColor="#aaaaaa"
                value={searchText}
                onChangeText={setSearchText}
                autoFocus={true}
              />
            </View>
          </View>

          <TouchableOpacity
            style={[
              styles.srchbtn,
              { paddingHorizontal: 10, paddingVertical: 10 },
            ]}
            onPress={handleSearch}
          >
            <Image
              source={require("../../assets/btn-icons/search_button.png")}
              style={{ width: 30, height: 30 }}
            />
          </TouchableOpacity>
        </View>
      ) : (
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
              style={{ width: 30, height: 30 }}
            />
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.controlsWrapper}>
        {!search && (
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
    padding: width * 0.05,
    justifyContent: "flex-start",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontFamily: "pokefont",
    fontSize: width * 0.07,
    fontWeight: "bold",
    color: "white",
  },

  displayBox: {
    marginTop: height * 0.02,
    height: height * 0.38,
    backgroundColor: "#E9F5FF",
    borderRadius: width * 0.03,
    borderWidth: width * 0.01,
    borderColor: "#0A0A0A",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    borderTopColor: "#000",
    borderBottomColor: "#a44f00ff",
  },

  pokemonSprite: {
    width: width * 0.55,
    height: width * 0.55,
    resizeMode: "contain",
  },

  displayText: {
    fontFamily: "pokefont",
    fontSize: width * 0.07,
    fontWeight: "bold",
    color: "#000",
  },

  bgImage: {
    position: "absolute",
    width: width * 1,
    height: width * 1,
    opacity: 0.2,
    resizeMode: "contain",
    top: 10,
  },

  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: height * 0.03,
    alignItems: "center",
  },

  btn: {
    backgroundColor: "#222",
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.015,
    borderRadius: width * 0.02,
    borderColor: "#004d53ff",
    borderWidth: 2,
  },

  btnText: {
    color: "white",
    fontSize: width * 0.04,
    fontWeight: "bold",
  },

  srchbtn: {
    backgroundColor: "#06c4d2ff",
    paddingHorizontal: width * 0.03,
    paddingVertical: width * 0.03,
    borderRadius: 50,
    borderColor: "#004d53ff",
    borderWidth: 2,
  },

  controlsWrapper: {
    alignItems: "center",
    marginTop: height * 0.04,
  },

  dpad: {
    width: width * 0.7,
    height: height * 0.22,
    borderRadius: width * 0.25,
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
  },

  dpadButton: {
    width: width * 0.16,
    height: width * 0.16,
    borderRadius: width * 0.08,
    backgroundColor: "#473f3fff",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    borderWidth: 1,
    borderColor: "#666",
  },

  dpadUp: { top: height * 0.015 },
  dpadDown: { bottom: height * 0.015 },
  dpadLeft: { left: width * 0.03 },
  dpadRight: { right: width * 0.03 },

  inputBox: {
    height: height * 0.055,
    width: width * 0.8,
    backgroundColor: "#333",
    borderRadius: width * 0.02,
    justifyContent: "center",
    paddingHorizontal: width * 0.03,
  },

  inputText: {
    color: "white",
    fontSize: width * 0.05,
    fontFamily: "pokefont",
  },

  indicator: {
    width: width * 0.05,
    height: width * 0.05,
    borderRadius: width * 0.05,
    backgroundColor: "#66ff00ff",
    borderWidth: 2,
    borderColor: "#225500ff",
  },

  indicatorGlow: {
    shadowColor: "#00ff15ff",
    shadowOpacity: 0.9,
    shadowRadius: 45,
    shadowOffset: { width: 5, height: 0 },
    elevation: 25,
  },
});
