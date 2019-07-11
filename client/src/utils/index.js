export const debounce = (fn, wait) => {
  let inDebounce;
  return (...args) => {
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => fn.apply(this, args), wait);
  };
};

export const throttle = (fn, wait) => {
	let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, wait);
    }
  };
};
