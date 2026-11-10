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
  { src: "frame-01.jpg", title: "Bernadya Sudah Bergema", date: "08-02-2025", location: "Bekasi", desc: "f/1.9 | 1/100s | ISO 410 | 6.04 mm" },
  { src: "frame-02.jpg", title: "Museum Kala Itu", date: "20-05-2025", location: "Jogja",  desc: "f/1.9 | 1/100s | ISO 1905 | 6.04 mm" },
  { src: "frame-03.jpg", title: "Api? Siapa Takut!", date: "13-10-2025", location: "Jakarta", desc: "f/1.9 | 1/100s | ISO 266 | 6.04 mm" },
  { src: "frame-04.jpg", title: "Melawan Panas Terik", date: "05-09-2024", location: "Bekasi", desc: "f/1.9 | 1/600s | ISO 50 | 6.04 mm" },
  { src: "frame-05.jpg", title: "Riuh Tahun Baru", date: "31-12-2025", location: "Bandung", desc: "f/1.9 | 1/4s | ISO 50 | 6.04 mm" },
  { src: "frame-06.jpg", title: "Warisan Leluhur", date: "20-06-2026", location: "Jakarta", desc: "f/1.9 | 1/100s | ISO 136 | 6.04 mm" },
  { src: "frame-07.jpg", title: "Pisau Sang Komando", date: "06-10-2024", location: "Jakarta", desc: "f/1.9 | 1/580s | ISO 50 | 6.04 mm" },
  { src: "frame-08.jpg", title: "Mekar Seperti Hatiku", date: "24-11-2024", location: "Bogor", desc: "f/1.9 | 1/105s | ISO 50 | 6.04 mm" },
  { src: "frame-09.jpg", title: "Abadikanlah Sekitarmu", date: "05-05-2026", location: "Jakarta", desc: "f/1.9 | 1/500s | ISO 50 | 6.04 mm" },
  { src: "frame-10.jpg", title: "Senja Bagi Si Rabun", date: "06-09-2024", location: "Bekasi", desc: "f/1.9 | 1/35s | ISO 336 | 6.04 mm" },
  { src: "frame-11.jpg", title: "Perayaan Merah Putih", date: "19-07-2026", location: "Jakarta", desc: "f/1.9 | 1/600s | ISO 50 | 6.04 mm" },
  { src: "frame-12.jpg", title: "Berpayung Hangat Mentari", date: "29-11-2024", location: "Bekasi", desc: "f/1.9 | 1/500s | ISO 50 | 6.04 mm" }
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

