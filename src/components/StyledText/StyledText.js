import React from "react"
import { StyleSheet, Text } from "react-native"
import {fontTypes} from "../../constants/styles";


const StyledText = ({ children, style, type, size, ...rest }) => {
  const styles = StyleSheet.create({
    text: {
      fontFamily: fontTypes[type],
      fontSize: size,
    }
  });
  return (
    <Text style={{ ...styles.text, ...style }} {...rest}>
      {children}
    </Text>
  )
};

StyledText.defaultProps = {
  type: "regular",
  size: 16
};

export default StyledText
