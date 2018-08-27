const path = require("path")
const webpack = require("webpack")

module.exports = env => {
    return {
        entry: [
            './src/index.js'
        ],

        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: ['babel-loader']
                }
            ]
        },

        resolve: {
            extensions: ['*', '.js', '.jsx']
        },

        output: {
            path: path.resolve(__dirname, 'dist', 'js'),
            publicPath: '/',
            filename: 'bundle.js'
        },

        plugins: [
            new webpack.DefinePlugin({
                'ENV': JSON.stringify(env.ENV)
            })
        ]
    }
}