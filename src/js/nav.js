import scrollIntoView from 'smooth-scroll-into-view-if-needed';
import { debounce } from './utils';

const MAIN_ID = 'main-nav';
const ACTIVE_CLASS = 'active';
const HOVER_CLASS = 'hover';
export const PUBLIC_URL = '/cv';

export class Nav {
  constructor() {
    this.pathMap = {};
    this.basename = window.location.hostname;
    this.$sections = Array.from(
      document.body.querySelectorAll('section[name]')
    );
    this.$nav = document.getElementById(MAIN_ID);
    this.$list = this.$nav.getElementsByTagName('ul')[0];
    this.$items = this._createItems();
    this.activeItemIndex = 0;

    this.goToSection(
      this.$sections.find(
        ($section) =>
          window.location.pathname === PUBLIC_URL + $section.dataset.path
      ),
      { duration: 0 }
    ).then(() => {
      this._setupInteractivity();
    });
  }

  /**
   *
   * @param {HTMLElement} $section
   * @param {import('smooth-scroll-into-view-if-needed').SmoothBehaviorOptions} options
   */
  goToSection($section, options) {
    const defaultOptions = {
      scrollMode: 'always',
      behavior: 'smooth',
      block: 'start',
    };
    if (!$section) return Promise.resolve();
    return scrollIntoView($section, {
      ...defaultOptions,
      ...options,
    });
  }

  /**
   * @private
   */
  _setupInteractivity() {
    this._debouncedNavScroll = debounce(($item) => {
      scrollIntoView($item, {
        scrollMode: 'always',
        behavior: 'smooth',
        inline: 'center',
        boundary: this.$list,
        duration: 200,
      });
    }, 300);

    this.sectionObserver = new IntersectionObserver(
      this._observeSections.bind(this),
      {
        root: null,
        rootMargin: '-40% 0px -60% 0px',
        threshold: 0,
      }
    );
    this.$items.forEach(($item) => {
      this.sectionObserver.observe($item.$correspondingSection);
    });

    this.$list.addEventListener('click', ({ target }) => {
      const clickedItemIndex =
        this.$items.findIndex((item) => item === target) || 0;
      const indexDifference = Math.abs(this.activeItemIndex - clickedItemIndex);
      const duration = 450 * indexDifference * 0.8;
      this.goToSection(target.$correspondingSection, { duration });
    });
  }

  /**
   * @private
   * @param {HTMLElement} $section
   */
  _createItem($section) {
    const $item = document.createElement('li');
    $item.$correspondingSection = $section;
    $section.$correspondingNavItem = $item;
    $item.setAttribute(
      'name',
      ($item.innerText = $section.getAttribute('name'))
    );
    this._addHoverEffect($item);
    this.$list.appendChild($item);
    return $item;
  }

  /**
   * @private
   */
  _createItems() {
    return this.$sections.map(($section) => this._createItem($section));
  }

  /**
   * @private
   * @param {IntersectionObserverEntry[]} entries
   */
  _observeSections(entries) {
    entries.forEach((entry) => {
      const {
        $correspondingNavItem: $navItem,
        dataset: { path },
      } = entry.target;
      if (entry.isIntersecting) {
        this._activateItem($navItem);
        const newPath = PUBLIC_URL + path;
        window.history.replaceState(newPath, '', newPath);
      } else {
        this._deactivateItem($navItem);
      }
    });
  }

  /**
   * @private
   * @param {HTMLElement} $item
   */
  _activateItem($item) {
    if (!$item) return;
    $item.classList.add(ACTIVE_CLASS);
    $item.classList.remove(HOVER_CLASS);
    this.activeItemIndex = this.$items.findIndex((item) => item === $item);
    this._debouncedNavScroll($item);
  }

  /**
   * @private
   * @param {HTMLElement} $item
   */
  _deactivateItem($item) {
    if (!$item) return;
    $item.classList.remove(ACTIVE_CLASS);
  }

  /**
   * @private
   * @param {HTMLElement} $item
   */
  _addHoverEffect($item) {
    $item.addEventListener('mouseenter', ({ target }) => {
      target.classList.add(HOVER_CLASS);
    });
    $item.addEventListener('mouseleave', ({ target }) => {
      target.classList.remove(HOVER_CLASS);
    });
  }
}
