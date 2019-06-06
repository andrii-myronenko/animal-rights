// @ts-check

const Path                 = require('path');
const HtmlWebPackPlugin    = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: {
        bundle: [
            relativePath('index.tsx')
        ]
    },
    
    output: {
        filename: "bundle.js",
        publicPath: '/',
        path: relativePath(`./../../dist`)
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js",  '.mjs', ".json"],
        alias: { 
            "@app":        relativePath("."                  ),
            "@common":     relativePath("../common"          ),
            "@components": relativePath("components"         ),
            "@router":     relativePath("components/router"  ),
            "@partials":   relativePath("components/partials"),
            "@reducers":   relativePath("reducers"           ),
            "@actions":    relativePath("actions"            ),
            "@theme":      relativePath("theme"              ),
            "@configs":    relativePath("configs"            ),
            "@graphql":    relativePath("graphql"            )
        },
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { 
                test: /\.tsx?$/, 
                loader: `awesome-typescript-loader?configFileName=${relativePath('tsconfig.json')}` 
            },
            {
                type: 'javascript/auto',
                test: /\.mjs$/,
                use: []
            },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { 
                enforce: "pre", 
                test: /\.js$/, 
                loader: "source-map-loader",
                exclude: [/node_modules/, /build/],
            },
            
            {
                test: /\.html$/,
                use: {
                    loader: "html-loader"
                }
            },
            {
                test: /\.css$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [
                                    require('autoprefixer')
                                ];
                            }
                        }
                    }
                ]
            }
        ]
    },
    
    plugins: [
        new HtmlWebPackPlugin({
            template: relativePath("index.html"),
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ],
};


function relativePath(pathString) {
    return Path.resolve(__dirname, pathString);
}