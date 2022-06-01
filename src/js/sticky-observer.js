export class StickyObserver {
  /**
   * @param {HTMLElement} element
   */
  constructor(elements) {
    this.callbacks = [];
    this.$elements = Array.from(elements);
    this.observer = new IntersectionObserver((entries) => this._observerCallback(entries), {
      threshold: 1,
    });
    this._createSpyElements();
  }

  runCallbacks(sticks, element) {
    this.callbacks.forEach((cb) => cb(sticks, element));
  }

  _createSpyElements() {
    this.$elements.forEach(($element) => {
      const $spyElement = document.createElement('div');
      $spyElement.classList.add('sticky-spy');
      $element.prepend($spyElement);
      this.observer.observe($spyElement);
    });
  }

  /**
   * @param {IntersectionObserverEntry[]} entries
   */
  _observerCallback(entries) {
    entries.forEach((entry) => {
      const { boundingClientRect, isIntersecting, target } = entry;
      if (!isIntersecting && boundingClientRect.top < 1) {
        this.runCallbacks(true, target.parentNode);
      } else {
        this.runCallbacks(false, target.parentNode);
      }
    });
  }
}
