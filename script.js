const portfolioData = [
  {
    title: "Juara 3 MHQ SMP",
    img: "porto1.jpg",
    imgFallback: "porto1.jpg",
    desc: "Pada tanggal 23-24 Mei 2023, saya meraih juara ketiga dalam lomba Festival Metode Ummi Bekasi 2023 bidang Musabaqah Hifdzil Qur'an (MHQ) tingkat SMP yang diselenggarakan Ummi Bekasi."
  },
  {
    title: "15 Besar Lomba CCI",
    img: "porto2.jpg",
    imgFallback: "porto2.jpg",
    desc: "Pada tanggal 9 Maret 2023, saya bersama tim saya meraih posisi 15 besar dari 100+ sekolah dalam lomba AKSI 2023 bidang Cerdas Cermat Islam (CCI) yang diselenggarakan Dinas Pendidikan Kabupaten Bekasi."
  },
  {
    title: "Juara 2 MHQ SMP",
    img: "porto3-optimal.jpg",
    imgFallback: "porto3-optimal.jpg",
    desc: "Pada tanggal 30 September 2023, saya meraih juara kedua dalam Lomba PERISAI bidang Musabaqah Hifdzil Qur'an (MHQ) tingkat SMP yang diselenggarakan SMAN 2 Tambun Selatan."
  },
  {
    title: "Ketua OSIS",
    img: "porto4.jpg",
    imgFallback: "https://picsum.photos/seed/porto4/800/450",
    desc: "Saya terpilih sebagai Ketua OSIS di sekolah untuk periode 2023-2024. Saya memimpin berbagai kegiatan dan proker yang bermanfaat."
  },
  {
    title: "Juara 2 MHQ SMP",
    img: "porto5.jpg",
    imgFallback: "https://picsum.photos/seed/porto5/800/450",
    desc: "Pada tanggal 14 Desember 2024, saya meraih juara kedua di acara GEM FEST 2.0 Yaspia Al 'Imaroh kategori Musabaqah Hifdzil Qur'an (MHQ)."
  },
  {
    title: "Juara Harapan 2 FLS3NFG 2026",
    img: "porto6.jpg",
    imgFallback: "https://picsum.photos/seed/porto6/800/450",
    desc: "Saya berhasil meraih juara harapan 2 dalam lomba FLS3N 2026 jenjang SMA bidang fotografi yang diselenggarakan Pusat Prestasi Nasional (Puspresnas)."
  }
];

window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  setTimeout(() => loader.classList.add("hidden"), 600);
});

const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 40);
});

const progressBar = document.getElementById("scroll-progress");
window.addEventListener("scroll", () => {
  const docH = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const pct  = (window.scrollY / docH) * 100;
  progressBar.style.width = pct + "%";
});

const scrollTopBtn = document.getElementById("scroll-top");
window.addEventListener("scroll", () => {
  scrollTopBtn.classList.toggle("visible", window.scrollY > 400);
});
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

const burger     = document.getElementById("burger");
const mobileMenu = document.getElementById("mobile-menu");

burger.addEventListener("click", () => {
  mobileMenu.classList.toggle("open");
  const spans = burger.querySelectorAll("span");
  if (mobileMenu.classList.contains("open")) {
    spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
    spans[1].style.opacity   = "0";
    spans[2].style.transform = "rotate(-45deg) translate(5px, -5px)";
  } else {
    spans[0].style.transform = "";
    spans[1].style.opacity   = "";
    spans[2].style.transform = "";
  }
});

document.querySelectorAll(".mobile-link").forEach(link => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    const spans = burger.querySelectorAll("span");
    spans[0].style.transform = "";
    spans[1].style.opacity   = "";
    spans[2].style.transform = "";
  });
});

const revealEls = document.querySelectorAll(".reveal");
const observer  = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const siblings = Array.from(entry.target.parentElement.querySelectorAll(".reveal"));
        const idx = siblings.indexOf(entry.target);
        entry.target.style.transitionDelay = (idx * 80) + "ms";
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
revealEls.forEach(el => observer.observe(el));

const modal     = document.getElementById("modal");
const modalImg  = document.getElementById("modal-img");
const modalTit  = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");

