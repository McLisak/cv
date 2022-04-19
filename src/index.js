import { IEBuster } from 'ie-buster';
import { Nav } from './js/nav';
import { renderPortfolio } from './js/portfolio';
import { Lightbox } from './js/lightbox';
import { Slider } from './js/slider';
import { StickyObserver } from './js/sticky-observer';
import { renderHobbies } from './js/hobbies';

class Page {
  constructor() {
    this._createPortfolio();
    this._spySectionTitles();
    this._renderHobbies();
    this.nav = new Nav();
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

  _spySectionTitles() {
    this.stickyObserver = new StickyObserver(document.getElementsByClassName('section-title'));
    this.stickyObserver.callbacks.push((sticks, element) => {
      window.requestAnimationFrame(() => {
        element.classList[sticks ? 'add' : 'remove']('sticks');
      });
    });
  }

  _renderHobbies() {
    renderHobbies(document.getElementById('hobbies-container'));
  }
}

if (!IEBuster()) {
  window.page = new Page();
}
