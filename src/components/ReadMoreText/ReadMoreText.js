import React from 'react';
import {View,StyleSheet} from 'react-native';
import ReadMore from 'react-native-read-more-text';
import {StyledText} from "../StyledText";
import {colors} from "../../constants/styles";

const ReadMoreText = ({text}) => {

    const _renderTruncatedFooter = (handlePress) => {
        return (
            <StyledText style={{color: '#989898', marginTop: 5}} onPress={handlePress}>
                Read more
            </StyledText>
        );
    };

    const _renderRevealedFooter = (handlePress) => {
        return (
            <StyledText style={{color: '#989898', marginTop: 5}} onPress={handlePress}>
                Show less
            </StyledText>
        );
    };


    const _handleTextReady = () => {
        //console.log("ready!!")
    };

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <ReadMore
                    numberOfLines={3}
                    renderTruncatedFooter={_renderTruncatedFooter}
                    renderRevealedFooter={_renderRevealedFooter}
                    onReady={_handleTextReady}>
                    <StyledText style={styles.cardText}>
                        {text}
                    </StyledText>
                </ReadMore>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.05)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        marginHorizontal: 10,
        padding: 10,
        borderRadius: 3,
        borderColor: 'rgba(0,0,0,0.1)',
        borderWidth: 1,
        backgroundColor: '#fff',
    },
    cardText: {
        fontSize: 14,
    },
});

export default ReadMoreText