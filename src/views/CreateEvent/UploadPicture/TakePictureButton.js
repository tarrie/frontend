import React from "react"
import { TouchableOpacity, StyleSheet } from "react-native"
import { colors} from "../../../constants/styles"
import { StyledText } from "../../../components/StyledText";
import {normalize} from "../../../constants/styles";

const TakePictureButton = ({ onPress, content }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.button}
      activeOpacity={0.5}
    >
      <StyledText type="regular" size={72} style={{ color: "white" }}>
        {content}
      </StyledText>
    </TouchableOpacity>
  )
};

TakePictureButton.defaultProps = {
  content: "A"
};

const styles = StyleSheet.create({
  button: {
    margin: normalize(8),
    backgroundColor: colors.primary.main,
    paddingVertical: normalize(4),
    paddingHorizontal: normalize(30),
    borderRadius: 10
  }
});

export default TakePictureButton