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

function pubHtml(p, opts) {
  // Title links to the canonical, maintained source, in order of preference:
  // arXiv, then SSRN, then the published version (journal / proceedings /
  // OpenReview), and only the local PDF as a last resort. (Local PDFs can go
  // stale; the hosted sources don't.)
  const titleLink =
    p.links.find((l) => l.label === "arxiv") ||
    p.links.find((l) => l.label === "ssrn") ||
    p.links.find((l) => l.label === "journal") ||
    p.links.find((l) => l.label === "proceedings") ||
    p.links.find((l) => l.label === "openreview") ||
    p.links.find((l) => l.label === "pdf");
  const titleHtml = titleLink
    ? `<a href="${titleLink.url}"${titleLink.url.startsWith("http") ? ' target="_blank" rel="noopener"' : ""}>${escapeHtml(p.title)}</a>`
    : escapeHtml(p.title);

  const summary = !!(opts && opts.summary);
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
    // No venue: the type carries the information, so it moves into the venue
    // slot ("Preprint 2026"). The type is never a right-side tag on either page
    // -- filtering keys off the li's data-type attribute, not the tag.
    v = `${TYPE_LABEL[p.type] || p.type} ${displayYear}`;
  }

  // The homepage is a summary: the title already links to the canonical source,
  // so the per-paper link row is only rendered on the full papers page.
  const links = p.links.length && !summary
    ? `<span class="pub__links">${p.links
        .map((l) => `<a href="${l.url}"${l.url.startsWith("http") ? ' target="_blank" rel="noopener"' : ""}>${escapeHtml(l.label)}</a>`)
        .join("")}</span>`
    : "";

  const honors = (p.honors || [])
    .map((h) => `<span class="tag tag--honor">${escapeHtml(h)}</span>`)
    .join("");
  const tags = honors;

  return `<li class="pub" data-type="${p.type}" data-search="${escapeHtml((p.authors + " " + p.title + " " + (p.venue || "")).toLowerCase())}">
    <p class="pub__title">${titleHtml}</p>
    <div class="pub__authors">${renderAuthors(p.authors)}</div>
    <div class="pub__foot pub__foot--meta"><span class="pub__venue pub__venue--inline">${v}</span><span class="spacer"></span>${tags}</div>
    ${links ? `<div class="pub__foot">${links}</div>` : ""}
  </li>`;
}

