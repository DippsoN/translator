import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react({
            babel: {
                plugins: [
                    [
                        'babel-plugin-styled-components',
                        {
                            displayName: true,
                            fileName: false
                        }
                    ]
                ]
            }
        }),
        tsconfigPaths({
            extensions: ['.ts', '.tsx']
        })
    ],
    build: {
        sourcemap: false
    }
})
