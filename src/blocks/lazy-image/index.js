import { Observer } from '~blocks/observer';

function loadImg({
    src = '',
    srcset = '',
    alt = '',
    title = '',
  })
{
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.alt = alt || title;
    img.title = title;
    img.onload = () => {
      resolve(img);
    };
    img.onerror = () => {
      reject(new Error(`load error: ${img.currentSrc}`));
    };
    img.src = src;
    img.srcset = srcset;
  });
}


export function LazyImage(node) {
  return new Promise(((resolve, reject) => {
    Observer.observe({
      node,
      once: true,
      callback: (isVisible) => {
        if (isVisible) {
          loadImg(node.dataset)
            .then((img) => {
              node.parentNode.replaceChild(img, node);
              resolve(img);
            })
            .catch(reject);
        }
      },
    });
  }));
  }
