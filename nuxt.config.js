export default {
    mode: 'universal',
    head: {
        title: process.env.npm_package_name || '',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            {
                hid: 'description',
                name: 'description',
                content: process.env.npm_package_description || '',
            },
        ],
        link: [
            { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Nunito+Sans:300,400,400i,600,700' },
            { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/@tailwindcss/ui@latest/dist/tailwind-ui.min.css' },
            { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Lato&display=swap' },
        ],
        script: [
            { src: 'https://js.stripe.com/v3/' },
            { src: 'https://www.googletagmanager.com/gtag/js?id=G-0ZZ7TSSC81' },
        ],
    },
    css: [
        'css/tailwind.min.css',
        'vue-select/dist/vue-select.css',
        'element-ui/lib/theme-chalk/reset.css',
        'element-ui/lib/theme-chalk/index.css',
    ],
    plugins: [
        '@/plugins/element-ui.js',
        '@/plugins/vue-moment.js',

        { src: '@/plugins/clipboard.js', mode: 'client' },
    ],
    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/auth',
        '@nuxtjs/font-awesome',
        '@nuxtjs/pwa',
        'nuxt-stripe-module',
        '@nuxtjs-extra/ant-design-vue',
    ],
    stripe: {
        version: 'v3',
        publishableKey: 'pk_test_wVUeie2EhLpRHg689dHmZeYc00PvJYzGwp',
    },
    axios: {
        baseURL: 'https://beyondvision.herokuapp.com'
    },
    env: {
        baseURL: 'https://beyondvision.herokuapp.com',
        frontendURL: 'https://sharetoearn.in'
    },
    debug: {
        enabled: true,
        sendHitTask: true,
    },
    buildModules: [
        ['@nuxtjs/google-analytics', {
            id: 'UA-176565116-3'
        }]
    ],
    pwa: {
        icon: true
    },
    auth: {
        localStorage: {
            prefix: 'auth.',
        },
        strategies: {
            local: {
                endpoints: {
                    login: { url: '/auth/local', method: 'post', propertyName: 'jwt' },
                    user: { url: '/users/me', method: 'get', propertyName: false },
                    logout: { url: 'logout', method: 'get' },
                },
                tokenRequired: true,
                tokenType: 'Bearer',
            },
            redirect: {
                logout: '/login',
                home: '/dashboard',
                callback: '/dashboard',
            },
        },
    },
    build: {
        transpile: [/^element-ui/, 'ag-grid-vue'],
        extend(config, ctx) {},
    },
    generate: {
        minify: {
            collapseWhitespace: false,
        },
    },
};