module.exports = {
    env: {
        browser: true,
        // 'es2021': true,
        node: true,
    },
    extends: [
        'plugin:@typescript-eslint/recommended',
        // 'prettier/@typescript-eslint',
        'plugin:prettier/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        // 'project': 'tsconfig.json',
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint'],
    rules: {
        'linebreak-style': ['error', 'unix'],
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
        '@typescript-eslint/no-explicit-any': ['off'],
    },
};
