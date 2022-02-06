export const isElementVisible = (element: HTMLElement): boolean => {
  const rect: DOMRect = element.getBoundingClientRect();

  if (
    rect.y > window.innerHeight || // Bottom of viewport
    rect.bottom < 0 || // Top of viewport
    rect.left > window.innerWidth || // Right of viewport
    rect.right < 0 // Left of viewport
  ) {
    return false;
  }

  return true;
};
