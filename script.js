const intro = document.getElementById("intro");
const card = document.querySelector(".card");
const musicBtn = document.getElementById("music-btn");
const music = document.getElementById("bg-music");
const toast = document.getElementById("toast");

let isPlaying = true; // music starts playing after click

// Click to enter
intro.addEventListener("click", () => {
  intro.classList.add("fade-out");

  // Reveal main content
  setTimeout(() => {
    card.classList.remove("hidden");
    musicBtn.classList.remove("hidden");
  }, 300);

  // Start music
  music.play().catch(() => {});
});

// Music toggle
musicBtn.addEventListener("click", () => {
  if (isPlaying) {
    music.pause();
    musicBtn.textContent = "🔇";
  } else {
    music.play().catch(() => {});
    musicBtn.textContent = "🔊";
  }
  isPlaying = !isPlaying;
});

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
  toast.classList.remove("hidden");
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.classList.add("hidden"), 250);
  }, 1800);
}
