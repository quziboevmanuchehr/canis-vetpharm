/* =========================================================================
   VET-PHARM · Shared UI controller (vetpharm-ui.js)  ·  v2
   ---------------------------------------------------------------------------
   Loaded by every page (Start, Metabolica, Hæmatica, Reise). Purely additive:
   it never touches the modules' own logic, data, maps or the dog image.

     1. Theme        — light "Liquid-Glass" (default) + original dark, toggled
                       via one button, persisted in localStorage, shared across
                       all modules on the same origin.
     2. One menu     — ONE identical hamburger drawer on EVERY page, with all
                       four destinations (Metabolica · Hæmatica · Reise · Start)
                       plus cross-module quick-links ("Zusammenhang").
                       Native per-module drawers are hidden so the menu and the
                       single "general menu button" look the same everywhere.
   ========================================================================= */
(function () {
  "use strict";
  var root = document.documentElement;
  var KEY = "vp-theme";

  /* ---- theme: apply stored choice immediately (default = light glass) ---- */
  var saved = "light";
  try { saved = localStorage.getItem(KEY) === "dark" ? "dark" : "light"; } catch (e) {}
  root.setAttribute("data-theme", saved);

  function theme() { return root.getAttribute("data-theme") === "dark" ? "dark" : "light"; }
  function applyTheme(t) {
    root.setAttribute("data-theme", t);
    try { localStorage.setItem(KEY, t); } catch (e) {}
    var m = document.querySelector('meta[name="theme-color"]');
    if (m) m.setAttribute("content", t === "light" ? "#e9eef7" : "#0a0c10");
    syncToggles();
    repaint();
  }
  function toggleTheme() { applyTheme(theme() === "light" ? "dark" : "light"); }
  /* nudge a repaint so backdrop-filter layers recomposite on a live toggle */
  function repaint() {
    var b = document.body; if (!b) return;
    b.style.opacity = "0.9999";
    requestAnimationFrame(function () { b.style.opacity = ""; });
  }
  function syncToggles() {
    var light = theme() === "light";
    document.querySelectorAll(".vp-theme-toggle").forEach(function (b) {
      b.innerHTML = light ? '<span class="vp-ti">☾</span>' : '<span class="vp-ti">☀︎</span>';
      b.title = light ? "Heller Glass-Modus – zu Dunkel wechseln"
                      : "Dunkler Modus – zu Hell wechseln";
    });
  }
  function makeToggle(cls) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "vp-theme-toggle" + (cls ? " " + cls : "");
    b.setAttribute("aria-label", "Hell- oder Dunkelmodus umschalten");
    b.addEventListener("click", toggleTheme);
    return b;
  }

  /* ---- destinations ---- */
  var BASE = location.pathname.indexOf("/canis-") >= 0 ? "../" : "";
  function here(seg) { return location.pathname.indexOf("/" + seg + "/") >= 0; }
  var inModule = location.pathname.indexOf("/canis-") >= 0;

  var MODULES = [
    { seg: "canis-metabolica", ic: "🧬", tt: "Canis Metabolica", sb: "Stoffwechselkarte", nl: "#0aa2c4" },
    { seg: "canis-haematica",  ic: "🩸", tt: "Canis Hæmatica",  sb: "Blutwerte-Atlas",   nl: "#e23b6d" },
    { seg: "canis-reise",      ic: "🧫", tt: "Canis Reise",      sb: "Reiseerkrankungen", nl: "#e0a020" },
    { seg: "__home",           ic: "🏠", tt: "Startseite",       sb: "Modul-Auswahl",     nl: "#16a06a" }
  ];
  function hrefFor(seg) { return seg === "__home" ? (BASE || "./") : (BASE + seg + "/"); }
  function isActive(seg) { return seg === "__home" ? !inModule : here(seg); }

  /* cross-module "Zusammenhang" quick-links — the connective tissue */
  var LINKS = [
    { ic: "🧬", t: "Stoffwechselwege", s: "Glykolyse · Citratzyklus · Harnstoff", href: BASE + "canis-metabolica/" },
    { ic: "🩸", t: "Blutwert nachschlagen", s: "73 Parameter · Organbezug · ↑/↓", href: BASE + "canis-haematica/" },
    { ic: "🗺️", t: "Reise-Risikokarte", s: "Welt & Europa · Länder-Hotspots", href: BASE + "canis-reise/" },
    { ic: "🧪", t: "Labor ↔ Krankheit", s: "Welcher Wert bei welcher Reisekrankheit?", href: BASE + "canis-reise/" }
  ];

  function drawerHTML() {
    var mods = MODULES.map(function (m) {
      return '<a class="vp-nav-link' + (isActive(m.seg) ? " active" : "") + '" style="--nl:' + m.nl +
        '" href="' + hrefFor(m.seg) + '"><span class="nl-ic">' + m.ic +
        '</span><span class="nl-tx"><span class="nl-tt">' + m.tt + '</span><span class="nl-sb">' +
        m.sb + "</span></span><span class='nl-go'>›</span></a>";
    }).join("");
    var links = LINKS.map(function (l) {
      return '<a class="vp-qlink" href="' + l.href + '"><span class="ql-ic">' + l.ic +
        '</span><span class="ql-tx"><b>' + l.t + "</b><span>" + l.s + "</span></span></a>";
    }).join("");
    return '<div class="vp-nav-panel" role="document">' +
        '<div class="vp-nav-head"><div class="vp-brand"><span class="vp-brand-dot"></span>' +
          '<span class="vp-brand-tx"><b>VET-PHARM</b><i>Canis · Hund</i></span></div>' +
          '<button class="vp-nav-close" type="button" aria-label="Menü schließen">&times;</button></div>' +
        '<div class="vp-nav-sec">Module</div>' + mods +
        '<div class="vp-nav-sec">Zusammenhang &amp; Schnellzugriff</div>' +
        '<div class="vp-qlinks">' + links + "</div>" +
        '<div class="vp-nav-foot">Stoffwechsel → Blutwerte → Krankheiten und zurück: ein ' +
          'verknüpftes Lern- &amp; Nachschlagewerk. Ersetzt keine tierärztliche Diagnose.</div>' +
      "</div>";
  }

  function build() {
    /* hide every native module menu so ONE consistent menu remains */
    ["#btn-nav", "header .hamburger", "#nav-overlay"].forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (n) { n.style.display = "none"; });
    });

    /* futuristic signature: one thin animated accent line on top of every page */
    if (!document.querySelector(".vp-topline")) {
      var tl = document.createElement("div");
      tl.className = "vp-topline";
      tl.setAttribute("aria-hidden", "true");
      document.body.appendChild(tl);
    }

    /* host for the toggle + hamburger: the header action bar, else a floating pill */
    var host = document.querySelector(".app-actions") || document.querySelector("header .actions");
    var floating = false;
    if (!host) {
      host = document.createElement("div");
      host.className = "vp-fab-bar";
      document.body.appendChild(host);
      floating = true;
    }
    var inActions = !floating && host.classList.contains("actions");

    var toggle = makeToggle(floating ? "" : (inActions ? "btn" : "app-action"));
    var burger = document.createElement("button");
    burger.type = "button";
    burger.className = "vp-hamburger" + (floating ? "" : (inActions ? " btn" : ""));
    burger.setAttribute("aria-label", "Menü öffnen");
    burger.innerHTML = "<span></span><span></span><span></span>";
    host.appendChild(toggle);
    host.appendChild(burger);

    var ov = document.createElement("div");
    ov.className = "vp-nav-overlay";
    ov.setAttribute("role", "dialog");
    ov.setAttribute("aria-modal", "true");
    ov.setAttribute("aria-label", "VET-PHARM Navigation");
    ov.innerHTML = drawerHTML();
    document.body.appendChild(ov);

    function open() { ov.classList.add("open"); document.body.style.overflow = "hidden"; }
    function close() { ov.classList.remove("open"); document.body.style.overflow = ""; }
    burger.addEventListener("click", open);
    ov.querySelector(".vp-nav-close").addEventListener("click", close);
    ov.addEventListener("click", function (e) { if (e.target === ov) close(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });

    syncToggles();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", build);
  } else { build(); }
})();
