export const debounce = (func, delay = 300) => {
  let timer = null;

  return function (...args) {
    timer = setTimeout(() => {
      timer && clearTimeout(timer);
      func.call(this, args);
    }, delay);
  };
};
