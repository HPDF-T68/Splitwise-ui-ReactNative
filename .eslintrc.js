module.exports = {
    "extends": "google",
    "parserOptions": {
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true,
        }
    },
    "plugins": [
        "react",
        "react-native"
    ],
    "rules": {
        "comma-dangle" : 0,
        "react-native/no-unused-styles": 2,
        "react-native/split-platform-components": 2,
    },
};