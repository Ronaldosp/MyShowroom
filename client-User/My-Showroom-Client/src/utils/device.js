export const isIOS = () =>
  /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

export const isAndroid = () =>
  /Android/.test(navigator.userAgent);