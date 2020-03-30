import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

const MapView = ({style,size,color}) =>{
  return (
    <Svg width={size} height={size*17/21} viewBox="0 0 21 17" fill="none" style={style}>
      <G clipPath="url(#map_view_svg__clip0)">
        <Path
          d="M10.406.183c-2.454 0-4.443 1.777-4.443 3.97 0 1.772 2.904 5.002 4.017 6.175a.6.6 0 00.853 0c1.113-1.173 4.017-4.403 4.017-6.175 0-2.192-1.99-3.97-4.444-3.97zm0 5.293c-.818 0-1.48-.592-1.48-1.323s.662-1.323 1.48-1.323 1.481.592 1.481 1.323c0 .73-.663 1.323-1.48 1.323zM.96 6.986c-.21.075-.39.204-.516.371a.934.934 0 00-.194.565v7.886c0 .356.403.6.774.468l4.868-1.98V6.954a9.09 9.09 0 01-.749-1.462L.96 6.986zm9.446 4.528c-.496 0-.965-.195-1.287-.534A34.056 34.056 0 017.02 8.563v5.733l6.77 2.016V8.563a34.047 34.047 0 01-2.097 2.417c-.322.34-.792.534-1.288.534zM19.79 5.26L14.92 7.24v9.072l4.933-1.762c.21-.075.389-.204.515-.37a.934.934 0 00.195-.566V5.728c0-.356-.404-.6-.774-.468z"
          fill={color?color:"#000"}
        />
      </G>
      <Defs>
        <ClipPath id="map_view_svg__clip0">
          <Path fill="#fff" d="M.25.688h20.313v15.625H.25z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default MapView;

