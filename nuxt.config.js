export default {
    mode: 'spa',
    /*
     ** Headers of the page
     */
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
            { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Lato&display=swap' },
        ],
        script: [
            { src: 'https://js.stripe.com/v3/' },
            { src: 'https://www.googletagmanager.com/gtag/js?id=G-0ZZ7TSSC81' },
        ],
    },
    // /*
    //  ** Customize the progress-bar color
    //  */
    // loading: { color: "#fff" },
    /*
     ** Global CSS
     */

    css: [
        'css/tailwind.min.css',
        'vue-select/dist/vue-select.css',
        'element-ui/lib/theme-chalk/reset.css',
        'element-ui/lib/theme-chalk/index.css',
    ],
    /*
     ** Plugins to load before mounting the App
     */
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
    /*
     ** Nuxt.js dev-modules
     */
    buildModules: [],
    axios: {
        //baseURL: process.env.NODE_ENV !== 'production' ? 'http://localhost:1337' : 'https://api.jitto.io',
        //baseURL: process.env.BACKEND_URL || 'https://jitto-backend.ketch.dev',
        baseURL: 'https://jitto-backend.ketch.dev',
        //baseURL: 'http://192.168.10:1337',
    },
    env: {
        //baseURL: process.env.NODE_ENV !== 'production' ? 'http://192.168.10:1337' : 'https://api.jitto.io',
        //baseURL: process.env.BACKEND_URL || 'https://jitto-backend.ketch.dev',
        baseURL: 'https://jitto-backend.ketch.dev',
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