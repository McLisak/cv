import scrollIntoView from 'smooth-scroll-into-view-if-needed';
import { debounce } from './utils';

const MAIN_ID = 'main-nav';
const ACTIVE_CLASS = 'active';
const HOVER_CLASS = 'hover';
export class Nav {
  constructor() {
    this.$sections = Array.from(document.body.querySelectorAll('section[name]'));

    this.sectionObserver = new IntersectionObserver(this._observeSections.bind(this), {
      root: null,
      rootMargin: '-200px 0px -150px 0px',
      threshold: 0,
    });

    this._debouncedNavScroll = debounce(($item) => {
      scrollIntoView($item, {
        scrollMode: 'always',
        behavior: 'smooth',
        inline: 'center',
        boundary: this.$list,
        duration: 200,
      });
    }, 300);

    this.$nav = document.getElementById(MAIN_ID);
    this.$list = this.$nav.getElementsByTagName('ul')[0];
    this._addNavEventListeners();

    this.$items = this._createItems();
  }

  _addNavEventListeners() {
    this.$nav.addEventListener('click', ({ target }) => {
      if (!target.tagName === 'LI') return;
      scrollIntoView(target.correspondingSection, {
        scrollMode: 'always',
        behavior: 'smooth',
        block: 'start',
      });
    });
  }

  _createItem($section) {
    const $item = document.createElement('li');
    $item.correspondingSection = $section;
    $section.correspondingNavItem = $item;
    $item.setAttribute('name', ($item.innerText = $section.getAttribute('name')));
    this.sectionObserver.observe($section);
    this._addHoverEffect($item);
    this.$list.appendChild($item);
    return $item;
  }

  _createItems() {
    return this.$sections.map(($section) => this._createItem($section));
  }

  _observeSections(entries) {
    entries.forEach((entry) => {
      const $navItem = entry.target.correspondingNavItem;
      if (entry.isIntersecting) {
        this._activateItem($navItem);
      } else {
        this._deactivateItem($navItem);
      }
    });
  }

  _activateItem($item) {
    $item.classList.add(ACTIVE_CLASS);
    $item.classList.remove(HOVER_CLASS);
    this._debouncedNavScroll($item);
  }

  _deactivateItem($item) {
    $item.classList.remove(ACTIVE_CLASS);
  }

  _addHoverEffect($item) {
    $item.addEventListener('mouseenter', ({ target }) => {
      target.classList.add(HOVER_CLASS);
    });
    $item.addEventListener('mouseleave', ({ target }) => {
      target.classList.remove(HOVER_CLASS);
    });
  }
}
