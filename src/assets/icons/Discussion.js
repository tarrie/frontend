import * as React from "react";
import Svg, { Path } from "react-native-svg";

    //<Svg width={size} height={size*19/34} fill="none" viewBox="0 0 34 19" style={style} >

const Discussion = ({size, style}) => {
  return (
    <Svg width={size} height={size*20/19}  viewBox="0 0 19 20"  fill="none" style={style} >
      <Path
        d="M15.833 1.667H3.167c-.871 0-1.576.75-1.576 1.666l-.008 15L4.75 15h11.083c.871 0 1.584-.75 1.584-1.667v-10c0-.916-.713-1.666-1.584-1.666zM4.75 7.5h9.5v1.667h-9.5V7.5zm6.333 4.167H4.75V10h6.333v1.667zm3.167-5h-9.5V5h9.5v1.667z"
        fill="#000"
      />
    </Svg>
  );
};

export default Discussion;

