const js = document.getElementById("js");
const jsTxt = document.getElementById("js-text");
const html = document.getElementById("html");
const htmlTxt = document.getElementById("html-text");
const css = document.getElementById("css");
const cssTxt = document.getElementById("css-text");
const py = document.getElementById("python");
const pyTxt = document.getElementById("python-text");
const other = document.getElementById("other");
const otherTxt = document.getElementById("other-text");

jsTxt.addEventListener("mouseenter", () => {
  js.style.transform = "scale(1.1)";
});
jsTxt.addEventListener("mouseleave", () => {
  js.style.transform = "scale(1.0)";
});

htmlTxt.addEventListener("mouseenter", () => {
  html.style.transform = "scale(1.02)";
});
htmlTxt.addEventListener("mouseleave", () => {
  html.style.transform = "scale(1.0)";
});

cssTxt.addEventListener("mouseenter", () => {
  css.style.transform = "scale(1.09)";
});
cssTxt.addEventListener("mouseleave", () => {
  css.style.transform = "scale(1.0)";
});

pyTxt.addEventListener("mouseenter", () => {
  py.style.transform = "scale(1.18)";
});
pyTxt.addEventListener("mouseleave", () => {
  py.style.transform = "scale(1.0)";
});

otherTxt.addEventListener("mouseenter", () => {
  other.style.transform = "scale(1.25)";
});
otherTxt.addEventListener("mouseleave", () => {
  other.style.cotransformlor = "scale(1.0)";
});
