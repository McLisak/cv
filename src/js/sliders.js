import scrollIntoView from 'smooth-scroll-into-view-if-needed';

export const SLIDER_CLASS = 'slider';
export const SLIDES_CONTAINER_CLASS = 'slides';
export const SLIDE_CLASS = 'slide';
export const CONTROL_CLASS = 'slider-control';
export const CONTROL_PREV_CLASS = 'prev';
export const CONTROL_NEXT_CLASS = 'next';
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
      slider.Slider = {
        slides: Array.from(slider.getElementsByClassName(SLIDE_CLASS)),
        slidesContainer: slider.getElementsByClassName(SLIDES_CONTAINER_CLASS)[0],
        activeSlide: null,
      };
      this._createControls(slider);
      this._observeSlides(slider);
    });
  }

  /**
   *
   * @param {HTMLElement} slider
   */
  _createControls(slider) {
    const prev = document.createElement('div');
    const next = document.createElement('div');

    slider.Slider.controls = { prev, next };
    this._addControlListeners(slider);

    slider.appendChild(prev);
    slider.appendChild(next);
    prev.classList.add(CONTROL_CLASS, CONTROL_PREV_CLASS);
    next.classList.add(CONTROL_CLASS, CONTROL_NEXT_CLASS);
  }

  _addControlListeners(slider) {
    const scrollOptions = {
      behavior: 'smooth',
      boundary: slider.Slider.slidesContainer,
      scrollMode: 'always',
      inline: 'center',
      block: 'nearest',
    };
    const prevClick = () => {
      let prevIndex = slider.Slider.slides.indexOf(slider.Slider.activeSlide) - 1;
      if (prevIndex < 0) {
        prevIndex = 0;
      }
      slider.Slider.slidesContainer.style.scrollSnapType = 'none';
      scrollIntoView(slider.Slider.slides[prevIndex], scrollOptions).then(() => {
        slider.Slider.slidesContainer.style.scrollSnapType = '';
      });
    };
    const nextClick = () => {
      let nextIndex = slider.Slider.slides.indexOf(slider.Slider.activeSlide) + 1;
      if (nextIndex >= slider.Slider.slides.length - 1) {
        nextIndex = slider.Slider.slides.length - 1;
      }
      slider.Slider.slidesContainer.style.scrollSnapType = 'none';
      scrollIntoView(slider.Slider.slides[nextIndex], scrollOptions).then(() => {
        slider.Slider.slidesContainer.style.scrollSnapType = '';
      });
    };
    slider.Slider.controls.prev.addEventListener('click', prevClick);
    slider.Slider.controls.next.addEventListener('click', nextClick);
  }

  /**
   * @param {HTMLElement} slider
   */
  _observeSlides(slider) {
    slider.Slider.observer = new IntersectionObserver(
      (entries) => this._observerCallback(entries, slider),
      {
        root: slider,
        rootMargin: '-10px',
        threshold: 1,
      }
    );
    slider.Slider.slides.forEach((slide) => slider.Slider.observer.observe(slide));
  }

  _observerCallback(entries, slider) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        slider.Slider.activeSlide = entry.target;
      }
    });
  }
}

/**
 * @typedef {{
 *
 * }} SliderOptions
 */
