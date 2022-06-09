import { forceArray } from './utils';

export class StickyObserver {
  /**
   * @param {NodeList | HTMLElement[]} $elements
   */
  constructor($elements) {
    this.callbacks = [];
    this.$elements = forceArray($elements);
    this.observer = new IntersectionObserver((entries) => this._observerCallback(entries), {
      threshold: 1,
    });
    this._createSpyElements();
  }
  /**
   * @private
   * @param {boolean} sticks
   * @param {HTMLElement} $element
   */
  _runCallbacks(sticks, $element) {
    this.callbacks.forEach((cb) => cb(sticks, $element));
  }

  /**
   * @private
   */
  _createSpyElements() {
    this.$elements.forEach(($element) => {
      const $spyElement = document.createElement('div');
      $spyElement.classList.add('sticky-spy');
      $element.prepend($spyElement);
      this.observer.observe($spyElement);
    });
  }

  /**
   * @private
   * @param {IntersectionObserverEntry[]} entries
   */
  _observerCallback(entries) {
    entries.forEach((entry) => {
      const { boundingClientRect, isIntersecting, target } = entry;
      if (!isIntersecting && boundingClientRect.top < 1) {
        this._runCallbacks(true, target.parentNode);
      } else {
        this._runCallbacks(false, target.parentNode);
      }
    });
  }
}
