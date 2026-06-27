import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';
import prettier from 'eslint-config-prettier';

// export default defineConfig([
//   {
//     files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
//     ignores: ['dist/**', 'node_modules/**'],
//     plugins: { js },
   
//     languageOptions: {
//       globals: globals.node,
//       sourceType: "module",
//       ecmaVersion: "latest",
//     },
//      rules: {
//       "no-unused-vars": "warn",
//       "no-undef": "warn",
//       "@typescript-eslint/no-unused-vars": ["warn"],
//     }
//   },
//   js.configs.recommended,
//   ...tseslint.configs.recommended,
//   prettier,
// ]);

export default defineConfig([
  {
    ignores: ['dist/**', 'node_modules/**'], // 👈 окремий блок
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettier,
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    languageOptions: {
      globals: globals.node,
      sourceType: 'module',
      ecmaVersion: 'latest',
    },
    rules: {
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-undef': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-empty-object-type': 'warn',
    },
  },
]);