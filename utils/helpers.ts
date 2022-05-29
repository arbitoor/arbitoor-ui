export function debounce(cb: any, delay: any) {
  let timer: any;
  return function (...args: any) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      cb(...args);
    }, delay);
  };
}