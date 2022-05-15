const path = require('path');
const { ossUpload } = require('../../');

const uploadDir = path.join(__dirname, '../../', 'lib');

ossUpload({
  targets: {
    src: '**',
    dest: '__test__',
  },
  cwd: uploadDir,
  AOSSOptions: {
    bucket: 'sscan',
    region: 'oss-cn-shanghai',
  },
  existCheck: true,
})
  .then((res) => {
    console.log('finish');
  })
  .catch((err) => {
    console.log('err', err);
  });
