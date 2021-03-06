module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: "giardino-di-cate",
    htmlAttrs: {
      lang: "it-it"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "Il Giardino di Cate"
      },
      {
        hid: "msapplication-TileColor",
        name: "msapplication-TileColor",
        content: "#ff7979"
      },
      {
        hid: "msapplication-TileImage",
        name: "msapplication-TileImage",
        content: "/ms-icon-144x144.png"
      },
      { hid: "theme-color", name: "theme-color", content: "#ff7979" }
    ],
    link: [
      {
        rel: "apple-touch-icon",
        sizes: "200x200",
        href: "/swing-share.png"
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png"
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png"
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "96x96",
        href: "/favicon-96x96.png"
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "192x192",
        href: "/android-icon-192x192.png"
      },
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "manifest", href: "/manifest.json" }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: "#3B8070" },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        });
      }
    }
  }
};
