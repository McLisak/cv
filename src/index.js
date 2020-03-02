import { IEBuster } from 'ie-buster';
import { Nav } from './js/nav';
import { renderPortfolio } from './js/portfolio';
import { Sliders } from './js/slider/sliders';
import { Lightbox } from './js/lightbox/lightbox';

class Page {
  constructor() {
    this.nav = new Nav();
    this.portfolioSlider = document.getElementById('portfolio-slider');
    this.portfolioLightboxSlider = document.getElementById('portfolio-lightbox-slider');
    renderPortfolio(this.portfolioSlider);
    renderPortfolio(this.portfolioLightboxSlider);

    this.sliders = new Sliders();
    this.portfolioLightbox = new Lightbox({
      container: document.getElementById('portfolio-lightbox'),
      openButtons: document.querySelectorAll('button[data-lightbox="portfolio-lightbox"]'),
    });
  }
}

if (!IEBuster()) {
  window.page = new Page();
}
