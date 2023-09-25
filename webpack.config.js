const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: {
      server: './server/server.ts', // Change .js to .ts
      // client: './server
    },
    output: {
        filename: './server/server.js'
    },
    target: "node",
    resolve: {
        extensions: ['.ts', '.js'], // Add TypeScript extensions , add jsx, tsx
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/, // Update the test pattern to include .ts and .tsx files
                exclude: /node_modules/,
                use: 'ts-loader', // Use ts-loader for TypeScript files
            },
            // Add other rules for handling JavaScript, CSS, etc.
        ],
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: './data/users.json', to: 'data' },
                { from: './client', to: 'client' },
            ],
        }),
    ],
}