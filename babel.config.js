// https://stackoverflow.com/questions/53818240/how-to-use-babel-module-resolver-with-react-nativeexpo-on-publication
module.exports = function (api) {
    api.cache(true);
    return {
        presets: [
            'babel-preset-expo',
            'module:react-native-dotenv'
        ],
        plugins: [
            [
                "module-resolver",
                {
                    "root": ["./"],
                    "alias": {
                        "@api": "./src/api",
                        "@assets": "./src/assets",
                        "@components": "./src/components",
                        "@constants": "./src/constants",
                        "@contex": "./src/contex",
                        "@routes": "./src/routes",
                        "@utils": "./src/utils",
                        "@views": "./src/views"

                    }
                },
            ],
        ],
    };
};
