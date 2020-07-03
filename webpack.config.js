const path = require('path');
const webpack = require('webpack');


module.exports = {
    name: 'just label for this file',
    mode: 'development', // development or production.
    devtool: 'eval', // eval or hidden-source-map

    resolve: { // input sources helper
        extensions: ['.js', '.jsx']
    },
    entry: { // input sources
        app: ['./client'],
    },
    module: {
        rules: [{
            test: /\.jsx?$/, // matched source files.
            loader: 'babel-loader',
            options: {
                presets: [
                    ['@babel/preset-env', {
                        targets: {
                            browsers: ['last 2 chrome versions'], // github.com/browserslist
                        }
                    }],
                    '@babel/preset-react',
                ],
                plugins: [
                    '@babel/plugin-proposal-class-properties',
                    'react-hot-loader/babel',
                ]
            }
        }],
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({ debug: true }),
    ], // addtional doing...
    output: { // output js.
        filename: 'app.js',
        path: path.resolve(__dirname, 'dist'), // default output folder is dist.
        publicPath: '/dist/'
    },
};