// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "CodeDocs",
  tagline: "Dinosaurs are cool",
  favicon: "img/codeLogo.ico",

  // Set the production url of your site here
  url: "https://vdwstoffel.github.io",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/code-docs/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "vdwstoffel",
  projectName: "code-docs",
  deploymentBranch: "deploy",
  trailingSlash: false,

  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: "/",
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/vdwstoffel/code_docs/blob/main/",
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/vdwstoffel/code_docs/blob/main/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: "img/docusaurus-social-card.jpg",
      navbar: {
        title: "CodeDocs",
        logo: {
          alt: "My Site Logo",
          src: "img/codeLogo.svg",
        },
        items: [
          // {
          //   type: "docSidebar",
          //   sidebarId: "tutorialSidebar",
          //   position: "left",
          //   label: "Code Snippets",
          // },

          // Snippets dropdown menu
          {
            type: "dropdown",
            label: "Languages",
            position: "left",
            items: [
              {
                type: "doc",
                label: "JavaScript",
                docId: "languages/javascript/strings",
              },
              { type: "doc", label: "Java", docId: "languages/java/java" },
              { type: "doc", label: "SQL", docId: "languages/sql/select" },
            ],
          },

          {
            type: "dropdown",
            label: "Recepies",
            position: "left",
            items: [
              {
                type: "doc",
                label: "HTML/CSS/JS",
                docId: "recepies/html_css_js/recepies",
              },
              {
                type: "doc",
                label: "React",
                docId: "recepies/react/react",
              },
              {
                type: "doc",
                label: "Express",
                docId: "recepies/express/express",
              },
              {
                type: "doc",
                label: "Devops",
                docId: "recepies/devops/docker",
              },
            ],
          },

          // Blog posts
          { to: "/blog", label: "Interesting", position: "left" },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Tutorial",
                to: "/docs/intro",
              },
              {
                label: "Replit",
                href: "https://replit.com/@vdwstoffel",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/vdwstoffel/code_docs",
              },
              {
                label: "Docusaurus",
                href: "https://docusaurus.io/docs",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "How To's",
                to: "/blog",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} CVDW. Built with Docusaurus.`,
      },
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 5,
      },
      prism: {
        theme: darkCodeTheme,
        darkTheme: darkCodeTheme,
        //https://prismjs.com/#supported-languages
        additionalLanguages: [
          "bash",
          "docker",
          "yaml",
          "json",
          "robotframework",
          "pug",
          "groovy",
          "typescript",
          "java",
        ],
      },
      docs: {
        sidebar: {
          autoCollapseCategories: true,
        },
      },
    }),
  themes: ["@docusaurus/theme-live-codeblock"],
  plugins: [require.resolve("docusaurus-lunr-search")],
};

module.exports = config;
