import './style.scss';

import { Handlers } from '~common/scripts/utils/handlers';

export class Popup {
  #active;
  constructor(node) {
    this.el = node;
    this.active = false;
    this.el.addEventListener('click', new Handlers.Click({
      'popup.close': () => this.close()
    }));
  }

  set active(state) {
    this.#active = state;
    this.el.classList.toggle('is-active', state);
    document.body.style.overflow = state ? 'hidden' : '';
  }
  get active() {
    return this.#active;
  }

  open() {
    this.active = true;
    return this;
  }

  close() {
    this.active = false;
    return this;
  }
}
