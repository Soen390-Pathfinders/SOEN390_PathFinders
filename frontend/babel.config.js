module.exports = {
    presets: ['module:metro-react-native-babel-preset'], // This is the default preset for React Native
    plugins: [
      ['module:react-native-dotenv', { moduleName: '@env', path: '.env' }] // Configures Babel to use .env
    ],
  };
  