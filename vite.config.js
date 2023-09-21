import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import replace from '@rollup/plugin-replace'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
		react(),
		replace({
			"process.env.VITE_REACT_APP_API_KEY": JSON.stringify(
				process.env.VITE_APP_API_KEY,
        process.env.VITE_APP_AUTH_DOMAIN,
        process.env.VITE_APP_PROJECT_ID,
        process.env.VITE_APP_STORAGEBUCKET,
        process.env.VITE_APP_MESSAGING_SENDER,
        process.env.VITE_APP_APP_ID
			),
		}),
	],
})
