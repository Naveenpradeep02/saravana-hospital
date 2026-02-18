class MenuComponent {
  constructor(menuSelector, triggerSelector) {
    this.menu = document.querySelector(menuSelector);
    this.trigger = document.querySelector(triggerSelector);
    this.hamburger = document.querySelector(".hamburger");
    this.navLinks = document.querySelector(".nav-links");

    this.bindEvents();
  }

  bindEvents() {
    // Toggle Services Menu
    this.trigger.addEventListener("click", (e) => {
      e.stopPropagation();
      this.menu.classList.toggle("active");
    });

    // Click outside to close
    document.addEventListener("click", (e) => {
      if (!this.menu.contains(e.target) && !this.trigger.contains(e.target)) {
        this.menu.classList.remove("active");
      }
    });

    // Close when clicking overlay background only
    this.menu.addEventListener("click", (e) => {
      if (e.target === this.menu) {
        this.menu.classList.remove("active");
      }
    });

    // ESC key close
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.menu.classList.remove("active");
      }
    });

    // Hamburger toggle
    if (this.hamburger) {
      this.hamburger.addEventListener("click", () => {
        this.navLinks.classList.toggle("active");
      });
    }
  }
}

new MenuComponent(".sub-menu", ".services-btn");

/* cache elements */
const entryOverlay = document.getElementById("entryOverlay");
const home = document.getElementById("home");
const navLogo = document.getElementById("navLogo");
const welcomeLogo = document.getElementById("welcomeLogo");

/* ===== ENTRY PLAY ONCE ===== */

if (sessionStorage.getItem("entryDone")) {
  entryOverlay.style.display = "none";
  home.style.opacity = 1;

  // 🔥 trigger hex animation on reload
  setTimeout(() => {
    startHexAnimation();
  }, 200);
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
  // tl.to("#home", { opacity: 1, duration: 0.6 });
  tl.to("#home", {
    opacity: 1,
    duration: 0.6,
    onComplete: startHexAnimation,
  });
}

