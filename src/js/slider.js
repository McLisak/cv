import scrollIntoView from 'smooth-scroll-into-view-if-needed';

export const SLIDES_CONTAINER_CLASS = 'slides';
export const SLIDE_CLASS = 'slide';
export const CONTROL_CLASS = 'slider-control';
export const CONTROL_PREV_CLASS = 'prev';
export const CONTROL_NEXT_CLASS = 'next';

export class Slider {
  /**
   *
   * @param {HTMLElement} $container
   * @param {Object} options
   * @param {string} options.lsSyncKey
   */
  constructor($container, options = {}) {
    this.id = $container.id;
    this.$container = $container;
    this.$slidesContainer = $container.getElementsByClassName(SLIDES_CONTAINER_CLASS)[0];
    this.$slides = Array.from($container.getElementsByClassName(SLIDE_CLASS));
    this.$activeSlide = null;
    this._autoScrolling = false;
    this.options = options;
    this._createShadows($container);
    this._createControls($container);
    this._observeSlides($container);
    this._localStorageSync(options.lsSyncKey);
  }

  /**
   *
   * @param {HTMLElement} $slide
   * @param {import('smooth-scroll-into-view-if-needed').SmoothBehaviorOptions} options
   * @returns
   */
  scrollTo($slide, options = {}) {
    if (this._autoScrolling || $slide === this.$activeSlide) return;
    const scrollOptions = {
      behavior: 'smooth',
      boundary: this.$slidesContainer,
      scrollMode: 'always',
      inline: 'center',
      block: 'nearest',
      duration: options.duration || 300,
    };
    // scroll-snap breaks polyfilled smooth scroll :/
    this.$slidesContainer.style.scrollSnapType = 'none';
    this._autoScrolling = true;

    return scrollIntoView($slide, scrollOptions).then(() => {
      this.$slidesContainer.style.scrollSnapType = '';
      this._autoScrolling = false;
    });
  }

  /**
   * @private
   * @param {HTMLElement} $container
   */
  _createControls($container) {
    const $prev = document.createElement('div');
    const $next = document.createElement('div');

    this.controls = { $prev, $next };
    this._addControlListeners($container);

    $container.appendChild($prev);
    $container.appendChild($next);
    $prev.classList.add(CONTROL_CLASS, CONTROL_PREV_CLASS);
    $next.classList.add(CONTROL_CLASS, CONTROL_NEXT_CLASS);
  }

  /**
   * @private
   */
  _addControlListeners() {
    const prevClick = () => {
      let prevIndex = this.$slides.indexOf(this.$activeSlide) - 1;
      if (prevIndex < 0) {
        prevIndex = 0;
      }
      this.scrollTo(this.$slides[prevIndex]);
    };
    const nextClick = () => {
      let nextIndex = this.$slides.indexOf(this.$activeSlide) + 1;
      if (nextIndex >= this.$slides.length - 1) {
        nextIndex = this.$slides.length - 1;
      }
      this.scrollTo(this.$slides[nextIndex]);
    };
    this.controls.$prev.addEventListener('click', prevClick);
    this.controls.$next.addEventListener('click', nextClick);
  }

  /**
   * @private
   * @param {HTMLElement} slider
   */
  _observeSlides(slider) {
    this.observer = new IntersectionObserver((entries) => this._observerCallback(entries, slider), {
      root: slider,
      rootMargin: '-10px',
      threshold: 0.8,
    });
    this.$slides.forEach((slide) => this.observer.observe(slide));
  }

  /**
   * @private
   * @param {IntersectionObserverEntry[]} entries
   */
  _observerCallback(entries) {
    const activeSlide = entries.find(({ isIntersecting }) => isIntersecting);
    if (activeSlide) {
      this.$activeSlide = activeSlide.target;
      if (!this.options.lsSyncKey) return;
      localStorage.setItem(this.options.lsSyncKey, this.$slides.indexOf(this.$activeSlide));
    }
  }

  /**
   * @private
   * @param {HTMLElement} $container
   */
  _createShadows($container) {
    const $shadows = document.createElement('div');
    $shadows.classList.add('slider-shadows');
    $container.appendChild($shadows);
  }

  /**
   *
   * @param {string} key
   */
  _localStorageSync(key) {
    if (!key) return;
    const lsSyncSlideIndex = Number(localStorage.getItem(key));
    if (!Number.isInteger(lsSyncSlideIndex)) return;
    if (this.$slides[lsSyncSlideIndex]) {
      this.scrollTo(this.$slides[lsSyncSlideIndex], {
        duration: 30,
      });
    }
  }
}
