import { IEBuster } from 'ie-buster';
import { Nav } from './js/nav';
import { renderPortfolio } from './js/portfolio';
import { Lightbox } from './js/lightbox';
import { Slider } from './js/slider';

class Page {
  constructor() {
    this.nav = new Nav();
    this._createPortfolio();
  }

  _createPortfolio() {
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
    this._syncPortfolioSliders();
  }

  _syncPortfolioSliders() {
    this.portfolioLightbox.onOpen.push(() => {
      const activeSlideIndex = this.portfolioSlider.slides.indexOf(
        this.portfolioSlider.activeSlide
      );
      this.portfolioLightboxSlider.scrollTo(this.portfolioLightboxSlider.slides[activeSlideIndex], {
        duration: 1,
      });
    });
    this.portfolioLightbox.onClose.push(() => {
      const activeSlideIndex = this.portfolioLightboxSlider.slides.indexOf(
        this.portfolioLightboxSlider.activeSlide
      );
      this.portfolioSlider.scrollTo(this.portfolioSlider.slides[activeSlideIndex], { duration: 1 });
    });
  }
}

if (!IEBuster()) {
  window.page = new Page();
}
