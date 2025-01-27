const baseConfig = require('./webpack.base');
const merge = require('webpack-merge');


module.exports = merge.strategy({
    'module.rules': 'append'
})(baseConfig, {
    mode: 'development'
});
