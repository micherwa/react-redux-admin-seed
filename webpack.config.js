const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const ip = require('ip');
const merge = require('webpack-merge');
const MiniCssExtractPlugin  = require('mini-css-extract-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

var config = {
    context: path.join(__dirname, './src'),
    entry: {
        app: './main.js'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js|jsx$/,
                loader: 'babel-loader?cacheDirectory',
                exclude: [/node_modules/],
                include: [
                    path.join(__dirname, './src'),
                    path.join(__dirname, './node_modules/webpack-dev-server/client')
                ]
            },
            {
                test: /\.(png|jpe?g|gif|ico)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'assets/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'fonts/[name].[hash:7].[ext]'
                }
            },
            // 解决antd的样式按需加载的bug
            {
                test: /\.less$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    {
                        loader: 'less-loader',
                        options: {
                            // 自定义全局样式
                            modifyVars: {
                                'primary-color': '#1276e5',
                                'link-color': '#1276e5',
                            },
                            javascriptEnabled: true
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            '@': path.join(__dirname, './src')
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'false'))
        }),
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|zh/),
        new LodashModuleReplacementPlugin({
            'shorthands': true
        })
    ],
    performance: {
        hints: false
    }
};

if (isDev) {
    const devServerHost = ip.address();
    const devServerPort = 8099;
    config = merge(config, {
        mode: 'development',
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    loader: 'eslint-loader',
                    enforce: 'pre',
                    include: [path.join(__dirname, 'src')],
                    options: {
                        formatter: require('eslint-friendly-formatter'),
                        emitWarning: true
                    }
                },
                {
                    test: /\.s?css$/,
                    loaders: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
                }
            ]
        },
        devtool: 'cheap-source-map',
        devServer: {
            hot: true,
            contentBase: './src',
            noInfo: true,
            host: devServerHost,
            port: devServerPort,
            publicPath: '/',
            proxy: {
                '/mock': {
                    target: 'http://localhost:9099'
                },
                changeOrigin: true
            },
            clientLogLevel: 'warning',
            overlay: { warnings: false, errors: true },
            watchOptions: { poll: false }
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new HtmlWebpackPlugin({
                template: './index.html',
                inject: true,
                favicon: './assets/favicon.ico'
            })
        ]
    });

    console.log(`Your project is running at http://${devServerHost}:${devServerPort}`);

    launchMock();
}

if (isProd) {
    config = merge(config, {
        mode: 'production',
        devtool: 'inline-source-map',
        output: {
            filename: 'js/[name].[chunkhash:8].js',
            chunkFilename: 'js/[name].[chunkhash:8].js'
        },
        module: {
            rules: [
                {
                    test: /\.s?css$/,
                    use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
                }
            ]
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('production')
            }),
            new MiniCssExtractPlugin({
                filename: 'css/[name].[contenthash:8].css',
                chunkFilename: 'css/[name].[contenthash:8].css'
            }),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: './index.html',
                inject: true,
                favicon: './assets/favicon.ico',
                minify: {
                    minifyJS: true,
                    removeComments: true,
                    collapseWhitespace: true,
                    collapseInlineTagWhitespace: true,
                    removeRedundantAttributes: true,
                    removeAttributeQuotes: true
                }
            }),
            new ScriptExtHtmlWebpackPlugin({
                inline: /runtime\..*\.js$/
            }),
            new webpack.NamedChunksPlugin(chunk => {
                const seen = new Set();
                const nameLength = 4;
                const modules = Array.from(chunk.modulesIterable);

                if (chunk.name) {
                    return chunk.name;
                }

                if (modules.length > 1) {
                    const hash = require('hash-sum');
                    const joinedHash = hash(modules.map(m => m.id).join('_'));
                    let len = nameLength;
                    while (seen.has(joinedHash.substr(0, len))) {
                        len++;
                    }
                    seen.add(joinedHash.substr(0, len));

                    return `chunk-${joinedHash.substr(0, len)}`;
                } else {
                    return modules[0].id;
                }
            }),
            new webpack.HashedModuleIdsPlugin(),
            new CopyWebpackPlugin([
                // {
                //     from: path.join(__dirname, 'src/assets'),
                //     to: path.join(__dirname, 'dist/assets')
                // },
                // {
                //     from: path.join(__dirname, 'src/libs'),
                //     to: path.join(__dirname, 'dist/libs')
                // }
            ])
        ],
        optimization: {
            splitChunks: {
                chunks: 'all',
                cacheGroups: {
                    libs: {
                        name: 'chunk-libs',
                        test: /[\\/]node_modules[\\/]/,
                        priority: 10,
                        chunks: 'initial'
                    },
                    antd: {
                        name: 'chunk-antd',
                        priority: 20,
                        test: /[\\/]node_modules[\\/]antd[\\/]/
                    }
                }
            },
            runtimeChunk: 'single',
            minimizer: [
                new UglifyJsPlugin({
                    uglifyOptions: {
                        mangle: {
                            safari10: true
                        }
                    },
                    sourceMap: false,
                    cache: true,
                    parallel: true
                }),
                new OptimizeCSSAssetsPlugin()
            ]
        }
    },
    {
        stats: {
            colors: true,
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }
    });
}

function launchMock () {
    // mock server startup
    var db = require('./mock/db.js');
    var jsonServer = require('json-server');
    var server = jsonServer.create();
    var router = jsonServer.router(db);
    var middlewares = jsonServer.defaults();

    server.use(middlewares);
    server.use('/mock', router);
    server.listen(9099, () => {
        console.log('Mock API Server is running!');
    });
}

module.exports = config;
