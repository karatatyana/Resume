console.log("JS работает");

/* ===== INTRO VIDEO ===== */

const video = document.getElementById("introVideo");
const intro = document.querySelector(".intro");
const scene = document.querySelector(".scene");
const progress = document.querySelector(".progress");
const progressText = document.querySelector(".progress-text");

if (video) {

  video.addEventListener("loadedmetadata", () => {
    video.play();
  });

  video.addEventListener("timeupdate", () => {
    if (video.duration) {
      const percent = Math.floor((video.currentTime / video.duration) * 100);
      progress.style.width = percent + "%";
      progressText.textContent = percent + "%";
    }
  });

video.addEventListener("ended", () => {

  intro.style.display = "none";
  scene.classList.remove("hidden");

  setTimeout(() => {
    initDust();
  }, 50);

});
}


/* ===== HOTSPOTS ===== */

const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");
const closeBtn = document.querySelector(".close");

const hotspots = document.querySelectorAll(".hotspot");

hotspots.forEach(spot => {

  spot.addEventListener("click", () => {
    const type = spot.dataset.type;

    if (type === "portfolio") {
      window.location.href = "portfolio.html";
    }

    if (type === "resume") {
      modalContent.innerHTML = "<h2>Резюме</h2><p>Здесь будет информация о вас.</p>";
      modal.classList.remove("hidden");
    }

    if (type === "contacts") {
      modalContent.innerHTML = "<h2>Контакты</h2><p>Email, Telegram, LinkedIn</p>";
      modal.classList.remove("hidden");
    }
  });

});

if (closeBtn) {
  closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });
}


/* ===== SPOTLIGHT ===== */

const overlay = document.querySelector(".dark-overlay");

if (overlay) {

  hotspots.forEach(spot => {

    spot.addEventListener("mouseenter", () => {

      overlay.style.opacity = "1";

      const rect = spot.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      overlay.style.background = `
        radial-gradient(
          circle at ${centerX}px ${centerY}px,
          rgba(0,0,0,0) 0px,
          rgba(0,0,0,0.75) 200px
        )
      `;
    });

    spot.addEventListener("mouseleave", () => {
      overlay.style.opacity = "0";
    });

  });

}


/* ===== DUST ===== */

function initDust() {

  const canvas = document.getElementById("dust");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resize();
  window.addEventListener("resize", resize);

  let particles = [];

  for (let i = 0; i < 150; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 0.5,   // крупнее
      speed: Math.random() * 0.3 + 0.1
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "rgba(255,255,255,0.25)"; // ВРЕМЕННО ярче

    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();

      p.y -= p.speed;

      if (p.y < 0) {
        p.y = canvas.height;
        p.x = Math.random() * canvas.width;
      }
    });

    requestAnimationFrame(animate);
  }

  animate();
}