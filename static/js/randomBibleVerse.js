fetch("../static/data/bible_en_kjv.json")
  .then((response) => {
    if (!response.ok) throw new Error("Network error");
    return response.json();
  })
  .then((data) => {
    const bookIndex = Math.floor(Math.random() * data.length);
    const book = data[bookIndex];

    const chapterIndex = Math.floor(Math.random() * book.chapters.length);
    const chapter = book.chapters[chapterIndex];

    const verseIndex = Math.floor(Math.random() * chapter.length);
    const verse = chapter[verseIndex];

    const bookName = book.name;
    const chapterNumber = chapterIndex + 1;
    const verseNumber = verseIndex + 1;

    document.getElementById(
      "bible-verse"
    ).innerHTML = `<div class="random-bibleverse">
  <div class="random-verse">"${verse}"</div>
  <p class="random-bibleverse-info">~ ${bookName} ${chapterNumber}:${verseNumber}, KJV</p>
</div>`;
    console.log("new bible verse in website");
  })
  .catch((error) => {
    console.error("Bible verse could not be loaded:", error);
    document.getElementById("bible-verse").innerText =
      "Bible verse could not be loaded.";
  });
