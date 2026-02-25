const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const progress = document.getElementById("progress");

playBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = "Pause";
  } else {
    audio.pause();
    playBtn.textContent = "Play";
  }
});

audio.addEventListener("timeupdate", () => {
  progress.value = (audio.currentTime / audio.duration) * 100;
});

progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

audio.addEventListener("timeupdate", () => {
  const min = Math.floor(audio.currentTime / 60);
  const sec = Math.floor(audio.currentTime % 60)
    .toString()
    .padStart(2, "0");
  document.getElementById("time").textContent = `${min}:${sec}`;
});
