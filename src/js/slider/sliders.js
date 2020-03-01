import { Slider } from './slider';

export const SLIDER_CLASS = 'slider';
export class Sliders {
  constructor() {
    this.sliders = this._getSliderElements();
    if (!this.sliders) {
      throw new Error(`Did not find any ${SLIDER_CLASS} elements on the page`);
    }
    this._createSliders(this.sliders);
  }

  _getSliderElements() {
    return Array.from(document.getElementsByClassName(SLIDER_CLASS));
  }

  _createSliders(sliders) {
    sliders.forEach((slider) => {
      slider.slider = new Slider(slider);
    });
  }
}
