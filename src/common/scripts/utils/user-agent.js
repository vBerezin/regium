const userAgent = (function () {
  const agent = navigator.userAgent.toLowerCase();
  const isMobile = (() => {
    const regex = '/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera/i';
    if (agent.match(regex)) {
      return agent.match(regex)[0];
    }
    return false;
  })();
  return {
    agent,
    isMobile,
  };
}());

export { userAgent };