document.querySelectorAll(".portfolio-item").forEach(item => {
  item.addEventListener("click", () => {
    const idx  = parseInt(item.dataset.index, 10);
    const data = portfolioData[idx];
    if (!data) return;
    modalImg.src = data.img;
    modalImg.onerror = function() { this.src = data.imgFallback; this.onerror = null; };
    modalTit.textContent  = data.title;
    modalDesc.textContent = data.desc;
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  });
});

function closeModal() {
  modal.classList.remove("open");
  document.body.style.overflow = "";
}

document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeModal();
});

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", e => {
    const target = document.querySelector(a.getAttribute("href"));
    if (target) {
      e.preventDefault();
      const offset = 72;
      const top    = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  });
});

document.querySelectorAll("audio").forEach(audio => {
  audio.addEventListener("play", () => {
    document.querySelectorAll("audio").forEach(other => {
      if (other !== audio) other.pause();
    });
  });
});

document.querySelectorAll(".song-cover-wrap").forEach(wrap => {
  const card  = wrap.closest(".song-card");
  const audio = card.querySelector("audio");
  const icon  = wrap.querySelector(".play-icon");
  if (!audio) return;
  wrap.addEventListener("click", () => {
    if (audio.paused) {
      document.querySelectorAll("audio").forEach(a => { if (a !== audio) a.pause(); });
      audio.play();
      icon.textContent = "⏸";
    } else {
      audio.pause();
      icon.textContent = "▶";
    }
  });
  audio.addEventListener("ended", () => { icon.textContent = "▶"; });
  audio.addEventListener("pause", () => { icon.textContent = "▶"; });
  audio.addEventListener("play",  () => { icon.textContent = "⏸"; });
});

let dotCount = 0;
const dotsEl = document.querySelector(".dots");
if (dotsEl) {
  setInterval(() => {
    dotCount = (dotCount + 1) % 4;
    dotsEl.textContent = ".".repeat(dotCount || 1);
  }, 400);
}

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

function setActiveNav() {
  let current = "";
  sections.forEach(sec => {
    const top = sec.offsetTop - 120;
    if (window.scrollY >= top) current = sec.getAttribute("id");
  });
  navLinks.forEach(link => {
    link.style.color      = "";
    link.style.background = "";
    if (link.getAttribute("href") === "#" + current) {
      link.style.color      = "var(--text)";
      link.style.background = "var(--accent-soft)";
    }
  });
}
window.addEventListener("scroll", setActiveNav, { passive: true });

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  const successMsg = document.getElementById("form-success");
  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    const data = new FormData(form);
    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: { "Accept": "application/json" }
      });
      if (response.ok) {
        successMsg.classList.add("show");
        form.reset();
        setTimeout(() => { successMsg.classList.remove("show"); }, 5000);
      } else {
        alert("Gagal mengirim. Coba lagi.");
      }
    } catch (error) {
      alert("Terjadi error. Cek koneksi.");
    }
  });
});

const SF_PHOTOS = [
  { src: "frame-01.jpg", title: "Bernadya Sudah Bergema", date: "8-02-2025", location: "Bekasi", desc: "f/1.9 | 1/100s | ISO 410 | 6.04 mm" },
  { src: "frame-02.jpg", title: "Toko Kopi Kala Itu", date: "20-05-2025", location: "Jogja",  desc: "f/1.9 | 1/100s | ISO 845 | 6.04 mm" },
  { src: "frame-03.jpg", title: "Api? Siapa Takut!", date: "13-10-2024", location: "Jakarta", desc: "f/1.9 | 1/100s | ISO 266 | 6.04 mm" },
  { src: "frame-04.jpg", title: "Melawan Panas Terik", date: "05-09-2024", location: "Bekasi", desc: "f/1.9 | 1/600s | ISO 50 | 6.04 mm" },
  { src: "frame-05.jpg", title: "Riuh Tahun Baru", date: "31-12-2025", location: "Bandung", desc: "f/1.9 | 1/4s | ISO 50 | 6.04 mm" },
  { src: "frame-06.jpg", title: "Warisan Leluhur", date: "20-06-2026", location: "Jakarta", desc: "f/1.9 | 1/100s | ISO 136 | 6.04 mm" }
];
 
