import React from "react"
import { View, StyleSheet, ImageBackground } from "react-native"
import PropTypes from 'prop-types';
import CloseButton from "../../../components/CameraApp/components/CloseButton";
import { useNavigation } from "@react-navigation/native"
import {StyledText} from "../../../components/StyledText";
import {colors, normalize, sizes } from "../../../constants/styles";
import TakePictureButton from "./TakePictureButton";
import {screens} from "../routes/screens";

/**
 * The post photo
 * @param outfit - {uri:string, outfitOption: enum [A,B]} for example {uri:'https://tinyurl/dvdfr', outfitOption: 'A'}
 * @param onCloseCallback - called when picture is closed.
 */
const PostPhoto = ({ img, onCloseCallback }) => {
    const navigation = useNavigation();

    const onClose = () => {
        onCloseCallback();
    };

    return (
        <View style={styles.photo_option}>

            {img.uri !== undefined ?
                <ImageBackground source={{ uri: img.uri }} style={{ ...styles.image }} resizeMode={'cover'}>
                    {/* make image darker so close button will always show*/}
                    <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.15)' }}>
                        {/* close button in top right corner */}
                        <CloseButton style={styles.close_button} closeCallBack={onClose} />
                    </View>
                </ImageBackground>
                :

                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <StyledText
                        size={normalize(15)}
                        style={{ paddingTop: normalize(5), color: colors.text.secondary.main }}>
                        Take Photo
                    </StyledText>
                    <TakePictureButton content={"A"}
                        onPress={() => navigation.navigate(screens.CameraApp, { navigateBackTo: screens.ImgUpload })} />
                </View>
            }
        </View>

    )
};

const styles = StyleSheet.create({
    close_button: {
        top: 0,
        right: 0,
        position: 'absolute',
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    photo_option: {
        width: '48.5%',
        height: '90%',
        borderColor: '#A9A9A9',
        borderWidth: 0.5,
        backgroundColor: '#E8E8E8',
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 2,
    }

});

PostPhoto.propTypes = {
    img: PropTypes.object.isRequired,
    onCloseCallback: PropTypes.func.isRequired
};

export default PostPhoto;