import './style.scss';

/**
 * @function { icon }
 * @returns { HTMLElement }
 * */
export const Icon = (data) => {
  const svg = document.createElement('svg');
  svg.className = `icon icon-${data.name}`;
  svg.innerHTML = `<use xlink:href="#icon-${data.name}"></use>`;
  if (data.mods) {
    const mods = [].concat(data.mods).map(mod => mod && `icon--${mod}`);
    svg.classList.add(mods.join(' '));
  }
  if (data.class) { svg.classList.add(data.class); }
  return svg;
};
