/* cache elements */
const entryOverlay = document.getElementById("entryOverlay");
const home = document.getElementById("home");
const navLogo = document.getElementById("navLogo");
const welcomeLogo = document.getElementById("welcomeLogo");

/* ===== ENTRY PLAY ONCE ===== */

if (sessionStorage.getItem("entryDone")) {
  entryOverlay.style.display = "none";
  home.style.opacity = 1;
} else {
  sessionStorage.setItem("entryDone", "1");

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  /* petals bloom */
  tl.to(".petal-img", {
    opacity: 1,
    scale: 1,
    rotate: (i, el) => getComputedStyle(el).getPropertyValue("--r"),
    duration: 1.5,
    stagger: 0.1,
  });

  /* center pop */
  tl.to(".center-img", {
    opacity: 1,
    scale: 1.35,
    duration: 0.6,
  });

  tl.to(".center-img", {
    scale: 1,
    duration: 0.6,
  });

  /* plus pop */
  tl.to(
    ".plus-main",
    {
      opacity: 1,
      scale: 1,
      duration: 0.8,
    },
    "-=0.3",
  );

  /* flip logo out */
  tl.to(
    "#logo",
    {
      rotateY: 180,
      opacity: 0,
      duration: 1.5,
      ease: "power2.inOut",
    },
    "+=0.4",
  );

  /* welcome text */
  tl.to("#welcome", {
    opacity: 1,
    y: -20,
    duration: 0.8,
  });

  /* move logo to navbar */
  tl.to("#welcomeLogo", {
    duration: 1.2,
    scale: 0.5,
    ease: "power3.inOut",
    x: () =>
      navLogo.getBoundingClientRect().left -
      welcomeLogo.getBoundingClientRect().left,
    y: () =>
      navLogo.getBoundingClientRect().top -
      welcomeLogo.getBoundingClientRect().top,
  });

  /* fade overlay */
  tl.to("#entryOverlay", { opacity: 0, duration: 0.6 });
  tl.set("#entryOverlay", { display: "none" });
  tl.to("#home", { opacity: 1, duration: 0.6 });
}

/* ===== about us===== */

/* ===== DATA ===== */
const slides = [
  {
    img: "https://picsum.photos/seed/1/600/800",
    text: "Saravana Hospital isn't just another multi-specialty hospital in Chennai.We're the place families trust when health matters most. Since [Year], we've built our reputation one patient at a time—through honest conversations, accurate diagnosis, and treatment plans that respect both your body and your budget.We don't believe in rushing appointments or using complicated medical terms. Our doctors take time to listen, explain clearly, and involve you in every decision about your health.",
  },
  {
    img: "https://picsum.photos/seed/2/600/800",
    text: "Our pediatric team focuses on safe, gentle, and evidence-based treatment for children of all ages.",
  },
  {
    img: "https://picsum.photos/seed/3/600/800",
    text: "We use modern diagnostic tools to reduce guesswork and speed up accurate medical decisions.",
  },
  {
    img: "https://picsum.photos/seed/4/600/800",
    text: "Every consultation is unhurried — doctors explain clearly before prescribing anything.",
  },
  {
    img: "https://picsum.photos/seed/5/600/800",
    text: "Emergency services are available with trained staff and rapid response protocols.",
  },
  {
    img: "https://picsum.photos/seed/6/600/800",
    text: "Affordable treatment options are discussed openly — no surprise billing practices.",
  },
  {
    img: "https://picsum.photos/seed/7/600/800",
    text: "We support preventive healthcare through regular screening and wellness programs.",
  },
  {
    img: "https://picsum.photos/seed/8/600/800",
    text: "Our specialists collaborate across departments for complex case management.",
  },
  {
    img: "https://picsum.photos/seed/9/600/800",
    text: "Clean, patient-friendly facilities designed to reduce stress during treatment.",
  },
  {
    img: "https://picsum.photos/seed/10/600/800",
    text: "Lab services provide fast and reliable reports for quicker treatment decisions.",
  },
  {
    img: "https://picsum.photos/seed/11/600/800",
    text: "Cardiac and diabetes care programs are structured for long-term monitoring.",
  },
  {
    img: "https://picsum.photos/seed/12/600/800",
    text: "Women’s health and maternity care handled with privacy and specialized support.",
  },
  {
    img: "https://picsum.photos/seed/13/600/800",
    text: "Senior citizen care includes medication review and lifestyle management.",
  },
  {
    img: "https://picsum.photos/seed/14/600/800",
    text: "Digital medical records ensure continuity across visits and departments.",
  },
  {
    img: "https://picsum.photos/seed/15/600/800",
    text: "Insurance and billing assistance available at the help desk.",
  },
  {
    img: "https://picsum.photos/seed/16/600/800",
    text: "Surgical units follow strict sterilization and safety standards.",
  },
  {
    img: "https://picsum.photos/seed/17/600/800",
    text: "Community outreach programs promote early detection and awareness.",
  },
  {
    img: "https://picsum.photos/seed/18/600/800",
    text: "Our mission is simple — clear communication, correct treatment, consistent follow-up.",
  },
];

