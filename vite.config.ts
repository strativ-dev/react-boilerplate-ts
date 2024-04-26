import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-plugin-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
	optimizeDeps: {
		include: ['antd', 'lodash'],
	},
	build: {
		sourcemap: false,
	},
	plugins: [react(), tsconfigPaths(), svgr()],
});
