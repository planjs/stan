const path = require('path');
const { ossUpload } = require('../../');

const uploadDir = path.join(__dirname, '../../', 'lib');

ossUpload({
  targets: {
    src: '**',
    dest: '__test__',
  },
  cwd: uploadDir,
  uploadParams: {
    Bucket: 'quan-admin-web-1259287960',
    Region: 'ap-guangzhou',
  },
  existCheck: true,
})
  .then((res) => {
    console.log('finish');
  })
  .catch((err) => {
    console.log('err', err);
  });
