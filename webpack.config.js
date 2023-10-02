import CopyPlugin from "copy-webpack-plugin"
import path from 'path'

const exportModules = {
    entry: {
      server: './server/server.ts', // Entry point for server code
      //client: './client/src/index.tsx', // Entry point for TypeScript React app (add once created)
      account: { import: './client/src/maps/account.tsx', filename: './client/[name].js'}, // Entry point for TypeScript React app (add once created)
      registration: { import: './client/src/maps/registration.tsx', filename: './client/[name].js'}, // Entry point for TypeScript React app (add once created)
      login: { import: './client/src/maps/login.tsx', filename: './client/[name].js'}, // Entry point for TypeScript React app (add once created)
      homepage: { import: './client/src/maps/homepage.tsx', filename: './client/[name].js'}, // Entry point for TypeScript React app (add once created)
    },
    output: {
      filename: './[name]/[name].js', // Use [name] to dynamically generate filenames
      path: path.resolve('./', 'dist'),
    },
    target: "node", // Set the target to node for server build
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'], // Add TypeScript and JavaScript extensions
      },
    module: {
        rules: [
            {
                test: /\.?ts$/,
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader',
                  },
            },
            {
                test: /\.?tsx$/,
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader',
                  },
            },
        ],
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: './data/users.json', to: 'data' },
            ],
        }),
    ],
}

export default exportModules