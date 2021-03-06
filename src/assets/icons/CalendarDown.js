import * as React from "react";
import Svg, { Path, Circle } from "react-native-svg";
//https://stackoverflow.com/questions/60215214/react-native-svg-setting-svg-width-and-height-cause-the-icon-to-be-cut-off
const CalendarDown = ({size, style, color}) => {
  return (

    <Svg width={size} height={size*19/34} fill="none" viewBox="0 0 34 19" style={style}>
      <Path
        d="M19.828 1.563h-2.11v1.171c0 .215-.19.391-.421.391h-.844c-.232 0-.422-.176-.422-.39V1.562H5.906v1.171c0 .215-.19.391-.422.391h-.843c-.232 0-.422-.176-.422-.39V1.562h-2.11C.95 1.563 0 2.44 0 3.516v13.28c0 1.075.95 1.954 2.11 1.954h17.718c1.16 0 2.11-.879 2.11-1.953V3.516c0-1.075-.95-1.954-2.11-1.954zm.422 14.648c0 .537-.475.977-1.055.977H2.742c-.58 0-1.054-.44-1.054-.977V7.42c0-.214.19-.39.421-.39h17.72c.231 0 .421.176.421.39v8.79zM5.906.39c0-.215-.19-.391-.422-.391h-.843c-.232 0-.422.176-.422.39v1.172h1.687V.391zm11.813 0c0-.215-.19-.391-.422-.391h-.844c-.232 0-.422.176-.422.39v1.172h1.688V.391z"
        fill="#575353"
      />
      <Circle cx={14.469} cy={9.875} r={1} fill={color? color: "#006300"} />
      <Path d="M29 14l-4.33-4.5h8.66L29 14z" fill={'#575353'} />
    </Svg>
  );
}

export default CalendarDown;

