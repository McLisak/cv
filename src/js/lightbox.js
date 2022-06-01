export class Lightbox {
  constructor(options = {}) {
    this.options = options;
    this._addOpenListeners(Array.from(options.openButtons));
    this._createCloseButton(options.container);
    this._keyClose = this._keyClose.bind(this);
    this.onOpen = [];
    this.onClose = [];
  }

  close() {
    this.options.container.classList.remove('active');
    document.body.classList.remove('lightbox-open');
    this._removeKeyboardClose();
    this.onClose.forEach((fn) => fn());
  }

  open() {
    this.options.container.classList.add('active');
    document.body.classList.add('lightbox-open');
    this._addKeyboardClose();
    this.onOpen.forEach((fn) => fn());
  }

  /**
   *
   * @param {HTMLElement[]} $buttons
   */
  _addOpenListeners($buttons) {
    $buttons.forEach(($button) => $button.addEventListener('click', this.open.bind(this)));
  }
  /**
   *
   * @param {HTMLElement} $container
   */
  _createCloseButton($container) {
    const $button = document.createElement('button');
    $button.classList.add('lightbox-close');
    $button.addEventListener('click', this.close.bind(this));
    $container.append($button);
  }

  _addKeyboardClose() {
    document.addEventListener('keydown', this._keyClose);
  }
  _removeKeyboardClose() {
    document.removeEventListener('keydown', this._keyClose);
  }
  /**
   *
   * @param {KeyboardEvent} ev
   */
  _keyClose(ev) {
    if (ev.key === 'Escape') {
      this.close();
    }
  }
}
