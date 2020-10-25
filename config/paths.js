const src = './src';
const common = `${src}/common`;
const build = $.isProd ? './build/' : './build-dev';

module.exports = {
  src,
  build,
  server: {
    base: build,
  },
  clean: build,
  alias: {
    '~common': common,
    '~blocks': `${src}/blocks`,
    '~layout': `${src}/layout`,
    '~static': `${src}/static`,
    '~vendor': `${src}/vendor`,
    '~web': `${src}/web`,
    '~images': `${build}/images`,
  },
  webpack: {
    context: src,
    src: {
      index: 'index.js',
    },
    dest: build,
  },
  static: {
    src: `${src}/static/**/*.*`,
    watch: [
      `${src}/static/**/*.*`,
    ],
    dest: `${build}/static`,
  },
  pug: {
    dest: build,
    src: `${src}/web/**/*.pug`,
    lint: `${src}/**/*.pug`,
    clean: `${build}/*.html`,
    watch: `${src}/**/*.pug`,
  },
  images: {
    src: `${common}/images/**/*.{png,jpeg,jpg,svg,gif}`,
    watch: `${common}/images/**/*.{png,jpeg,jpg,svg,gif}`,
    dest: `${build}/images`,
  },
  icons: {
    src: `${common}/icons/*.svg`,
    watch: `${common}/icons/*.svg`,
    template: `${common}/icons/template/icons.handlebars`,
    dest: `${common}/icons/sprite`,
  },
};
