import {Dimensions, Platform, PixelRatio} from 'react-native';

/*****************************************************/
/*** Below is based on: https://stackoverflow.com/questions/33628677/react-native-responsive-font-size*/
/*****************************************************/
export const {
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
        dark: 'rgba(47,79,79,0.7)',
        extra_dark: 'rgba(47,79,79,1)'
    },
    secondary: {
        main: 'rgba(131,52,113,1)',
        light: '#a33131'
    },
    text: {
        primary: {
            main: '#323232',
            light: '#414141'
        },
        secondary: {
            main: 'rgba(136,136,136,0.40)',
            light: '#C1C7D0'
        }
    },
    general: {
        hot_purple: '#990000',
        earth_green: '#59713F',
        blue: '#27288E',
        red: '#AF3F3F',
        light_blue0: '#2196F3',
        green: '#71B419',
        orange: '#E9812C',
        teal: '#288982',
        light_orange: '#FCAA2C',
        light_teal: '#00B2AF',
        pink: '#C14CE8',
        light_blue: '#6096F8',
        light_light_teal: '#33C5DE',
        dark_green: '#109E56',
        fancy_pink: '#F3548A',
        dark_purple: '#803EE8',
        bright_green: '#00CA54',
        other_blue: '#1C73F4',
        another_blue: '#7085D8',
        oneMore_blue: '#405EBE',
        shabby_chic: '#008DA6',
        grey: '#585858'
    },
    background_color: {
        grey_tablet: '#EEEEF0',
        black: '#323232',
        white: '#F4F4F4',
    },
    background_URLs: {
        cream_dust: "../assets/images/cream_dust.png",
        gravel: "../assets/images/redox_01.png"

    }
};

export const fontTypes = {
    bold: "source-sans-pro-bold",
    semibold: "source-sans-pro-semibold",
    regular: "source-sans-pro-regular",
    light: "airbnb-light",
    black: "airbnb-black",
    book: "airbnb-book",
    thin: "raleway-thin"
};
