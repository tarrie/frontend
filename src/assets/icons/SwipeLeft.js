import * as React from "react";
import Svg, { Path } from "react-native-svg";

//width={size} height={size*17/21} viewBox="0 0 21 17" fill="none" style={style}
const SwipeLeft = ({color,size,style}) =>{
  return (
    <Svg width={size} height={size} viewBox="0 0 80 80" style={style}>
      <Path
        d="M51 31c-4.622 0-8.443 3.512-8.941 8.004A1 1 0 0042 39a1 1 0 00-1 1 1 1 0 001 1 1 1 0 00.059-.002C42.558 45.489 46.379 49 51 49c4.959 0 9-4.041 9-9s-4.041-9-9-9zm-23.707 1.293L19.586 40l7.707 7.707 1.414-1.414L22.414 40l6.293-6.293-1.414-1.414zM51 33c3.878 0 7 3.122 7 7s-3.122 7-7 7-7-3.122-7-7 3.122-7 7-7zm-25 6a1 1 0 00-1 1 1 1 0 001 1 1 1 0 001-1 1 1 0 00-1-1zm4 0a1 1 0 00-1 1 1 1 0 001 1 1 1 0 001-1 1 1 0 00-1-1zm4 0a1 1 0 00-1 1 1 1 0 001 1 1 1 0 001-1 1 1 0 00-1-1zm4 0a1 1 0 00-1 1 1 1 0 001 1 1 1 0 001-1 1 1 0 00-1-1z"
        fill={color?color:"#000"}
      />
    </Svg>
  );
};

export default SwipeLeft;

