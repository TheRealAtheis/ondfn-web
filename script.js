const intro = document.getElementById("intro");
const card = document.querySelector(".card");
const volumeControl = document.getElementById("volume-control");
const music = document.getElementById("bg-music");
const muteBtn = document.getElementById("mute-btn");
const volumeSlider = document.getElementById("volume-slider");
const volumeIcon = document.getElementById("volume-icon");
const toast = document.getElementById("toast");

let isMuted = false;
let lastVolume = 0.4;

music.volume = lastVolume;

// Click to enter + start music
intro.addEventListener("click", () => {
  intro.classList.add("fade-out");

  setTimeout(() => {
    card.classList.remove("hidden");
    volumeControl.classList.remove("hidden");
  }, 280);

  music.play().catch(() => {});
});

// Volume slider
volumeSlider.addEventListener("input", (e) => {
  const vol = parseFloat(e.target.value);
  music.volume = vol;
  lastVolume = vol;
  isMuted = vol === 0;
  updateVolumeIcon();
});

// Mute toggle
muteBtn.addEventListener("click", () => {
  if (isMuted) {
    music.volume = lastVolume || 0.4;
    volumeSlider.value = music.volume;
    isMuted = false;
  } else {
    lastVolume = music.volume;
    music.volume = 0;
    volumeSlider.value = 0;
    isMuted = true;
  }
  updateVolumeIcon();
});

function updateVolumeIcon() {
  if (music.volume === 0 || isMuted) {
    volumeIcon.innerHTML = `<path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>`;
  } else {
    volumeIcon.innerHTML = `<path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>`;
  }
}

// Payment copy buttons
document.querySelectorAll(".pay-btn").forEach(btn => {
  btn.addEventListener("click", async () => {
    const text = btn.getAttribute("data-copy");
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
      showToast("Copied!");
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      showToast("Copied!");
    }
  });
});

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 1800);
}
