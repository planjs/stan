interface Args {
  name?: boolean;
}

export default function (args: Args) {
  return args?.name ?? 'stan';
}
