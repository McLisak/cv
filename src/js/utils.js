export function debounce(fn, time) {
  let timeout = null;
  return (...args) => {
    const call = () => fn(...args);
    clearTimeout(timeout);
    timeout = setTimeout(call, time);
  };
}

export const addOrRemoveClass = (element, className, add) => {
  element.classList[add ? 'add' : 'remove'](className);
};
