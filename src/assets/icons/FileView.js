import * as React from "react";
import Svg, { Path } from "react-native-svg";

const FileView = ({size,style,color} )=> {
  return (
    <Svg width={size} height={size*16/19}  viewBox="0 0 19 16" fill="none" style={style}>
      <Path
        d="M2.211 1.866v13.86c0 .147.142.266.317.266h12.027c.175 0 .316-.12.316-.267V4.531c0-.006-.003-.01-.004-.017a.216.216 0 00-.016-.068l-.01-.025a.265.265 0 00-.063-.078l-3.166-2.666a.315.315 0 00-.122-.062.366.366 0 00-.082-.014c-.005.001-.011-.002-.018-.002H2.528c-.175 0-.317.12-.317.267zm11.58 2.399h-2.085V2.509l2.085 1.756zM2.844 2.132h8.23v2.4c0 .146.141.266.316.266h2.848v10.66H2.845V2.133z"
        fill={color?color:"#000"}
      />
      <Path
        d="M15.505 13.86v.533h.949c.175 0 .317-.12.317-.267V.266c0-.147-.142-.266-.317-.266H4.427c-.175 0-.317.12-.317.267v.8h.633V.532h11.394V13.86h-.633z"
        fill={color?color:"#000"}
      />
      <Path
        d="M4.743 5.33h7.596v.534H4.743V5.33zM4.743 3.731h2.532v.534H4.743V3.73zM4.743 6.93h5.064v.533H4.743V6.93zM10.44 6.93h1.9v.533h-1.9V6.93zM4.743 8.529h7.596v.533H4.743V8.53zM4.743 11.727h7.596v.534H4.743v-.534zM7.592 10.128h4.747v.533H7.592v-.533zM4.743 10.128H6.96v.533H4.743v-.533zM4.743 13.327H6.01v.533H4.743v-.533zM6.642 13.327h5.697v.533H6.642v-.533z"
        fill={color?color:"#000"}
      />
    </Svg>
  );
}

export default FileView;

