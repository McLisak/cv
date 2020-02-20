import anime from 'animejs';
import ScrollMagic from 'scrollmagic';
import { IEBuster } from 'ie-buster';

class Page {
  constructor() {
    this.scrollMagic = new ScrollMagic.Controller();
  }
}

if (IEBuster()) {
  return;
}
window.page = new Page();
