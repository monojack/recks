const baseConfig = require('./webpack.base');
const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = merge.strategy({
    'module.rules': 'append'
})(baseConfig, {
    mode: 'development',
    watch: true,
    plugins: [
        new CleanWebpackPlugin()
    ]
});
