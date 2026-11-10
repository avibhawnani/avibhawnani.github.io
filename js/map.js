/* ============================================
   map.js — the LAYN "Open the map" hill map,
   ported from the layn.in repo (lib/hillMap.ts).
   A Mussoorie hill-town map drawn from a noise
   field. Reads --map-* tokens; redraws on resize,
   font load and theme change.
   ============================================ */

(function () {
  function makeNoise(seed) {
    var perm = new Uint8Array(512);
    var s = seed >>> 0;
    var rand = function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
    var base = new Uint8Array(256);
    for (var i = 0; i < 256; i++) base[i] = i;
    for (i = 255; i > 0; i--) { var j = Math.floor(rand() * (i + 1)); var t = base[i]; base[i] = base[j]; base[j] = t; }
    for (i = 0; i < 512; i++) perm[i] = base[i & 255];
    var fade = function (t) { return t * t * (3 - 2 * t); };
    var at = function (xi, yi) { return perm[(perm[xi & 255] + (yi & 255)) & 255] / 255; };
    var value = function (x, y) {
      var xi = Math.floor(x), yi = Math.floor(y);
      var xf = fade(x - xi), yf = fade(y - yi);
      var a = at(xi, yi), b = at(xi + 1, yi), c = at(xi, yi + 1), d = at(xi + 1, yi + 1);
      return a + (b - a) * xf + (c - a) * yf + (a - b - c + d) * xf * yf;
    };
    return function (x, y) {
      var total = 0, amp = 1, freq = 1, norm = 0;
      for (var o = 0; o < 4; o++) { total += value(x * freq, y * freq) * amp; norm += amp; amp *= 0.5; freq *= 2.1; }
      return total / norm;
    };
  }

  var TOWN = { name: 'Mussoorie', at: [0.47, 0.44] };
  var AREAS = [
    { name: 'Landour', at: [0.74, 0.33] },
    { name: 'Happy Valley', at: [0.21, 0.52] },
    { name: 'Barlowganj', at: [0.60, 0.72] },
  ];
  var SMALL = [
    { name: 'GANDHI CHOWK', at: [0.26, 0.33] },
    { name: 'LIBRARY BAZAAR', at: [0.30, 0.41] },
    { name: 'KINCRAIG', at: [0.14, 0.68] },
    { name: 'HATHIPAON', at: [0.22, 0.84] },
    { name: 'JHARIPANI', at: [0.46, 0.86] },
    { name: 'KULRI', at: [0.62, 0.47] },
    { name: 'BHATTA', at: [0.80, 0.86] },
  ];
  var PEAK = { name: 'Lal Tibba', at: [0.83, 0.22] };

  function drawHillMap(canvas) {
    var W = canvas.clientWidth, H = canvas.clientHeight;
    if (!W || !H) return;
    var dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    var x = canvas.getContext('2d');
    if (!x) return;
    x.setTransform(1, 0, 0, 1, 0, 0);

    var css = getComputedStyle(document.documentElement);
    var v = function (n, f) { return css.getPropertyValue(n).trim() || f; };

    var forest = v('--map-forest', '#a9dc92');
    var scrub = v('--map-scrub', '#c4e7ab');
    var open = v('--map-open', '#eceadf');
    var bare = v('--map-bare', '#f7f5ef');
    var roadInk = v('--map-roadline', '#b3b7c6');
    var label = v('--map-label', 'rgba(86, 92, 102, 0.95)');
    var townInk = v('--map-city-label', 'rgba(38, 44, 52, 0.95)');
    var peakInk = v('--map-peak-label', 'rgba(104, 134, 176, 0.95)');

    var pw = canvas.width, ph = canvas.height;
    var noise = makeNoise(20260104);
    var F = 1 / (108 * dpr);
    var field = function (px, py) { return noise(px * F, py * F); };

    var toRGB = function (hex) {
      var h = hex.replace('#', '');
      return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
    };
    var bands = [
      { upto: 0.42, rgb: toRGB(bare) },
      { upto: 0.5, rgb: toRGB(open) },
      { upto: 0.6, rgb: toRGB(scrub) },
      { upto: 1.01, rgb: toRGB(forest) },
    ];

    var img = x.createImageData(pw, ph);
    var data = img.data;
    for (var py = 0; py < ph; py++) {
      for (var px = 0; px < pw; px++) {
        var n = field(px, py);
        var rgb = bands[bands.length - 1].rgb;
        for (var bi = 0; bi < bands.length; bi++) { if (n < bands[bi].upto) { rgb = bands[bi].rgb; break; } }
        var i = (py * pw + px) * 4;
        data[i] = rgb[0]; data[i + 1] = rgb[1]; data[i + 2] = rgb[2]; data[i + 3] = 255;
      }
    }
    x.putImageData(img, 0, 0);

    x.setTransform(dpr, 0, 0, dpr, 0, 0);
    x.lineCap = 'round';
    x.lineJoin = 'round';

    var e = 1.4 * dpr;
    var gradient = function (px, py) { return [field(px + e, py) - field(px - e, py), field(px, py + e) - field(px, py - e)]; };
    var contour = function (start, steps, step, sign) {
      var pts = [];
      var px = start[0] * dpr, py = start[1] * dpr;
      for (var i = 0; i < steps; i++) {
        var g = gradient(px, py); var gx = g[0], gy = g[1];
        var len = Math.hypot(gx, gy) || 1e-6;
        var dx = (-gy / len) * sign + (gx / len) * 0.18;
        var dy = (gx / len) * sign + (gy / len) * 0.18;
        var d = Math.hypot(dx, dy) || 1e-6;
        px += (dx / d) * step * dpr; py += (dy / d) * step * dpr;
        if (px < -60 * dpr || px > pw + 60 * dpr || py < -60 * dpr || py > ph + 60 * dpr) break;
        pts.push([px / dpr, py / dpr]);
      }
      return pts;
    };
    var stroke = function (pts, width) {
      if (pts.length < 2) return;
      x.lineWidth = width;
      x.beginPath();
      x.moveTo(pts[0][0], pts[0][1]);
      for (var i = 0; i < pts.length - 1; i++) {
        var p0 = pts[i], p1 = pts[i + 1];
        x.quadraticCurveTo(p0[0], p0[1], (p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2);
      }
      x.stroke();
    };

    x.strokeStyle = roadInk;
    var s = 7;
    var rand = function () { s = (s * 1103515245 + 12345) & 0x7fffffff; return s / 0x7fffffff; };
    for (var li = 0; li < 90; li++) {
      stroke(contour([rand() * W, rand() * H], 60 + Math.floor(rand() * 70), 3.2, rand() < 0.5 ? 1 : -1), 0.9);
    }
    for (var ti = 0; ti < 16; ti++) {
      stroke(contour([rand() * W, rand() * H], 150 + Math.floor(rand() * 120), 4.2, rand() < 0.5 ? 1 : -1), 1.7);
    }

    // Only the town name — other labels clutter the small circle.
    x.textAlign = 'center';
    x.textBaseline = 'middle';
    x.font = '600 15px ui-sans-serif, system-ui, sans-serif';
    x.lineWidth = 4.5; x.strokeStyle = bare;
    x.strokeText(TOWN.name, TOWN.at[0] * W, TOWN.at[1] * H);
    x.fillStyle = townInk;
    x.fillText(TOWN.name, TOWN.at[0] * W, TOWN.at[1] * H);
  }

  function init() {
    var c = document.getElementById('layn-map');
    if (!c) return;
    var draw = function () { drawHillMap(c); };
    draw();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(draw);
    if ('ResizeObserver' in window) new ResizeObserver(draw).observe(c);
    if ('MutationObserver' in window) new MutationObserver(draw).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
