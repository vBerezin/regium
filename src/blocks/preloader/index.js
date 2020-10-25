import './style.scss';

export class Preloader {
  constructor(node) {
    this.el = node;
  }
  show() {
    this.el.classList.add('is-active');
    console.log(1)
  };
  hide() {
    this.el.classList.remove('is-active');
  };
}
