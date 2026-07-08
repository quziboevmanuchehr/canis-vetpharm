/* =========================================================================
   VET-PHARM · Shared UI controller (vetpharm-ui.js)  ·  v3
   ---------------------------------------------------------------------------
   Loaded by every page (Start, Metabolica, Hæmatica, Reise, Anæsthesie).
   Purely additive — never touches a module's own logic, data, maps or images.

     1. Theme        — light "Liquid-Glass" (default) + dark, persisted.
     2. One menu     — one identical hamburger drawer on EVERY page (all
                       modules + cross-module "Zusammenhang" quick-links).
     3. Einstellungen — a shared settings drawer (⚙︎ gear) on every page:
                       Darstellung (Modus, Bewegung, Schrift, Kontrast, Glass,
                       Tooltips). Persisted in localStorage, shared everywhere,
                       exposed via window.VP.
     4. Tooltips     — global hint engine: any element with data-vp-tip shows a
                       frosted tooltip on hover / focus / tap.
     5. window.VP    — { get, set, setAll, onChange, theme, applyTheme, openSettings }
   ========================================================================= */
(function () {
  "use strict";
  var root = document.documentElement;
  var TKEY = "vp-theme";
  var SKEY = "vp-settings";

  var DEFAULTS = { motion: "full", tips: "on", glass: "on", fontsize: "normal", contrast: "normal" };
  function loadSettings() {
    var s = {};
    try { s = JSON.parse(localStorage.getItem(SKEY) || "{}") || {}; } catch (e) {}
    return Object.assign({}, DEFAULTS, s);
  }
  function saveSettings() { try { localStorage.setItem(SKEY, JSON.stringify(settings)); } catch (e) {} }
  var settings = loadSettings();
  var listeners = [];
  function emit() { listeners.forEach(function (fn) { try { fn(Object.assign({}, settings), theme()); } catch (e) {} }); }
  function applyGlobalSettings() {
    root.setAttribute("data-vp-motion", settings.motion);
    root.setAttribute("data-vp-tips", settings.tips);
    root.setAttribute("data-vp-glass", settings.glass);
    root.setAttribute("data-vp-fontsize", settings.fontsize);
    root.setAttribute("data-vp-contrast", settings.contrast);
  }

  /* ---- theme: apply stored choice immediately (default = light glass) ---- */
  var saved = "light";
  try { saved = localStorage.getItem(TKEY) === "dark" ? "dark" : "light"; } catch (e) {}
  root.setAttribute("data-theme", saved);
  applyGlobalSettings();

  function theme() { return root.getAttribute("data-theme") === "dark" ? "dark" : "light"; }
  function applyTheme(t) {
    root.setAttribute("data-theme", t);
    try { localStorage.setItem(TKEY, t); } catch (e) {}
    var m = document.querySelector('meta[name="theme-color"]');
    if (m) m.setAttribute("content", t === "light" ? "#e9eef7" : "#0a0c10");
    syncToggles(); syncSettingsUI(); repaint(); emit();
  }
  function toggleTheme() { applyTheme(theme() === "light" ? "dark" : "light"); }
  function repaint() {
    var b = document.body; if (!b) return;
    b.style.opacity = "0.9999";
    requestAnimationFrame(function () { b.style.opacity = ""; });
  }
  function syncToggles() {
    var light = theme() === "light";
    document.querySelectorAll(".vp-theme-toggle").forEach(function (b) {
      b.innerHTML = light ? '<span class="vp-ti">☾</span>' : '<span class="vp-ti">☀︎</span>';
      b.setAttribute("data-vp-tip", light ? "Heller Glass-Modus aktiv – tippen für Dunkelmodus"
                                          : "Dunkler Modus aktiv – tippen für Hell-Modus");
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
    { seg: "canis-metabolica",  ic: "🧬", tt: "Canis Metabolica", sb: "Stoffwechselkarte", nl: "#0aa2c4" },
    { seg: "canis-haematica",   ic: "🩸", tt: "Canis Hæmatica",  sb: "Blutwerte-Atlas",   nl: "#e23b6d" },
    { seg: "canis-reise",       ic: "🧫", tt: "Canis Reise",      sb: "Reiseerkrankungen", nl: "#e0a020" },
    { seg: "canis-anaesthesie", ic: "💉", tt: "Canis Anæsthesia", sb: "Narkose & Notfall", nl: "#8b7cf6" },
    { seg: "__home",            ic: "🏠", tt: "Startseite",       sb: "Modul-Auswahl",     nl: "#16a06a" }
  ];
  function hrefFor(seg) { return seg === "__home" ? (BASE || "./") : (BASE + seg + "/"); }
  function isActive(seg) { return seg === "__home" ? !inModule : here(seg); }

  var LINKS = [
    { ic: "🧬", t: "Stoffwechselwege", s: "Glykolyse · Citratzyklus · Harnstoff", href: BASE + "canis-metabolica/" },
    { ic: "🩸", t: "Blutwert nachschlagen", s: "73 Parameter · Organbezug · ↑/↓", href: BASE + "canis-haematica/" },
    { ic: "🗺️", t: "Reise-Risikokarte", s: "Welt & Europa · Länder-Hotspots", href: BASE + "canis-reise/" },
    { ic: "🚨", t: "Narkose-Notfall", s: "Zwischenfall · Dosis · Dichtigkeitstest", href: BASE + "canis-anaesthesie/" },
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
        '<div class="vp-nav-foot">Stoffwechsel → Blutwerte → Krankheiten → Narkose und zurück: ein ' +
          'verknüpftes Lern- &amp; Nachschlagewerk. Ersetzt keine tierärztliche Diagnose.</div>' +
      "</div>";
  }

  /* ---------- settings drawer (display settings) ---------- */
  function seg(key, opts) {
    return '<div class="vp-seg" data-key="' + key + '">' + opts.map(function (o) {
      return '<button type="button" data-val="' + o[0] + '"' + (o[2] ? ' data-vp-tip="' + o[2] + '"' : "") +
        (settings[key] === o[0] ? ' class="on"' : "") + ">" + o[1] + "</button>";
    }).join("") + "</div>";
  }
  function settingsHTML() {
    var th = theme();
    return '<div class="vp-set-panel" role="document">' +
      '<div class="vp-nav-head"><div class="vp-brand"><span class="vp-brand-dot"></span>' +
        '<span class="vp-brand-tx"><b>Einstellungen</b><i>gilt für alle Module</i></span></div>' +
        '<button class="vp-set-close" type="button" aria-label="Einstellungen schließen">&times;</button></div>' +

      '<div class="vp-nav-sec">Darstellung</div>' +
      '<div class="vp-set-row"><label>Modus</label><div class="vp-seg" data-key="__theme">' +
        '<button type="button" data-val="light"' + (th === "light" ? ' class="on"' : "") + ' data-vp-tip="Heller Liquid-Glass-Modus">☀︎ Hell</button>' +
        '<button type="button" data-val="dark"' + (th === "dark" ? ' class="on"' : "") + ' data-vp-tip="Dunkler Modus (Originaldesign)">☾ Dunkel</button>' +
      "</div></div>" +
      '<div class="vp-set-row"><label data-vp-tip="Reduziert Animationen für ruhigere Darstellung / Barrierefreiheit / Akku">Bewegung</label>' +
        seg("motion", [["full", "Voll"], ["reduce", "Reduziert", "Stoppt Shimmer, Puls & Übergänge"]]) + "</div>" +
      '<div class="vp-set-row"><label data-vp-tip="Skaliert Schrift & Tooltips für bessere Lesbarkeit">Schriftgröße</label>' +
        seg("fontsize", [["normal", "S"], ["large", "M"], ["xl", "L"]]) + "</div>" +
      '<div class="vp-set-row"><label data-vp-tip="Kräftigere Ränder & Kontraste">Kontrast</label>' +
        seg("contrast", [["normal", "Normal"], ["high", "Hoch"]]) + "</div>" +
      '<div class="vp-set-row"><label data-vp-tip="Frosted-Glass-Unschärfe. Aus = schneller auf schwachen Geräten">Glass-Effekt</label>' +
        seg("glass", [["on", "An"], ["off", "Aus"]]) + "</div>" +
      '<div class="vp-set-row"><label data-vp-tip="Diese schwebenden Erklärungen bei Maus/Tipp auf Schaltflächen">Tooltips</label>' +
        seg("tips", [["on", "An"], ["off", "Aus"]]) + "</div>" +

      '<div class="vp-set-actions"><button type="button" class="vp-set-reset">Auf Standard zurücksetzen</button></div>' +
      '<div class="vp-nav-foot">Darstellung gilt für alle Module und wird gespeichert. Patient/Gewicht stellst du ' +
        'direkt im jeweiligen Modul ein (z. B. Narkose-Patientenleiste).</div>' +
      "</div>";
  }
  function syncSettingsUI() {
    var ov = document.querySelector(".vp-set-overlay"); if (!ov) return;
    ov.querySelectorAll(".vp-seg").forEach(function (s) {
      var key = s.getAttribute("data-key");
      var val = key === "__theme" ? theme() : settings[key];
      s.querySelectorAll("button").forEach(function (b) { b.classList.toggle("on", b.getAttribute("data-val") === String(val)); });
    });
  }

  /* ---------- global tooltip engine ---------- */
  function initTips() {
    if (root.__vpTips) return; root.__vpTips = true;
    var tip = document.createElement("div");
    tip.className = "vp-tip"; tip.setAttribute("role", "tooltip"); tip.setAttribute("aria-hidden", "true");
    document.body.appendChild(tip);
    var cur = null, hideT = null;
    function place(t) {
      var title = t.getAttribute("data-vp-tip-title");
      var body = t.getAttribute("data-vp-tip") || "";
      tip.innerHTML = (title ? '<b class="vp-tip-t">' + title + "</b>" : "") + '<span class="vp-tip-b">' + body + "</span>";
      tip.classList.add("show"); tip.setAttribute("aria-hidden", "false");
      var r = t.getBoundingClientRect(), tr = tip.getBoundingClientRect();
      var gap = 9, vw = innerWidth, vh = innerHeight;
      var left = r.left + r.width / 2 - tr.width / 2;
      left = Math.max(8, Math.min(left, vw - tr.width - 8));
      var top = r.top - tr.height - gap; var below = false;
      if (top < 6) { top = r.bottom + gap; below = true; }
      if (top + tr.height > vh - 6) top = Math.max(6, vh - tr.height - 6);
      tip.style.left = left + "px"; tip.style.top = top + "px";
      tip.setAttribute("data-pos", below ? "below" : "above");
      var ar = Math.max(left + 12, Math.min(r.left + r.width / 2, left + tr.width - 12));
      tip.style.setProperty("--vp-tip-ax", (ar - left) + "px");
    }
    function show(t) { cur = t; clearTimeout(hideT); place(t); }
    function hide() { cur = null; tip.classList.remove("show"); tip.setAttribute("aria-hidden", "true"); }
    function on(e) {
      if (settings.tips !== "on") return;
      var t = e.target && e.target.closest ? e.target.closest("[data-vp-tip]") : null;
      if (t && t !== cur && t.getAttribute("data-vp-tip")) show(t);
    }
    function off(e) {
      var t = e.target && e.target.closest ? e.target.closest("[data-vp-tip]") : null;
      if (t && t === cur) hide();
    }
    document.addEventListener("pointerover", on);
    document.addEventListener("pointerout", off);
    document.addEventListener("focusin", on);
    document.addEventListener("focusout", off);
    document.addEventListener("pointerdown", function (e) {
      if (settings.tips !== "on") return;
      if (e.pointerType === "mouse") return;
      var t = e.target && e.target.closest ? e.target.closest("[data-vp-tip]") : null;
      if (t && t.getAttribute("data-vp-tip")) { show(t); clearTimeout(hideT); hideT = setTimeout(hide, 2600); }
      else hide();
    }, true);
    window.addEventListener("scroll", hide, true);
    window.addEventListener("resize", hide);
  }

  /* ---------- build injected chrome ---------- */
  function build() {
    ["#btn-nav", "header .hamburger", "#nav-overlay"].forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (n) { n.style.display = "none"; });
    });

    if (!document.querySelector(".vp-topline")) {
      var tl = document.createElement("div");
      tl.className = "vp-topline"; tl.setAttribute("aria-hidden", "true");
      document.body.appendChild(tl);
    }

    var host = document.querySelector(".app-actions") || document.querySelector("header .actions");
    var floating = false;
    if (!host) {
      host = document.createElement("div"); host.className = "vp-fab-bar";
      document.body.appendChild(host); floating = true;
    }
    var inActions = !floating && host.classList.contains("actions");
    var ctlCls = floating ? "" : (inActions ? "btn" : "app-action");

    var toggle = makeToggle(ctlCls);

    var gear = document.createElement("button");
    gear.type = "button";
    gear.className = "vp-gear" + (floating ? "" : (inActions ? " btn" : ""));
    gear.setAttribute("aria-label", "Einstellungen öffnen");
    gear.setAttribute("data-vp-tip", "Einstellungen – Darstellung, Bewegung, Schrift, Kontrast & Tooltips (für alle Module)");
    gear.innerHTML = '<span class="vp-gi">⚙︎</span>';

    var burger = document.createElement("button");
    burger.type = "button";
    burger.className = "vp-hamburger" + (floating ? "" : (inActions ? " btn" : ""));
    burger.setAttribute("aria-label", "Menü öffnen");
    burger.setAttribute("data-vp-tip", "Module & Zusammenhang – Stoffwechsel · Blutwerte · Reise · Narkose");
    burger.innerHTML = "<span></span><span></span><span></span>";

    host.appendChild(toggle); host.appendChild(gear); host.appendChild(burger);

    /* nav drawer */
    var ov = document.createElement("div");
    ov.className = "vp-nav-overlay"; ov.setAttribute("role", "dialog"); ov.setAttribute("aria-modal", "true");
    ov.setAttribute("aria-label", "VET-PHARM Navigation");
    ov.innerHTML = drawerHTML();
    document.body.appendChild(ov);
    function openNav() { ov.classList.add("open"); document.body.style.overflow = "hidden"; }
    function closeNav() { ov.classList.remove("open"); document.body.style.overflow = ""; }
    burger.addEventListener("click", openNav);
    ov.querySelector(".vp-nav-close").addEventListener("click", closeNav);
    ov.addEventListener("click", function (e) { if (e.target === ov) closeNav(); });

    /* settings drawer */
    var so = document.createElement("div");
    so.className = "vp-set-overlay"; so.setAttribute("role", "dialog"); so.setAttribute("aria-modal", "true");
    so.setAttribute("aria-label", "Einstellungen");
    so.innerHTML = settingsHTML();
    document.body.appendChild(so);
    function openSet() { so.classList.add("open"); document.body.style.overflow = "hidden"; syncSettingsUI(); }
    function closeSet() { so.classList.remove("open"); document.body.style.overflow = ""; }
    gear.addEventListener("click", openSet);
    wireSettings(so, closeSet);

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { closeNav(); closeSet(); }
    });

    syncToggles(); initTips();

    window.VP = {
      get: function (k) { return k ? settings[k] : Object.assign({}, settings); },
      set: function (k, v) { settings[k] = v; saveSettings(); applyGlobalSettings(); syncSettingsUI(); emit(); },
      setAll: function (o) { Object.assign(settings, o); saveSettings(); applyGlobalSettings(); syncSettingsUI(); emit(); },
      onChange: function (fn) { listeners.push(fn); return function () { listeners = listeners.filter(function (x) { return x !== fn; }); }; },
      theme: theme, applyTheme: applyTheme, toggleTheme: toggleTheme,
      openSettings: openSet, closeSettings: closeSet
    };
  }

  function wireSettings(so, closeSet) {
    so.querySelector(".vp-set-close").addEventListener("click", closeSet);
    so.addEventListener("click", function (e) { if (e.target === so) closeSet(); });
    so.querySelectorAll(".vp-seg button").forEach(function (b) {
      b.addEventListener("click", function () {
        var key = b.parentNode.getAttribute("data-key"), val = b.getAttribute("data-val");
        if (key === "__theme") { applyTheme(val); return; }
        settings[key] = val; saveSettings(); applyGlobalSettings();
        b.parentNode.querySelectorAll("button").forEach(function (x) { x.classList.toggle("on", x === b); });
        emit();
      });
    });
    var rst = so.querySelector(".vp-set-reset");
    if (rst) rst.addEventListener("click", function () {
      var keepTheme = theme();
      settings = Object.assign({}, DEFAULTS); saveSettings(); applyGlobalSettings();
      so.innerHTML = settingsHTML(); wireSettings(so, closeSet); applyTheme(keepTheme); emit();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", build);
  } else { build(); }
})();
