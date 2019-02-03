// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    // to edit target browsers: use "browserslist" field in package.json
    'autoprefixer': {browsers: 'ie 10-11, last 2 iOS versions, last 5 versions, Android >= 4.4, FF > 50'}
  }
}
