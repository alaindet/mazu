export const millisecondsToCss = (ms: number): string => {
  let seconds = (ms / 1000).toFixed(2);
  seconds = seconds.replace(/\.([\d]*?)(0*)$/, '.$1').replace(/\.$/, '');
  return seconds === '0' ? '0' : `${seconds}s`;
};
