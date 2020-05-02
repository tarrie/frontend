import * as React from "react";
import Svg, {
  Use,
  Symbol,
  Defs,
  ClipPath,
  Path,
  Circle,
  G,
} from "react-native-svg";



function SvgZoom(props) {
  return (
    <Svg
      viewBox="0 0 65 65"
      fill="#fff"
      fillRule="evenodd"
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Use xlinkHref="#zoom_svg__a" x={0.5} y={0.5} />
      <Symbol id="zoom_svg__a" overflow="visible">
        <Svg
          viewBox="0 0 32 32"
          width={64}
          height={64}
          stroke="initial"
          fill="initial"
          fillRule="initial"
        >
          <Defs>
            <ClipPath id="zoom_svg__b">
              <Path d="M-200-175H800v562H-200z" fill="none" />
            </ClipPath>
            <ClipPath id="zoom_svg__c">
              <Circle cx={107} cy={106} r={102} fill="none" />
            </ClipPath>
            <ClipPath id="zoom_svg__d">
              <Circle cx={107} cy={106} r={100} fill="none" />
            </ClipPath>
            <ClipPath id="zoom_svg__e">
              <Circle cx={107} cy={106} r={92} fill="none" />
            </ClipPath>
            <ClipPath id="zoom_svg__f">
              <Path
                d="M135 94.06l26-19c2.27-1.85 4-1.42 4 2V135c0 3.84-2.16 3.4-4 2l-26-19zM47 77.2v43.2c.05 9.766 8.004 17.644 17.77 17.6h63a3.22 3.22 0 003.23-3.2V91.6c-.05-9.766-8.004-17.644-17.77-17.6h-63A3.22 3.22 0 0047 77.2z"
                fill="none"
                clipRule="evenodd"
              />
            </ClipPath>
          </Defs>
          <G clipPath="url(#zoom_svg__b)" transform="translate(0 -178)">
            <Path d="M232 61h366v90H232z" fill="#4a8cff" />
          </G>
          <G
            transform="matrix(.15686 0 0 .15686 -.784 -.627)"
            clipPath="url(#zoom_svg__b)"
          >
            <G clipPath="url(#zoom_svg__c)">
              <Path d="M0-1h214v214H0z" fill="#e5e5e4" />
            </G>
            <G clipPath="url(#zoom_svg__d)">
              <Path d="M2 1h210v210H2z" fill="#fff" />
            </G>
            <G clipPath="url(#zoom_svg__e)">
              <Path d="M10 9h194v194H10z" fill="#4a8cff" />
            </G>
            <G clipPath="url(#zoom_svg__f)">
              <Path d="M42 69h128v74H42z" fill="#fff" />
            </G>
          </G>
          <G clipPath="url(#zoom_svg__b)" transform="translate(0 -178)">
            <Path d="M232 19.25h180v38.17H232z" fill="#90908f" />
          </G>
        </Svg>
      </Symbol>
    </Svg>
  );
}

export default SvgZoom;

