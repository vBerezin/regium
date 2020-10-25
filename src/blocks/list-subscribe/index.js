import './style.scss';

import { ItemSubscribe } from '~blocks/item-subscribe';
import { UserInfo } from '~blocks/user-info';
import { Handlers } from '~common/scripts/utils/handlers';

class Instance {
  #items;
  #state;

  constructor(node) {
    this.el = node;
    this.#items = this.el.querySelectorAll('[data-rel="list.subscribe.item"]');
    this.#state = {};
    this.items = {};
    Array.from(this.#items).forEach((item) => {
      const { name } = item.dataset;
      this.items[name] = new ItemSubscribe(item);
    });
    this.update();
    this.el.addEventListener('change', () => this.update());
  }
  set state(state) {
    this.#state = state;
    state.forEach(({ site, subscribed }) => {
      const item = this.items[site];
      if (item) {
        item.active = subscribed;
      }
    });
    this.update();
  }
  get state() {
    return Object.entries(this.items).map(([name, item]) => {
      return {
        site: name,
        subscribed: item.active,
      };
    });
  }
  getFun() {
    const items = Object.values(this.items);
    const activated = items.filter(item => item.active);
    return (activated.length / items.length) * 100;
  }
  reset() {
    Object.values(this.items).forEach(item => item.disable());
  }
  subscribe() {
    Object.values(this.items).forEach(item => item.enable());
  }
  update() {
    UserInfo.progress.value = this.getFun();
  }
}

export const ListSubscribe = (() => {
  const node = document.querySelector('.js-list-subscribe');
  const instance = new Instance(node);
  document.addEventListener('click', new Handlers.Click({
    'list.subscribe.all': ({ event }) => {
      event.preventDefault();
      instance.subscribe();
    },
  }));
  return instance;
})();
