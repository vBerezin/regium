import './style.scss';

import { App } from '~common/scripts/app';
import { ListSubscribe } from '~blocks/list-subscribe';
import { AppPreloader } from '~blocks/app-preloader';
import { PopupSubscribe } from '~blocks/popup-subscribe';

class Instance {
  #store;
  constructor(node) {
    this.el = node;
    this.#store = [];
    this.el.addEventListener('submit', (event) => {
      this.onUpdate();
      event.preventDefault();
    });
    this.el.addEventListener('reset', (event) => {
      ListSubscribe.reset();
      this.onUpdate();
      event.preventDefault();
    });
    this.sync();
  }
  set store(state) {
    this.#store = state;
    App.stream.trigger('store.updated', state);
  }
  get store() {
    return this.#store;
  }
  async fetchStore() {
    const url = '/static/subscribe.json';
    const request = await fetch(url);
    const response = await request.json();
    return response;
  }
  sync() {
    const preloaderTimer = setTimeout(AppPreloader.show, 1000);
    // покажем прелоадер если запрос дольше 1сек
    this.fetchStore()
      .then((data) => {
        clearTimeout(preloaderTimer);
        this.store = data;
        ListSubscribe.state = data;
        AppPreloader.hide();
        return data;
      })
      .catch(App.debug);
  }
  onUpdate() {
    const { store } = this;
    const newStore = ListSubscribe.state;
    const oldFun = this.getStoreFun(store);
    const newFun = this.getStoreFun(newStore);
    const result = Math.ceil(newFun - oldFun);
    this.showPopup(result);
    this.store = ListSubscribe.state;
  }
  getStoreFun(store) {
    const subscribed = store.filter(item => item.subscribed);
    return (subscribed.length / store.length) * 100;
  }
  showPopup(result) {
    PopupSubscribe.value = result;
    PopupSubscribe.show();
  }
}

export const FormSubscribe = (() => {
  const node = document.querySelector('.js-form-subscribe');
  return new Instance(node);
})();
