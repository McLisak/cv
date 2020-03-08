import { IEBuster } from 'ie-buster';
import { Nav } from './js/nav';
import { renderPortfolio } from './js/portfolio';
import { Lightbox } from './js/lightbox';
import { Slider } from './js/slider';

class Page {
  constructor() {
    this.nav = new Nav();
    const portfolio = document.getElementById('portfolio-slider');
    const portfolioLightbox = document.getElementById('portfolio-lightbox-slider');
    renderPortfolio(portfolio);
    renderPortfolio(portfolioLightbox);
    this.portfolioSlider = new Slider(portfolio);
    this.portfolioLightboxSlider = new Slider(portfolioLightbox);
    this.portfolioLightbox = new Lightbox({
      container: document.getElementById('portfolio-lightbox'),
      openButtons: document.querySelectorAll('button[data-lightbox="portfolio-lightbox"]'),
    });
  }
}

if (!IEBuster()) {
  window.page = new Page();
}
