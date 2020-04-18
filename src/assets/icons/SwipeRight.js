import * as React from "react";
import Svg, { Path } from "react-native-svg";

const SwipeRight = ({color,size,style}) =>{
  return (
    <Svg width={size} height={size} viewBox="0 0 80 80" style={style}>
      <Path
        d="M29 31c-4.959 0-9 4.041-9 9s4.041 9 9 9c4.622 0 8.443-3.512 8.941-8.004A1 1 0 0038 41a1 1 0 001-1 1 1 0 00-1-1 1 1 0 00-.059.002C37.442 34.511 33.621 31 29 31zm23.707 1.293l-1.414 1.414L57.586 40l-6.293 6.293 1.414 1.414L60.414 40l-7.707-7.707zM29 33c3.878 0 7 3.122 7 7s-3.122 7-7 7-7-3.122-7-7 3.122-7 7-7zm13 6a1 1 0 00-1 1 1 1 0 001 1 1 1 0 001-1 1 1 0 00-1-1zm4 0a1 1 0 00-1 1 1 1 0 001 1 1 1 0 001-1 1 1 0 00-1-1zm4 0a1 1 0 00-1 1 1 1 0 001 1 1 1 0 001-1 1 1 0 00-1-1zm4 0a1 1 0 00-1 1 1 1 0 001 1 1 1 0 001-1 1 1 0 00-1-1z"
        fill={color?color:"#000"}
      />
    </Svg>
  );
};

export default SwipeRight;

