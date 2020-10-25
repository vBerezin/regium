const storage = new WeakMap();
const entryHandler = ({ entry, observer }) => {
  const { target, isIntersecting } = entry;
  const { once, callback } = storage.get(target);
  if (once && isIntersecting) {
    observer.unobserve(target);
  }
  return callback(isIntersecting);
};
const intersectionObserver = new IntersectionObserver(
  (entries, observer) => {
    entries
      .filter(entry => storage.has(entry.target))
      .forEach(entry => entryHandler({ entry, observer }));
  },
  {
    root: null,
    rootMargin: '0% 0px',
    threshold: 0.01,
  },
);
const observe = ({ node, callback, once = false }) => {
  storage.set(node, { callback, once });
  intersectionObserver.observe(node);
  return node;
};

const unobserve = (node) => {
  intersectionObserver.unobserve(node);
  storage.delete(node);
};

export const Observer = { observe, unobserve };
