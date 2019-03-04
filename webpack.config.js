const path = require('path');

module.exports = {
    mode : "development",
    devtool: "source-map",
    entry: {
        main: './src/core/app-core.js'
    },
    output: {
        path: path.resolve(__dirname, 'www/dist'),
        filename: 'main.js'
    }
};