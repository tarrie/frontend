import {Dimensions, Platform, PixelRatio} from 'react-native';

/*****************************************************/
/*** Below is based on: https://stackoverflow.com/questions/33628677/react-native-responsive-font-size*/
/*****************************************************/
const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
} = Dimensions.get('window');

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;

export const normalize = (size) => {
    const newSize = size * scale;
    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(newSize))
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
    }
};
/*****************************************************/
/*****************************************************/

export const MAX_TITLE_CHARS = 60;

export const sizes = {
    mini: {
        fontSize: normalize(12),
    },
    small: {
        fontSize: normalize(15),
    },
    medium: {
        fontSize: normalize(17),
    },
    large: {
        fontSize: normalize(20),
    },
    xlarge: {
        fontSize: normalize(24),
    },
};


export const colors = {
    primary: {
        main: 'rgba(0, 100, 0,1)',
        medium_light: 'rgba(49, 139, 89,.8)',
        light: 'rgba(46, 139, 87,1)',
        dark:'rgba(47,79,79,0.50)'
    },
    secondary: {
        main: 'rgba(131,52,113,.95)',
        light: 'rgba(205,92,92,1)'
    },
    text: {
        primary: {
            main: '#323232',
            light: '#414141'
        },
        secondary: {
            main: 'rgba(136,136,136,0.40)',
            light: 'rgba(136,136,136,0.75)'
        }
    },
    general: {
        hot_purple: '#990000',
        earth_green:'#59713F',
        blue: '#27288E',
        red: '#AF3F3F'
    },
    background_color:{
        grey_tablet: '#EEEEF0',
        black: '#323232',
        white: '#F4F4F4',
    },
    background_URLs:{
        cream_dust: "../assets/images/cream_dust.png",
        gravel: "../assets/images/redox_01.png"

    }
};