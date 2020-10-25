import './style.scss';
import { Progress } from '~blocks/progress';

class Instance {
  #progress;

  constructor(node) {
    this.el = node;
    this.#progress = this.el.querySelector('[data-rel="user.info.progress"]');
    this.progress = new Progress(this.#progress);
  }
}

export const UserInfo = (() => {
  const node = document.querySelector('.js-user-info');
  return new Instance(node);
})();
