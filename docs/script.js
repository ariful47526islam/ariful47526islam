(function () {
  var root = document.documentElement;
  var themeBtn = document.getElementById("theme-toggle");
  var navToggle = document.getElementById("nav-toggle");
  var mobileNav = document.getElementById("mobile-nav");
  var filters = document.querySelectorAll("[data-filter]");
  var cards = document.querySelectorAll("[data-category]");
  var year = document.getElementById("year");

  var stored = localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") {
    root.setAttribute("data-theme", stored);
  }

  function setTheme(next) {
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    if (themeBtn) {
      themeBtn.setAttribute("aria-label", next === "dark" ? "Switch to light theme" : "Switch to dark theme");
    }
  }

  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var current = root.getAttribute("data-theme");
      var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      var isDark = current ? current === "dark" : prefersDark;
      setTheme(isDark ? "light" : "dark");
    });
  }

  if (navToggle && mobileNav) {
    navToggle.addEventListener("click", function () {
      var open = mobileNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(open));
    });
    mobileNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mobileNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  filters.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var value = btn.getAttribute("data-filter");
      filters.forEach(function (item) {
        item.classList.toggle("is-active", item === btn);
        item.setAttribute("aria-pressed", String(item === btn));
      });
      cards.forEach(function (card) {
        var match = value === "all" || card.getAttribute("data-category") === value;
        card.classList.toggle("is-hidden", !match);
      });
    });
  });

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }
})();
