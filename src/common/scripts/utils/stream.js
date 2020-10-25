/**
 * @function { on } - Добавляет коллбек на событие
 * @function { off } - Удаляет коллбек на событие
 * @function { trigger } - Запускает все коллбеки события
 * */
export function Stream() {
  this.storage = new Map();
  this.on = (name, fn) => {
    if (this.storage.has(name)) {
      this.storage.get(name).add(fn);
      return this;
    }
    this.storage.set(name, new Set([fn]));
    return this;
  };
  this.off = (name, fn) => {
    if (!this.storage.has(name)) {
      return false;
    }
    this.storage.get(name).delete(fn);
    if (!this.storage.get(name).size) {
      this.storage.delete(name);
    }
    return this;
  };
  this.trigger = (name, args) => {
    if (!this.storage.has(name) || !this.storage.get(name).size) {
      return false;
    }
    this.storage.get(name).forEach(fn => fn(args));
    return this;
  };
}
