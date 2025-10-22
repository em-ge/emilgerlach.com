let body = document.body;
let bibleup = new BibleUp(body, {
  popup: "classic",
  version: "NIV",
  darkTheme: true,
  ignoreCase: false,
  buid: false,
  styles: {},
});

bibleup.create();
