/* =========================================================================
   CANIS HÆMATICA – App-Logik
   Ansichten: Werte-Raster · Organ-Karte · Leitbefund-Muster · 3D-Blutzellen
   ========================================================================= */
(function () {
  "use strict";
  const { CATEGORIES, ORGANS, BREEDS, REGION_NOTE, PARAMS, PATTERNS } = window.HAEM;

  const state = { mode: "werte", category: null, search: "", status: "standard", selected: null };

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
  const catColor = (c) => (CATEGORIES[c] && CATEGORIES[c].color) || "#94a3b8";
  const dirSym = (d) => d === "up" ? "▲" : d === "down" ? "▼" : "↕";
  const dirWord = (d) => d === "up" ? "erhöht" : d === "down" ? "erniedrigt" : "variabel";

  /* -------------------- INIT -------------------- */
  document.addEventListener("DOMContentLoaded", () => {
    buildStatusSelect();
    buildFilters();
    buildModeTabs();
    attachGlobalActions();
    render();
    showDefaultDetail();
    registerSW();
    handleSharedParam();
  });

  /* -------------------- SIDEBAR: STATUS + FILTER -------------------- */
  function buildStatusSelect() {
    const sel = $("#status-select");
    Object.keys(BREEDS).forEach((k) => {
      const o = el("option"); o.value = k; o.textContent = BREEDS[k].name; sel.appendChild(o);
    });
    sel.value = "standard";
    sel.addEventListener("change", () => {
      state.status = sel.value;
      $("#status-note").innerHTML = BREEDS[state.status].note || "";
      render();
      if (state.selected) showDetail(state.selected);
    });
    $("#status-note").innerHTML = BREEDS.standard.note || "";
  }

  function buildFilters() {
    const list = $("#filter-list");
    list.innerHTML = "";
    Object.keys(CATEGORIES).forEach((k) => {
      const c = CATEGORIES[k];
      const item = el("div", "filter-item");
      item.style.setProperty("--item-color", c.color);
      item.style.setProperty("--item-color-rgb", c.rgb);
      item.dataset.cat = k;
      item.innerHTML = `<span>${c.name}</span><div class="filter-color-indicator"></div>`;
      item.addEventListener("click", () => {
        if (item.classList.contains("active")) { item.classList.remove("active"); state.category = null; }
        else { $$(".filter-item").forEach((f) => f.classList.remove("active")); item.classList.add("active"); state.category = k; }
        if (state.mode !== "werte" && state.mode !== "muster") setMode("werte");
        render();
      });
      list.appendChild(item);
    });
    $("#filter-reset").addEventListener("click", () => {
      state.category = null; state.search = ""; $("#search-input").value = "";
      $$(".filter-item").forEach((f) => f.classList.remove("active")); render();
    });
    $("#search-input").addEventListener("input", (e) => { state.search = e.target.value.toLowerCase().trim(); if (state.mode !== "werte") setMode("werte"); render(); });
  }

  function buildModeTabs() {
    $$(".mode-tab").forEach((t) => t.addEventListener("click", () => setMode(t.dataset.mode)));
  }
  function setMode(m) {
    state.mode = m;
    $$(".mode-tab").forEach((t) => t.classList.toggle("active", t.dataset.mode === m));
    render();
  }

  /* -------------------- RENDER DISPATCH -------------------- */
  function render() {
    const canvas = $("#view-canvas");
    canvas.innerHTML = "";
    canvas.scrollTop = 0;
    canvas.dataset.mode = state.mode;
    if (state.mode === "werte") renderWerte(canvas);
    else if (state.mode === "organe") renderOrgane(canvas);
    else if (state.mode === "muster") renderMuster(canvas);
    else if (state.mode === "zellen") render3D(canvas);
  }

  /* -------------------- VIEW: WERTE-RASTER -------------------- */
  function paramMatches(id) {
    const p = PARAMS[id];
    if (state.category && p.cat !== state.category) return false;
    if (state.search) {
      const hay = (p.name + " " + p.abbr + " " + p.meaning + " " + (p.diseases || []).join(" ")).toLowerCase();
      if (!hay.includes(state.search)) return false;
    }
    return true;
  }

  function renderWerte(canvas) {
    const wrap = el("div", "werte-wrap");
    const cats = state.category ? [state.category] : Object.keys(CATEGORIES);
    let total = 0;
    cats.forEach((catKey) => {
      const ids = Object.keys(PARAMS).filter((id) => PARAMS[id].cat === catKey && paramMatches(id));
      if (!ids.length) return;
      total += ids.length;
      const c = CATEGORIES[catKey];
      const group = el("div", "cat-group");
      const head = el("div", "cat-head");
      head.style.setProperty("--c", c.color);
      head.innerHTML = `<span class="cat-dot"></span><span>${c.name}</span><span class="cat-count">${ids.length}</span>`;
      group.appendChild(head);
      const grid = el("div", "card-grid");
      ids.forEach((id) => grid.appendChild(makeCard(id)));
      group.appendChild(grid);
      wrap.appendChild(group);
    });
    if (!total) wrap.appendChild(el("div", "empty", "Keine Treffer. Suche zurücksetzen oder Kategorie wechseln."));
    canvas.appendChild(wrap);
  }

  function makeCard(id) {
    const p = PARAMS[id];
    const c = CATEGORIES[p.cat];
    const card = el("div", "val-card");
    card.style.setProperty("--c", c.color);
    card.style.setProperty("--c-rgb", c.rgb);
    if (state.selected === id) card.classList.add("sel");
    const mod = statusAffects(id);
    card.innerHTML =
      `<div class="vc-top"><span class="vc-abbr">${p.abbr}</span>${mod ? '<span class="vc-mod" title="Rasse-/Status-Hinweis">⚠︎</span>' : ""}</div>
       <div class="vc-name">${p.name}</div>
       <div class="vc-ref">${p.ref.txt}</div>`;
    card.addEventListener("click", () => showDetail(id));
    return card;
  }

  function statusAffects(id) {
    const b = BREEDS[state.status];
    if (!b || !b.affects) return null;
    return b.affects[id] || null;
  }

  /* -------------------- VIEW: ORGAN-KARTE (3D-Hund) -------------------- */
  function organParams(orgId) { return Object.keys(PARAMS).filter((id) => (PARAMS[id].organs || []).includes(orgId)); }
  const ORGAN3D = (window.HAEM.ORGAN3D) || {};
  const ORGAN_SYS = (window.HAEM.ORGAN_SYS) || {};
  function organColor(k) { const s = ORGAN3D[k] && ORGAN3D[k].sys; return (ORGAN_SYS[s] && ORGAN_SYS[s].color) || "#00f2fe"; }

  function renderOrgane(canvas) {
    const wrap = el("div", "organ-wrap");
    state.organ = state.organ || "leber";
    wrap.innerHTML =
      `<div class="organ-stage anat-mode" id="organ-stage"><div class="organ3d-loading" id="organ3d-loading">Echtes Anatomiebild lädt …</div></div>
       <div class="organ-info" id="organ-info"></div>`;
    canvas.appendChild(wrap);
    selectOrgan(state.organ, { noFocus: true });
    loadAnatImage($("#organ-stage", wrap), ["anatomie.png", "anatomie.jpg", "anatomie.jpeg", "anatomie.webp"], 0);
  }

  /* Lädt das echte Foto; nur falls keins vorhanden ist, greift der Vektor-Fallback. */
  function loadAnatImage(stage, exts, i) {
    if (i >= exts.length) { buildAnatomyVectorMode(stage); return; }
    const img = new Image();
    img.onload = () => { if (document.body.contains(stage)) buildAnatomyImageMode(stage, exts[i], img.naturalWidth, img.naturalHeight); };
    img.onerror = () => loadAnatImage(stage, exts, i + 1);
    img.src = exts[i] + "?v=33";
  }

  /* 2D-SVG-Hund als Fallback (offline / kein WebGL) */
  function renderOrganeSVG() {
    const stage = $("#organ-stage"); if (!stage) return;
    stage.classList.add("svg-mode");
    stage.innerHTML =
      `<div class="organ3d-hint">🐕 Organkarte · Organ antippen</div>
       <svg viewBox="0 0 100 78" preserveAspectRatio="xMidYMid meet" id="organ-svg" aria-label="Hund-Organkarte">
         <path class="dog-body" d="M8 50 Q6 38 16 34 Q18 22 30 24 Q34 14 42 20 Q48 16 52 22 L70 24 Q86 22 92 36 Q96 44 88 50 L86 60 L80 60 L78 50 Q60 56 40 54 L34 62 L28 62 L30 52 Q18 54 14 60 L10 60 Z"/>
       </svg>`;
    const svg = $("#organ-svg", stage);
    Object.keys(ORGANS).forEach((k) => {
      const o = ORGANS[k];
      const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
      g.setAttribute("class", "organ-node"); g.dataset.org = k;
      g.style.setProperty("--oc", organColor(k));
      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute("cx", o.x); circle.setAttribute("cy", o.y); circle.setAttribute("r", 2.3);
      g.appendChild(circle);
      const t = document.createElementNS("http://www.w3.org/2000/svg", "text");
      t.setAttribute("x", o.x); t.setAttribute("y", o.y + (o.lp < 0 ? -3.6 : 5)); t.setAttribute("class", "organ-label");
      t.textContent = o.map || o.name; g.appendChild(t);
      g.addEventListener("click", () => selectOrgan(k));
      svg.appendChild(g);
    });
    if (state.organ) $$(".organ-node", stage).forEach((n) => n.classList.toggle("active", n.dataset.org === state.organ));
  }

  /* -------------------- VIEW: ANATOMIE (interaktive Vektor-Lateralansicht) -------------------- */
  const SVGNS = "http://www.w3.org/2000/svg";
  const ANAT_NUM = { schilddruese:1, herz:2, gefaess:3, leber:4, gallenwege:5, milz:6, pankreas:7, niere:8, nebenniere:9, darm:10, knochenmark:11, muskel:12 };
  const ANAT_C = { /* Organ-Mittelpunkt (für Flüsse + Leader) – nach Atlas-Topografie */
    schilddruese:[248,290], herz:[392,330], gefaess:[455,206], leber:[518,308], gallenwege:[512,338],
    milz:[604,304], pankreas:[640,348], niere:[690,228], nebenniere:[636,222], darm:[652,358], knochenmark:[770,420], muskel:[808,352] };
  const ANAT_B = { /* Nummern-Badge-Position (entzerrt) */
    schilddruese:[222,256], herz:[392,330], gefaess:[455,190], leber:[518,308], gallenwege:[486,366],
    milz:[642,372], pankreas:[680,374], niere:[716,200], nebenniere:[598,196], darm:[652,398], knochenmark:[736,452], muskel:[856,322] };
  /* FOTO-MODUS: Organ-Positionen als Bruchteil der Bildbreite/-höhe (für anatomie.png/.jpg).
     Kalibriert auf das vom Nutzer bereitgestellte fotorealistische Seitenbild (Kopf links). */
  const ANAT_IMG_FRAC = {
    schilddruese:[0.190,0.370], herz:[0.370,0.550], gefaess:[0.480,0.370], leber:[0.520,0.400], gallenwege:[0.520,0.470],
    milz:[0.640,0.440], pankreas:[0.660,0.550], niere:[0.700,0.330], nebenniere:[0.660,0.330], darm:[0.740,0.550], knochenmark:[0.820,0.620], muskel:[0.840,0.460] };
  const ANAT_IMG_BFRAC = {
    schilddruese:[0.150,0.320], herz:[0.350,0.580], gefaess:[0.460,0.270], leber:[0.520,0.370], gallenwege:[0.480,0.575],
    milz:[0.665,0.330], pankreas:[0.600,0.575], niere:[0.785,0.330], nebenniere:[0.690,0.300], darm:[0.545,0.610], knochenmark:[0.835,0.665], muskel:[0.890,0.510] };
  const ANAT_SHAPE = {
    schilddruese: `<path class="organ-body" fill="url(#gThyroid)" d="M236 282 q9 -12 17 0 q5 15 -8 17 q-13 0 -9 -17 Z"/><path class="organ-body" fill="url(#gThyroid)" d="M254 284 q9 -12 17 0 q5 15 -8 17 q-13 0 -9 -17 Z"/>`,
    herz: `<path class="organ-body" fill="url(#gHeart)" d="M372 298 Q400 284 420 306 Q434 328 416 360 Q406 376 392 366 Q362 346 360 322 Q362 304 372 298 Z"/><path fill="#7a1d14" opacity=".3" d="M392 312 q12 2 13 12 q-1 9 -15 16 q-12 -9 -12 -17 q3 -10 14 -11 Z"/>`,
    gefaess: `<path class="organ-body" fill="none" stroke="url(#gVessel)" stroke-width="8" stroke-linecap="round" d="M406 302 Q438 250 455 206 Q548 196 668 200 Q734 202 788 210"/>`,
    leber: `<path class="organ-body" fill="url(#gLiver)" d="M474 254 Q550 242 572 282 Q582 324 528 352 Q486 362 474 334 Q462 296 474 254 Z"/><path d="M512 252 Q522 302 524 348 M492 270 Q500 310 502 344" fill="none" stroke="#4f2516" stroke-width="2" opacity=".45"/>`,
    gallenwege: `<path class="organ-body" fill="url(#gGall)" d="M505 326 q14 -2 14 16 q0 13 -10 13 q-11 -2 -4 -29 Z"/>`,
    milz: `<path class="organ-body" fill="url(#gSpleen)" d="M586 248 Q608 248 614 278 Q628 322 638 358 Q634 370 618 364 Q598 330 590 292 Q580 266 586 248 Z"/>`,
    pankreas: `<path class="organ-body" fill="url(#gPancreas)" d="M608 340 Q666 342 688 360 Q684 372 662 368 Q620 360 606 350 Q604 340 608 340 Z"/>`,
    niere: `<path class="organ-body" fill="url(#gKidney)" d="M642 208 q26 -6 32 16 q4 22 -18 27 q-23 2 -23 -20 q1 -15 9 -23 Z"/><path class="organ-body" fill="url(#gKidney)" d="M698 216 q26 -6 32 16 q4 22 -18 27 q-23 2 -23 -20 q1 -15 9 -23 Z"/>`,
    nebenniere: `<ellipse class="organ-body" fill="url(#gAdrenal)" cx="634" cy="214" rx="9" ry="6"/>`,
    darm: `<path class="organ-body" fill="none" stroke="#cf8f7e" stroke-width="15" stroke-linecap="round" d="M560 350 q14 -16 28 0 t28 0 t28 0 t28 0 t28 0"/><path class="organ-body" fill="none" stroke="#cf8f7e" stroke-width="15" stroke-linecap="round" d="M574 372 q14 -14 28 0 t28 0 t28 0 t28 0"/>`,
    knochenmark: `<rect class="organ-body" fill="url(#gBone)" x="762" y="372" width="16" height="92" rx="7"/><circle class="organ-body" fill="url(#gBone)" cx="770" cy="372" r="11"/><circle class="organ-body" fill="url(#gBone)" cx="770" cy="464" r="11"/><line x1="770" y1="382" x2="770" y2="454" stroke="#c0392b" stroke-width="4" opacity=".75"/>`,
    muskel: `<ellipse class="organ-body" fill="url(#gMuscle)" cx="808" cy="352" rx="44" ry="60"/><path d="M776 330 Q808 322 840 334 M774 354 Q808 346 842 356 M778 380 Q808 372 838 382" fill="none" stroke="#6e2626" stroke-width="2" opacity=".5"/>`
  };

  function buildAnatSVG() {
    const ribs = [322, 346, 370, 394, 418, 442, 464].map((x) => `<path d="M${x} 200 Q${x - 18} 274 ${x - 36} 340" fill="none" stroke="#cdbf9e" stroke-width="2.4" opacity=".32"/>`).join("");
    const vert = [];
    for (let x = 304; x <= 800; x += 26) vert.push(`<rect x="${x}" y="190" width="18" height="13" rx="3" fill="#cdbf9e" opacity=".3"/>`);
    const organs = Object.keys(ANAT_NUM).map((id) =>
      `<g class="anat-organ" data-org="${id}" style="--oc:${organColor(id)}">${ANAT_SHAPE[id]}</g>`).join("");
    const badges = Object.keys(ANAT_NUM).map((id) => {
      const b = ANAT_B[id], c = ANAT_C[id], col = organColor(id);
      const leader = (b[0] !== c[0] || b[1] !== c[1]) ? `<line class="badge-leader" x1="${b[0]}" y1="${b[1]}" x2="${c[0]}" y2="${c[1]}"/>` : "";
      return `<g class="anat-badge" data-org="${id}" style="--oc:${col}">${leader}<circle cx="${b[0]}" cy="${b[1]}" r="11"/><text x="${b[0]}" y="${b[1]}">${ANAT_NUM[id]}</text></g>`;
    }).join("");
    return `<svg id="anat-svg" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid meet" aria-label="Wissenschaftliche Hund-Anatomie (lateral, von links)">
      <defs>
        <filter id="anat-soft" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="2" stdDeviation="2.5" flood-color="#000" flood-opacity="0.5"/></filter>
        <radialGradient id="gHeart" cx="38%" cy="30%" r="78%"><stop offset="0" stop-color="#d8503e"/><stop offset="1" stop-color="#8a2317"/></radialGradient>
        <radialGradient id="gLiver" cx="38%" cy="30%" r="82%"><stop offset="0" stop-color="#9c5638"/><stop offset="1" stop-color="#5b2a1a"/></radialGradient>
        <radialGradient id="gSpleen" cx="40%" cy="28%" r="82%"><stop offset="0" stop-color="#7e2c3d"/><stop offset="1" stop-color="#44161f"/></radialGradient>
        <radialGradient id="gKidney" cx="38%" cy="30%" r="82%"><stop offset="0" stop-color="#9c4c39"/><stop offset="1" stop-color="#582920"/></radialGradient>
        <radialGradient id="gPancreas" cx="40%" cy="30%" r="82%"><stop offset="0" stop-color="#dcb96f"/><stop offset="1" stop-color="#ad8742"/></radialGradient>
        <radialGradient id="gMuscle" cx="38%" cy="28%" r="82%"><stop offset="0" stop-color="#c44e4e"/><stop offset="1" stop-color="#7c2b2b"/></radialGradient>
        <radialGradient id="gBone" cx="40%" cy="30%" r="82%"><stop offset="0" stop-color="#f4ecd6"/><stop offset="1" stop-color="#c8bb98"/></radialGradient>
        <radialGradient id="gThyroid" cx="40%" cy="30%" r="82%"><stop offset="0" stop-color="#c4586c"/><stop offset="1" stop-color="#882c3c"/></radialGradient>
        <radialGradient id="gAdrenal" cx="40%" cy="30%" r="82%"><stop offset="0" stop-color="#f1d44e"/><stop offset="1" stop-color="#c19c00"/></radialGradient>
        <radialGradient id="gGall" cx="40%" cy="30%" r="82%"><stop offset="0" stop-color="#56a76b"/><stop offset="1" stop-color="#2c6442"/></radialGradient>
        <linearGradient id="gVessel" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#d23a3a"/><stop offset="1" stop-color="#9a1f1f"/></linearGradient>
      </defs>
      <g class="anat-legs">
        <rect class="anat-leg far" x="258" y="356" width="22" height="162" rx="10"/><ellipse class="anat-leg far" cx="269" cy="522" rx="16" ry="8"/>
        <rect class="anat-leg far" x="828" y="384" width="20" height="138" rx="9"/><ellipse class="anat-leg far" cx="838" cy="526" rx="15" ry="8"/>
        <rect class="anat-leg" x="300" y="352" width="26" height="172" rx="12"/><ellipse class="anat-leg" cx="313" cy="528" rx="18" ry="9"/>
        <rect class="anat-leg" x="788" y="382" width="26" height="146" rx="12"/><ellipse class="anat-leg" cx="801" cy="530" rx="18" ry="9"/>
      </g>
      <path class="anat-body" d="M60 252 Q92 222 126 214 Q150 200 156 184 Q160 150 178 128 L196 152 Q210 166 240 166 Q270 163 300 172 L744 168 Q802 172 828 192 Q888 152 956 112 Q906 168 846 214 Q842 252 830 304 Q812 356 716 364 L360 364 Q298 364 284 334 Q236 324 210 302 Q150 294 110 282 Q78 274 60 252 Z"/>
      <g class="anat-skel">
        <path class="anat-bone-line" d="M300 196 Q540 188 800 196" fill="none" stroke="#cdbf9e" stroke-width="3" opacity=".4"/>
        ${vert.join("")}
        ${ribs}
        <path d="M320 350 Q392 360 470 352" fill="none" stroke="#cdbf9e" stroke-width="3" opacity=".3"/>
        <path d="M288 178 L322 246 L268 236 Z" fill="#cdbf9e" opacity=".16"/>
        <path d="M792 198 Q840 200 846 244 L812 252 Q792 226 786 206 Z" fill="#cdbf9e" opacity=".16"/>
      </g>
      <path class="anat-bone" fill="#cdbf9e" opacity=".16" d="M70 250 Q90 216 150 208 Q186 208 196 240 Q190 270 150 276 Q98 276 70 250 Z"/>
      <circle cx="120" cy="238" r="4" fill="#0a0c10" opacity=".5"/>
      <g class="anat-deco">
        <path fill="none" stroke="#9fb6c6" stroke-width="6" stroke-linecap="round" opacity=".5" d="M210 292 Q276 300 344 308"/>
        <path fill="none" stroke="#c98fae" stroke-width="4" stroke-linecap="round" opacity=".45" d="M210 300 Q276 308 344 316"/>
        <path fill="#d98fa3" opacity=".38" d="M326 302 Q324 204 410 198 Q474 198 476 252 Q474 320 404 328 Q346 328 326 302 Z"/>
        <path fill="none" stroke="#8893c0" stroke-dasharray="5 5" stroke-width="2" opacity=".5" d="M474 200 Q464 284 456 360"/>
        <path fill="#d98c9a" opacity=".42" d="M540 252 Q616 240 628 286 Q624 314 568 312 Q540 300 540 252 Z"/>
        <path fill="none" stroke="#b5876a" stroke-width="14" stroke-linecap="round" opacity=".48" d="M636 298 Q708 284 780 296 Q806 302 798 332"/>
        <ellipse fill="#c79a7a" opacity=".5" cx="700" cy="318" rx="14" ry="20"/>
        <ellipse fill="#d9c46a" opacity=".5" cx="786" cy="368" rx="22" ry="18"/>
        <ellipse fill="#caa0b0" opacity=".5" cx="800" cy="392" rx="11" ry="9"/>
        <text class="anat-cap" x="404" y="212">Lunge</text><text class="anat-cap" x="584" y="266">Magen</text>
        <text class="anat-cap" x="730" y="288">Colon</text><text class="anat-cap" x="700" y="346">Caecum</text>
        <text class="anat-cap" x="788" y="394">Harnblase</text><text class="anat-cap" x="824" y="404">Prostata</text>
        <text class="anat-cap" x="250" y="332">Trachea / Ösophagus</text><text class="anat-cap" x="486" y="384">Zwerchfell</text>
      </g>
      <g id="anat-flows"></g>
      ${organs}
      <g class="anat-badges">${badges}</g>
    </svg>`;
  }

  function buildAnatLegend() {
    return Object.keys(ANAT_NUM).map((id) => {
      const o = ORGANS[id];
      return `<button class="anat-legend-item" data-org="${id}" style="--oc:${organColor(id)}"><span class="ali-num">${ANAT_NUM[id]}</span><span class="ali-ic">${o.icon}</span><span class="ali-nm">${o.map || o.name}</span></button>`;
    }).join("");
  }

  function buildAnatFlows(stage, centers) {
    centers = centers || ANAT_C;
    const svg = $("#anat-svg", stage), g = $("#anat-flows", stage); if (!svg || !g) return;
    (window.HAEM.ORGAN_LINKS || []).forEach((l) => {
      const a = centers[l.a], b = centers[l.b]; if (!a || !b) return;
      const dx = a[0] - b[0], dy = a[1] - b[1], len = Math.hypot(dx, dy);
      const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2 - 26 - len * 0.08;
      const p = document.createElementNS(SVGNS, "path");
      p.setAttribute("d", `M${a[0]} ${a[1]} Q${mx.toFixed(1)} ${my.toFixed(1)} ${b[0]} ${b[1]}`);
      p.setAttribute("class", "anat-flow"); p.dataset.a = l.a; p.dataset.b = l.b;
      p.style.stroke = organColor(l.a);
      g.appendChild(p);
    });
  }

  function applyAnatActive(k) {
    const svg = document.getElementById("anat-svg"); if (!svg) return;
    $$(".anat-organ", svg).forEach((g) => g.classList.toggle("active", g.dataset.org === k));
    $$(".anat-badge", svg).forEach((g) => g.classList.toggle("active", g.dataset.org === k));
    $$(".anat-flow", svg).forEach((f) => f.classList.toggle("rel", f.dataset.a === k || f.dataset.b === k));
    $$(".anat-legend-item").forEach((li) => li.classList.toggle("active", li.dataset.org === k));
  }

  function wireAnat(stage) {
    $$(".anat-organ, .anat-badge", stage).forEach((g) => g.addEventListener("click", () => selectOrgan(g.dataset.org)));
    $$(".anat-legend-item", stage).forEach((b) => b.addEventListener("click", () => selectOrgan(b.dataset.org)));
    const svg = $("#anat-svg", stage), fb = $("#anat-flow", stage), nb = $("#anat-num", stage);
    if (fb) fb.addEventListener("click", (e) => { svg.classList.toggle("flows-off"); e.currentTarget.classList.toggle("on"); });
    if (nb) nb.addEventListener("click", (e) => { svg.classList.toggle("badges-off"); e.currentTarget.classList.toggle("on"); });
    applyAnatActive(state.organ);
  }

  function buildAnatomyVectorMode(stage) {
    stage.classList.add("anat-mode"); stage.classList.remove("anat-photo");
    stage.innerHTML =
      `<div class="organ3d-hint">🐕 Anatomie · Organ oder Nummer tippen</div>
       <div class="organ3d-ctrls">
         <button class="o3d-btn on" id="anat-flow" title="Stoffwechsel-Flüsse an/aus">⚡ Stoffwechsel</button>
         <button class="o3d-btn on" id="anat-num" title="Nummern an/aus">① Nummern</button>
       </div>
       <div class="anat-scroll">${buildAnatSVG()}</div>
       <div class="anat-legend">${buildAnatLegend()}</div>`;
    buildAnatFlows(stage);
    wireAnat(stage);
  }

  function buildAnatomyImageMode(stage, src, W, H) {
    stage.classList.add("anat-mode", "anat-photo"); stage.classList.remove("svg-mode");
    const centers = {}; Object.keys(ANAT_IMG_FRAC).forEach((id) => { const f = ANAT_IMG_FRAC[id]; centers[id] = [+(f[0] * W).toFixed(1), +(f[1] * H).toFixed(1)]; });
    const R = Math.max(15, Math.min(W, H) * 0.027);
    const pts = Object.keys(ANAT_NUM).map((id) => {
      const c = centers[id], col = organColor(id);
      return `<g class="anat-organ anat-pt" data-org="${id}" style="--oc:${col}">`
        + `<circle class="pt-halo" cx="${c[0]}" cy="${c[1]}" r="${(R * 1.9).toFixed(0)}"/>`
        + `<circle class="pt-dot" cx="${c[0]}" cy="${c[1]}" r="${R.toFixed(0)}"/>`
        + `<text class="pt-num" x="${c[0]}" y="${c[1]}" style="font-size:${(R * 1.1).toFixed(0)}px">${ANAT_NUM[id]}</text></g>`;
    }).join("");
    const svg = `<svg id="anat-svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet" aria-label="Echte Hunde-Anatomie mit klickbaren Organpunkten">`
      + `<image href="${src}" x="0" y="0" width="${W}" height="${H}"/><g id="anat-flows"></g>${pts}</svg>`;
    stage.innerHTML =
      `<div class="organ3d-hint">🐕 Echtes Anatomiebild · farbigen Organ-Punkt tippen</div>
       <div class="organ3d-ctrls">
         <button class="o3d-btn on" id="anat-flow" title="Stoffwechsel-Verbindungen an/aus">⚡ Stoffwechsel</button>
         <button class="o3d-btn on" id="anat-num" title="Organ-Punkte an/aus">⬤ Punkte</button>
       </div>
       <div class="anat-scroll">${svg}</div>
       <div class="anat-legend">${buildAnatLegend()}</div>`;
    buildAnatFlows(stage, centers);
    wireAnat(stage);
  }

  function organLinksFor(k) { return (window.HAEM.ORGAN_LINKS || []).filter((l) => l.a === k || l.b === k); }

  function selectOrgan(k, opts) {
    state.organ = k;
    $$(".organ-node").forEach((n) => n.classList.toggle("active", n.dataset.org === k));
    applyAnatActive(k);
    if (window.__haemHighlightOrgan) window.__haemHighlightOrgan(k);
    if (window.__haemFocusOrgan && !(opts && opts.noFocus)) window.__haemFocusOrgan(k);
    const o = ORGANS[k]; if (!o) return;
    const ids = organParams(k);
    const box = $("#organ-info"); if (!box) return;
    const sys = ORGAN3D[k] && ORGAN_SYS[ORGAN3D[k].sys];
    const meta = (window.HAEM.ORGAN_META || {})[k];
    const links = organLinksFor(k);
    const linkHtml = links.map((l) => {
      const other = l.a === k ? l.b : l.a; const oo = ORGANS[other]; if (!oo) return "";
      return `<span class="chip mini organ-link" data-org="${other}" title="${l.label}">${oo.icon} ${oo.map || oo.name}</span>`;
    }).join(" ");
    box.innerHTML =
      `<div class="organ-title">${o.icon} ${o.name}${sys ? ` <span class="organ-sys" style="--c:${sys.color}">${sys.name}</span>` : ""}</div>
       <div class="organ-desc">${o.desc}</div>
       ${meta ? `<div class="organ-meta"><span class="organ-sub">🔬 Stoffwechsel im Organ</span><div class="organ-meta-b">${meta} <a class="meta-link" href="../canis-metabolica/" title="Zur Stoffwechselkarte">⇄ Stoffwechselkarte</a></div></div>` : ""}
       <div class="organ-sub">Zugehörige Blutwerte (${ids.length})</div><div class="organ-chips"></div>
       ${linkHtml ? `<div class="organ-sub" style="margin-top:12px">🔗 Zusammenhang mit Organen</div><div class="organ-chips links">${linkHtml}</div>` : ""}`;
    const chips = $(".organ-chips", box);
    ids.forEach((id) => {
      const p = PARAMS[id];
      const chip = el("span", "chip"); chip.style.setProperty("--c", catColor(p.cat));
      chip.textContent = p.abbr; chip.title = p.name;
      chip.addEventListener("click", () => showDetail(id));
      chips.appendChild(chip);
    });
    $$(".organ-link", box).forEach((ch) => ch.addEventListener("click", () => selectOrgan(ch.dataset.org)));
  }

  /* ---- 3D-Hund mit anatomisch geformten Organen, Orbit/Zoom + Stoffwechsel-Flüssen ---- */
  function init3DDog() {
    const stage = $("#organ-stage"); if (!stage || !window.THREE) return renderOrganeSVG();
    const THREE = window.THREE;
    const loadEl = $("#organ3d-loading", stage); if (loadEl) loadEl.remove();
    const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
    const w = stage.clientWidth, h = stage.clientHeight || 380;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h); renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    stage.appendChild(renderer.domElement);
    const cv = renderer.domElement;
    scene.add(new THREE.AmbientLight(0xffffff, 0.75));
    const key = new THREE.DirectionalLight(0xffffff, 1.0); key.position.set(5, 9, 7); scene.add(key);
    const rim = new THREE.PointLight(0x00f2fe, 0.7); rim.position.set(-7, 2, 5); scene.add(rim);
    const warm = new THREE.PointLight(0xffb347, 0.5); warm.position.set(6, 1, -4); scene.add(warm);

    const dog = new THREE.Group(); scene.add(dog);

    /* --- durchscheinender Hundekörper (Hologramm) --- */
    const fur = new THREE.MeshStandardMaterial({ color: 0xd9a441, roughness: 0.6, metalness: 0.05, transparent: true, opacity: 0.13, depthWrite: false });
    const edge = new THREE.MeshBasicMaterial({ color: 0x00f2fe, wireframe: true, transparent: true, opacity: 0.08 });
    const sph = new THREE.SphereGeometry(1, 24, 18), cyl = new THREE.CylinderGeometry(1, 1, 1, 16);
    function part(geo, x, y, z, sx, sy, sz, rz) {
      const m = new THREE.Mesh(geo, fur); m.position.set(x, y, z); m.scale.set(sx, sy, sz || sx); if (rz) m.rotation.z = rz; dog.add(m);
      const wf = new THREE.Mesh(geo, edge); wf.position.copy(m.position); wf.scale.copy(m.scale); wf.rotation.copy(m.rotation); dog.add(wf);
    }
    part(sph, 0, 1.6, 0, 2.5, 1.05, 1.0); part(sph, 1.5, 1.55, 0, 1.25, 1.15, 1.05);
    part(cyl, 2.35, 1.95, 0, 0.42, 0.9, 0.42, -0.9); part(sph, 3.0, 2.35, 0, 0.72, 0.7, 0.66);
    part(sph, 3.62, 2.12, 0, 0.42, 0.34, 0.34); part(sph, 3.05, 2.78, 0.34, 0.16, 0.34, 0.26); part(sph, 3.05, 2.78, -0.34, 0.16, 0.34, 0.26);
    [[1.5, 0.42], [-1.4, 0.42], [1.5, -0.42], [-1.4, -0.42]].forEach(([lx, lz]) => part(cyl, lx, 0.7, lz, 0.2, 0.95, 0.2));
    part(cyl, -2.5, 2.0, 0, 0.18, 0.95, 0.18, 0.7); part(sph, -3.0, 2.45, 0, 0.18, 0.4, 0.18);
    const ring = new THREE.Mesh(new THREE.RingGeometry(2.6, 4.2, 48), new THREE.MeshBasicMaterial({ color: 0x00f2fe, transparent: true, opacity: 0.06, side: THREE.DoubleSide }));
    ring.rotation.x = -Math.PI / 2; ring.position.y = -0.05; dog.add(ring);

    /* dezente anatomische Kontur-Organe (nicht klickbar) */
    function deco(col, x, y, z, sx, sy, sz) {
      const m = new THREE.Mesh(sph, new THREE.MeshStandardMaterial({ color: col, roughness: 0.6, transparent: true, opacity: 0.16, depthWrite: false }));
      m.position.set(x, y, z); m.scale.set(sx, sy, sz); dog.add(m);
    }
    deco(0xffb3c1, 1.45, 1.8, 0.5, 0.6, 0.7, 0.34); deco(0xffb3c1, 1.45, 1.8, -0.5, 0.6, 0.7, 0.34); // Lungen
    deco(0xe0a3b0, 0.25, 1.32, -0.38, 0.46, 0.4, 0.34); // Magen
    deco(0xf0e08a, -1.15, 1.0, 0.0, 0.22, 0.2, 0.22);   // Harnblase

    /* --- anatomisch geformte Organe --- */
    function omat(col) { return new THREE.MeshStandardMaterial({ color: col, roughness: 0.5, metalness: 0.05, emissive: col, emissiveIntensity: 0.14 }); }
    function build(kind, mat) {
      const g = new THREE.Group();
      const add = (geo, x, y, z, sx, sy, sz, rz) => { const m = new THREE.Mesh(geo, mat); m.position.set(x || 0, y || 0, z || 0); if (sx) m.scale.set(sx, sy == null ? sx : sy, sz == null ? sx : sz); if (rz) m.rotation.z = rz; g.add(m); return m; };
      if (kind === "heart") { const v = add(new THREE.ConeGeometry(0.42, 0.8, 20), 0, -0.12, 0); v.rotation.x = Math.PI; add(sph, -0.18, 0.26, 0, 0.3); add(sph, 0.18, 0.26, 0, 0.3); }
      else if (kind === "liver") {[[0,0,0,1.0,0.46,0.66],[0.5,-0.02,0.08,0.7,0.42,0.58],[-0.5,-0.02,-0.04,0.74,0.42,0.56],[0.08,0.02,0.36,0.55,0.38,0.46]].forEach((p)=>add(sph,p[0],p[1],p[2],p[3],p[4],p[5])); }
      else if (kind === "kidney") {[-0.3,0.3].forEach((dz)=>{ add(sph,0,0,dz,0.34,0.5,0.24); }); }
      else if (kind === "spleen") { add(sph,0,0,0,0.72,0.26,0.2,0.5); }
      else if (kind === "pancreas") {[0,1,2].forEach((i)=>add(sph,-0.34+i*0.34,0,0,0.22-0.03*i,0.17,0.17)); g.rotation.y = 0.4; }
      else if (kind === "intestine") { const pts=[]; for(let i=0;i<=70;i++){ const t=i/70, a=t*Math.PI*6, r=0.42*(1-t*0.25); pts.push(new THREE.Vector3(Math.cos(a)*r,(t-0.5)*0.22,Math.sin(a)*r)); } g.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts),120,0.1,8,false),mat)); g.scale.set(1.1,1.0,0.8); }
      else if (kind === "thyroid") {[-0.12,0.12].forEach((dz)=>add(sph,0,0,dz,0.12,0.18,0.1)); }
      else if (kind === "adrenal") {[-0.18,0.18].forEach((dz)=>add(sph,0,0.1,dz,0.12,0.09,0.1)); }
      else if (kind === "bone") { add(cyl,0,0,0,0.1,0.62,0.1); add(sph,0,0.34,0,0.15); add(sph,0,-0.34,0,0.15); g.rotation.z = 0.5; }
      else if (kind === "muscle") { add(sph,0,0,0,0.4,0.55,0.34); }
      else if (kind === "gallbladder") { add(sph,0,0,0,0.15,0.21,0.15); }
      else if (kind === "vessel") { const pts=[new THREE.Vector3(-0.5,0.1,0),new THREE.Vector3(0,0.18,0),new THREE.Vector3(0.45,0.05,0)]; g.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts),24,0.07,8,false),mat)); }
      else add(sph, 0, 0, 0, 0.3);
      return g;
    }
    const SHAPES = { herz:"heart", leber:"liver", niere:"kidney", milz:"spleen", pankreas:"pancreas", darm:"intestine", schilddruese:"thyroid", nebenniere:"adrenal", knochenmark:"bone", muskel:"muscle", gallenwege:"gallbladder", gefaess:"vessel" };

    function labelSprite(text, color) {
      const c = document.createElement("canvas"); c.width = 256; c.height = 64; const x = c.getContext("2d");
      x.font = "700 30px Segoe UI, Inter, sans-serif"; const tw = x.measureText(text).width;
      x.fillStyle = "rgba(8,10,14,.72)"; const bx = 128 - tw / 2 - 12, by = 14, bw = tw + 24, bh = 38, r = 9;
      x.beginPath(); x.moveTo(bx + r, by); x.arcTo(bx + bw, by, bx + bw, by + bh, r); x.arcTo(bx + bw, by + bh, bx, by + bh, r); x.arcTo(bx, by + bh, bx, by, r); x.arcTo(bx, by, bx + bw, by, r); x.closePath(); x.fill();
      x.fillStyle = color; x.textAlign = "center"; x.textBaseline = "middle"; x.fillText(text, 128, 34);
      const tex = new THREE.CanvasTexture(c); tex.anisotropy = 2;
      const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false })); sp.scale.set(1.7, 0.42, 1); return sp;
    }

    const entries = []; const pickList = [];
    Object.keys(ORGANS).forEach((k) => {
      const c = ORGAN3D[k]; if (!c) return;
      const col = new THREE.Color(organColor(k)); const mat = omat(col);
      const grp = build(SHAPES[k] || "sphere", mat); grp.position.set(c.x, c.y, c.z);
      grp.userData.org = k; grp.traverse((o) => { o.userData.org = k; });
      dog.add(grp); pickList.push(grp);
      const label = labelSprite(ORGANS[k].map || ORGANS[k].name, "#" + col.getHexString());
      label.position.set(c.x, c.y + 0.55, c.z); dog.add(label);
      entries.push({ k, grp, mat, label, col, beat: k === "herz" });
    });

    /* --- Stoffwechsel-Flüsse --- */
    const flowGroup = new THREE.Group(); dog.add(flowGroup); const flows = [];
    (window.HAEM.ORGAN_LINKS || []).forEach((l) => {
      const a = ORGAN3D[l.a], b = ORGAN3D[l.b]; if (!a || !b) return;
      const va = new THREE.Vector3(a.x, a.y, a.z), vb = new THREE.Vector3(b.x, b.y, b.z);
      const mid = va.clone().add(vb).multiplyScalar(0.5); mid.y += 0.5 + va.distanceTo(vb) * 0.14;
      const curve = new THREE.QuadraticBezierCurve3(va, mid, vb);
      const col = new THREE.Color(organColor(l.a));
      const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, 24, 0.012, 6, false), new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.22 }));
      flowGroup.add(tube);
      const parts = []; for (let i = 0; i < 4; i++) { const pm = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 6), new THREE.MeshBasicMaterial({ color: col })); flowGroup.add(pm); parts.push(pm); }
      flows.push({ a: l.a, b: l.b, curve, tube, parts });
    });

    window.__haemHighlightOrgan = (k) => {
      entries.forEach((e) => { const on = e.k === k; e.mat.emissiveIntensity = on ? 0.6 : 0.14; e.grp.scale.setScalar(on ? 1.18 : 1); e.label.material.opacity = on ? 1 : (labelsOn ? 0.5 : 0); e.label.scale.set(on ? 2.0 : 1.6, on ? 0.5 : 0.4, 1); });
      flows.forEach((f) => { const rel = f.a === k || f.b === k; f.tube.material.opacity = rel ? 0.6 : 0.16; f.parts.forEach((p) => p.scale.setScalar(rel ? 1.5 : 1)); });
    };
    window.__haemFocusOrgan = (k) => { const c = ORGAN3D[k]; if (!c) return; targetG.set(c.x, c.y, c.z); distG = Math.min(distG, 4.2); };

    /* --- Orbit / Zoom / Pan-frei + Tap-Fokus --- */
    let theta = -0.6, phi = 1.2, dist = 8.6, thetaG = theta, phiG = phi, distG = dist;
    const target = new THREE.Vector3(0, 1.5, 0), targetG = target.clone();
    let labelsOn = true, flowOn = true, moved = false, lastPinch = 0;
    const ptrs = new Map(); const ray = new THREE.Raycaster(), mouse = new THREE.Vector2();
    function applyCam() { const st = Math.sin(phi); camera.position.set(target.x + dist * st * Math.sin(theta), target.y + dist * Math.cos(phi), target.z + dist * st * Math.cos(theta)); camera.lookAt(target); }
    applyCam();
    cv.style.touchAction = "none";
    cv.addEventListener("pointerdown", (e) => { cv.setPointerCapture && cv.setPointerCapture(e.pointerId); ptrs.set(e.pointerId, { x: e.clientX, y: e.clientY }); moved = false; });
    cv.addEventListener("pointermove", (e) => {
      if (!ptrs.has(e.pointerId)) return; const prev = ptrs.get(e.pointerId);
      const dx = e.clientX - prev.x, dy = e.clientY - prev.y; ptrs.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (ptrs.size === 1) { thetaG -= dx * 0.006; phiG = clamp(phiG - dy * 0.006, 0.3, Math.PI - 0.3); if (Math.abs(dx) + Math.abs(dy) > 3) moved = true; }
      else if (ptrs.size === 2) { const a = [...ptrs.values()]; const d = Math.hypot(a[0].x - a[1].x, a[0].y - a[1].y); if (lastPinch) distG = clamp(distG * (lastPinch / d), 2.6, 15); lastPinch = d; moved = true; }
    });
    function endPtr(e) { ptrs.delete(e.pointerId); lastPinch = 0; if (!moved && e.pointerType) tryPick(e); }
    cv.addEventListener("pointerup", endPtr); cv.addEventListener("pointercancel", (e) => { ptrs.delete(e.pointerId); lastPinch = 0; });
    cv.addEventListener("wheel", (e) => { e.preventDefault(); distG = clamp(distG * (1 + Math.sign(e.deltaY) * 0.09), 2.6, 15); }, { passive: false });
    function tryPick(e) {
      const r = cv.getBoundingClientRect(); mouse.x = ((e.clientX - r.left) / r.width) * 2 - 1; mouse.y = -((e.clientY - r.top) / r.height) * 2 + 1;
      ray.setFromCamera(mouse, camera); const hit = ray.intersectObjects(pickList, true)[0];
      if (hit) { let o = hit.object; while (o && !o.userData.org) o = o.parent; if (o && o.userData.org) selectOrgan(o.userData.org); }
    }

    /* Steuer-Buttons */
    const bReset = $("#o3d-reset"), bFlow = $("#o3d-flow"), bLabels = $("#o3d-labels");
    if (bReset) bReset.onclick = () => { targetG.set(0, 1.5, 0); distG = 8.6; phiG = 1.2; };
    if (bFlow) bFlow.onclick = () => { flowOn = !flowOn; flowGroup.visible = flowOn; bFlow.classList.toggle("on", flowOn); };
    if (bLabels) bLabels.onclick = () => { labelsOn = !labelsOn; bLabels.classList.toggle("on", labelsOn); window.__haemHighlightOrgan(state.organ); };

    if (state.organ) window.__haemHighlightOrgan(state.organ);

    const ro = new ResizeObserver(() => { const W = stage.clientWidth, H = stage.clientHeight || 380; renderer.setSize(W, H); camera.aspect = W / H; camera.updateProjectionMatrix(); });
    ro.observe(stage);
    let raf;
    (function loop() {
      raf = requestAnimationFrame(loop);
      if (ptrs.size === 0) thetaG += 0.0011; // sanfte Eigenrotation
      theta += (thetaG - theta) * 0.12; phi += (phiG - phi) * 0.12; dist += (distG - dist) * 0.1; target.lerp(targetG, 0.12); applyCam();
      const now = performance.now();
      if (flowOn) flows.forEach((f) => { for (let i = 0; i < f.parts.length; i++) { const tt = ((now / 2600) + i / f.parts.length) % 1; f.parts[i].position.copy(f.curve.getPoint(tt)); } });
      entries.forEach((e) => { if (e.beat) e.grp.scale.setScalar((e.k === state.organ ? 1.18 : 1) * (1 + Math.sin(now / 320) * 0.06)); });
      renderer.render(scene, camera);
    })();
    const obs = new MutationObserver(() => {
      if (!document.body.contains(stage)) {
        cancelAnimationFrame(raf); ro.disconnect(); obs.disconnect();
        window.__haemHighlightOrgan = null; window.__haemFocusOrgan = null; renderer.dispose();
      }
    });
    obs.observe($("#view-canvas"), { childList: true });
  }

  /* -------------------- VIEW: LEITBEFUND-MUSTER -------------------- */
  function renderMuster(canvas) {
    const wrap = el("div", "muster-wrap");
    Object.keys(PATTERNS).forEach((k) => {
      const pat = PATTERNS[k];
      const card = el("div", "muster-card"); card.style.setProperty("--c", pat.color);
      const fHtml = pat.findings.map((f) => {
        const p = PARAMS[f.p]; if (!p) return "";
        return `<span class="finding dir-${f.dir}" data-id="${f.p}">${dirSym(f.dir)} ${p.abbr}</span>`;
      }).join("");
      card.innerHTML =
        `<div class="muster-head"><span class="muster-icon">${pat.icon}</span><span class="muster-name">${pat.name}</span></div>
         <div class="muster-summary">${pat.summary}</div>
         <div class="muster-findings">${fHtml}</div>
         <div class="muster-decisive"><b>Entscheidend:</b> ${pat.decisive}</div>
         <div class="muster-next"><b>Was untersuchen?</b> ${pat.next}</div>`;
      wrap.appendChild(card);
    });
    canvas.appendChild(wrap);
    $$(".finding", wrap).forEach((f) => f.addEventListener("click", () => showDetail(f.dataset.id)));
  }

  /* -------------------- VIEW: 3D-BLUTZELLEN -------------------- */
  const CELL_INFO = {
    rbc: { name: "Erythrozyt", color: "#ff3b3b", param: "rbc",
      text: "Bikonkave Scheibe OHNE Zellkern (⌀ ~7 µm), randvoll mit Hämoglobin. Die Delle in der Mitte vergrößert die Oberfläche und macht die Zelle verformbar. Transportiert O₂ und CO₂. Zu wenige → Anämie." },
    neutrophil: { name: "Neutrophiler Granulozyt", color: "#00f2fe", param: "neutrophile",
      text: "Segmentierter Kern (3–5 Lappen), feine Granula. Wichtigste Fresszelle gegen Bakterien. Unreife Formen (Stabkernige) = Linksverschiebung. Reagiert auch auf Stress/Kortison." },
    lymphozyt: { name: "Lymphozyt", color: "#8ab4ff", param: "lymphozyten",
      text: "Großer runder Kern, schmaler Zytoplasmasaum. Träger der erworbenen Immunität (B-/T-Zellen). Lymphopenie = zuverlässigster Stressmarker." },
    monozyt: { name: "Monozyt", color: "#9d7bff", param: "monozyten",
      text: "Größter Leukozyt, nieren-/hufeisenförmiger Kern. Wandert ins Gewebe und wird zum Makrophagen (Aufräum-/Abwehrzelle). Steigt bei chronischer Entzündung." },
    eosinophil: { name: "Eosinophiler Granulozyt", color: "#ff9f43", param: "eosinophile",
      text: "Zweilappiger Kern, kräftig rote (eosinophile) Granula. Abwehr von Parasiten und Modulation von Allergien." },
    thrombozyt: { name: "Thrombozyt (Blutplättchen)", color: "#f35588", param: "thrombozyten",
      text: "Kleines kernloses Fragment der Megakaryozyten. Verklebt Gefäßlecks (primäre Hämostase). Zu wenige → Petechien/Blutungsneigung." }
  };
  const CELL_LEGEND = ["rbc", "neutrophil", "lymphozyt", "monozyt", "eosinophil", "thrombozyt"];

  function render3D(canvas) {
    const wrap = el("div", "cell3d-wrap");
    const legBtns = CELL_LEGEND.map((k) =>
      `<button class="cell-leg" data-cell="${k}" style="--c:${CELL_INFO[k].color}"><span></span>${CELL_INFO[k].name}</button>`).join("");
    wrap.innerHTML =
      `<div id="cell3d-stage"><div class="cell3d-loading">3D-Szene wird geladen …</div></div>
       <div class="cell3d-legend">${legBtns}</div>
       <div class="cell3d-info" id="cell3d-info">Tippe auf eine Zelle oder die Legende. Ziehen dreht die Ansicht.</div>`;
    canvas.appendChild(wrap);
    $$(".cell-leg", wrap).forEach((b) => b.addEventListener("click", () => showCellInfo(b.dataset.cell)));
    loadThree().then(() => initThreeScene()).catch(() => {
      $("#cell3d-stage").innerHTML =
        '<div class="cell3d-loading">3D benötigt eine Internetverbindung (Three.js wird nachgeladen) oder WebGL. ' +
        'Die Zell-Infos unten funktionieren trotzdem.</div>';
    });
  }

  function showCellInfo(cell) {
    const c = CELL_INFO[cell]; if (!c) return;
    const link = c.param && PARAMS[c.param] ? ` <button class="casc-btn link" id="cell-to-param" data-id="${c.param}">Zum Laborwert ${PARAMS[c.param].abbr} →</button>` : "";
    $("#cell3d-info").innerHTML = `<b style="color:${c.color}">${c.name}</b><br>${c.text}${link}`;
    const lk = $("#cell-to-param"); if (lk) lk.addEventListener("click", () => showDetail(lk.dataset.id));
    $$(".cell-leg").forEach((b) => b.classList.toggle("on", b.dataset.cell === cell));
    if (window.__haemFocusCell) window.__haemFocusCell(cell);
  }

  function loadThree() {
    return new Promise((res, rej) => {
      if (window.THREE) return res();
      const s = document.createElement("script");
      s.src = "https://unpkg.com/three@0.160.0/build/three.min.js";
      s.onload = res; s.onerror = rej;
      document.head.appendChild(s);
      setTimeout(() => { if (!window.THREE) rej(); }, 8000);
    });
  }

  function initThreeScene() {
    const stage = $("#cell3d-stage"); if (!stage || !window.THREE) return;
    stage.innerHTML = "";
    const THREE = window.THREE;
    const w = stage.clientWidth, h = stage.clientHeight || 360;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100);
    camera.position.set(0, 0, 17);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h); renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    stage.appendChild(renderer.domElement);
    scene.add(new THREE.AmbientLight(0xffffff, 0.65));
    const key = new THREE.DirectionalLight(0xffffff, 1.1); key.position.set(6, 8, 10); scene.add(key);
    const rim = new THREE.PointLight(0x00f2fe, 0.7); rim.position.set(-8, -4, 6); scene.add(rim);
    const warm = new THREE.PointLight(0xff5b6e, 0.5); warm.position.set(8, -2, 4); scene.add(warm);

    /* ---- Zell-Bausteine ---- */
    const std = (col, o) => new THREE.MeshStandardMaterial(Object.assign({ color: col, roughness: 0.4, metalness: 0.05 }, o || {}));
    function membrane(col) { return new THREE.Mesh(new THREE.SphereGeometry(1, 28, 20), std(col, { transparent: true, opacity: 0.42, emissive: col, emissiveIntensity: 0.18 })); }
    function nucleusMat() { return std(0x6d3bd1, { roughness: 0.55, emissive: 0x24104a, emissiveIntensity: 0.45 }); }
    function tag(g, type, mains) { g.userData = { type, mains: mains || [], spin: (Math.random() - 0.5) * 0.01 }; g.traverse((o) => { o.userData.type = type; }); return g; }

    const rbcGeo = (function () {
      const prof = [[0, .16], [.34, .18], [.62, .29], [.85, .4], [1.0, .3], [1.06, .12], [1.06, -.12], [1.0, -.3], [.85, -.4], [.62, -.29], [.34, -.18], [0, -.16]];
      return new THREE.LatheGeometry(prof.map((p) => new THREE.Vector2(p[0], p[1])), 40);
    })();
    function buildRBC() {
      const m = new THREE.Mesh(rbcGeo, std(0xff3b3b, { roughness: 0.32, emissive: 0x4d0a0a, emissiveIntensity: 0.3 }));
      m.scale.setScalar(1.25); const g = new THREE.Group(); g.add(m); return tag(g, "rbc", [m]);
    }
    function buildNeutrophil() {
      const g = new THREE.Group(); const mem = membrane(0x00f2fe); mem.scale.setScalar(1.05); g.add(mem);
      const lobes = [[.0, .35, .1], [.4, .0, -.1], [-.1, -.4, .15], [-.45, .15, -.05]];
      lobes.forEach((p, i) => { const n = new THREE.Mesh(new THREE.SphereGeometry(0.36, 16, 12), nucleusMat()); n.position.set(p[0], p[1], p[2]); g.add(n); if (i) { const link = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.4, 8), nucleusMat()); link.position.set((p[0] + lobes[i - 1][0]) / 2, (p[1] + lobes[i - 1][1]) / 2, 0); g.add(link); } });
      return tag(g, "neutrophil", [mem]);
    }
    function buildLymphocyte() {
      const g = new THREE.Group(); const mem = membrane(0x8ab4ff); mem.scale.setScalar(0.82); g.add(mem);
      const nuc = new THREE.Mesh(new THREE.SphereGeometry(0.62, 18, 14), nucleusMat()); nuc.position.set(0.05, 0.05, 0.05); g.add(nuc);
      return tag(g, "lymphozyt", [mem]);
    }
    function buildMonocyte() {
      const g = new THREE.Group(); const mem = membrane(0x9d7bff); mem.scale.setScalar(1.12); g.add(mem);
      const nuc = new THREE.Mesh(new THREE.SphereGeometry(0.6, 18, 14), nucleusMat()); nuc.scale.set(1.1, 0.78, 0.78); nuc.position.set(0.12, 0.05, 0); g.add(nuc);
      const notch = new THREE.Mesh(new THREE.SphereGeometry(0.3, 12, 10), std(0x9d7bff, { transparent: true, opacity: 0.42 })); notch.position.set(-0.35, 0.05, 0.2); g.add(notch);
      return tag(g, "monozyt", [mem]);
    }
    function buildEosinophil() {
      const g = new THREE.Group(); const mem = membrane(0xff9f43); mem.scale.setScalar(1.05); g.add(mem);
      [[0.32, 0, 0], [-0.32, 0, 0]].forEach((p) => { const n = new THREE.Mesh(new THREE.SphereGeometry(0.38, 16, 12), nucleusMat()); n.position.set(p[0], p[1], p[2]); g.add(n); });
      const gran = std(0xff6b2c, { emissive: 0x7a2400, emissiveIntensity: 0.5 });
      for (let i = 0; i < 10; i++) { const d = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 6), gran); d.position.set((Math.random() - .5) * 1.5, (Math.random() - .5) * 1.5, (Math.random() - .5) * 1.5); g.add(d); }
      return tag(g, "eosinophil", [mem]);
    }
    const pltGeo = new THREE.IcosahedronGeometry(0.5, 1); pltGeo.scale(1, 0.42, 1);
    function buildPlatelet() {
      const m = new THREE.Mesh(pltGeo, std(0xf35588, { roughness: 0.45, emissive: 0x4d1124, emissiveIntensity: 0.3 }));
      const g = new THREE.Group(); g.add(m); return tag(g, "thrombozyt", [m]);
    }

    const field = new THREE.Group(); scene.add(field);
    const cells = [];
    function place(g, spread) { g.position.set((Math.random() - .5) * spread, (Math.random() - .5) * (spread * .62), (Math.random() - .5) * 5); g.rotation.set(Math.random() * 6, Math.random() * 6, Math.random() * 6); g.userData.spin = (Math.random() - .5) * 0.012; field.add(g); cells.push(g); }
    for (let i = 0; i < 11; i++) place(buildRBC(), 16);
    place(buildNeutrophil(), 13); place(buildNeutrophil(), 13);
    place(buildLymphocyte(), 13);
    place(buildMonocyte(), 13);
    place(buildEosinophil(), 13);
    for (let i = 0; i < 7; i++) place(buildPlatelet(), 15);

    let rotX = 0, rotY = 0, tX = 0, tY = 0, down = false, lx = 0, ly = 0, moved = false;
    const ray = new THREE.Raycaster(), mouse = new THREE.Vector2();
    function ptr(e) { const t = e.touches ? e.touches[0] : e; return { x: t.clientX, y: t.clientY }; }
    renderer.domElement.addEventListener("pointerdown", (e) => { down = true; moved = false; const p = ptr(e); lx = p.x; ly = p.y; });
    window.addEventListener("pointermove", onMove); function onMove(e) { if (!down) return; const p = ptr(e); tY += (p.x - lx) * 0.005; tX += (p.y - ly) * 0.005; if (Math.abs(p.x - lx) + Math.abs(p.y - ly) > 4) moved = true; lx = p.x; ly = p.y; }
    window.addEventListener("pointerup", onUp); function onUp() { down = false; }
    renderer.domElement.addEventListener("click", (e) => {
      if (moved) return;
      const r = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - r.left) / r.width) * 2 - 1; mouse.y = -((e.clientY - r.top) / r.height) * 2 + 1;
      ray.setFromCamera(mouse, camera);
      const hit = ray.intersectObjects(field.children, true)[0];
      if (hit && hit.object.userData.type) showCellInfo(hit.object.userData.type);
    });
    window.__haemFocusCell = (type) => cells.forEach((g) => {
      const on = g.userData.type === type;
      g.scale.setScalar(on ? 1.35 : 1);
      (g.userData.mains || []).forEach((m) => { if (m.material) m.material.emissiveIntensity = on ? 0.75 : (g.userData.type === "rbc" ? 0.3 : 0.18); });
    });

    const ro = new ResizeObserver(() => { const W = stage.clientWidth, H = stage.clientHeight || 360; renderer.setSize(W, H); camera.aspect = W / H; camera.updateProjectionMatrix(); });
    ro.observe(stage);
    let raf;
    (function loop() {
      raf = requestAnimationFrame(loop);
      rotX += (tX - rotX) * 0.08; rotY += (tY - rotY) * 0.08;
      field.rotation.x = rotX; field.rotation.y = rotY + (down ? 0 : 0.0012 * performance.now() / 16);
      cells.forEach((g) => { g.rotation.z += g.userData.spin; });
      renderer.render(scene, camera);
    })();
    const obs = new MutationObserver(() => {
      if (!document.body.contains(stage)) {
        cancelAnimationFrame(raf); ro.disconnect(); obs.disconnect();
        window.removeEventListener("pointermove", onMove); window.removeEventListener("pointerup", onUp);
        window.__haemFocusCell = null; renderer.dispose();
      }
    });
    obs.observe($("#view-canvas"), { childList: true });
  }

  /* -------------------- DETAIL-PANEL -------------------- */
  function showDefaultDetail() {
    $("#detail-panel-content").innerHTML =
      `<div class="detail-title">Willkommen im Blutwerte-Atlas</div>
       <div class="detail-subtitle">Tippe einen Wert, ein Organ oder ein Muster an</div>
       <div class="detail-body">
         <p>Dieser Atlas erklärt die Blutwerte des Hundes im Zusammenhang: <b>Bedeutung</b>, beteiligte <b>Organe</b>, Verbindung zum <b>Stoffwechsel</b>, Ursachen für <b>↑/↓</b>, mögliche <b>Erkrankungen</b> und <b>was als Nächstes zu untersuchen</b> ist.</p>
         <p>Oben kannst du zwischen <b>Werte</b>, <b>Organe</b>, <b>Muster</b> und <b>3D-Zellen</b> wechseln. Links wählst du <b>Rasse/Alter/Status</b> – die Hinweise passen sich an.</p>
       </div>
       <div class="detail-tox-note"><strong>Hinweis:</strong> Lern- und Nachschlagewerk. Referenzbereiche sind labor-/geräteabhängig. Ersetzt keine tierärztliche Untersuchung.</div>`;
  }

  function chipList(ids) {
    return ids.map((id) => { const p = PARAMS[id]; return `<span class="chip mini" style="--c:${catColor(p.cat)}" data-id="${id}">${p.abbr}</span>`; }).join(" ");
  }

  function showDetail(id) {
    const p = PARAMS[id]; if (!p) return;
    state.selected = id;
    const c = CATEGORIES[p.cat];
    const mod = statusAffects(id);
    const organHtml = (p.organs || []).map((o) => `<span class="chip mini organ" data-org="${o}">${ORGANS[o] ? ORGANS[o].icon + " " + ORGANS[o].name : o}</span>`).join(" ");
    const listHtml = (arr) => "<ul>" + (arr || []).map((x) => `<li>${x}</li>`).join("") + "</ul>";
    const sec = (cls, head, body) => body ? `<div class="d-sec ${cls || ""}"><span class="d-sec-h">${head}</span><div class="d-sec-b">${body}</div></div>` : "";

    const box = $("#detail-panel-content");
    box.innerHTML =
      `<div class="detail-header">
         <span class="detail-badge" style="background:${c.color};color:#04121a">${c.short}</span>
         <span class="detail-badge" style="background:rgba(255,255,255,.06);color:${c.color}">${p.abbr}</span>
       </div>
       <div class="detail-title">${p.name}</div>
       <div class="detail-subtitle">Referenz (adult): ${p.ref.txt}${p.unitSI ? " · SI: " + p.unitSI : ""}</div>
       ${mod ? `<div class="detail-dog-note"><strong>${BREEDS[state.status].name}:</strong> ${mod}</div>` : ""}
       ${p.formula ? `<div class="detail-formula"><span class="lbl">Summenformel / Struktur</span>${p.formula}</div>` : ""}
       ${p.reaktion ? `<div class="detail-formula react"><span class="lbl">Reaktion / Berechnung</span>${p.reaktion}</div>` : ""}
       <div class="detail-body"><p>${p.meaning}</p></div>
       ${sec("", "🫀 Organe", `<div class="chips-row">${organHtml}</div>`)}
       ${sec("", "🔗 Stoffwechsel-Bezug", p.pathway)}
       ${sec("", "🔬 Morphologie / Struktur", p.morphologie)}
       ${sec("", "⚙️ Physiologie", p.physiologie)}
       ${sec("", "🧫 Pathomorphologie", p.patho)}
       <div class="cascade" id="cascade-box">
         <div class="cascade-head">🔀 Was passiert, wenn sich <b>${p.abbr}</b> ändert?</div>
         <div class="cascade-btns">
           <button class="casc-btn up" data-dir="up">▲ erhöht</button>
           <button class="casc-btn down" data-dir="down">▼ erniedrigt</button>
         </div>
         <div class="cascade-out" id="cascade-out"></div>
       </div>
       <div class="d-sec up"><span class="d-sec-h">▲ Erhöht bei</span>${listHtml(p.high)}</div>
       <div class="d-sec down"><span class="d-sec-h">▼ Erniedrigt bei</span>${listHtml(p.low)}</div>
       ${sec("", "🩺 Mögliche Erkrankungen", `<div class="chips-row tags">${(p.diseases || []).map((d) => `<span class="tag">${d}</span>`).join("")}</div>`)}
       <div class="d-sec next"><span class="d-sec-h">🔎 Was untersuchen?</span><div class="d-sec-b">${p.next}</div></div>
       <div class="d-sec"><span class="d-sec-h">🔗 Im VET-PHARM-Verbund</span><div class="chips-row" style="margin-top:6px">
         <a class="chip" style="--c:#e0a020;text-decoration:none" href="../canis-reise/" title="Reisekrankheiten, die diesen Wert verändern – inkl. Labor-Matrix">🧫 Reisekrankheiten</a>
         <a class="chip" style="--c:#0aa2c4;text-decoration:none" href="../canis-metabolica/" title="Zugehöriger Stoffwechselweg">🧬 Stoffwechsel</a>
       </div></div>`;

    $$(".chip.organ", box).forEach((ch) => ch.addEventListener("click", () => { setMode("organe"); setTimeout(() => selectOrgan(ch.dataset.org), 60); }));
    $$(".casc-btn", box).forEach((b) => b.addEventListener("click", () => renderCascade(id, b.dataset.dir, box)));
    if (state.mode === "werte") render(); // re-highlight card
    if (window.matchMedia("(max-width:900px)").matches) {
      $(".panel-details").scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }

  /* -------------------- KASKADE: Was-wäre-wenn (↑/↓) -------------------- */
  function buildCascade(id, dir) {
    const p = PARAMS[id];
    const organe = new Set(p.organs || []);
    const mit = []; const seen = new Set([id]); const patternsHit = [];
    Object.keys(PATTERNS).forEach((pk) => {
      const pat = PATTERNS[pk];
      const me = pat.findings.find((f) => f.p === id && (f.dir === dir || f.dir === "var"));
      if (!me) return;
      patternsHit.push(pat.name);
      pat.findings.forEach((f) => {
        if (seen.has(f.p)) return; seen.add(f.p);
        const q = PARAMS[f.p]; if (!q) return;
        mit.push({ p: f.p, dir: f.dir, abbr: q.abbr, cat: q.cat });
        (q.organs || []).forEach((o) => organe.add(o));
      });
    });
    return { organe: [...organe], mit, patternsHit, effect: dir === "up" ? p.effectUp : p.effectDown };
  }

  function renderCascade(id, dir, box) {
    $$(".casc-btn", box).forEach((b) => b.classList.toggle("on", b.dataset.dir === dir));
    const cc = buildCascade(id, dir);
    const out = $("#cascade-out", box); if (!out) return;
    const organChips = cc.organe.map((o) => `<span class="chip mini organ" data-org="${o}">${ORGANS[o] ? ORGANS[o].icon + " " + ORGANS[o].name : o}</span>`).join(" ") || "<span class='casc-muted'>—</span>";
    const mitChips = cc.mit.map((m) => `<span class="chip mini" style="--c:${catColor(m.cat)}" data-id="${m.p}">${dirSym(m.dir)} ${m.abbr}</span>`).join(" ") || "<span class='casc-muted'>keine typische Begleitveränderung hinterlegt</span>";
    out.innerHTML =
      `${cc.effect ? `<div class="casc-effect">${dirSym(dir)} ${cc.effect}</div>` : ""}
       <div class="casc-row"><span class="casc-lbl">Betroffene Organe</span><div class="chips-row">${organChips}</div></div>
       <div class="casc-row"><span class="casc-lbl">Ändert sich oft gemeinsam mit</span><div class="chips-row">${mitChips}</div></div>
       ${cc.patternsHit.length ? `<div class="casc-row"><span class="casc-lbl">Passende Leitbefund-Muster</span><div class="chips-row tags">${cc.patternsHit.map((n) => `<span class="tag">${n}</span>`).join("")}</div></div>` : ""}`;
    $$(".chip.organ", out).forEach((ch) => ch.addEventListener("click", () => { setMode("organe"); setTimeout(() => selectOrgan(ch.dataset.org), 60); }));
    $$(".chip[data-id]", out).forEach((ch) => ch.addEventListener("click", () => showDetail(ch.dataset.id)));
  }

  /* -------------------- AKTIONEN: TEILEN / QUELLEN -------------------- */
  function attachGlobalActions() {
    const share = async () => {
      const url = location.href.split("?")[0];
      const data = { title: "Canis Hæmatica – Blutwerte-Atlas Hund", text: "Interaktiver Blutwerte-Atlas des Hundes: Werte, Organe, Muster, 3D-Zellen.", url };
      if (navigator.share) { try { await navigator.share(data); } catch (e) {} }
      else {
        const wa = "https://wa.me/?text=" + encodeURIComponent(data.text + " " + url);
        window.open(wa, "_blank");
      }
    };
    ["#btn-share", "#btn-share-side"].forEach((s) => { const b = $(s); if (b) b.addEventListener("click", share); });
    ["#btn-sources", "#btn-sources-side"].forEach((s) => { const b = $(s); if (b) b.addEventListener("click", showSources); });
  }

  function showSources() {
    $("#detail-panel-content").innerHTML =
      `<div class="detail-title">Quellen & Regionen</div>
       <div class="detail-subtitle">Orientierung, kein Laborersatz</div>
       <div class="detail-body">
         <p><b>Region/Labor:</b> ${REGION_NOTE}</p>
         <p><b>Fachliche Orientierung:</b> eClinPath (Cornell University), MSD/Merck Veterinary Manual, IDEXX & IRIS (Nierenstaging), Standard-Lehrbücher der Veterinär-Hämatologie/Klinischen Chemie.</p>
       </div>
       <div class="source-list">
         <a href="https://eclinpath.com" target="_blank" rel="noopener">eclinpath.com (Cornell)</a>
         <a href="https://www.msdvetmanual.com" target="_blank" rel="noopener">MSD Veterinary Manual</a>
         <a href="http://www.iris-kidney.com" target="_blank" rel="noopener">IRIS Kidney (Nieren-Staging)</a>
       </div>
       <div class="detail-tox-note"><strong>Wichtig:</strong> Referenzbereiche sind geräte-/laborabhängig. Werte nie isoliert, sondern mit Signalement, Symptomen und Vorbericht interpretieren.</div>`;
  }

  /* -------------------- PWA + SHARE-TARGET -------------------- */
  function registerSW() { if ("serviceWorker" in navigator) navigator.serviceWorker.register("./sw.js").catch(() => {}); }
  function handleSharedParam() {
    const q = new URLSearchParams(location.search).get("w");
    if (q && PARAMS[q]) showDetail(q);
  }
})();
