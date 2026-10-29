(() => {
  const MODELS = window.ZJ_MODELS || [];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Case illustration (used until real product photos arrive) ---------- */

  const SIZES = { regular: { w: 196, h: 410 }, max: { w: 212, h: 444 } };
  const PHONE = "#b9c3cc"; // the iPhone seen through the camera window

  // amount < 0 darkens toward black, amount > 0 lightens toward white
  function shade(hex, amount) {
    const n = parseInt(hex.slice(1), 16);
    return "#" + [n >> 16, (n >> 8) & 255, n & 255]
      .map((v) => Math.round(amount < 0 ? v * (1 + amount) : v + (255 - v) * amount))
      .map((v) => v.toString(16).padStart(2, "0"))
      .join("");
  }

  function isLight(hex) {
    const n = parseInt(hex.slice(1), 16);
    return 0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255) > 150;
  }

  let artCount = 0;

  function caseArt(model, color) {
    const id = `art${++artCount}`;
    const { w, h } = SIZES[model.size] || SIZES.regular;
    const x = 120 - w / 2;
    const y = 452 - h;
    const body = color.hex;
    const light = isLight(body);
    const edge = shade(body, -0.3);
    const bar = shade(body, light ? -0.14 : 0.07);
    const key = shade(body, light ? -0.3 : 0.16);
    const ink = light ? shade(body, -0.65) : "#d8d1c6";

    const winY = y + 12;
    const winH = Math.round(h * 0.235);
    const dispY = winY + winH + 14;
    const dispH = Math.round(h * 0.5);
    const barY = dispY + dispH + 12;
    const barH = y + h - 14 - barY;
    const barMid = barY + barH / 2;

    const lens = (cx, cy) =>
      `<circle cx="${cx}" cy="${cy}" r="17" fill="#2b2d31"/>` +
      `<circle cx="${cx}" cy="${cy}" r="11.5" fill="#0c0d10"/>` +
      `<circle cx="${cx - 4}" cy="${cy - 4}" r="3" fill="#fff" opacity=".35"/>`;
    const lx = x + 46;
    const l1 = winY + 28;
    const l2 = winY + winH - 28;
    const camera = model.lenses === 3
      ? `<rect x="${x + 18}" y="${winY + 6}" width="${w - 36}" height="${winH - 12}" rx="20" fill="${shade(PHONE, 0.18)}"/>` +
        lens(lx, l1) + lens(lx, l2) + lens(lx + 38, (l1 + l2) / 2) +
        `<circle cx="${x + w - 44}" cy="${l1}" r="7" fill="#f1ece2"/><circle cx="${x + w - 44}" cy="${l2}" r="3.5" fill="#2b2d31"/>`
      : `<rect x="${x + 18}" y="${winY + 6}" width="58" height="${winH - 12}" rx="20" fill="${shade(PHONE, 0.18)}"/>` +
        lens(lx - 1, l1) + lens(lx - 1, l2) +
        `<circle cx="${x + 92}" cy="${(l1 + l2) / 2}" r="6" fill="#f1ece2"/>`;

    return `
<svg viewBox="0 0 240 470" role="img" aria-label="${model.name} Rear Display Case in ${color.name} (illustration)">
  <defs>
    <radialGradient id="${id}-shadow" cx="50%" cy="50%" r="50%">
      <stop offset="0" stop-color="#000" stop-opacity=".3"/>
      <stop offset="1" stop-color="#000" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="${id}-sheen" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#fff" stop-opacity=".16"/>
      <stop offset=".32" stop-color="#fff" stop-opacity="0"/>
      <stop offset=".72" stop-color="#000" stop-opacity="0"/>
      <stop offset="1" stop-color="#000" stop-opacity=".2"/>
    </linearGradient>
    <linearGradient id="${id}-scene" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#f2dcb8"/>
      <stop offset=".46" stop-color="#cf9a6c"/>
      <stop offset=".62" stop-color="#6d5241"/>
      <stop offset="1" stop-color="#1d1916"/>
    </linearGradient>
    <clipPath id="${id}-screen"><rect x="${x + 16}" y="${dispY}" width="${w - 32}" height="${dispH}" rx="12"/></clipPath>
  </defs>
  <ellipse cx="120" cy="456" rx="${w * 0.5}" ry="9" fill="url(#${id}-shadow)"/>
  <rect x="${x + w - 2}" y="${y + h * 0.2}" width="5" height="36" rx="2" fill="${edge}"/>
  <rect x="${x + w - 2}" y="${y + h * 0.31}" width="5" height="58" rx="2" fill="${edge}"/>
  <rect x="${x - 3}" y="${y + h * 0.24}" width="5" height="30" rx="2" fill="${edge}"/>
  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="34" fill="${body}" stroke="${edge}" stroke-width="1.5"/>
  <rect x="${x + 12}" y="${winY}" width="${w - 24}" height="${winH}" rx="26" fill="${PHONE}"/>
  ${camera}
  <g clip-path="url(#${id}-screen)">
    <rect x="${x + 16}" y="${dispY}" width="${w - 32}" height="${dispH}" fill="url(#${id}-scene)"/>
    <circle cx="${120 + 20}" cy="${dispY + dispH * 0.5}" r="15" fill="#fff4dc" opacity=".92"/>
    <path d="M${x + 16} ${dispY + dispH * 0.6} q ${w * 0.22} -14 ${w * 0.42} -4 t ${w * 0.5} -2 V ${dispY + dispH} H ${x + 16} Z" fill="#2a221d" opacity=".9"/>
    <path d="M${x + 16} ${dispY + dispH * 0.15} L ${x + w * 0.62} ${dispY} H ${x + w} V ${dispY + dispH * 0.05} Z" fill="#fff" opacity=".08"/>
  </g>
  <rect x="${x + 16}" y="${dispY}" width="${w - 32}" height="${dispH}" rx="12" fill="none" stroke="#0d0c0b" stroke-width="3"/>
  <rect x="${x + 14}" y="${barY}" width="${w - 28}" height="${barH}" rx="18" fill="${bar}"/>
  <circle cx="${x + 40}" cy="${barMid}" r="12.5" fill="${key}"/>
  <path d="M${x + 40} ${barMid - 6} v5 M${x + 36} ${barMid - 3.5} a5.5 5.5 0 1 0 8 0" fill="none" stroke="${ink}" stroke-width="1.6" stroke-linecap="round"/>
  <rect x="${120 - w * 0.2}" y="${barMid - 10}" width="${w * 0.4}" height="20" rx="10" fill="${shade(body, -0.42)}"/>
  <circle cx="${x + w - 40}" cy="${barMid}" r="12.5" fill="${key}"/>
  <rect x="${x + w - 46.5}" y="${barMid - 4}" width="13" height="9.5" rx="2" fill="none" stroke="${ink}" stroke-width="1.5"/>
  <circle cx="${x + w - 40}" cy="${barMid + 0.8}" r="2.4" fill="none" stroke="${ink}" stroke-width="1.4"/>
  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="34" fill="url(#${id}-sheen)"/>
</svg>`;
  }

  function productArt(model, color) {
    if (color.image) {
      return `<img src="${color.image}" alt="${model.name} Rear Display Case in ${color.name}">`;
    }
    return caseArt(model, color);
  }

  /* ---------- Model cards ---------- */

  const grid = document.getElementById("model-grid");
  grid.innerHTML = MODELS.map((model, i) => `
    <li data-reveal style="--delay:${i * 90}ms">
      <button class="model-card" type="button" data-model="${model.id}" aria-haspopup="dialog">
        <span class="model-card__art">${productArt(model, model.colors[0])}</span>
        <span class="model-card__body">
          <span class="model-card__sub">Rear Display Case for</span>
          <span class="model-card__name">${model.name}</span>
          <span class="model-card__foot">
            <span class="dots" role="img" aria-label="${model.colors.length} colors: ${model.colors.map((c) => c.name).join(", ")}">
              ${model.colors.map((c) => `<span class="dot" style="--dot:${c.hex}"></span>`).join("")}
            </span>
            <span class="model-card__cta">View colors</span>
          </span>
        </span>
      </button>
    </li>`).join("");

  /* ---------- Color dialog ---------- */

  const dialog = document.getElementById("model-dialog");
  const dialogArt = document.getElementById("dialog-art");
  const dialogTitle = document.getElementById("dialog-title");
  const colorName = document.getElementById("dialog-color-name");
  const swatches = document.getElementById("dialog-swatches");
  let current = null;

  function showColor(colorId) {
    const color = current.colors.find((c) => c.id === colorId) || current.colors[0];
    dialogArt.innerHTML = productArt(current, color);
    colorName.textContent = color.name;
  }

  function openModel(modelId) {
    current = MODELS.find((m) => m.id === modelId);
    if (!current) return;
    dialogTitle.textContent = current.name;
    swatches.innerHTML = current.colors.map((c, i) => `
      <input type="radio" name="dialog-color" id="color-${c.id}" value="${c.id}"${i === 0 ? " checked" : ""}>
      <label for="color-${c.id}" style="--dot:${c.hex}"><span class="sr-only">${c.name}</span></label>`).join("");
    showColor(current.colors[0].id);
    dialog.showModal();
  }

  grid.addEventListener("click", (event) => {
    const card = event.target.closest(".model-card");
    if (card) openModel(card.dataset.model);
  });
  swatches.addEventListener("change", (event) => showColor(event.target.value));
  document.getElementById("dialog-close").addEventListener("click", () => dialog.close());
  // A click on the dimmed area outside the panel lands on the <dialog> itself
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });

  /* ---------- Header and menu ---------- */

  const header = document.getElementById("site-header");
  const menuToggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("site-nav");
  let overFilm = true;

  function syncHeader() {
    const menuOpen = header.classList.contains("is-menu-open");
    header.dataset.state = overFilm && !menuOpen ? "over-film" : "solid";
  }

  function setMenu(open) {
    header.classList.toggle("is-menu-open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    syncHeader();
  }

  menuToggle.addEventListener("click", () => setMenu(!header.classList.contains("is-menu-open")));
  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) setMenu(false);
  });

  const filmSection = document.getElementById("film-section");
  // The header turns solid once no part of the film is left below it.
  // A film edge that only touches the header counts as zero area, hence the ratio check.
  new IntersectionObserver(([entry]) => {
    overFilm = entry.intersectionRatio > 0;
    syncHeader();
  }, { rootMargin: `-${header.offsetHeight}px 0px 0px 0px`, threshold: [0, 0.02] }).observe(filmSection);

  /* ---------- Film ---------- */

  const film = document.getElementById("film");
  const soundButton = document.getElementById("film-sound");
  const soundLabel = document.getElementById("film-sound-label");

  if (!reduceMotion) film.play().catch(() => {});

  soundButton.addEventListener("click", () => {
    film.muted = !film.muted;
    const on = !film.muted;
    soundButton.dataset.sound = on ? "on" : "off";
    soundButton.setAttribute("aria-pressed", String(on));
    soundLabel.textContent = on ? "Turn sound off" : "Turn sound on";
  });

  document.getElementById("film-replay").addEventListener("click", () => {
    film.currentTime = 0;
    film.play().catch(() => {});
  });

  /* ---------- Reveal on scroll and feature parallax ---------- */

  if (!reduceMotion && "IntersectionObserver" in window) {
    // Only elements that start below the fold animate; whatever is on screen at load stays still
    const seen = new WeakSet();
    const revealer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const el = entry.target;
        if (!seen.has(el)) {
          seen.add(el);
          if (entry.isIntersecting) revealer.unobserve(el);
          continue;
        }
        if (entry.isIntersecting) {
          el.classList.add("is-revealed");
          revealer.unobserve(el);
        }
      }
    }, { rootMargin: "0px 0px -8% 0px" });
    document.querySelectorAll("[data-reveal]").forEach((el) => revealer.observe(el));

    const images = [...document.querySelectorAll(".feature__media img")];
    let ticking = false;
    const updateParallax = () => {
      ticking = false;
      const vh = window.innerHeight;
      for (const img of images) {
        const rect = img.parentElement.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > vh) continue;
        const progress = (rect.top + rect.height / 2 - vh / 2) / vh; // about -1 to 1
        img.style.setProperty("--shift", `${(progress * -18).toFixed(1)}px`);
      }
    };
    window.addEventListener("scroll", () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateParallax);
      }
    }, { passive: true });
    updateParallax();
  }
})();
