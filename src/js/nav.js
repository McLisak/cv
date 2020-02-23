let scrollIntoView;
const MAIN_ID = 'main-nav';
const ACTIVE_CLASS = 'active';
export class Nav {
  constructor() {
    if (!('scrollBehavior' in document.documentElement.style)) {
      import('smooth-scroll-into-view-if-needed')
        .then((module) => {
          scrollIntoView = module.default;
        })
        .catch((error) => console.error('Could not load module', error));
    } else {
      import('scroll-into-view-if-needed').then((module) => {
        scrollIntoView = module.default;
      });
    }
    this.sectionObserver = new IntersectionObserver(this._observeSections.bind(this), {
      root: null,
      rootMargin: '-200px 0px -100px 0px',
      threshold: 0
    });
    this.$sections = Array.from(document.body.querySelectorAll('section[name]'));
    this.$nav = document.getElementById(MAIN_ID);
    this.$nav.addEventListener('click', ({ target }) => {
      if (!target.tagName === 'LI') return;
      scrollIntoView(target.correspondingSection, { scrollMode: 'always', behavior: 'smooth' });
    });
    this.$list = this.$nav.getElementsByTagName('ul')[0];

    this.$items = this._createItems();
  }

  _createItems() {
    return this.$sections.map(($section) => {
      const $item = document.createElement('li');
      $item.correspondingSection = $section;
      $section.correspondingNavItem = $item;
      $item.setAttribute('name', ($item.innerText = $section.getAttribute('name')));
      this.sectionObserver.observe($section);
      this.$list.appendChild($item);
      return $item;
    });
  }

  _observeSections(entries) {
    entries.forEach((entry) => {
      entry.target.correspondingNavItem.classList[entry.isIntersecting ? 'add' : 'remove'](
        ACTIVE_CLASS
      );
      entry.isIntersecting &&
        scrollIntoView(entry.target.correspondingNavItem, {
          scrollMode: 'if-needed',
          behavior: 'smooth',
          inline: 'center',
          boundary: this.$list
        });
    });
  }
}
