import './style.scss';

import { Toggle } from '~blocks/toggle';

export class ItemSubscribe {
  #active;
  #toggle;
  #status;

  constructor(node) {
    this.el = node;
    this.#status = this.el.querySelector('[data-rel="item.subscribe.status"]');
    this.#toggle = this.el.querySelector('[data-rel="item.subscribe.toggle"]');
    this.toggle = new Toggle(this.#toggle);
    this.el.addEventListener('click', () => {
      this.active = !this.active;
    });
    this.active = this.toggle.active;
  }
  set active(state) {
    this.#active = state;
    this.toggle.active = state;
    this.#status.innerHTML = state ? 'Subscribed' : 'Unsubscribed';
    this.el.classList.toggle('is-active', state);
  }
  get active() {
    return this.#active;
  }
  enable() {
    this.active = true;
  }
  disable() {
    this.active = false;
  }
}
