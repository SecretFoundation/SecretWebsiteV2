// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const path = require('path')

const i18nPlugin = {
  use: "gridsome-plugin-i18n",
  options: {
    defaultLocale: 'en',
    locales: [
      'en',
      'es',
      'jp',
      'he',
      'zh-Hant-TW',
      'ko-KR'
    ],
    pathAliases: {
      'zh-Hant-TW': 'zh-tw',
      'ko-KR': 'ko'
    },
    messages: {
      'es': require('./src/locales/es.json'),
      'jp': require('./src/locales/jp.json')
    },
    rewriteDefaultLanguage: false
  }
};

const optionalPlugins = [];
const isI18nEnabled = process.env.ENABLE_I18N === 'true' || false;

if (isI18nEnabled) {
  optionalPlugins.push(i18nPlugin);
}

function addStyleResource(rule) {
    rule.use('style-resource')
        .loader('style-resources-loader')
        .options({
            patterns: [
                path.resolve(__dirname, './src/sass/docs/config/*.scss')
            ],
        })
}

module.exports = {
    siteName: 'Secret Network',
    siteUrl: 'http://scrt.network/',
    siteDescription: 'Secret Network is an open-source protocol that performs computations on encrypted data, bringing privacy to smart contracts and public blockchains.',
    titleTemplate: '%s - Bringing Privacy to Smart Contracts and Public Blockchains',
    plugins: [{
        use: "@gridsome/vue-remark",
        options: {
            typeName: "Content",
            baseDir: "./content",
            path: "/",
            template: "./src/templates/Content.vue",
        },
    },
    {
        use: '@gridsome/source-ghost',
        options: {
            typeName: 'Ghost',
            baseUrl: 'https://ghost.scrt.network',
            contentKey: '4149959fe32b2af9a94038da54',
        }
    },
    {
        use: '@stakeordie/source-strapi',
        options: {
            apiURL: process.env.GRIDSOME_STRAPI_URL,
            queryLimit: 1000, // Defaults to 100
            contentTypes: [
                'faq-items',
                'secret-agents',
                'announcements',
                'external-media-alts',
                'contributors',
                'd-apps',
                'nodes',
                'tools-and-wallets',
                'exchanges',
                'international-communities',
                'card-grid-headers',
                'committees',
                'nav-item',
                'page',
            ],
            localizedTypes: [
                //complex types
                //'nav-header' - Middlewear
                //content-types,
                'nav-item',
                'home-cta-cards',
                //single-types
                'alert-bar',
                'home-hero',
                'home-explainer',

            ],
            singleTypes: [
                'alert-bar',
                'home-hero',
                'home-cta-cards',
                'home-explainer',
                'home-announcements',
                'home-featured-media',
                'about-content',
                'about-secret-tokens-bridges',
                'agent-landing-brochure',
                'agent-landing-email-form',
                'agent-landing-hero',
                'agent-landing-intro-rows',
                'about-scrt',
                'nav-header',
                'ecosystem-roadmap'
            ],
            // Possibility to login with a Strapi user,
            // when content types are not publicly available (optional).
            loginData: {
                identifier: '',
                password: ''
            },
        }
    },
    {
        use: '@gridsome/plugin-sitemap',
    },
    {
        use: '@gridsome/plugin-google-analytics',
        options: {
            id: 'UA-173950488-3'
        }
    },
    {
        use: '@gridsome/vue-remark',
        options: {
            baseDir: './docs',
            pathPrefix: '/docs',
            typeName: 'Doc',
            template: './src/templates/Docs.vue',
            plugins: ['@gridsome/remark-prismjs']
        }
    },
      ...optionalPlugins
    ],
    templates: {
        GhostPost: '/blog/:slug',
    },
    transformers: {
        remark: {
            externalLinksTarget: '_blank',
            externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
            anchorClassName: 'icon icon-link',
            plugins: [
                'gridsome-plugin-remark-prismjs-all',
            ]
        },
    },
    chainWebpack: config => {
        config.resolve.alias.set('@images', '@/../content/img')
    },
    configureWebpack: {
        resolve: {
            symlinks: false,
        },
    },
};
