import { IEBuster } from 'ie-buster';
import anime from 'animejs';
import 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators';
import { Nav } from './js/nav';

class Page {
  constructor() {
    /* this.scrollController = new ScrollMagic.Controller({
      globalSceneOptions: {
        duration: 500
      }
    });
    this.scrollScene = new ScrollMagic.Scene().addTo(this.scrollController).addIndicators(); */
    this.nav = new Nav();
  }
}

if (!IEBuster()) {
  window.page = new Page();
}
