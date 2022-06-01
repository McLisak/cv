export function debounce(fn, time) {
  let timeout = null;
  return (...args) => {
    const call = () => fn(...args);
    clearTimeout(timeout);
    timeout = setTimeout(call, time);
  };
}

export const css = {
  /**
   *
   * @param {HTMLElement} $el
   * @param {string} classes
   */
  addClasses: ($el, classes) => {
    classes.split(' ').forEach((className) => {
      $el.classList.add(className);
    });
  },

  /**
   *
   * @param {HTMLElement} $el
   * @param {string} classes
   */
  removeClasses: ($el, classes) => {
    classes.split(' ').forEach((className) => {
      $el.classList.remove(className);
    });
  },

  /**
   *
   * @param {HTMLElement} $el
   * @param {string} className
   * @param {boolean} add
   */
  addOrRemoveClass: ($el, className, add) => {
    $el.classList[add ? 'add' : 'remove'](className);
  },
};
