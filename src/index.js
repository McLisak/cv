import { TweenMax } from 'gsap';
import ScrollMagic from 'scrollmagic';

class Page {
  constructor() {
    this.scrollMagic = new ScrollMagic.Controller();
  }
}

window.page = new Page();
