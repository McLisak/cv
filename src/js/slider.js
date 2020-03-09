import scrollIntoView from 'smooth-scroll-into-view-if-needed';

export const SLIDES_CONTAINER_CLASS = 'slides';
export const SLIDE_CLASS = 'slide';
export const CONTROL_CLASS = 'slider-control';
export const CONTROL_PREV_CLASS = 'prev';
export const CONTROL_NEXT_CLASS = 'next';

export class Slider {
  constructor(container) {
    this.id = container.id;
    this.container = container;
    this.slidesContainer = container.getElementsByClassName(SLIDES_CONTAINER_CLASS)[0];
    this.slides = Array.from(container.getElementsByClassName(SLIDE_CLASS));
    this.activeSlide = null;
    this._autoScrolling = false;
    this._createShadows(container);
    this._createControls(container);
    this._observeSlides(container);
  }

  scrollTo(slide, options = {}) {
    if (this._autoScrolling || slide === this.activeSlide) return;
    const scrollOptions = {
      behavior: 'smooth',
      boundary: this.slidesContainer,
      scrollMode: 'always',
      inline: 'center',
      block: 'nearest',
      duration: options.duration || 300,
    };
    // scroll-snap breaks polyfilled smooth scroll :/
    this.slidesContainer.style.scrollSnapType = 'none';
    this._autoScrolling = true;

    scrollIntoView(slide, scrollOptions).then(() => {
      this.slidesContainer.style.scrollSnapType = '';
      this._autoScrolling = false;
    });
  }

  /**
   *
   * @param {HTMLElement} container
   */
  _createControls(container) {
    const prev = document.createElement('div');
    const next = document.createElement('div');

    this.controls = { prev, next };
    this._addControlListeners(container);

    container.appendChild(prev);
    container.appendChild(next);
    prev.classList.add(CONTROL_CLASS, CONTROL_PREV_CLASS);
    next.classList.add(CONTROL_CLASS, CONTROL_NEXT_CLASS);
  }

  _addControlListeners() {
    const prevClick = () => {
      let prevIndex = this.slides.indexOf(this.activeSlide) - 1;
      if (prevIndex < 0) {
        prevIndex = 0;
      }
      this.scrollTo(this.slides[prevIndex]);
    };
    const nextClick = () => {
      let nextIndex = this.slides.indexOf(this.activeSlide) + 1;
      if (nextIndex >= this.slides.length - 1) {
        nextIndex = this.slides.length - 1;
      }
      this.scrollTo(this.slides[nextIndex]);
    };
    this.controls.prev.addEventListener('click', prevClick);
    this.controls.next.addEventListener('click', nextClick);
  }

  /**
   * @param {HTMLElement} slider
   */
  _observeSlides(slider) {
    this.observer = new IntersectionObserver((entries) => this._observerCallback(entries, slider), {
      root: slider,
      rootMargin: '-10px',
      threshold: 0.8,
    });
    this.slides.forEach((slide) => this.observer.observe(slide));
  }

  _observerCallback(entries) {
    const activeSlide = entries.find(({ isIntersecting }) => isIntersecting);
    if (activeSlide) {
      this.activeSlide = activeSlide.target;
    }
  }

  _createShadows(container) {
    const shadows = document.createElement('div');
    shadows.classList.add('slider-shadows');
    container.appendChild(shadows);
  }
}
