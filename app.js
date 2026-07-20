/* =========================================================================
   app.js — theme toggle + publication rendering / filtering
   No dependencies. Plain DOM.
   ========================================================================= */

/* ---------------------------------------------------------------- theme -- */
(function theme() {
  const root = document.documentElement;
  const stored = (() => { try { return localStorage.getItem("theme"); } catch (e) { return null; } })();
  if (stored === "light" || stored === "dark") root.setAttribute("data-theme", stored);

  function current() {
    const set = root.getAttribute("data-theme");
    if (set) return set;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  function label(btn) {
    const isDark = current() === "dark";
    btn.textContent = isDark ? "☀" : "☾";
    btn.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
  }
  document.addEventListener("DOMContentLoaded", () => {
    const btn = document.querySelector(".theme-toggle");
    if (!btn) return;
    label(btn);
    btn.addEventListener("click", () => {
      const next = current() === "dark" ? "light" : "dark";
      root.classList.add("theme-anim");
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
      label(btn);
      window.setTimeout(() => root.classList.remove("theme-anim"), 550);
    });
  });
})();

/* ------------------------------------------------------------ copy cite -- */
/* Copy-to-clipboard for bibtex blocks: <button class="copybtn" data-copy="ID"> */
(function copyCite() {
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".copybtn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const el = document.getElementById(btn.getAttribute("data-copy"));
        if (!el || !navigator.clipboard) return;
        navigator.clipboard.writeText(el.textContent).then(() => {
          const prev = btn.textContent;
          btn.textContent = "Copied";
          window.setTimeout(() => { btn.textContent = prev; }, 1400);
        });
      });
    });
  });
})();

/* --------------------------------------------------------- publications -- */

const TYPE_LABEL = {
  journal: "Journal",
  conference: "Conference",
  workshop: "Workshop",
  preprint: "Preprint",
  whitepaper: "Whitepaper",
  techreport: "Technical report",
  thesis: "Thesis",
  blog: "Blog",
};

function escapeHtml(s) {
  return s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
}

function renderAuthors(authors) {
  return escapeHtml(authors).replace(
    /A\. Feder Cooper/g,
    '<span class="me">A. Feder Cooper</span>'
  );
}

function pubHtml(p) {
  const titleLink = p.links.find((l) => l.label === "pdf") || p.links.find((l) => l.label === "arxiv");
  const titleHtml = titleLink
    ? `<a href="${titleLink.url}"${titleLink.url.startsWith("http") ? ' target="_blank" rel="noopener"' : ""}>${escapeHtml(p.title)}</a>`
    : escapeHtml(p.title);

  const displayYear = p.written || p.year;
  // Show the parenthetical year only when the venue doesn't already carry it
  // (e.g. "NeurIPS 2025" → no "(2025)"; but "NeurIPS 2025" + written 2024 → "(2024)").
  const showYear = p.venue ? !p.venue.includes(String(displayYear)) : false;
  let v;
  if (p.venue) {
    v = `<em>${escapeHtml(p.venue)}</em>`;
    if (p.volume) v += `, ${escapeHtml(p.volume)}`;
    if (showYear) v += ` (${displayYear})`;
  } else {
    v = `${displayYear}`;
  }
  const venue = `<div class="pub__venue">${v}</div>`;

  const links = p.links.length
    ? `<span class="pub__links">${p.links
        .map((l) => `<a href="${l.url}"${l.url.startsWith("http") ? ' target="_blank" rel="noopener"' : ""}>${escapeHtml(l.label)}</a>`)
        .join("")}</span>`
    : "";

  const tags =
    `<span class="tag tag--type">${TYPE_LABEL[p.type] || p.type}</span>` +
    (p.honors || []).map((h) => `<span class="tag tag--honor">${escapeHtml(h)}</span>`).join("");

  return `<li class="pub" data-type="${p.type}" data-search="${escapeHtml((p.authors + " " + p.title + " " + (p.venue || "")).toLowerCase())}">
    <p class="pub__title">${titleHtml}</p>
    <div class="pub__authors">${renderAuthors(p.authors)}</div>
    ${venue}
    <div class="pub__foot">${links}<span class="spacer"></span>${tags}</div>
  </li>`;
}

function renderSelected(elId) {
  const el = document.getElementById(elId);
  if (!el) return;
  const items = PUBLICATIONS.filter((p) => p.selected);
  el.innerHTML = items.map(pubHtml).join("");
}