function renderSelected(elId) {
  const el = document.getElementById(elId);
  if (!el) return;
  const items = PUBLICATIONS.filter((p) => p.selected);
  el.innerHTML = items.map((p) => pubHtml(p, { summary: true })).join("");
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
    if (countEl) countEl.textContent = `${items.length} of ${PUBLICATIONS.length}`;
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
        <span class="project__paper${p.plain ? " project__paper--plain" : ""}">${escapeHtml(p.paper)}</span>
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

/* ------------------------------------------------------------- footnotes -- */
/* Inline footnote popovers.
     ref:  <sup class="fn-ref"><a href="#fn-1" id="fnref-1">1</a></sup>
     note: <li id="fn-1"> inside <ol> in <section class="footnotes-fallback">
   Opens on hover (pointer devices), tap (touch), or keyboard focus. Dismisses
   on click anywhere outside, on Escape, or on hovering away -- with a short
   grace period so the pointer can travel into the popover to use its links.
   Without JS the fallback list stays visible and the refs behave as ordinary
   endnote links. */
function initFootnotes() {
  const refs = Array.from(document.querySelectorAll(".fn-ref > a"));
  if (!refs.length) return;

  const pop = document.createElement("div");
  pop.className = "fn-pop";
  pop.id = "fn-pop";
  pop.setAttribute("role", "tooltip");
  pop.innerHTML = '<div class="fn-pop__body"></div><span class="fn-pop__arrow"></span>';
  const body = pop.querySelector(".fn-pop__body");
  const arrow = pop.querySelector(".fn-pop__arrow");
  document.body.appendChild(pop);

  const canHover = window.matchMedia("(hover: hover)").matches;
  let openRef = null;
  let hideTimer = null;

  const cancelHide = () => { window.clearTimeout(hideTimer); hideTimer = null; };

  function hide() {
    cancelHide();
    if (!openRef) return;
    openRef.classList.remove("is-open");
    openRef.removeAttribute("aria-describedby");
    openRef = null;
    pop.classList.remove("show");
  }
  const hideSoon = () => { cancelHide(); hideTimer = window.setTimeout(hide, 220); };

  // Absolute document coordinates, so the popover tracks the ref on scroll
  // without any scroll handler. Clamped to the viewport horizontally; sits
  // above the ref when it fits there, otherwise below.
  function place(ref) {
    const gap = 10;
    const edge = 8;
    const vw = document.documentElement.clientWidth;
    const vh = window.innerHeight;

    pop.style.maxHeight = "";            // measure the note's natural height
    const r = ref.getBoundingClientRect();
    const w = pop.offsetWidth;
    let h = pop.offsetHeight;

    let left = r.left + r.width / 2 - w / 2;
    left = Math.max(edge, Math.min(left, vw - w - edge));

    // A long note on a short viewport may fit on neither side. Take the
    // roomier one and cap the popover to it -- .fn-pop__body then scrolls
    // rather than the note running off the screen.
    const roomAbove = r.top - gap - edge;
    const roomBelow = vh - r.bottom - gap - edge;
    let above;
    if (h <= roomAbove) above = true;
    else if (h <= roomBelow) above = false;
    else {
      above = roomAbove >= roomBelow;
      pop.style.maxHeight = Math.max(120, above ? roomAbove : roomBelow) + "px";
      h = pop.offsetHeight;
    }

    let top = above ? r.top - gap - h : r.bottom + gap;
    top = Math.max(edge, Math.min(top, vh - h - edge));   // last-resort clamp

    pop.classList.toggle("fn-pop--above", above);
    pop.classList.toggle("fn-pop--below", !above);
    pop.style.left = left + window.scrollX + "px";
    pop.style.top = top + window.scrollY + "px";

    // Point the arrow at the ref, kept clear of the rounded corners.
    arrow.style.left = Math.max(14, Math.min(r.left + r.width / 2 - left, w - 14)) + "px";
  }

  function show(ref) {
    cancelHide();
    const note = document.getElementById(ref.getAttribute("href").slice(1));
    if (!note) return;
    if (openRef && openRef !== ref) {
      openRef.classList.remove("is-open");
      openRef.removeAttribute("aria-describedby");
    }
    body.innerHTML = `<span class="fn-pop__num">${ref.textContent}</span>${note.innerHTML}`;
    body.scrollTop = 0;
    openRef = ref;
    ref.classList.add("is-open");
    ref.setAttribute("aria-describedby", "fn-pop");
    pop.classList.add("show");
    place(ref);
  }

  refs.forEach((ref) => {
    ref.addEventListener("click", (e) => {
      e.preventDefault();      // never jump to the fallback list
      e.stopPropagation();     // ...and don't trip the outside-click dismiss
      if (openRef === ref) hide(); else show(ref);
    });
    if (canHover) {
      ref.addEventListener("mouseenter", () => show(ref));
      ref.addEventListener("mouseleave", hideSoon);
    }
    ref.addEventListener("focus", () => show(ref));
    ref.addEventListener("blur", hideSoon);
  });

  // mousedown fires before the ref's blur, so this keeps the popover alive
  // long enough for a click on one of its links to land.
  pop.addEventListener("mousedown", cancelHide);
  pop.addEventListener("mouseenter", cancelHide);
  pop.addEventListener("mouseleave", hideSoon);
  pop.addEventListener("click", (e) => {
    e.stopPropagation();
    if (e.target.closest("a")) hide();  // followed a link out of the note
  });

  document.addEventListener("click", hide);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") hide(); });
  window.addEventListener("resize", hide);
}

/* ------------------------------------------------------ post section rail -- */
/* Highlights the section currently being read in a post's <nav class="post-toc">
   and reveals the rail once the reader is past the opening. Opt-in: a post
   without that markup gets nothing. Styling/breakpoint live in styles.css. */
function initPostToc() {
  const toc = document.querySelector(".post-toc");
  if (!toc) return;
  const links = Array.from(toc.querySelectorAll('a[href^="#"]'));
  const items = links
    .map((a) => ({ a: a, el: document.getElementById(a.getAttribute("href").slice(1)) }))
    .filter((t) => t.el);                      // in document order
  if (!items.length) return;

  const LINE = 140;      // a heading counts as "current" once it passes this
  let ticking = false;

  function update() {
    ticking = false;
    const y = window.scrollY;
    const doc = document.documentElement;
    toc.classList.toggle(
      "is-visible",
      y > items[0].el.getBoundingClientRect().top + y - 200
    );

    let current = null;
    for (let i = 0; i < items.length; i++) {
      if (items[i].el.getBoundingClientRect().top <= LINE) current = items[i];
      else break;
    }
    // The last section can be too short to ever cross the line -- claim it once
    // the page is scrolled to the bottom.
    if (y + window.innerHeight >= doc.scrollHeight - 4) current = items[items.length - 1];

    links.forEach((a) => a.classList.remove("is-current"));
    if (current) current.a.classList.add("is-current");
  }

  window.addEventListener("scroll", () => {
    if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
  }, { passive: true });
  window.addEventListener("resize", update, { passive: true });
  // Figures finish loading after DOMContentLoaded and shift every heading, so
  // re-measure once they have: matters when the page opens already scrolled
  // (a refresh part-way down, or an #anchor link straight into a section).
  window.addEventListener("load", update);
  update();
}

document.addEventListener("DOMContentLoaded", () => {
  renderSelected("selected-pubs");
  renderProjects("projects");
  renderFull("full-pubs");
  initLightbox();
  initGrouchTouch();
  initFootnotes();
  initPostToc();
});
