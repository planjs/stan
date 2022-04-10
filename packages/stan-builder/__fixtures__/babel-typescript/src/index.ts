import { log } from './utils';

import './index.css';
import './sass.scss';

interface Args {
  name?: boolean;
}

export default function (args: Args) {
  const { name, ...o } = args;
  log(o);
  return args?.name ?? 'stan';
}
