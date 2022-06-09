import { forceArray } from './utils';

/**
 * @typedef {Object} LightboxOptions
 * @property {HTMLElement} container
 * @property {NodeList | HTMLElement[]} openButtons A list of buttons that can open the lightbox.
 */
export class Lightbox {
  /**
   *
   * @param {LightboxOptions} options
   */
  constructor({ container: $container, openButtons: $openButtons }) {
    this.options = { $container, $openButtons };
    this.onOpen = [];
    this.onClose = [];

    this._keyClose = this._keyClose.bind(this);

    this._addOpenListeners(forceArray($openButtons));
    this._createCloseButton($container);
  }

  close() {
    this.options.$container.classList.remove('active');
    document.body.classList.remove('lightbox-open');
    this._removeKeyboardClose();
    this.onClose.forEach((fn) => fn());
  }

  open() {
    this.options.$container.classList.add('active');
    document.body.classList.add('lightbox-open');
    this._addKeyboardClose();
    this.onOpen.forEach((fn) => fn());
  }

  /**
   * @private
   * @param {HTMLElement[]} $buttons
   */
  _addOpenListeners($buttons) {
    $buttons.forEach(($button) => $button.addEventListener('click', this.open.bind(this)));
  }

  /**
   * @private
   * @param {HTMLElement} $container
   */
  _createCloseButton($container) {
    const $button = document.createElement('button');
    $button.classList.add('lightbox-close');
    $button.addEventListener('click', this.close.bind(this));
    $container.append($button);
  }

  /**
   * @private
   */
  _addKeyboardClose() {
    document.addEventListener('keydown', this._keyClose);
  }

  /**
   * @private
   */
  _removeKeyboardClose() {
    document.removeEventListener('keydown', this._keyClose);
  }

  /**
   * @private
   * @param {KeyboardEvent} ev
   */
  _keyClose(ev) {
    if (ev.key === 'Escape') {
      this.close();
    }
  }
}
