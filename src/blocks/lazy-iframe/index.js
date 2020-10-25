import { Observer } from '~blocks/observer';

export function LazyIframe(node) {
  return new Promise(((resolve, reject) => {
    Observer.observe({
      node,
      once: true,
      callback: (isVisible) => {
        if (isVisible) {
          node.onload = resolve(node);
          node.onerror = reject(node);
          node.src = node.dataset.src;
          node.removeAttribute('data-src');
        }
      },
    });
  }));
}
