(() => {
  const SERIES = window.ZJ_SERIES || [];
  const COLORS = window.ZJ_COLORS || {};
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ["iPhone 17 Pro Max", "iPhone 17 Pro", "iPhone 17"] -> "iPhone 17 Pro Max, 17 Pro and 17"
  function fitsText(names) {
    const short = names.map((name, i) => (i === 0 ? name : name.replace(/^iPhone /, "")));
    return short.length > 1 ? `${short.slice(0, -1).join(", ")} and ${short.at(-1)}` : short[0];
  }

  const photo = (variant, colorId) => `assets/models/${variant.photos}-${colorId}.jpg`;

  /* ---------- Series cards ---------- */

  const grid = document.getElementById("model-grid");
  grid.innerHTML = SERIES.map((series, i) => {
    const colorIds = [...new Set(series.variants.flatMap((v) => v.colors))];
    const names = colorIds.map((id) => COLORS[id].name);
    return `
    <li data-reveal style="--delay:${i * 90}ms">
      <button class="model-card" type="button" data-series="${series.id}" aria-haspopup="dialog">
        <span class="model-card__art"><img src="${series.cover}" alt="" width="900" height="1059" loading="lazy"></span>
        <span class="model-card__body">
          <span class="model-card__name">${series.name}</span>
          <span class="model-card__fits">Fits ${fitsText(series.variants.flatMap((v) => v.fits))}</span>
          <span class="model-card__foot">
            <span class="dots" role="img" aria-label="${names.length} colors: ${names.join(", ")}">
              ${colorIds.map((id) => `<span class="dot" style="--dot:${COLORS[id].hex}"></span>`).join("")}
            </span>
            <span class="model-card__cta">View colors</span>
          </span>
        </span>
      </button>
    </li>`;
  }).join("");

  /* ---------- Color dialog ---------- */

  const dialog = document.getElementById("model-dialog");
  const dialogPhoto = document.getElementById("dialog-photo");
  const dialogTitle = document.getElementById("dialog-title");
  const fitsBox = document.getElementById("dialog-fits");
  const colorName = document.getElementById("dialog-color-name");
  const swatches = document.getElementById("dialog-swatches");
  let series = null;
  let variant = null;

  function showColor(colorId) {
    dialogPhoto.src = photo(variant, colorId);
    dialogPhoto.alt = `Rear Display Case for ${fitsText(variant.fits)} in ${COLORS[colorId].name}`;
    // Hide the previous photo until the new one is in, so a different case never flashes
    dialogPhoto.classList.toggle("is-loading", !dialogPhoto.complete);
    colorName.textContent = COLORS[colorId].name;
  }

  // Switching case design keeps the chosen color when the other design comes in it too
  function showVariant(index, keepColor) {
    variant = series.variants[index];
    const colorId = variant.colors.includes(keepColor) ? keepColor : variant.colors[0];
    swatches.innerHTML = variant.colors.map((id) => `
      <input type="radio" name="dialog-color" id="color-${id}" value="${id}"${id === colorId ? " checked" : ""}>
      <label for="color-${id}" style="--dot:${COLORS[id].hex}"><span class="sr-only">${COLORS[id].name}</span></label>`).join("");
    variant.colors.forEach((id) => { new Image().src = photo(variant, id); });
    showColor(colorId);
  }

  function openSeries(seriesId) {
    series = SERIES.find((s) => s.id === seriesId);
    if (!series) return;
    dialogTitle.textContent = series.name;
    fitsBox.innerHTML = series.variants.length > 1
      ? `<fieldset class="fits"><legend class="fits__label">Fits</legend><div class="fits__row">${series.variants.map((v, i) => `
          <input type="radio" name="dialog-fit" id="fit-${i}" value="${i}"${i === 0 ? " checked" : ""}>
          <label for="fit-${i}">${fitsText(v.fits)}</label>`).join("")}</div></fieldset>`
      : `<div class="fits"><p class="fits__label">Fits</p><p class="fits__text">${fitsText(series.variants[0].fits)}</p></div>`;
    showVariant(0);
    dialog.showModal();
  }

  grid.addEventListener("click", (event) => {
    const card = event.target.closest(".model-card");
    if (card) openSeries(card.dataset.series);
  });
  fitsBox.addEventListener("change", (event) => {
    showVariant(Number(event.target.value), swatches.querySelector("input:checked")?.value);
  });
  swatches.addEventListener("change", (event) => showColor(event.target.value));
  dialogPhoto.addEventListener("load", () => dialogPhoto.classList.remove("is-loading"));
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
