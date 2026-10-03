/* Light/dark switch. Loaded in <head> (not deferred) so the theme is set
   before the page paints. Uses the saved choice, else the OS setting. */
(function () {
  var root = document.documentElement;
  var KEY = "theme";

  function savedTheme() {
    try {
      return localStorage.getItem(KEY);
    } catch (e) {
      return null;
    }
  }

  function systemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function currentTheme() {
    return root.getAttribute("data-theme");
  }

  root.setAttribute("data-theme", savedTheme() || systemTheme());

  document.addEventListener("DOMContentLoaded", function () {
    var button = document.querySelector(".sky-toggle");
    var label = button.querySelector(".sky-toggle__label");
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    // The wheel only ever turns forward, so the sun always sets to the
    // right (west) and the moon rises from the left (east).
    var turn = currentTheme() === "dark" ? 180 : 0;

    function update() {
      var dark = currentTheme() === "dark";
      button.style.setProperty("--sky-turn", turn + "deg");
      label.textContent = dark ? "make it day" : "make it night";
    }

    function setTheme(next) {
      root.setAttribute("data-theme", next);
      try {
        localStorage.setItem(KEY, next);
      } catch (e) {}
      turn += 180;
      update();
    }

    button.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      if (!document.startViewTransition || reduceMotion.matches) {
        setTheme(next);
        return;
      }
      // The whole page crossfades; see theme-toggle.css for the timing.
      document.startViewTransition(function () {
        setTheme(next);
      });
    });

    update();
    button.hidden = false;
  });
})();
