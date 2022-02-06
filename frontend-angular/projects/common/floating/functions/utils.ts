export const waitFor = async <T = any>(callback: Function, delay = 0) => {
  return new Promise<T>(resolve => setTimeout(() => resolve(callback()), delay));
};

// Thanks to https://stackoverflow.com/a/42543908/5653974
export const getScrollParent = (
  target: HTMLElement,
  includeHidden = false,
): HTMLElement => {

  let style = getComputedStyle(target);
  const excludeStaticParent = style.position === 'absolute';
  const overflowRegex = includeHidden ? /(auto|scroll|hidden)/ : /(auto|scroll)/;

  if (style.position === 'fixed') {
    return document.body;
  }

  for (let parent = target; (parent = parent.parentElement as HTMLElement);) {
    style = getComputedStyle(parent);
    if (excludeStaticParent && style.position === 'static') {
      continue;
    }
    if (overflowRegex.test(style.overflow + style.overflowY + style.overflowX)) {
      return parent;
    }
  }

  return document.body;
}