// ==================
function startHexAnimation() {
  const allHex = document.querySelectorAll(".hexagon");
  const centerHex = document.querySelector(".middle-hexagon .hex-4");

  const outerHex = [...allHex].filter((hex) => hex !== centerHex);

  // Direction-based stagger
  outerHex.forEach((hex, index) => {
    setTimeout(() => {
      hex.classList.add("show");
    }, index * 120);
  });

  // Center zoom bounce after outer
  setTimeout(() => {
    centerHex.style.animation = "centerZoomBounce 1s ease forwards";
  }, outerHex.length * 120 + 300);
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

// ====================

const facilityItems = document.querySelectorAll(".facilities-item");
const detail = document.getElementById("facilityDetail");

facilityItems.forEach((item) => {
  item.addEventListener("click", () => {
    facilityItems.forEach((i) => i.classList.remove("is-active"));
    item.classList.add("is-active");

    /* 🔥 BACKGROUND COLOR SYNC */
    detail.style.background = item.dataset.color;

    const list = item.dataset.items.split(",");

    detail.style.opacity = 0;
    detail.style.transform = "translateY(6px)";

    setTimeout(() => {
      detail.innerHTML = `<div class="background-gray"> 
        <h2 class="facilities-detail__title">
          <div class="facilities-detail__icon">⚕</div>
          ${item.dataset.title}
        </h2>
        <p>${item.dataset.desc}</p></div>
        <h3>What's Included:</h3>
        <ul>${list.map((l) => `<li>${l.trim()}</li>`).join("")}</ul>
        <div class="facilities-detail__actions">
          <button class="facilities-detail__btn btn-white">View Pediatric</button>
          <button class="facilities-detail__btn btn-green">View Adult</button>
        </div>
      `;
      detail.style.opacity = 1;
      detail.style.transform = "translateY(0)";
    }, 200);
  });
});
// =================================================

let isMobile = window.innerWidth <= 768;

const cards = Array.from(document.querySelectorAll(".card"));
const lTitle = document.getElementById("lTitle");
const lDesc = document.getElementById("lDesc");

let isAnimating = false;

const X_STEP = 30;
const Z_STEP = 50;
const OPACITY_STEP = 0.1;

const EXIT_X = window.innerWidth <= 768 ? -280 : -520;
const EXIT_Z = -1200;
const DURATION = 900;

function applyStack() {
  cards.forEach((card, i) => {
    const x = i * X_STEP;
    const z = i * Z_STEP;
    const opacity = 1 - i * OPACITY_STEP;

    card.style.transition =
      "transform 0.8s cubic-bezier(.4,0,.2,1), opacity 0.8s ease";

    if (isMobile) {
      card.style.transform = "none";
    } else {
      card.style.transform = `
    translateX(${x}px)
    translateZ(${-z}px)
  `;
    }

    card.style.opacity = opacity;
    card.style.zIndex = 100 - i;
  });

  /* COLOR SYNC */
  const activeColor = cards[0].dataset.color || "#4f9648";
  document.documentElement.style.setProperty("--accent", activeColor);

  lTitle.innerText = cards[0].dataset.title;
  lDesc.innerText = cards[0].dataset.desc;

  function darkenColor(color, percent) {
    const num = parseInt(color.replace("#", ""), 16),
      amt = Math.round(2.55 * percent),
      R = (num >> 16) - amt,
      G = ((num >> 8) & 0x00ff) - amt,
      B = (num & 0x0000ff) - amt;

    return (
      "#" +
      (
        0x1000000 +
        (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
        (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
        (B < 255 ? (B < 1 ? 0 : B) : 255)
      )
        .toString(16)
        .slice(1)
    );
  }

  const darkColor = darkenColor(activeColor.trim(), 30);

  document.querySelectorAll(".card h2").forEach((h) => {
    h.style.color = darkColor;
  });

  lTitle.style.color = darkColor;
}

function next() {
  if (isAnimating) return;
  isAnimating = true;

  const front = cards[0];

  front.style.transition =
    "transform 0.9s cubic-bezier(.22,1,.36,1), opacity 0.9s ease";

  front.style.transform = `
    translateX(${EXIT_X}px)
    translateZ(${EXIT_Z}px)
  `;

  front.style.opacity = 1;

  setTimeout(() => {
    cards.push(cards.shift());

    const backIndex = cards.length - 1;
    const backCard = cards[backIndex];

    backCard.style.transition = "none";

    backCard.style.transform = `
      translateX(${backIndex * X_STEP}px)
      translateZ(${-backIndex * Z_STEP}px)
    `;

    backCard.style.opacity = 1 - backIndex * OPACITY_STEP;

    requestAnimationFrame(() => {
      applyStack();
      isAnimating = false;
    });
  }, DURATION);
}

function prev() {
  if (isAnimating) return;
  isAnimating = true;

  const last = cards[cards.length - 1];
  cards.unshift(cards.pop());

  last.style.transition = "none";

  last.style.transform = `
    translateX(${EXIT_X}px)
    translateZ(${EXIT_Z}px)
  `;

  last.style.opacity = 1;

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      applyStack();
      isAnimating = false;
    });
  });
}

document.getElementById("next").onclick = () => {
  next();
  resetAuto();
};

document.getElementById("prev").onclick = () => {
  prev();
  resetAuto();
};

let auto1 = setInterval(next, 9000);

function resetAuto() {
  clearInterval(auto1);
  auto1 = setInterval(next, 9000);
}

applyStack();