/* ===== BUILD 5 FIXED SLOTS ===== */

const strip = document.getElementById("thumbStrip");

for (let i = 0; i < 5; i++) {
  const d = document.createElement("div");
  d.className = "slide-img";
  strip.appendChild(d);
}

const slots = document.querySelectorAll(".slide-img");
const mainImg = document.getElementById("mainImg");
const aboutText = document.getElementById("aboutText");

let centerIndex = 0;
let timer;

/* ===== RENDER WINDOW OF 5 ===== */

function render() {
  slots.forEach((slot, pos) => {
    // position relative to center
    const offset = pos - 2; // center slot = 2
    let slideIndex = (centerIndex + offset + slides.length) % slides.length;

    slot.innerHTML = `<img src="${slides[slideIndex].img}">`;

    slot.className = "slide-img pos-" + pos;
    if (pos === 2) slot.classList.add("active");

    slot.onclick = () => {
      centerIndex = slideIndex;
      render();
      restartAuto();
    };
  });

  mainImg.src = slides[centerIndex].img;
  aboutText.textContent = slides[centerIndex].text;
}

/* ===== AUTO ===== */

function next() {
  centerIndex = (centerIndex + 1) % slides.length;
  render();
}

function restartAuto() {
  clearInterval(timer);
  timer = setInterval(next, 2500);
}

/* ===== INIT ===== */

render();
restartAuto();
// =====================

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  item.addEventListener("click", () => {
    faqItems.forEach((i) => {
      if (i !== item) {
        i.classList.remove("active");
        i.querySelector(".faq-answer").style.maxHeight = null;
      }
    });

    item.classList.toggle("active");
    const answer = item.querySelector(".faq-answer");

    if (item.classList.contains("active")) {
      answer.style.maxHeight = answer.scrollHeight + "px";
    } else {
      answer.style.maxHeight = null;
    }
  });
});

const firstAnswer = document.querySelector(".faq-item.active .faq-answer");
if (firstAnswer) {
  firstAnswer.style.maxHeight = firstAnswer.scrollHeight + "px";
}
// =====================================
// =====================================
// =====================================
const canvas = document.getElementById("particles-bg");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];

const colors = ["#ff4d4d", "#ffd11a", "#66ccff", "#33cc33", "#cc66ff"];

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 2;
    this.speedX = (Math.random() - 0.5) * 0.4;
    this.speedY = (Math.random() - 0.5) * 0.4;
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // Wrap around instead of bounce (more premium look)
    if (this.x > canvas.width) this.x = 0;
    if (this.x < 0) this.x = canvas.width;
    if (this.y > canvas.height) this.y = 0;
    if (this.y < 0) this.y = canvas.height;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.globalAlpha = 0.7;
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

function init() {
  particlesArray = [];
  for (let i = 0; i < 60; i++) {
    particlesArray.push(new Particle());
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particlesArray.forEach((particle) => {
    particle.update();
    particle.draw();
  });

  requestAnimationFrame(animate);
}

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

init();
animate();
