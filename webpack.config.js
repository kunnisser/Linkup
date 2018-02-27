/**
 * Created by kunnisser on 2017/12/10.
 * 开发配置
 */
var path=require("path");
var webpack=require("webpack");
var HtmlWebpackPlugin=require("html-webpack-plugin");
var phaserModule = path.join(__dirname, '/node_modules/phaser/');
var phaser = path.join(phaserModule, 'build/custom/phaser-arcade-physics.js');
var pixi = path.join(phaserModule, 'build/custom/pixi.js');

module.exports={
    devtool:'cheap-source-map', //调试资源示意
    entry:{
        app: [
            path.resolve(__dirname,"./Linkup/main.js")
        ],
        vendor: ['pixi', 'phaser']
    }
    ,
    output:{
        path:__dirname + "/build",
        filename:"[name]-[hash].js"
    },
    devServer:{
        colors:true,
        inline: true,
        hot: true,
        host:'0.0.0.0',
        port: 9000
    },
    module:{
        loaders:[
            {
                test:/\.js$/,
                exclude:/node-modules/,
                loader:'babel'
            },
            {
              test: /\.json$/,
              loader: 'json-loader'
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
        })
    ]
}