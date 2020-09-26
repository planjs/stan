interface Args {
  watch?: boolean;
}

export default function (args: Args) {
  if (args?.watch) {
    console.log('watch: ', args.watch);
  }
}
