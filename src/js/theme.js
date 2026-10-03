/* Theme switcher: only sets data-theme on <html>. Remembered if storage is available. */
(function () {
  var root = document.documentElement;
  var buttons = document.querySelectorAll("[data-set-theme]");
  function apply(t) {
    root.setAttribute("data-theme", t);
    buttons.forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.setTheme === t));
    });
    try {
      localStorage.setItem("club-theme", t);
    } catch (e) {}
  }
  var saved = "warp";
  try {
    saved = localStorage.getItem("club-theme") || "warp";
  } catch (e) {}
  apply(saved);
  buttons.forEach(function (b) {
    b.addEventListener("click", function () {
      apply(b.dataset.setTheme);
    });
  });
})();
