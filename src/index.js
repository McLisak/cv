import { IEBuster } from 'ie-buster';
import { Nav } from './js/nav';
import { renderPortfolio } from './js/portfolio';
import { Lightbox } from './js/lightbox';
import { Slider } from './js/slider';
import { StickyObserver } from './js/sticky-observer';
import { renderHobbies } from './js/hobbies';
import { skills } from './js/skills';

class Page {
  constructor() {
    this._createPortfolio();
    this._spySectionTitles();
    this._renderSkills();
    this._renderHobbies();
    this._scrollReminder();
    this.nav = new Nav();
  }

  _createPortfolio() {
    const portfolio = document.getElementById('portfolio-slider');
    const portfolioLightbox = document.getElementById('portfolio-lightbox-slider');
    renderPortfolio({ container: portfolio });
    renderPortfolio({ container: portfolioLightbox, fullDescription: true });
    this.portfolioSlider = new Slider(portfolio);
    this.portfolioLightboxSlider = new Slider(portfolioLightbox);
    this.portfolioLightbox = new Lightbox({
      container: document.getElementById('portfolio-lightbox'),
      openButtons: document.querySelectorAll('[data-lightbox="portfolio-lightbox"]'),
    });
    this._handlePortfolioLinks();
    this._syncPortfolioSliders();
  }

  _handlePortfolioLinks() {
    const $links = Array.from(document.getElementsByClassName('portfolio-link'));
    if (!$links.length) return;
    $links.forEach(($link) => {
      $link.addEventListener('click', () => {
        const slideName = $link.dataset.portfolioSlide;
        const { $slides } = this.portfolioLightboxSlider;
        const $newActiveSlide = $slides.find(($slide) => $slide.dataset.name === slideName);
        if (!$newActiveSlide) {
          return console.error(
            'Portfolio Link: Whoops! Did not find a matching slide :(',
            slideName
          );
        }
        this.portfolioLightboxSlider.scrollTo($newActiveSlide, { duration: 1 });
      });
    });
  }

  _syncPortfolioSliders() {
    this.portfolioLightbox.onOpen.push(() => {
      const activeSlideIndex = this.portfolioSlider.$slides.indexOf(
        this.portfolioSlider.$activeSlide
      );
      this.portfolioLightboxSlider.scrollTo(
        this.portfolioLightboxSlider.$slides[activeSlideIndex],
        {
          duration: 1,
        }
      );
    });
    this.portfolioLightbox.onClose.push(() => {
      const activeSlideIndex = this.portfolioLightboxSlider.$slides.indexOf(
        this.portfolioLightboxSlider.$activeSlide
      );
      this.portfolioSlider.scrollTo(this.portfolioSlider.$slides[activeSlideIndex], {
        duration: 1,
      });
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

  _renderSkills() {
    const $skillsContainer = document.getElementById('skills-container');
    skills.forEach((skillName) => {
      const $skill = document.createElement('div');
      $skill.classList.add('skill');
      $skill.classList.add(`skill-${skillName}`);
      $skillsContainer.appendChild($skill);
    });
  }

  _renderHobbies() {
    renderHobbies(document.getElementById('hobbies-container'));
  }

  _scrollReminder() {
    const $scrollReminder = document.getElementById('scroll-reminder');
    if (!$scrollReminder) return;
    const timeout = window.setTimeout(() => {
      $scrollReminder.classList.add('visible');
    }, 2500);
    const onScroll = () => {
      window.clearTimeout(timeout);
      $scrollReminder.classList.remove('visible');
      window.removeEventListener('scroll', onScroll);
    };
    window.addEventListener('scroll', onScroll);
  }
}

if (!IEBuster()) {
  window.page = new Page();
}