(function () {
  "use strict";
 
  const CFG = {
    speedDesktop: 90,
    speedTablet: 70,
    speedMobile: 55,
    inertia: 0.7,
    maxSpeed: 2600,
    wheelGain: 5,
    keyImpulse: 450,
    dragThreshold: 6,
    wheelVertical: true
  };
 
  const gallery = document.getElementById("sf-gallery");
  const track   = document.getElementById("sf-track");
  if (!gallery || !track) return;
 
  const reduceMq = window.matchMedia("(prefers-reduced-motion: reduce)");
  const hasRO = "ResizeObserver" in window;
 
  let pos = 0;
  let v = 0;
  let G = 0;
  let enabled = false;
  let hovering = false;
  let down = false, dragging = false, pid = null;
  let startX = 0, lastX = 0, lastT = 0, dragV = 0;
  let suppressClick = false;
 
  function clamp(n) { return Math.max(-CFG.maxSpeed, Math.min(CFG.maxSpeed, n)); }
 
  function baseSpeed() {
    const w = window.innerWidth;
    return w <= 480 ? CFG.speedMobile : w <= 900 ? CFG.speedTablet : CFG.speedDesktop;
  }
 
  function modalOpen() { return gallery.classList.contains("is-modal"); }
 
  function measure() {
    const g = track.firstElementChild;
    G = g ? g.offsetWidth : 0;
  }
 
  function focusPaused() {
    const a = document.activeElement;
    try { return !!(a && gallery.contains(a) && a.matches(":focus-visible")); }
    catch (e) { return false; }
  }
 
  function autoPaused() {
    return hovering || down || gallery.classList.contains("is-paused") || modalOpen() || focusPaused();
  }
 
  function enable() {
    enabled = true;
    measure();
    gallery.classList.add("sf-js");
  }
 
  function disable() {
    enabled = false;
    down = false; dragging = false;
    gallery.classList.remove("sf-js", "sf-dragging");
    track.style.transform = "";
  }
 
  if (hasRO) new ResizeObserver(measure).observe(track);
 
  let last = performance.now();
  function tick(now) {
    requestAnimationFrame(tick);
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
 
    const ready = !reduceMq.matches && gallery.classList.contains("is-ready") && track.firstElementChild;
    if (!ready) { if (enabled) disable(); return; }
    if (!enabled) enable();
    if (!hasRO) measure();
    if (!G || gallery.classList.contains("is-offscreen")) return;
 
    if (dragging) {
      v = dragV;
    } else {
      const target = autoPaused() ? 0 : baseSpeed();
      v += (target - v) * (1 - Math.exp(-dt / CFG.inertia));
      pos += v * dt;
    }
 
    const offset = ((pos % G) + G) % G;
    track.style.transform = "translate3d(" + (-offset).toFixed(2) + "px,0,0)";
  }
  requestAnimationFrame(tick);
 
  gallery.addEventListener("pointerenter", function (e) { if (e.pointerType === "mouse") hovering = true; });
  gallery.addEventListener("pointerleave", function (e) { if (e.pointerType === "mouse") hovering = false; });
 
  gallery.addEventListener("pointerdown", function (e) {
    if (!enabled || modalOpen()) return;
    if (e.pointerType === "mouse" && e.button !== 0) return;
    down = true; dragging = false;
    pid = e.pointerId;
    startX = lastX = e.clientX;
    lastT = e.timeStamp;
    dragV = 0;
  });
 
  gallery.addEventListener("pointermove", function (e) {
    if (!down || e.pointerId !== pid) return;
    if (!dragging) {
      if (Math.abs(e.clientX - startX) < CFG.dragThreshold) return;
      dragging = true;
      gallery.classList.add("sf-dragging");
      try { gallery.setPointerCapture(pid); } catch (err) { /* ff or pubg? */ }
    }
    const dx = e.clientX - lastX;
    const dt = Math.max(e.timeStamp - lastT, 1) / 1000;
    pos -= dx;
    dragV = dragV * 0.6 + (-dx / dt) * 0.4;
    lastX = e.clientX;
    lastT = e.timeStamp;
  });
 
  function endDrag(e) {
    if (!down || e.pointerId !== pid) return;
    const wasDragging = dragging;
    down = false; dragging = false;
    gallery.classList.remove("sf-dragging");
    try { if (gallery.hasPointerCapture(pid)) gallery.releasePointerCapture(pid); } catch (err) { /* i love her... */ }
    if (wasDragging) {
      v = (e.timeStamp - lastT > 80) ? 0 : Math.max(-CFG.maxSpeed, Math.min(CFG.maxSpeed, dragV));
      suppressClick = true;
      setTimeout(function () { suppressClick = false; }, 60);
    }
  }
  gallery.addEventListener("pointerup", endDrag);
  gallery.addEventListener("pointercancel", endDrag);
 
  gallery.addEventListener("click", function (e) {
    if (suppressClick) { e.stopPropagation(); e.preventDefault(); }
  }, true);
 
  gallery.addEventListener("wheel", function (e) {
    if (!enabled || modalOpen()) return;
    let dx = e.deltaX, dy = e.deltaY;
    if (e.deltaMode === 1) { dx *= 16; dy *= 16; }
    else if (e.deltaMode === 2) { dx *= gallery.clientWidth; dy *= gallery.clientWidth; }
    const horizontal = Math.abs(dx) > Math.abs(dy);
    if (!horizontal && !CFG.wheelVertical) return;
    e.preventDefault();
    v = clamp(v + (horizontal ? dx : dy) * CFG.wheelGain);
  }, { passive: false });
 
  function galleryInView() {
    const r = gallery.getBoundingClientRect();
    const visible = Math.min(r.bottom, window.innerHeight) - Math.max(r.top, 0);
    return visible > r.height * 0.4;
  }
 
  document.addEventListener("keydown", function (e) {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    if (!enabled || modalOpen()) return;
    if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
    const t = e.target;
    if (t && (/^(INPUT|TEXTAREA|SELECT|AUDIO)$/.test(t.tagName) || t.isContentEditable)) return;
    if (!galleryInView()) return;
    e.preventDefault();
    v = clamp(v + (e.key === "ArrowRight" ? CFG.keyImpulse : -CFG.keyImpulse));
  });
})();

 (function () {
  "use strict";

  const KEY  = "reystudio:stars:v1";
  const NS   = "http://www.w3.org/2000/svg";
  const PASS = /^(DIV|SECTION|MAIN|UL|NAV|HEADER)$/;

  const layer = document.createElement("div");
  layer.id = "star-layer";
  layer.setAttribute("aria-hidden", "true");
  document.body.prepend(layer);

  const stars = [];         
  let W = 0, H = 0;         
  let ref = null;           
  let drag = null;
  let swallow = false;

  const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
  const lerp  = (a, b, t) => a + (b - a) * t;
  const f     = n => n.toFixed(1);
  const cellSize = () => clamp(W * 0.24, 280, 380);

  function seeded(a) {
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  
  function doodlePath(rand) {
    const rnd = (a, b) => lerp(a, b, rand());
    const R = rnd(9.5, 11), rot = rnd(-0.3, 0.3);
    const pt = (a, r) => [12 + Math.cos(a) * r, 12 + Math.sin(a) * r];

    if (rand() < 0.5) {                 
      const rin = R * rnd(0.42, 0.52), p = [];
      for (let i = 0; i < 10; i++) {
        const a = -Math.PI / 2 + rot + i * Math.PI / 5 + rnd(-0.07, 0.07);
        p.push(pt(a, (i % 2 ? rin : R) * rnd(0.9, 1.08)));
      }
      p.push([p[0][0] + rnd(-0.6, 1.4), p[0][1] + rnd(0.2, 1.8)]);
      return "M" + p.map(q => f(q[0]) + " " + f(q[1])).join("L");
    }

    const v = [];                             
    for (let i = 0; i < 5; i++) {
      v.push(pt(-Math.PI / 2 + rot + i * 2 * Math.PI / 5 + rnd(-0.06, 0.06), R * rnd(0.92, 1.06)));
    }
    const order = [0, 2, 4, 1, 3, 0];
    let d = "M" + f(v[0][0]) + " " + f(v[0][1]);
    for (let i = 1; i < order.length; i++) {
      const a = v[order[i - 1]];
      let b = v[order[i]];
      if (i === order.length - 1) b = [b[0] + rnd(-0.7, 0.7), b[1] + rnd(-0.7, 0.7)];
      d += "Q" + f((a[0] + b[0]) / 2 + rnd(-0.9, 0.9)) + " " + f((a[1] + b[1]) / 2 + rnd(-0.9, 0.9)) +
           " " + f(b[0]) + " " + f(b[1]);
    }
    return d;
  }

  function makeStar(x, y, seed) {
    const rand = seeded(seed);
    const size = Math.round(rand() < 0.8 ? lerp(8, 12, rand()) : lerp(12, 16, rand()));
    const el = document.createElement("div");
    el.className = "star";
    el.dataset.tone = String(1 + Math.floor(rand() * 3));
    el.style.width = el.style.height = size + "px";
    el.style.setProperty("--r", Math.round(lerp(-25, 25, rand())) + "deg");

    const svg = document.createElementNS(NS, "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    const path = document.createElementNS(NS, "path");
    path.setAttribute("d", doodlePath(rand));
    svg.appendChild(path);
    el.appendChild(svg);
    layer.appendChild(el);

    const s = { el, size, seed, x, y };
    stars.push(s);
    return s;
  }

  const px = s => clamp(s.x, s.size / 2, Math.max(s.size / 2, W - s.size / 2));
  const py = s => clamp(s.y, s.size / 2, Math.max(s.size / 2, H - s.size / 2));
  function paint(s) {
    s.el.style.transform =
      "translate(" + f(px(s) - s.size / 2) + "px," + f(py(s) - s.size / 2) + "px)";
  }

  function populate(y0, y1) {
    const c = cellSize();
    const cols = Math.max(1, Math.floor(W / c));
    const rows = Math.max(1, Math.round((y1 - y0) / c));
    const cw = W / cols, ch = (y1 - y0) / rows;
    for (let r = 0; r < rows; r++) {
      for (let k = 0; k < cols; k++) {
        if (Math.random() < 0.28) continue;    
        makeStar(
          (k + lerp(0.2, 0.8, Math.random())) * cw,
          y0 + (r + lerp(0.2, 0.8, Math.random())) * ch,
          Math.floor(Math.random() * 2147483647)
        );
      }
    }
  }

  function save() {
    if (!ref) return;
    try {
      localStorage.setItem(KEY, JSON.stringify({
        v: 1, w: ref.w, h: ref.h,
        s: stars.map(s => [+s.x.toFixed(1), +s.y.toFixed(1), s.seed])
      }));
    } catch (e) {  }
  }
  let saveTimer = 0;
  function saveSoon() { clearTimeout(saveTimer); saveTimer = setTimeout(save, 250); }

  function load() {
    try {
      const d = JSON.parse(localStorage.getItem(KEY));
      if (!d || d.v !== 1 || !Array.isArray(d.s) || !(d.w > 0) || !(d.h > 0)) return null;
      const s = d.s.slice(0, 300).filter(a => Array.isArray(a) && a.length >= 3 && a.every(Number.isFinite));
      return s.length ? { w: d.w, h: d.h, s } : null;
    } catch (e) { return null; }
  }

  function relayout() {
    const nw = layer.offsetWidth, nh = layer.offsetHeight;
    if (!nw || !nh || !ref) return;
    W = nw; H = nh;
    let changed = false;

    if (Math.abs(W - ref.w) >= 2) {
      const kx = W / ref.w, ky = H / ref.h;
      stars.forEach(s => { s.x *= kx; s.y *= ky; });
      ref.w = W; ref.h = H;
      changed = true;
    } else if (H - ref.h >= cellSize()) {  
      populate(ref.h, H);
      ref.h = H;
      changed = true;
    }                                        

    stars.forEach(paint);
    if (drag) follow();
    if (changed) saveSoon();
  }

  const isClear = c => c === "transparent" || /^rgba\([^)]*,\s*0\)$/.test(c) || /\/\s*0\)$/.test(c);

  function isOpen(cx, cy) {
    let el = document.elementFromPoint(cx, cy);
    if (!el) return false;
    const t = el.tagName;
    if (t !== "HTML" && t !== "BODY" && !PASS.test(t)) return false;
    for (; el && el !== document.body && el !== document.documentElement; el = el.parentElement) {
      const cs = getComputedStyle(el);
      if (!isClear(cs.backgroundColor) || cs.backgroundImage !== "none") return false;
    }
    return true;
  }

  function pick(cx, cy, touch) {
    if (!stars.length) return null;
    const r = layer.getBoundingClientRect();  
    const x = cx - r.left, y = cy - r.top;
    let best = null, bd = Infinity;
    for (const s of stars) {
      const d = Math.hypot(x - px(s), y - py(s));
      const reach = Math.max(s.size / 2, touch ? 22 : 12);
      if (d <= reach && d < bd) { best = s; bd = d; }
    }
    return best && isOpen(cx, cy) ? best : null;
  }

  
  let lastX = 0, lastY = 0, autoRaf = 0;

  function follow() {                      
    if (!drag) return;
    const r = layer.getBoundingClientRect(), s = drag.s, h = s.size / 2;
    s.x = clamp(lastX - r.left - drag.ox, h, Math.max(h, W - h));
    s.y = clamp(lastY - r.top  - drag.oy, h, Math.max(h, H - h));
    paint(s);
  }

  function autoScroll() {                     
    autoRaf = 0;
    if (!drag) return;
    const m = 60, vh = window.innerHeight;
    let v = 0;
    if (lastY < m) v = -(m - Math.max(lastY, 0)) / m;
    else if (lastY > vh - m) v = (Math.min(lastY, vh) - (vh - m)) / m;
    if (!v) return;
    const dy = Math.round(v * 16);
    try { window.scrollBy({ top: dy, left: 0, behavior: "instant" }); }  
    catch (e) { window.scrollBy(0, dy); }
    follow();
    autoRaf = requestAnimationFrame(autoScroll);
  }

  document.addEventListener("pointerdown", e => {
    if (drag || !e.isPrimary || (e.pointerType === "mouse" && e.button !== 0)) return;
    const s = pick(e.clientX, e.clientY, e.pointerType !== "mouse");
    if (!s) return;
    e.preventDefault();
    e.stopPropagation();                       
    const r = layer.getBoundingClientRect();
    s.x = px(s); s.y = py(s);                 
    lastX = e.clientX; lastY = e.clientY;
    drag = {
      s, id: e.pointerId,
      ox: e.clientX - r.left - s.x,           
      oy: e.clientY - r.top  - s.y
    };
    s.el.classList.add("is-held");
    document.body.classList.add("star-dragging");
    document.body.classList.remove("star-hover");
  }, true);

  window.addEventListener("pointermove", e => {
    if (!drag || e.pointerId !== drag.id) return;
    lastX = e.clientX; lastY = e.clientY;
    follow();
    if (!autoRaf) autoRaf = requestAnimationFrame(autoScroll);
  });

  window.addEventListener("scroll", follow, { passive: true });  

  function endDrag(e) {
    if (!drag || e.pointerId !== drag.id) return;
    drag.s.el.classList.remove("is-held");
    document.body.classList.remove("star-dragging");
    cancelAnimationFrame(autoRaf); autoRaf = 0;
    drag = null;
    swallow = true; setTimeout(() => { swallow = false; }, 60);
    save();
  }
  window.addEventListener("pointerup", endDrag);
  window.addEventListener("pointercancel", endDrag);
  window.addEventListener("blur", () => { if (drag) endDrag({ pointerId: drag.id }); });

  document.addEventListener("click", e => {
    if (swallow) { e.preventDefault(); e.stopPropagation(); }
  }, true);

  const blockScroll = e => { if (drag) e.preventDefault(); };
  document.addEventListener("touchstart", blockScroll, { passive: false, capture: true });
  document.addEventListener("touchmove", blockScroll, { passive: false });

  let hRaf = 0, mx = 0, my = 0;
  window.addEventListener("pointermove", e => {
    if (e.pointerType !== "mouse" || drag) return;
    mx = e.clientX; my = e.clientY;
    if (hRaf) return;
    hRaf = requestAnimationFrame(() => {
      hRaf = 0;
      document.body.classList.toggle("star-hover", !!pick(mx, my, false));
    });
  });

  function init() {
    W = layer.offsetWidth; H = layer.offsetHeight;
    if (!W || !H) return;

    const saved = load();
    if (saved) {
      ref = { w: saved.w, h: saved.h };
      saved.s.forEach(a => makeStar(a[0], a[1], a[2]));
    } else {
      ref = { w: W, h: H };
      populate(0, H);
      save();
    }
    relayout();                               

    let raf = 0;
    const schedule = () => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; relayout(); }); };
    if ("ResizeObserver" in window) new ResizeObserver(schedule).observe(layer);
    else window.addEventListener("resize", schedule);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(schedule);
  }

  if (document.readyState === "complete") init();
  else window.addEventListener("load", init, { once: true });
})();

