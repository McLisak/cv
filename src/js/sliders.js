export const SLIDER_CLASS = '.slider';
export const SLIDE_CLASS = '.slide';
export class Sliders {
  /**
   *
   * @param {SliderOptions} options
   */
  constructor(options = {}) {
    this.sliders = this._getSliderElements();
    if (!this.sliders) {
      throw new Error(`Did not find any ${SLIDER_CLASS} elements on the page`);
    }
    this._parseSlides(this.sliders);
  }

  _getSliderElements() {
    return Array.from(document.getElementsByClassName(SLIDER_CLASS));
  }

  /**
   * @param {HTMLElement[]} sliders
   */
  _parseSlides(sliders) {
    sliders.forEach((slider) => {
      slider.slides = slider.getElementsByClassName(SLIDE_CLASS);
      this._createControls(slider);
    });
  }

  /**
   *
   * @param {HTMLElement} slider
   */
  _createControls(slider) {
    const prev = document.createElement('div');
    const next = document.createElement('div');

    slider.prevEl = prev;
    slider.nextEl = next;
    slider.appendChild(prev);
    slider.appendChild(next);
  }
  _addControlListeners() {}
}

/**
 * @typedef {{
 *
 * }} SliderOptions
 */
