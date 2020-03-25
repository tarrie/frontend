import React from "react"
import {StyledText} from "../../components/StyledText";
import { View, StyleSheet } from "react-native"
import {colors} from "../../constants/styles";

const Calendar = () =>{

    return (
        <View style={styles.container}>
            <StyledText> Calendar Page</StyledText>
        </View>
    )
};

const styles = StyleSheet.create({
  container: {
      width: "100%",
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor:colors.background_color.grey_tablet
  }
});

export default Calendar;