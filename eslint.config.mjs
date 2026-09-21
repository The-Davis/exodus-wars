// eslint.config.mjs — flat config (ESLint 10 / @typescript-eslint v8)
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';

export default [
    {
        // Scope: all TypeScript source files including tests
        files: ['src/**/*.ts'],

        languageOptions: {
            parser: tsParser,
            parserOptions: {
                project: './tsconfig.json',
                tsconfigRootDir: import.meta.dirname,
            },
        },

        plugins: {
            '@typescript-eslint': tsPlugin,
        },

        rules: {
            // ── Style ─────────────────────────────────────────────────────
            'indent': ['error', 4, { SwitchCase: 1 }],
            'quotes': ['error', 'single', { avoidEscape: true }],
            'semi': ['error', 'always'],

            // ── TypeScript ─────────────────────────────────────────────────
            // Explicit return types on exported / public methods
            '@typescript-eslint/explicit-module-boundary-types': 'warn',

            // Disallow the loose `any` escape hatch
            '@typescript-eslint/no-explicit-any': 'warn',

            // Unused variables are almost always bugs
            '@typescript-eslint/no-unused-vars': [
                'error',
                { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
            ],

            // Naming: camelCase vars/functions, PascalCase classes/interfaces
            '@typescript-eslint/naming-convention': [
                'error',
                { selector: 'class', format: ['PascalCase'] },
                { selector: 'interface', format: ['PascalCase'] },
                { selector: 'typeAlias', format: ['PascalCase'] },
                {
                    selector: 'variable',
                    format: ['camelCase', 'UPPER_CASE'],
                    leadingUnderscore: 'allow',
                },
                {
                    selector: 'parameter',
                    format: ['camelCase'],
                    leadingUnderscore: 'allow',
                },
                {
                    selector: 'classProperty',
                    format: ['camelCase', 'snake_case'],
                    leadingUnderscore: 'allow',
                },
                {
                    selector: 'classMethod',
                    format: ['camelCase', 'snake_case'],
                    leadingUnderscore: 'allow',
                },
            ],

            // ── Intentionally OFF ──────────────────────────────────────────
            // console.log is used intentionally throughout for debug tracing
            'no-console': 'off',
        },
    },
];
