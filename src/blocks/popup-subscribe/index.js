import './style.scss';

import { Popup } from '~blocks/popup';

class Instance {
  #value;
  #result;

  constructor(node) {
    this.el = node;
    this.popup = new Popup(this.el);
    this.#result = this.el.querySelector('[data-rel="popup.subscribe.result"]');
  }
  set value(value) {
    this.#value = value;
    if (value !== 0) {
      this.#result.innerHTML = value > 0 ? `+${value}%` : `${value}%`;
    } else {
      this.#result.innerHTML = '';
    }
    this.el.classList.toggle('popup-subscribe--plus', value > 0);
    this.el.classList.toggle('popup-subscribe--minus', value < 0);
  }
  show() {
    return this.popup.open();
  }
  hide() {
    return this.popup.close();
  }
}

export const PopupSubscribe = (() => {
  const node = document.querySelector('#js-popup-subscribe');
  return new Instance(node);
})();
