export function classNames(...args: Array<string | undefined>) {
  return args.filter(Boolean).join(' ');
}
