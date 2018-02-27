/**
 * Created by kunnisser on 2017/12/24 0024.
 * 发布环境配置
 */

var path=require("path");
var webpack=require("webpack");
var HtmlWebpackPlugin=require("html-webpack-plugin");
var phaserModule = path.join(__dirname, '/node_modules/phaser/');
var phaser = path.join(phaserModule, 'build/custom/phaser-arcade-physics.js');
var pixi = path.join(phaserModule, 'build/custom/pixi.js');

module.exports={
    entry:{
        app: [
            path.resolve(__dirname,"./Linkup/main.js")
        ],
        vendor: ['pixi', 'phaser']
    }
    ,
    output:{
        path:__dirname + "/output/Linkup",
        filename:"[name]-[hash].js"
    },
    devServer:{
        colors:true,  //输出的结果有颜色，
        host:'0.0.0.0'
    },
    module:{
        loaders:[
            {
                test:/\.js$/,
                exclude:/node-modules/,
                loader:'babel'
            },
            {
                test:/\.(jpg|png)$/,
                loader:'file?limit=1024&name=img/[name].[ext]'
            },
            { test: /pixi\.js/, loader: 'expose?PIXI' },
            { test: /phaser-arcade-physics\.js$/, loader: 'expose?Phaser' }
        ]
    },
    resolve: {
        alias: {
            'pixi' : pixi,
            'phaser': phaser
        }
    },
    plugins:[
        new webpack.BannerPlugin('Copyright Flying Ezhandi inc.'),
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
        new HtmlWebpackPlugin({
            template:__dirname+"/Linkup/view/index.html"
        }),
        new webpack.optimize.UglifyJsPlugin({
            drop_console: true,
            minimize: true,
            output: {
                comments: false
            }
        })
    ]
}