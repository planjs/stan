const path = require('path');
const { ossUpload } = require('../../');

const uploadDir = path.join(__dirname, '../../', 'lib');

ossUpload({
  targets: {
    src: '**',
    dest: 't/editor/__test__',
  },
  cwd: uploadDir,
  uploadParams: {
    Bucket: 'shoplines3',
    CacheControl: 'public, max-age=31556952, immutable',
  },
  origin: 'https://cdn.myshopline.com',
  existCheck: true,
  S3Options: {
    region: 'ap-southeast-1',
  },
})
  .then((res) => {
    console.log('finish');
  })
  .catch((err) => {
    console.log('err', err);
  });
