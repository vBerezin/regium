/**
 * @function {loadScript}
 * @param {string} src
 * @returns {Promise} Promise(script object)
 */
const loadScript = src => new Promise((resolve, reject) => {
  const docScripts = Array.from(document.scripts);
  const scripts = docScripts.filter(script => script.src === src);
  if (scripts.length) {
    resolve(scripts);
  } else {
    const script = document.createElement('script');
    script.src = src;
    script.onerror = () => {
      reject(script);
    };
    script.onload = () => {
      resolve(script);
    };
    document.body.appendChild(script);
  }
});

/**
 * @function {loadStyle}
 * @param {string} src
 * @returns {Promise} Promise(stylesheet object)
 */
const loadStyle = src => new Promise((resolve, reject) => {
  const styleSheets = Array.from(document.styleSheets);
  const styles = styleSheets.filter(style => style.href === src);
  if (styles.length) {
    resolve(styles);
  } else {
    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = src;
    style.onerror = () => {
      reject(style);
    };
    style.onload = () => {
      resolve(style);
    };
    document.head.appendChild(style);
  }
});

export const ResourceLoader = {
  loadScript,
  loadStyle,
};
