const colors = require('tailwindcss/colors')

module.exports = {
    content: [
        "./src/**/*.{html,js}",
        "node_modules/@frostui/tailwindcss/dist/*.js"
    ],
    darkMode: ['class'],
    theme: {

        container: {
            center: true,
            padding: {
                DEFAULT: '1rem',
                sm: '1rem',
                md: '1rem',
                lg: '1rem',
                xl: '3rem',
                '2xl': '12rem',
            },
        },

        fontFamily: {
            'body': ['Mandali', 'sans-serif'],
        },

        extend: {
            colors: {
                'primary': "#0d6efd",
            },
        },
    },

    plugins: [
        require('@frostui/tailwindcss/plugin'),
        require('@tailwindcss/forms'),
        require('@tailwindcss/aspect-ratio'),
    ],
}