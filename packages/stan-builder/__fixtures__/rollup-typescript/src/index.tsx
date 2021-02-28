import './index.css';
import './sass.scss';
import './styles/index.scss';

interface Args {
  name?: boolean;
}

export default function (args: Args) {
  const { name, ...o } = args;
  console.log(o);
  return args?.name ?? 'stan';
}
