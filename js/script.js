// ==========================================
// CONFIGURACIÓN PRINCIPAL
// ==========================================

// Cambia esta fecha por la fecha/hora real de la boda.
// Formato: YYYY-MM-DDTHH:MM:SS
const WEDDING_DATE = "2026-12-05T17:00:00";

// ==========================================
// SOBRE + MÚSICA
// ==========================================

const envelopeScreen = document.getElementById("envelope-screen");
const invitation = document.getElementById("invitation");
const envelopeWrapper = document.getElementById("open-envelope");
const envelopeFlap = document.querySelector(".envelope-flap");
const waxSeal = document.querySelector(".wax-seal");
const song = document.getElementById("wedding-song");

function openInvitation() {
  envelopeFlap.style.transform = "rotateX(180deg)";
  waxSeal.style.opacity = "0";

  setTimeout(() => {
    envelopeScreen.style.display = "none";
    invitation.classList.remove("hidden");

    // El navegador permite iniciar la música porque ocurrió
    // después de una interacción del usuario.
    song.play().catch(() => {
      console.log("La reproducción automática fue bloqueada por el navegador.");
    });

    window.scrollTo(0, 0);
  }, 650);
}

envelopeWrapper.addEventListener("click", openInvitation);

envelopeWrapper.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    openInvitation();
  }
});

// ==========================================
// CUENTA REGRESIVA
// ==========================================

function updateCountdown() {
  const target = new Date(WEDDING_DATE).getTime();
  const now = new Date().getTime();
  const difference = target - now;

  if (difference <= 0) {
    document.getElementById("days").textContent = "00";
    document.getElementById("hours").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";
    return;
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);
