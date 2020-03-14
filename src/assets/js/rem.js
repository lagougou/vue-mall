(function () {
  var rootEl = document.documentElement;
  var dpr = window.devicePixelRatio || 1;
  dpr = (dpr > 3 ? 3 : (dpr > 2 ? 2 : 1));

  var viewEl = document.querySelector('meta[name="viewport"]');
  // eslint-disable-next-line one-var
  var maxWidth = 640, minWidth = 320;
  // eslint-disable-next-line one-var
  var scale = 1 / dpr, content = 'width=device-width, initial-scale=' + scale + ',maximum-scale=' + scale + ',minimum-scale=' + scale + ',user-scalable=no';

  rootEl.setAttribute('data-dpr', dpr);
  rootEl.setAttribute('max-width', maxWidth);
  rootEl.setAttribute('min-width', minWidth);

  if (viewEl) {
    viewEl.setAttribute('content', content);
  } else {
    viewEl = document.createElement('meta');
    viewEl.setAttribute('name', 'viewport');
    viewEl.setAttribute('content', content);
    document.head.appendChild(viewEl);
  }

  setRemUnit();
  window.addEventListener('resize', setRemUnit);

  function setRemUnit() {
    var ratio = 7.5;
    var viewWidth = rootEl.getBoundingClientRect().width || window.innerWidth;
    if (maxWidth && (viewWidth / dpr) > maxWidth) {
      viewWidth = maxWidth * dpr;
    }

    if (minWidth && (viewWidth / dpr) < minWidth) {
      viewWidth = minWidth * dpr;
    }
    console.log(viewWidth);
    rootEl.style.fontSize = viewWidth / ratio + 'px';
  }
})();
