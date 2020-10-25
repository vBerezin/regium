import { Preloader } from '~blocks/preloader';

export const AppPreloader = (() => {
  const node = document.querySelector('#js-app-preloader');
  return new Preloader(node);
})();
