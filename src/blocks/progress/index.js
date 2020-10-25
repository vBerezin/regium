import './style.scss';

export class Progress {
    #line;
    #label;
    #value;

    constructor(node) {
      this.el = node;
      this.#line = this.el.querySelector('[data-rel="progress.line"]');
      this.#label = this.el.querySelector('[data-rel="progress.label"]');
      this.#value = this.el.dataset.value;
      this.value = this.#value;
    }

    set value(value) {
      const ceil = Math.ceil(value);
      this.#value = ceil;
      this.#line.style.maxWidth = `${ceil}%`;
      this.#label.innerHTML = `${ceil}%`;
      this.el.dataset.value = ceil;
    }

    get value() {
      return this.#value;
    }
}
