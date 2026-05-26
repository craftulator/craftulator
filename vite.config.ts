import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import {defineConfig} from 'vitest/config';

export default defineConfig({
  base: '/',
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: 'jsdom',
    include: ['*.tests.ts', 'src/**/*.tests.ts', 'src/**/*.tests.tsx'],
  },
});
