export default {
    mode: 'spa',
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
        { src: '@/plugins/apexchart.js', ssr: false },
        '@/plugins/vue-mask',
        '@/plugins/v-select',
        { src: '@/plugins/crisp.js', ssr: false },
        { src: '@/plugins/ga.js', mode: 'client' },
        { src: '@/plugins/clipboard.js', mode: 'client' },
    ],
    modules: ['@nuxtjs/axios', '@nuxtjs/auth', '@nuxtjs/font-awesome', 'nuxt-stripe-module', '@nuxtjs-extra/ant-design-vue'],
    stripe: {
        version: 'v3',
        publishableKey: 'pk_test_wVUeie2EhLpRHg689dHmZeYc00PvJYzGwp',
    },
    buildModules: [],
    axios: {
        baseURL: 'http://0.0.0.0:1337',
        //baseURL: 'http://192.168.10:1337',
    },
    env: {
        baseURL: 'http://0.0.0.0:1337',
        frontendURL: 'https://sharetoearn.in'
            //baseURL: 'http://192.168.10:1337',
    },
    debug: {
        enabled: true,
        sendHitTask: true,
    },

    /*
     ** Nuxt.js modules
     */
    // modules: ["@nuxtjs/axios", "@nuxtjs/auth"],
    auth: {
        localStorage: {
            prefix: 'auth.',
        },
        strategies: {
            facebook: {
                _scheme: 'oauth2',
                authorization_endpoint: 'https://4978b7401195.ngrok.io/connect/facebook/',
                userinfo_endpoint: 'https://www.googleapis.com/oauth2/v3/userinfo',
                scope: ['openid', 'profile', 'email'],
                access_type: undefined,
                access_token_endpoint: undefined,
                response_type: 'token',
                token_type: 'Bearer',
                redirect_uri: undefined,
                client_id: 'SET_ME',
                token_key: 'access_token',
                state: 'UNIQUE_AND_NON_GUESSABLE'
            },
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
            },
        },
    },
    /*
     ** Build configuration
     */
    build: {
        transpile: [/^element-ui/, 'ag-grid-vue'],

        /*
         ** You can extend webpack config here
         */
        extend(config, ctx) {},
    },
    generate: {
        minify: {
            collapseWhitespace: false,
        },
    },
};