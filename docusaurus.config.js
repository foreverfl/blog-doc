// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const {themes} = require('prism-react-renderer');
const copyScalarBundle = require('./scripts/copy-scalar');
const bundleOpenapi = require('./scripts/bundle-openapi');

copyScalarBundle();
bundleOpenapi();

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'mogumogu',
  tagline: 'Architecture, API & operations for the mogumogu blog',
  favicon: 'img/favicon.ico',

  // Production url of the site
  url: 'https://docs.mogumogu.dev',
  // The /<baseUrl>/ pathname under which the site is served
  baseUrl: '/',

  organizationName: 'foreverfl',
  projectName: 'blog-doc',

  onBrokenLinks: 'throw',

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  // i18n configuration for multi-language support
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ko', 'ja'],
    localeConfigs: {
      en: {
        label: 'English',
        direction: 'ltr',
        htmlLang: 'en-US',
        calendar: 'gregory',
        path: 'en',
      },
      ko: {
        label: '한국어',
        direction: 'ltr',
        htmlLang: 'ko-KR',
        calendar: 'gregory',
        path: 'ko',
      },
      ja: {
        label: '日本語',
        direction: 'ltr',
        htmlLang: 'ja-JP',
        calendar: 'gregory',
        path: 'ja',
      },
    },
  },

  // Add client modules for global styles
  clientModules: [
    require.resolve('./src/css/custom.css'),
    require.resolve('./src/js/disable-theme-transition.js'),
  ],

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/foreverfl/blog-doc/tree/main/',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themes: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      ({
        hashed: true,
        language: ["en", "ko", "ja"],
        indexDocs: true,
        indexBlog: false,
        indexPages: false,
        docsRouteBasePath: "/",
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
        searchResultLimits: 8,
        searchResultContextMaxLength: 50,
        searchBarShortcutHint: false,
      })
    ]
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/logo.png',
      navbar: {
        title: 'mogumogu',
        logo: {
          alt: 'mogumogu Logo',
          src: 'img/logo.png',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'docsSidebar',
            position: 'left',
            label: 'Docs',
          },
          {
            to: 'pathname:///api/',
            position: 'left',
            label: 'API',
          },
          {
            type: 'localeDropdown',
            position: 'right',
          },
          {
            href: 'https://github.com/foreverfl/blog-doc',
            position: 'right',
            className: 'header-github-link',
            'aria-label': 'GitHub repository',
          },
          {
            type: 'search',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Introduction',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/foreverfl/blog-doc',
              },
              {
                label: 'mogumogu.dev',
                href: 'https://mogumogu.dev',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} mogumogu. Built with Docusaurus.`,
      },
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: false,
      },
      prism: {
        theme: themes.github,
        darkTheme: {
          ...themes.dracula,
          plain: {
            ...themes.dracula.plain,
            backgroundColor: '#1e293b',
          },
        },
        additionalLanguages: [
          'diff',
          'rust',
          'go',
          'haskell',
          'swift',
          'php',
          'python',
          'java',
          'kotlin',
          'sql',
          'yaml',
          'toml',
          'graphql',
        ],
      },
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: false,
        },
      },
      // Right-hand table of contents: show h2–h4 headings.
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 4,
      },
    }),
};

module.exports = config;