const VINYL_ALBUMS = [
  {
    id: 1,
    title: "There Is a Light That Never Goes Out",
    artist: "The Smiths",
    cover: "The-Queen-is-Dead-cover.png",
    audio: "The_Smiths_There_Is_a_Light_That_Never_Goes_Out_2011_Remaster.mp3"
  },
  {
    id: 2,
    title: "Alexandra",
    artist: "Hindia",
    cover: "lagipulahidupakanberakhir.jpeg",
    audio: "Hindia - Alexandra.mp3"
  },
  {
    id: 3,
    title: "Hey Jude",
    artist: "The Beatles",
    cover: "heyjudealbum.jpeg",
    audio: "The Beatles - Hey Jude (2015 Mix).mp3"
  },
  {
    id: 4,
    title: "Stargazing",
    artist: "Farrel Hilal",
    cover: "stargazing.jpg",
    audio: "Stargazing.mp3"
  },
  {
    id: 5,
    title: "Selaras",
    artist: "Kunto Aji, Nadin Amizah",
    cover: "selaras.jpg",
    audio: "Selaras - Kunto Aji & Nadin Amizah [Lirik].mp3"
  },
  {
    id: 6,
    title "Dewi",
    artist: "Alexa",
    cover: "dewi.jpg",
    audio: "Alexa_-_Dewi_(mp3.pm).mp3"
];

(function () {
  "use strict";

  const deck = document.getElementById("vp-deck");
  const cabinet = document.getElementById("vs-cabinet");
  if (!deck || !cabinet || !VINYL_ALBUMS.length) return;

  const $ = id => document.getElementById(id);
  const labelImg = $("vp-label-img"), titleEl = $("vp-title"), artistEl = $("vp-artist"),
        noteEl = $("vp-note"), curEl = $("vp-cur"), durEl = $("vp-dur"), seek = $("vp-seek"),
        playBtn = $("vp-play"), prevBtn = $("vp-prev"), nextBtn = $("vp-next"), knob = $("vp-knob");

  
  const playlist = [];
  VINYL_ALBUMS.forEach(function (a, ai) {
    const tracks = Array.isArray(a.tracks) && a.tracks.length ? a.tracks : [{ title: a.title, audio: a.audio }];
    tracks.forEach(function (t) {
      playlist.push({ album: ai, title: t.title || a.title, artist: t.artist || a.artist, audio: t.audio });
    });
  });

  const audio = new Audio();
  audio.preload = "metadata";
  let cur = 0, wantPlay = false, seeking = false, switching = false, vol = 0.7;

  function fmt(s) {
    if (!isFinite(s) || s < 0) s = 0;
    return Math.floor(s / 60) + ":" + String(Math.floor(s % 60)).padStart(2, "0");
  }
  function setNote(msg) { noteEl.hidden = !msg; noteEl.textContent = msg || ""; }

  VINYL_ALBUMS.forEach(function (a) { const p = new Image(); p.src = a.cover; });
  
  const albumBtns = [];
  (function buildShelf() {
    const cells = Math.max(6, Math.ceil(VINYL_ALBUMS.length / 2) * 2);
    for (let i = 0; i < cells; i++) {
      const cell = document.createElement("div");
      cell.className = "vs-cell";
      const a = VINYL_ALBUMS[i];
      if (a) {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "vs-album";
        b.setAttribute("aria-label", "Putar album: " + a.title);
        b.setAttribute("aria-pressed", "false");
        const img = new Image();
        img.alt = ""; img.draggable = false; img.src = a.cover;
        img.addEventListener("error", function () { b.classList.add("is-missing"); img.remove(); });
        b.appendChild(img);
        b.addEventListener("click", function () { onAlbumClick(i); });
        cell.appendChild(b);
        albumBtns.push(b);
      }
      cabinet.appendChild(cell);
    }
  })();


  function stopUI() {
    deck.classList.remove("is-arm-down", "is-spinning");
    playBtn.classList.remove("is-playing");
    playBtn.setAttribute("aria-label", "Putar");
  }
  function updateSeekUI() {
    const max = parseFloat(seek.max) || 0;
    seek.style.setProperty("--p", (max ? (parseFloat(seek.value) / max) * 100 : 0) + "%");
  }
  function showTrack() {
    const t = playlist[cur], alb = VINYL_ALBUMS[t.album];
    titleEl.textContent = t.title;
    artistEl.textContent = t.artist;
    labelImg.style.visibility = "visible";
    labelImg.src = alb.cover;
    albumBtns.forEach(function (b, i) {
      const on = i === t.album;
      b.classList.toggle("is-selected", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
    seek.value = 0; seek.max = 100; seek.disabled = true;
    curEl.textContent = "0:00"; durEl.textContent = "0:00";
    updateSeekUI();
  }
  labelImg.addEventListener("error", function () { labelImg.style.visibility = "hidden"; });


  function showError() {
    switching = false;
    stopUI();
    setNote("Audio tidak dapat diputar. Periksa path berkas lagu di VINYL_ALBUMS.");
  }
  function play() {
    wantPlay = true;
    const p = audio.play();
    if (p && p.catch) p.catch(function (err) {
      if (!err || err.name === "AbortError") return;
      if (err.name === "NotAllowedError") { wantPlay = false; switching = false; stopUI(); return; }
      showError();
    });
  }
  function loadTrack(i, autoplay) {
    cur = (i + playlist.length) % playlist.length;
    setNote("");
    showTrack();
    switching = !!autoplay && (switching || !audio.paused);
    audio.src = playlist[cur].audio;
    audio.load();
    if (autoplay) play(); else { switching = false; wantPlay = false; }
  }
  function toggle() { if (audio.paused) play(); else audio.pause(); }


  function isPlaying() { return switching || (!audio.paused && !audio.ended); }

  function onAlbumClick(ai) {
    if (playlist[cur].album === ai) return;
    loadTrack(playlist.findIndex(function (t) { return t.album === ai; }), isPlaying());
  }
  playBtn.addEventListener("click", toggle);
  nextBtn.addEventListener("click", function () { loadTrack(cur + 1, isPlaying()); });
  prevBtn.addEventListener("click", function () {
    if (audio.currentTime > 3) { audio.currentTime = 0; return; }
    loadTrack(cur - 1, isPlaying());
  });

 
  audio.addEventListener("play", function () {
    deck.classList.add("is-arm-down");               
    playBtn.classList.add("is-playing");
    playBtn.setAttribute("aria-label", "Jeda");
  });
  audio.addEventListener("playing", function () {
    setNote("");
    switching = false;
    deck.classList.add("is-spinning");             
  });
  function stopUnlessSwitching() {
    if (switching || (audio.ended && cur < playlist.length - 1)) return;
    stopUI();
  }
  audio.addEventListener("pause", stopUnlessSwitching);
  audio.addEventListener("emptied", stopUnlessSwitching);
  audio.addEventListener("ended", function () {
    if (cur < playlist.length - 1) switching = true; else stopUI();
    if (cur < playlist.length - 1) loadTrack(cur + 1, true);
    else { audio.currentTime = 0; wantPlay = false; }
  });
  audio.addEventListener("error", function () { if (wantPlay) showError(); else stopUI(); });
  function onDuration() {
    const d = audio.duration;
    if (!isFinite(d) || d <= 0) return;
    seek.max = d; seek.disabled = false;
    durEl.textContent = fmt(d);
    updateSeekUI();
  }
  audio.addEventListener("loadedmetadata", onDuration);
  audio.addEventListener("durationchange", onDuration);
  audio.addEventListener("timeupdate", function () {
    curEl.textContent = fmt(audio.currentTime);
    if (!seeking) { seek.value = audio.currentTime; updateSeekUI(); }
  });
  seek.addEventListener("input", function () {
    seeking = true;
    curEl.textContent = fmt(parseFloat(seek.value));
    updateSeekUI();
    if (isFinite(audio.duration)) audio.currentTime = parseFloat(seek.value);
  });
  seek.addEventListener("change", function () { seeking = false; });


  const K_MIN = -135, K_MAX = 135;
  let rot = K_MIN + vol * (K_MAX - K_MIN);
  let kDrag = null;

  function applyVolume() {
    vol = (rot - K_MIN) / (K_MAX - K_MIN);
    audio.volume = Math.max(0, Math.min(1, vol));
    knob.style.setProperty("--k", rot.toFixed(1) + "deg");
    knob.setAttribute("aria-valuenow", String(Math.round(vol * 100)));
  }
  function pointerAngle(e) {
    const r = knob.getBoundingClientRect();
    return Math.atan2(e.clientY - (r.top + r.height / 2), e.clientX - (r.left + r.width / 2)) * 180 / Math.PI;
  }
  knob.addEventListener("pointerdown", function (e) {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    e.preventDefault();
    kDrag = { id: e.pointerId, last: pointerAngle(e) };
    try { knob.setPointerCapture(e.pointerId); } catch (err) {}
  });
  knob.addEventListener("pointermove", function (e) {
    if (!kDrag || e.pointerId !== kDrag.id) return;
    const a = pointerAngle(e);
    let d = a - kDrag.last;
    if (d > 180) d -= 360; else if (d < -180) d += 360;
    kDrag.last = a;
    rot = Math.max(K_MIN, Math.min(K_MAX, rot + d));
    applyVolume();
  });
  function knobEnd(e) { if (kDrag && e.pointerId === kDrag.id) kDrag = null; }
  knob.addEventListener("pointerup", knobEnd);
  knob.addEventListener("pointercancel", knobEnd);
  knob.addEventListener("keydown", function (e) {
    const step = (K_MAX - K_MIN) * 0.05;
    let n = rot;
    if (e.key === "ArrowUp" || e.key === "ArrowRight") n += step;
    else if (e.key === "ArrowDown" || e.key === "ArrowLeft") n -= step;
    else if (e.key === "Home") n = K_MIN;
    else if (e.key === "End") n = K_MAX;
    else return;
    e.preventDefault(); e.stopPropagation();   
    rot = Math.max(K_MIN, Math.min(K_MAX, n));
    applyVolume();
  });

  applyVolume();
  loadTrack(0, false);
})();
