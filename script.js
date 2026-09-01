// Theme toggle. The initial theme is already set (before paint) by the
// inline snippet in each page's <head>; this just wires up the button.

var VERSION = "v0.13.1"; // bump on every push

function currentTheme() {
  var attr = document.documentElement.getAttribute('data-theme');
  if (attr === 'light' || attr === 'dark') return attr;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  try { localStorage.setItem('theme', theme); } catch (e) { /* ignore */ }
}

document.addEventListener('DOMContentLoaded', function () {
  var btn = document.querySelector('[data-theme-toggle]');
  if (btn) {
    btn.addEventListener('click', function () {
      setTheme(currentTheme() === 'dark' ? 'light' : 'dark');
    });
  }

  var credit = document.querySelector('.footer-inner > div');
  if (credit) credit.textContent = credit.textContent + ' · ' + VERSION;

  var search = document.getElementById('tool-search');
  if (search) {
    var cards = Array.prototype.slice.call(document.querySelectorAll('.tools-grid .card'));
    var empty = document.querySelector('.tools-empty');
    search.addEventListener('input', function () {
      var q = search.value.trim().toLowerCase();
      var shown = 0;
      cards.forEach(function (card) {
        var match = !q || card.textContent.toLowerCase().indexOf(q) !== -1;
        card.hidden = !match;
        if (match) shown++;
      });
      if (empty) empty.hidden = shown !== 0;
    });
  }
});
