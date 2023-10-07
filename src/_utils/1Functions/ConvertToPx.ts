export function convertRemToPixels(rem: number) {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

export function convertVhToPixels(vh: number) {
  return (vh * window.innerHeight) / 100;
}
