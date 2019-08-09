module.exports = {
    "extends": "standard",
    rules: {
        'no-alert': 'error',
        // allow async-await
        // 'generator-star-spacing': 'off',
        'camelcase': 'off',
        'prefer-promise-reject-errors': 'warn',
        // allow debugger during development
        'no-debugger': 'error'
        // 'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off'
    }
};
