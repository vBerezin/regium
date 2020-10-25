import { App } from '~common/scripts/app';
import { LazyImage } from '~blocks/lazy-image';
import { LazyIframe } from '~blocks/lazy-iframe';

function onLoad(node) {
  node.classList.add('a-opacity');
}

function init(context) {
  try {
    const nodes = context.querySelectorAll('img[data-src], iframe[data-src]');
    nodes.forEach((node) => {
      const { tagName } = node;
      switch (tagName.toLowerCase()) {
        case 'img': return new LazyImage(node).then(onLoad);
        case 'iframe': return new LazyIframe(node).then(onLoad);
        default: return false;
      }
    });
  } catch (e) {
    App.debug(e);
  }
}

export const LazyLoader = { init };
