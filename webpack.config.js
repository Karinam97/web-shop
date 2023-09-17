const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: {
      server: './server/server.js',
    },
    output: {
        filename: './server/server.js'
    },
    target: "node",
    plugins:[
        new CopyPlugin({
            patterns: [
                {from: './data/users.json',to:'data'},
                {from: './client', to: 'client'}
            ]
        })
    ]
}