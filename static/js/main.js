window.addEventListener("load", () => {
  // reveal
  const els = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );
  els.forEach((el) => io.observe(el));

  // darkmode/lightmode
  (function () {
    const SVG_CRESCENT = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
          </svg>`;

    const SVG_SUN = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
          </svg>`;

    const btn = document.getElementById("lightmode-darkmode-btn");
    const homeBtn = document.querySelector(".home-btn");
    const metaTheme = document.querySelector('meta[name="theme-color"]');

    let lightmode = true;
    function applyMode(isLight) {
      if (isLight) {
        if (btn) btn.innerHTML = SVG_CRESCENT;

        document.documentElement.style.setProperty(
          "--background-color",
          "whitesmoke"
        );
        document.documentElement.style.setProperty("--text-color", "dimgrey");
        document.documentElement.style.setProperty("--btn-color", "black");
        document.documentElement.style.setProperty(
          "--select-color",
          "royalblue"
        );
        document.documentElement.style.setProperty(
          "--select-background-color",
          "lightgray"
        );
        document.documentElement.style.setProperty(
          "--other-background-color",
          "rgba(0, 0, 0, 0.209)"
        );

        if (homeBtn) homeBtn.style.opacity = "1";

        localStorage.setItem("darkMode", "disabled");
        lightmode = true;
      } else {
        if (btn) btn.innerHTML = SVG_SUN;

        document.documentElement.style.setProperty(
          "--background-color",
          "rgb(25 25 25 / var(--tw-opacity))"
        );
        document.documentElement.style.setProperty(
          "--text-color",
          "rgb(120 130 140 / var(--tw-opacity))"
        );
        document.documentElement.style.setProperty(
          "--btn-color",
          "rgb(120 130 140 / var(--tw-opacity))"
        );
        document.documentElement.style.setProperty(
          "--select-color",
          "royalblue"
        );
        document.documentElement.style.setProperty(
          "--select-background-color",
          "dimgray"
        );
        document.documentElement.style.setProperty(
          "--other-background-color",
          "rgb(237, 237, 237, 0.6)"
        );

        if (homeBtn) homeBtn.style.opacity = "0.56";

        localStorage.setItem("darkMode", "enabled");
        lightmode = false;
      }
    }

    function setMetaThemeColor() {
      if (!metaTheme) return;
      const themeColor = getComputedStyle(document.documentElement)
        .getPropertyValue("--background-color")
        .trim();
      metaTheme.setAttribute("content", themeColor);
    }

    (function initFromStorageOrSystem() {
      const darkModeSetting = localStorage.getItem("darkMode");
      if (darkModeSetting === "enabled") {
        lightmode = false;
      } else if (darkModeSetting === "disabled") {
        lightmode = true;
      } else {
        const prefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        lightmode = !prefersDark;
      }
      applyMode(lightmode);
      setMetaThemeColor();
    })();

    function toggleDarkMode() {
      lightmode = !lightmode;
      applyMode(lightmode);
      setMetaThemeColor();
    }

    if (btn) {
      btn.addEventListener("click", toggleDarkMode);
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const mqHandler = (e) => {
      // Nur anwenden, wenn der Nutzer keine Präferenz gesetzt hat
      if (!localStorage.getItem("darkMode")) {
        lightmode = !e.matches;
        applyMode(lightmode);
        setMetaThemeColor();
      }
    };

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", mqHandler);
    } else if (typeof mediaQuery.addListener === "function") {
      mediaQuery.addListener(mqHandler);
    }
    typeof window.toggleDarkMode;
    // window.toggleDarkMode = toggleDarkMode;
  })();

  // collapsible button
  const collapsibles = document.querySelectorAll(".collapsible");

  collapsibles.forEach((container) => {
    const btn = container.querySelector(".collapsible-toggle-btn");

    btn.addEventListener("click", () => {
      container.classList.toggle("open");

      if (btn.classList.contains("readmore")) {
        if (container.classList.contains("open")) {
          btn.textContent = "(click here to read less)";
        } else {
          btn.textContent = "(click here to read more)";
        }
      }
    });
  });

  // Things I’ll need later (probably never):

  // let counter = 1;

  // function addInput() {
  //   counter++; //${counter}

  //   var newdiv = document.createElement("div");

  //   newdiv.innerHTML = `<form method="POST" action="/dev/probability-calculator" id="input-boxes">
  //             <label class="prob-calc-label" for="number${counter}">Event:
  //                 <textarea id="probCalcTextarea" oninput="autoResizeWidth(this)"rows="1" cols="1" class="prob-calc-textarea">${counter}</textarea>
  //             </label>
  //             <input class="prob-calc-input" type="number" id="number${counter}" name="number${counter}" required>
  //         </form>`;

  //   document.getElementById("input-boxes").appendChild(newdiv);
  // }

  // function removeInput() {
  //   const forms = document.querySelectorAll(".prob-calc form");

  //   if (forms.length > 1) {
  //     forms[forms.length - 1].remove();

  //     counter = counter - 1;
  //   }
  // }

  // function autoResizeWidth(textarea) {
  //   const minWidth = 10;
  //   const maxWidth = window.innerWidth * 0.5;

  //   const span = document.createElement("span");
  //   document.body.appendChild(span);

  //   span.style.visibility = "hidden";
  //   span.style.whiteSpace = "pre";
  //   span.style.font = "inherit";

  //   span.textContent = textarea.value || textarea.placeholder;

  //   let width = Math.max(span.offsetWidth, minWidth);
  //   width = Math.min(width, maxWidth);

  //   textarea.style.width = width + "px";

  //   document.body.removeChild(span);
  // }

  // function adjustInputWidth(input) {
  //   input.style.width = input.value.length + 1 + "ch";
  // }
});
