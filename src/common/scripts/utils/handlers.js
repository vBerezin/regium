const Click = actions => function (event) {
  const target = event.target.closest('[data-click]');
  if (target) {
    const { click } = target.dataset;
    if (actions[click]) {
      actions[click]({ event, target });
    }
  }
};

export const Handlers = { Click };
