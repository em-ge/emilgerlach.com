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

window.addEventListener("scroll", function () {
  const fadeInTexts = document.querySelectorAll(".fade-in-text");
  const scrollPosition = window.scrollY;

  if (scrollPosition > 10) {
    fadeInTexts.forEach(function (el) {
      el.style.opacity = 1;
    });
  }
});

function autoResizeWidth(textarea) {
  const minWidth = 10;
  const maxWidth = window.innerWidth * 0.5;

  const span = document.createElement("span");
  document.body.appendChild(span);

  span.style.visibility = "hidden";
  span.style.whiteSpace = "pre";
  span.style.font = "inherit";

  span.textContent = textarea.value || textarea.placeholder;

  let width = Math.max(span.offsetWidth, minWidth);
  width = Math.min(width, maxWidth);

  textarea.style.width = width + "px";

  document.body.removeChild(span);
}

function adjustInputWidth(input) {
  input.style.width = input.value.length + 1 + "ch";
}

let lightmode = true;

function isMobile() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  return /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
    userAgent
  );
}

function toggleDarkMode() {
  if (lightmode === true) {
    // turn on Darkmode
    document.getElementById(
      "lightmode-darkmode-btn"
    ).innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
        </svg> `;

    document.documentElement.style.setProperty(
      "--background-color",
      "whitesmoke"
    );
    document.documentElement.style.setProperty("--text-color", "dimgrey");
    document.documentElement.style.setProperty("--btn-color", "black");
    // ::select
    document.documentElement.style.setProperty("--select-color", "royalblue");
    document.documentElement.style.setProperty(
      "--select-background-color",
      "lightgray"
    );

    const homeBtnDarkmode = document.querySelector(".home-btn");
    homeBtnDarkmode.style.opacity = "1";

    localStorage.setItem("darkMode", "disabled");

    setMetaThemeColor();

    lightmode = false;
  } else {
    // turn on Lightmode
    document.getElementById(
      "lightmode-darkmode-btn"
    ).innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
        </svg> `;

    document.documentElement.style.setProperty(
      "--background-color",
      "rgb(25 25 25 / var(--tw-opacity))"
    );
    document.documentElement.style.setProperty(
      "--text-color",
      "rgb(120 130 140 / var(--tw-opacity))" //156 163 175
    );
    document.documentElement.style.setProperty(
      "--btn-color",
      "rgb(120 130 140 / var(--tw-opacity))" //156 163 175
    );
    // ::select
    document.documentElement.style.setProperty("--select-color", "royalblue");
    document.documentElement.style.setProperty(
      "--select-background-color",
      "dimgray"
    );

    const homeBtnLightmode = document.querySelector(".home-btn");
    homeBtnLightmode.style.opacity = "0.56";

    localStorage.setItem("darkMode", "enabled");

    setMetaThemeColor();

    lightmode = true;
  }
}

// On page load
document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("darkMode") === "enabled") {
    lightmode = false;
  } else {
    lightmode = true;
  }

  toggleDarkMode();
  setMetaThemeColor();
});

function setMetaThemeColor() {
  const themeColor = getComputedStyle(document.documentElement)
    .getPropertyValue("--background-color")
    .trim();
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (metaThemeColor) {
    metaThemeColor.setAttribute("content", themeColor);
  }
}
