function updateClock() {
  const now = new Date();

  const options = {
    timeZone: "Europe/Berlin",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  const timeString = now.toLocaleTimeString("de-DE", options);
  document.getElementById("time").textContent = timeString;
}

updateClock();

const now = new Date();
const msToNextMinute = (60 - now.getSeconds()) * 1000;

setTimeout(() => {
  updateClock();
  setInterval(updateClock, 60000);
}, msToNextMinute);