function renderFull(elId) {
  const el = document.getElementById(elId);
  if (!el) return;

  const countEl = document.getElementById("pub-count");
  const searchEl = document.getElementById("pub-search");
  const clearEl = document.getElementById("pub-search-clear");
  const filterEls = Array.from(document.querySelectorAll(".filter"));
  let activeType = "all";

  function apply() {
    const q = (searchEl ? searchEl.value : "").trim().toLowerCase();
    const items = PUBLICATIONS.filter((p) => {
      const okType = activeType === "all" || p.type === activeType;
      const okQ = !q || (p.authors + " " + p.title + " " + (p.venue || "")).toLowerCase().includes(q);
      return okType && okQ;
    });
    el.innerHTML = items.length
      ? items.map(pubHtml).join("")
      : `<li class="empty">No papers match.</li>`;
    if (countEl) countEl.textContent = `${items.length} of ${PUBLICATIONS.length} papers`;
    if (clearEl) clearEl.hidden = !(searchEl && searchEl.value.length);
  }

  if (searchEl) searchEl.addEventListener("input", apply);
  if (clearEl) {
    clearEl.addEventListener("click", () => {
      searchEl.value = "";
      searchEl.focus();
      apply();
    });
  }
  filterEls.forEach((f) =>
    f.addEventListener("click", () => {
      filterEls.forEach((x) => x.classList.remove("is-active"));
      f.classList.add("is-active");
      activeType = f.dataset.type;
      apply();
    })
  );
  apply();
}

/* ------------------------------------------------------------- projects -- */

function projectHtml(p) {
  const alt = escapeHtml(p.imgAlt || p.title);
  let media = "";
  if (p.imgLight && p.imgDark) {
    media = `<div class="project__media">
        <img class="project__img project__img--light" src="${p.imgLight}" alt="${alt}" loading="lazy">
        <img class="project__img project__img--dark" src="${p.imgDark}" alt="${alt}" loading="lazy">
      </div>`;
  } else if (p.img) {
    media = `<div class="project__media">
        <img class="project__img" src="${p.img}" alt="${alt}" loading="lazy">
      </div>`;
  }
  return `<li class="project">
    <a class="project__link" href="${p.url}" target="_blank" rel="noopener">
      ${media}
      <h3 class="project__title">${escapeHtml(p.title)}</h3>
      <p class="project__desc">${escapeHtml(p.desc)}</p>
      <div class="project__foot">
        <span class="project__paper">${escapeHtml(p.paper)}</span>
        <span class="project__cta">Visit site &rarr;</span>
      </div>
    </a>
  </li>`;
}

function renderProjects(elId) {
  const el = document.getElementById(elId);
  if (!el || typeof PROJECTS === "undefined") return;
  el.innerHTML = PROJECTS.map(projectHtml).join("");
}

/* ---------------------------------------------------------------- lightbox -- */
function initLightbox() {
  const imgs = document.querySelectorAll(".gallery a[data-full]");
  if (!imgs.length) return;
  const box = document.createElement("div");
  box.className = "lightbox";
  box.innerHTML = '<img alt="">';
  const big = box.querySelector("img");
  document.body.appendChild(box);
  const close = () => { box.classList.remove("show"); big.removeAttribute("src"); };
  imgs.forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      big.src = a.getAttribute("data-full");
      box.classList.add("show");
    });
  });
  box.addEventListener("click", close);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
}

// Oscar easter egg on touch devices: tap the can to reveal, tap Oscar (or
// anywhere) to dismiss. Desktop uses pure-CSS hover (see styles.css).
function initGrouchTouch() {
  if (!window.matchMedia("(hover: none)").matches) return;
  const grouch = document.querySelector(".grouch");
  const pop = document.querySelector(".grouch-pop");
  if (!grouch || !pop) return;
  grouch.addEventListener("click", (e) => { e.stopPropagation(); pop.classList.toggle("show"); });
  pop.addEventListener("click", () => pop.classList.remove("show"));
  document.addEventListener("click", () => pop.classList.remove("show"));
}

document.addEventListener("DOMContentLoaded", () => {
  renderSelected("selected-pubs");
  renderProjects("projects");
  renderFull("full-pubs");
  initLightbox();
  initGrouchTouch();
});
