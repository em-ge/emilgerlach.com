window.addEventListener("load", () => {
  const root = document.documentElement;
  const setVar = (k, v) => root.style.setProperty(k, v);

  // reveal
  const els = document.querySelectorAll(".reveal");
  const threshold = window.innerWidth <= 768 ? 0.14 : 0.2;
  const io = new IntersectionObserver(
    (entries, observer) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold },
  );
  els.forEach((el) => io.observe(el));

  // darkmode/lightmode
  const SVG_CRESCENT = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
  </svg>`;

  const SVG_SUN = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
  </svg>`;

  const themes = {
    light: {
      "--background-color": "whitesmoke",
      "--text-color": "dimgrey",
      "--btn-color": "black",
      "--select-color": "royalblue",
      "--select-background-color": "lightgray",
      "--other-background-color": "rgba(0, 0, 0, 0.209)",
    },
    dark: {
      "--background-color": "rgb(25 25 25 / var(--tw-opacity))",
      "--text-color": "rgb(120 130 140 / var(--tw-opacity))",
      "--btn-color": "rgb(120 130 140 / var(--tw-opacity))",
      "--select-color": "royalblue",
      "--select-background-color": "dimgray",
      "--other-background-color": "rgb(237, 237, 237, 0.6)",
    },
  };

  const btn = document.getElementById("lightmode-darkmode-btn");
  const homeBtn = document.querySelector(".home-btn");
  const metaTheme = document.querySelector('meta[name="theme-color"]');
  let lightmode = true;

  function applyMode(isLight) {
    lightmode = isLight;
    const vars = isLight ? themes.light : themes.dark;
    for (const [k, v] of Object.entries(vars)) setVar(k, v);

    if (btn) btn.innerHTML = isLight ? SVG_CRESCENT : SVG_SUN;
    if (homeBtn) homeBtn.style.opacity = isLight ? "1" : "0.56";
    localStorage.setItem("darkMode", isLight ? "disabled" : "enabled");

    if (metaTheme) {
      metaTheme.setAttribute(
        "content",
        getComputedStyle(root).getPropertyValue("--background-color").trim(),
      );
    }
  }

  // init from storage or system preference
  const stored = localStorage.getItem("darkMode");
  if (stored) {
    lightmode = stored !== "enabled";
  } else {
    lightmode = !window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  applyMode(lightmode);

  if (btn) btn.addEventListener("click", () => applyMode(!lightmode));

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      if (!localStorage.getItem("darkMode")) applyMode(!e.matches);
    });

  // reading progress bar
  const progressBar = document.querySelector(".reading-progress");
  if (progressBar) {
    window.addEventListener("scroll", () => {
      const { scrollTop, scrollHeight, clientHeight } = root;
      const max = scrollHeight - clientHeight;
      progressBar.style.width = max > 0 ? (scrollTop / max) * 100 + "%" : "0%";
    });
  }

  // collapsible button
  for (const container of document.querySelectorAll(".collapsible")) {
    const toggleBtn = container.querySelector(".collapsible-toggle-btn");
    if (!toggleBtn) continue;
    toggleBtn.addEventListener("click", () => {
      const open = container.classList.toggle("open");
      if (toggleBtn.classList.contains("readmore")) {
        toggleBtn.textContent = open
          ? "(click here to read less)"
          : "(click here to read more)";
      }
    });
  }
});
