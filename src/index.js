import { IEBuster } from 'ie-buster';
import { Nav } from './js/nav';
import { Sliders } from './js/slider/sliders';
import { renderPortfolio } from './js/portfolio';
// import anime from 'animejs';
// import 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators';

class Page {
  constructor() {
    renderPortfolio(document.getElementById('portfolio'));
    this.nav = new Nav();

    this.sliders = new Sliders();
  }
}

if (!IEBuster()) {
  window.page = new Page();
}
