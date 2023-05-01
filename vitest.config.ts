/// <reference types="vitest" />
import { defineConfig } from 'vite';
import { configDefaults } from 'vitest/dist/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'happy-dom',
    clearMocks: true,
    include: [...configDefaults.include, 'tests/**/*.{spec,test}.ts'],
    exclude: [...configDefaults.exclude, '**/node_modules/**'],
    typecheck: {
      tsconfig: 'tsconfig.json',
      include: ['tests/**/*.{spec,test}.ts'],
      checker: 'tsc'
    }
  }
});