(function () {
  "use strict";
 
  const gallery   = document.getElementById("sf-gallery");
  const track     = document.getElementById("sf-track");
  if (!gallery || !track || !SF_PHOTOS.length) return;
 
  const toggleBtn = document.getElementById("sf-toggle");
  const modalEl   = document.getElementById("sf-modal");
  const closeBtn  = document.getElementById("sf-modal-close");
  const mImg      = document.getElementById("sf-modal-img");
  const mIndex    = document.getElementById("sf-modal-index");
  const mTitle    = document.getElementById("sf-modal-title");
  const mDate     = document.getElementById("sf-modal-date");
  const mDateRow  = document.getElementById("sf-modal-date-row");
  const mLoc      = document.getElementById("sf-modal-loc");
  const mLocRow   = document.getElementById("sf-modal-loc-row");
  const mDesc     = document.getElementById("sf-modal-desc");
 
  const reduceMq = window.matchMedia("(prefers-reduced-motion: reduce)");
  const TILTS = [-2.4, 1.6, -0.9, 2.2, -1.7, 1.0, 2.5, -1.3];
  let items = [];
  let copies = 1;
  let lastFocus = null;
  let holdTimer = null;
 
  function el(tag, cls) {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    return n;
  }
 
  function measure(photo) {
    return new Promise(function (resolve) {
      const img = new Image();
      img.onload = function () {
        resolve({ ok: true, ratio: img.naturalHeight ? img.naturalWidth / img.naturalHeight : 0.8 });
      };
      img.onerror = function () { resolve({ ok: false, ratio: 0.8 }); };
      img.src = photo.src;
    });
  }
 
  function createFrame(item, index, seq, hidden) {
    const k = Math.sqrt(Math.min(Math.max(item.ratio, 0.55), 2)) * (item.size || 1);
    const tilt = typeof item.tilt === "number" ? item.tilt : TILTS[seq % TILTS.length];
 
    const frame = el("button", "sf-frame");
    frame.type = "button";
    frame.dataset.index = index;
    frame.style.setProperty("--sf-ratio", item.ratio.toFixed(4));
    frame.style.setProperty("--sf-k", k.toFixed(4));
    frame.style.setProperty("--sf-tilt", tilt + "deg");
    frame.style.setProperty("--sf-sway-dur", (6 + (index % 4)) + "s");
    frame.style.setProperty("--sf-sway-delay", (-index * 1.3) + "s");
    frame.setAttribute("aria-label", "Lihat detail foto: " + item.title);
    if (hidden) { frame.tabIndex = -1; frame.setAttribute("aria-hidden", "true"); }
 
    const photo = el("span", "sf-photo" + (item.ok ? "" : " is-missing"));
    if (item.ok) {
      const img = new Image();
      img.src = item.src;
      img.alt = "";
      img.decoding = "async";
      img.draggable = false;
      photo.appendChild(img);
    }
 
    const card = el("span", "sf-card");
    card.appendChild(photo);
 
    const idx = el("span", "sf-index");
    idx.textContent = String(index + 1).padStart(2, "0");
    card.appendChild(idx);
 
    frame.appendChild(el("span", "sf-clip"));
    frame.appendChild(card);
    return frame;
  }
 
  function buildGroup(isClone) {
    const group = el("div", "sf-group");
    if (isClone) { group.dataset.clone = "true"; group.setAttribute("aria-hidden", "true"); }
    let seq = 0;
    for (let c = 0; c < copies; c++) {
      items.forEach(function (item, i) {
        group.appendChild(createFrame(item, i, seq++, isClone || c > 0));
      });
    }
    return group;
  }
 
  function render(n) {
    copies = n;
    track.textContent = "";
    track.appendChild(buildGroup(false));
    track.appendChild(buildGroup(true));
  }
 
  function speed() {
    const w = window.innerWidth;
    return w <= 480 ? 24 : w <= 900 ? 30 : 38;
  }
 
  function layout() {
    if (!track.firstElementChild) render(1);
    const setW = track.firstElementChild.offsetWidth / copies;
    const need = reduceMq.matches ? 1 : Math.max(1, Math.ceil((gallery.clientWidth + 1) / setW));
    if (need !== copies) render(need);
    track.style.setProperty("--sf-duration", (track.firstElementChild.offsetWidth / speed()).toFixed(1) + "s");
  }
 
  let started = false;
  function start() {
    if (started) return;
    started = true;
    Promise.all(SF_PHOTOS.map(measure)).then(function (metas) {
      items = SF_PHOTOS.map(function (p, i) { return Object.assign({}, p, metas[i]); });
      layout();
      gallery.classList.add("is-ready");
    });
  }
 
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      const visible = entries[0].isIntersecting;
      gallery.classList.toggle("is-offscreen", !visible);
      if (visible) start();
    }, { rootMargin: "300px 0px" }).observe(gallery);
  } else {
    start();
  }
 
  let resizeTimer = null;
  let lastW = window.innerWidth;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      if (!items.length || window.innerWidth === lastW) return;
      lastW = window.innerWidth;
      layout();
    }, 200);
  });
 
  if (reduceMq.addEventListener) {
    reduceMq.addEventListener("change", function () { if (items.length) layout(); });
  }
 
  gallery.addEventListener("pointerdown", function (e) {
    if (e.pointerType === "mouse") return;
    clearTimeout(holdTimer);
    gallery.classList.add("is-held");
  });
  ["pointerup", "pointercancel", "pointerleave"].forEach(function (ev) {
    gallery.addEventListener(ev, function (e) {
      if (e.pointerType === "mouse") return;
      clearTimeout(holdTimer);
      holdTimer = setTimeout(function () { gallery.classList.remove("is-held"); }, 900);
    });
  });
 
  function formatDate(v) {
    if (!v) return "";
    try {
      let m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(v);
      if (m) {
        return new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "long", year: "numeric" })
          .format(new Date(+m[1], +m[2] - 1, +m[3]));
      }
      m = /^(\d{4})-(\d{2})$/.exec(v);
      if (m) {
        return new Intl.DateTimeFormat("id-ID", { month: "long", year: "numeric" })
          .format(new Date(+m[1], +m[2] - 1, 1));
      }
    } catch (e) { /* by1 kita bos */ }
    return v;
  }
 
  function sfOpen(index, trigger) {
    const item = items[index];
    if (!item) return;
    lastFocus = trigger || document.activeElement;
 
    mIndex.textContent = String(index + 1).padStart(2, "0") + " / " + String(items.length).padStart(2, "0");
    mTitle.textContent = item.title || "";
    const dateText = formatDate(item.date);
    mDate.textContent = dateText;
    mDateRow.hidden = !dateText;
    mLoc.textContent = item.location || "";
    mLocRow.hidden = !item.location;
    mDesc.textContent = item.desc || "";
 
    mImg.hidden = !item.ok;
    mImg.src = item.ok ? item.src : "";
    mImg.alt = item.alt || item.title || "";
 
    modalEl.classList.add("is-open");
    modalEl.setAttribute("aria-hidden", "false");
    gallery.classList.add("is-modal");
    document.body.style.overflow = "hidden";
    closeBtn.focus({ preventScroll: true });
  }
 
  function sfClose() {
    modalEl.classList.remove("is-open");
    modalEl.setAttribute("aria-hidden", "true");
    gallery.classList.remove("is-modal");
    document.body.style.overflow = "";
    if (lastFocus && document.contains(lastFocus)) lastFocus.focus({ preventScroll: true });
    lastFocus = null;
  }
 
  track.addEventListener("click", function (e) {
    const frame = e.target.closest(".sf-frame");
    if (frame) sfOpen(parseInt(frame.dataset.index, 10), frame);
  });
 
  closeBtn.addEventListener("click", sfClose);
  modalEl.addEventListener("click", function (e) { if (e.target === modalEl) sfClose(); });
 
  document.addEventListener("keydown", function (e) {
    if (!modalEl.classList.contains("is-open")) return;
    if (e.key === "Escape") sfClose();
    if (e.key === "Tab") { e.preventDefault(); closeBtn.focus(); } 
  });
})();
 