const services = [
  {
    title: "General Medicine",
    link: "#",
    left: "Sometimes you just need a doctor who can figure out what's wrong. Our general physicians handle everything from fever and infections to chronic conditions like diabetes and hypertension, giving you clear answers and practical treatment.",
    right: [
      "Diabetes & Thyroid Management",
      "Hypertension & Heart Health",
      "Fever, Infections & Viral Illnesses",
      "Health Check-Ups & Preventive Care",
      "Same-Day Appointments Available for Urgent Cases",
    ],
    cta: "See a General Physician",
    img: "./img/Medical 3d.png",
    color: "#4d6eb0",
  },
  {
    title: "Dermatology",
    link: "#",
    left: "Skin problems can affect how you feel about yourself. Our dermatologists treat everything from stubborn acne to serious skin conditions, helping you look better and feel more confident in your own skin.",
    right: [
      "Acne, Pigmentation & Scar Treatment",
      "Hair Fall & Scalp Disorders",
      "Eczema, Psoriasis & Skin Allergies",
      "Cosmetic Dermatology Procedures",
      "Advanced Skin Analysis & Personalized Treatment Plans",
    ],
    cta: "Book Your Skin Consultation",
    img: "./img/Dermatology 3D.png",
    color: "#bd80b8",
  },

  {
    title: "Surgical Specialties",
    link: "#",
    left: "From minor procedures to major operations, our surgical team brings years of experience to the table. We handle everything with precision, using modern techniques that mean faster recovery and less discomfort for you.",
    right: [
      "General Surgery (Appendix, Hernia, Gallbladder)",
      "Laparoscopic Procedures",
      "Trauma & Accident Care",
      "Wound Management",
      "Advanced Operation Theaters with Post-Op ICU Care",
    ],
    cta: "Book a Surgical Consultation",
    img: "./img/Surgery 3d.png",
    color: "#fdd82a",
  },
  {
    title: "Maternity & Fertility",
    link: "#",
    left: "Bringing a baby into the world is special, and we treat it that way. Whether you're planning pregnancy, expecting, or need fertility support, our maternity team guides you through every step with care and expertise.",
    right: [
      "Normal & Cesarean Deliveries",
      "High-Risk Pregnancy Management",
      "Fertility Consultations & Treatment",
      "Prenatal & Postnatal Care",
      "24/7 Delivery Suite with Experienced Obstetricians",
    ],
    cta: "Talk to Our Maternity Team",
    img: "./img/OBG 3D.png",
    color: "#48388d",
  },
  {
    title: "Pediatrics",
    link: "#",
    left: "Kids aren't just small adults—they need doctors who understand growing bodies and worried parents. Our pediatricians treat your child with gentle care while keeping you informed every step of the way.",
    right: [
      "Newborn & Infant Care",
      "Childhood Vaccinations (Complete Schedule)",
      "Growth & Development Monitoring",
      "Common Childhood Illnesses",
      "Child-Friendly Environment with Experienced Pediatricians",
    ],
    cta: "Bring Your Child In",
    img: "./img/pediatric 3d.png",
    color: "#fa6880",
  },
  {
    title: "ENT (Ear, Nose & Throat)",
    link: "#",
    left: "Trouble hearing? Constant sinus headaches? Throat pain that won't quit? Our ENT specialists diagnose and treat conditions affecting your ears, nose, and throat so you can breathe easier, hear better, and feel relief.",
    right: [
      "Sinusitis & Nasal Blockage",
      "Ear Infections & Hearing Problems",
      "Tonsillitis & Throat Disorders",
      "Voice & Sleep Apnea Issues",
      "In-House Endoscopy & Audiometry Testing",
    ],
    cta: "Get ENT Relief Today",
    img: "./img/ENT 3DD.png",
    color: "#4b9342",
  },
];

const hexBlocks = document.querySelectorAll(".hex-service-block");
const leftText = document.querySelector(".inner-left-service p");
const rightList = document.querySelector(".inner-right-service ul");
const middleImg = document.querySelector(".inner-middle-img img");
const ctaBtn = document.querySelector(".middle-service-btn");
const leftBg = document.querySelector(".bg-inner-section-left");
const rightBg = document.querySelector(".bg-inner-section-right");
const middleHex = document.querySelector(".service-middle-img");

function updateService(index) {
  const data = services[index];

  leftText.textContent = data.left;

  rightList.innerHTML = "";
  data.right.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    rightList.appendChild(li);
  });

  middleImg.src = data.img;
  ctaBtn.textContent = data.cta;
  ctaBtn.href = data.link;

  leftBg.style.backgroundColor = data.color;
  rightBg.style.backgroundColor = data.color;
  middleHex.style.backgroundColor = data.color;

  hexBlocks.forEach((hex) => hex.classList.remove("active"));
  hexBlocks[index].classList.add("active");
}

hexBlocks.forEach((hex, index) => {
  hex.addEventListener("click", () => {
    updateService(index);
  });
});

// // Entrance Animation
// window.addEventListener("load", () => {
//   document.querySelector(".main-service-content").style.transition =
//     "all 0.6s ease";
//   document.querySelector(".main-service-content").style.opacity = "1";
//   document.querySelector(".main-service-content").style.transform =
//     "translateY(0)";
// });
