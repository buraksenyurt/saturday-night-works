const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {

    entry: './public/src/main.js',
    output: {
        filename: './public/build/mypackage.js'
    },
    resolve: {

        alias: {
            vue: './vue.js'
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            }, {
                test: /\.vue$/,
                loader: 'vue-loader',
                exclude: /node_modules/,
                options: {
                    loaders: {
                    }
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ],
    devServer: {
        port: 3000
    }
}