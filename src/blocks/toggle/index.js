import './style.scss';

export class Toggle {
  #input;
  #active;

  constructor(node) {
    this.el = node;
    this.#input = this.el.querySelector('input');
    this.#active = this.#input.checked;
    this.el.addEventListener('click', event => event.stopPropagation());
  }
  set active(state) {
    if (this.#active !== state) {
      this.el.dispatchEvent(new Event('change', {
        bubbles: true,
      }));
    }
    this.#active = state;
    this.#input.checked = state;
  }
  get active() {
    return this.#active;
  }
}
