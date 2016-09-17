const path = require('path');
const precss = require('precss');
const pkg = require('./package.json');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const validate = require('webpack-validator');

const PATHS = {
    app: path.join(__dirname, 'src'),
    dist: path.join(__dirname, 'dist')
};

const config = {
    entry: {
        app: `${PATHS.app}/js`,
        vendor: Object.keys(pkg.dependencies),
        html: `${PATHS.app}/index.html`
    },
    output: {
        path: PATHS.dist,
        publicPath: '/',
        filename: '[name].js'
    },
    devServer: {
        // Enable history API fallback so HTML5 History API based
        // routing works. This is a good default that will come
        // in handy in more complicated setups.
        historyApiFallback: true,

        inline: true,

        // Display only errors to reduce the amount of output.
        stats: 'errors-only',

        host: process.env.HOST, // Defaults to `localhost`
        port: process.env.PORT, // Defaults to 8080
        contentBase: PATHS.dist,
    },
    plugins: [
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     }
        // }),

        // Extract bundle and manifest files. Manifest is
        // needed for reliable caching.
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest']
        })
    ],
    module: {
        loaders: [
            {
                test: /\.html$/,
                loader: "file?name=[name].[ext]",
                include: PATHS.app
            },
            {
                test: /\.js$/,
                include: PATHS.app,
                loader: "babel"
            },
            {
                test: /\.css$/,
                loaders: ["style-loader", "css-loader", "postcss-loader"],
                include: PATHS.app
            }
        ]
    },
    postcss: function() {
        return [precss, autoprefixer];
    }
}

module.exports = validate(config);