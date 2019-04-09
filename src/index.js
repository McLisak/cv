import ScrollMagic from 'scrollmagic';
import 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators';
import 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap';

class Page {
  constructor() {
    this.scrollMagic = new ScrollMagic.Controller();
  }
}

window.page = new Page();
