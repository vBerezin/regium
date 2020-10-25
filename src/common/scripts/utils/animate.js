export class Animate {
  constructor(options) {
    this.timer = null;
    this.request = null;
    this.options = Object.assign({
      timing: (t) => t,
      callback: null,
      duration: 1000,
      delay: 0,
      loop: false,
    }, options || {});
  }
  start() {
    return new Promise(((resolve) => {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        const start = window.performance.now();
        const init = (time) => {
          const progress = +((time - start) / this.options.duration).toFixed(8);
          const step = this.options.timing(progress);
          if (progress < 1) {
            this.options.callback(step);
            this.request = window.requestAnimationFrame(init);
          } else {
            if (this.options.loop) {
              this.start();
            }
            resolve(this.options.callback(step));
          }
        };
        this.request = window.requestAnimationFrame(init);
      }, this.options.delay);
    }));
  };
  stop() {
    window.cancelAnimationFrame(this.request);
    clearTimeout(this.timer);
    this.request = null;
    return this.options.callback(0);
  };
}
