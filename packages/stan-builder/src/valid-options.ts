import { joi } from 'stan-utils';

const schema = joi.object({
  file: joi.string().required(),
  esm: [joi.bool(), joi.string()],
  cjs: [joi.bool(), joi.string()],
  umd: [joi.bool(), joi.string()],
});

export default schema;
