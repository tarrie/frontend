// So that Webstorm recognizes absolute paths: https://intellij-support.jetbrains.com/hc/en-us/community/posts/360002490579-Custom-import-paths-jsconfig-json
System.config({
    "paths": {
        "@api/*": "./src/api/*",
        "@assets/*": "./src/assets/*",
        "@components/*": "./src/components/*",
        "@constants/*": "./src/constants/*",
        "@contex/*": "./src/contex/*",
        "@routes/*": "./src/routes/*",
        "@utils/*": "./src/utils/*",
        "@views/*": "./src/views/*"
    }
});