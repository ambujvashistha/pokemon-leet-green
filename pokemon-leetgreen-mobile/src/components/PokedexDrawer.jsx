import React from "react";
import Svg, { Circle } from "react-native-svg";

export default function PokedexDrawer() {
  return (
    <Svg width={54} height={54} viewBox="0 0 180 190" fill="none">

      <Circle
        cx="91.5"
        cy="91.5"
        r="90.5"
        fill="#0095FF"
        stroke="black"
        strokeWidth="5"
      />
      <Circle cx="62.5" cy="57.5" r="36.5" fill="#B8F4FE" />
      
    </Svg>
  );
}
