module.exports = {
    "extends": "google",
    "parserOptions": {
        "ecmaVersion": 7,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true,
        }
    },
    "plugins": [
        "react",
        "react-native"
    ],
    "settings": {
        "react": {
            "pragma": "React",
            "version": "16.0.0"
        }
    },
    "rules": {
        "comma-dangle" : 0,
        "react-native/no-unused-styles": 2,
        "react-native/split-platform-components": 2,
    },
};