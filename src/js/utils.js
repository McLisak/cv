/**
 * @typedef {number|string|boolean|null|undefined|} Primitive
 */

export function debounce(fn, time) {
  let timeout = null;
  return (...args) => {
    const call = () => fn(...args);
    clearTimeout(timeout);
    timeout = setTimeout(call, time);
  };
}
/**
 * TODO: How to inherit the items type from param to get intellisense?!
 * @param {ArrayLike<any>} arr
 * @returns {Array<any>}
 */
export const forceArray = (arr) => {
  return Array.isArray(arr) ? arr : Array.from(arr);
};

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
