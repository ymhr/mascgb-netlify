const imagemin = require('imagemin');
const jpegtran = require('imagemin-jpegtran');
const pngquant = require('imagemin-pngquant');

(async () => {
  await imagemin(['images/*.{jpg,png}'], 'test/images', {
    plugins: [jpegtran(), pngquant()]
  });
})();
