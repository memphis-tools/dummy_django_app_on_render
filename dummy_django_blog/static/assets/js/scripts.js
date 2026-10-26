/* ===== ANTI-REPETITION DES CITATIONS =====
   pickFresh memorise le dernier index tire par cle et evite de retomber dessus,
   pour ne jamais voir deux fois la meme citation d'affilee. */
var __lastQuoteIdx = {};
function pickFresh(pool, key) {
  if (!pool || !pool.length) return null;
  var idx = Math.floor(Math.random() * pool.length);
  if (pool.length > 1 && __lastQuoteIdx[key] === idx) {
    idx = (idx + 1 + Math.floor(Math.random() * (pool.length - 1))) % pool.length;
  }
  __lastQuoteIdx[key] = idx;
  return pool[idx];
}

/* ===== NAVBAR : FOND QUASI-OPAQUE DES QU'ON QUITTE LE SOMMET ===== */
document.addEventListener("DOMContentLoaded", function() {
  var navbar = document.querySelector(".navbar-custom");
  if (!navbar) return;
  function apply() {
    if (window.scrollY > 8) navbar.classList.add("nav-scrolled");
    else navbar.classList.remove("nav-scrolled");
  }
  apply();
  window.addEventListener("scroll", apply, { passive: true });
});

var footer_date = new Date();
document.getElementById("footer_date").innerHTML = "Blog &copy;LesPetitsMeurtres 2023-" + footer_date.getFullYear();

document.addEventListener("DOMContentLoaded", function() {
  var msgLis = document.querySelectorAll(".django-messages li");
  msgLis.forEach(function(li) {
    var closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.className = "django-message-close";
    closeBtn.setAttribute("aria-label", "Fermer le message");
    closeBtn.innerHTML = "\u00d7";
    var dismiss = function() {
      li.classList.add("django-message-out");
      setTimeout(function() { li.remove(); }, 520);
    };
    closeBtn.addEventListener("click", dismiss);
    li.appendChild(closeBtn);
    var delay = li.classList.contains("error") ? 12000 : 6000;
    setTimeout(dismiss, delay);
  });
});

document.addEventListener("DOMContentLoaded", function() {
    var toggler = document.querySelector(".navbar-toggler");
    toggler.addEventListener("click", function() {
    update_menu();
  });
})


function close_menu() {
  var navbar_toggler = document.getElementById("navbar-toggler");
  var toggler_state = navbar_toggler.getAttribute("aria-expanded") ;
  var menu = document.querySelector('#navbarNav');
  var menu_parent = document.getElementById("navbar-nav");
  var nav_links = menu_parent.getElementsByClassName("nav-link");
  var last_nav_link = nav_links[nav_links.length - 1];
  menu_parent.removeChild(last_nav_link);
  menu.classList.remove('show');
}


function update_menu() {
  var navbar_toggler = document.getElementById("navbar-toggler");
  var toggler_state = navbar_toggler.getAttribute("aria-expanded") ;
  if (toggler_state == "true") {
    var menu_parent = document.getElementById("navbar-nav");
    var child_link = document.createElement("div");
    child_link.className="nav-link";
    var child_item = document.createElement("a");
    child_item.className="nav-item";
    child_item.href="#";
    child_item.text="FERMER MENU";
    child_item.onclick=close_menu;
    child_link.appendChild(child_item);
    menu_parent.appendChild(child_link);
  }
  else {
    close_menu();
  }
}

document.addEventListener("DOMContentLoaded", function() {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.forEach(function (tooltipTriggerEl) {
        new bootstrap.Tooltip(tooltipTriggerEl);
    });
});
document.addEventListener("DOMContentLoaded", function() {
  var defaultProfile = document.querySelector(".user-dropdown-profile .navbar-profile-in-menu");
  if (!defaultProfile) return;
  if (!/default_profile\.png$/.test(defaultProfile.getAttribute("src"))) return;
  var badges = [
    { shapes: [
      { tag: "path", attrs: { d: "M32 6l5.5 12.4L50.7 20l-9.4 9.1 2.4 13.1L32 36.2 20.3 42.2l2.4-13.1-9.4-9.1 13.2-1.6z", fill: "#ea9ef0", stroke: "#221c1c", "stroke-width": "2" } },
      { tag: "circle", attrs: { cx: "32", cy: "32", r: "28", fill: "none", stroke: "#ea9ef0", "stroke-width": "2", "stroke-dasharray": "6 5" } }
    ] },
    { shapes: [
      { tag: "circle", attrs: { cx: "32", cy: "32", r: "27", fill: "#221c1c8c", stroke: "#ea9ef0", "stroke-width": "2" } },
      { tag: "path", attrs: { d: "M32 12l3.6 7.3 8 1.2-5.8 5.7 1.4 8L32 30.4l-7.2 3.8 1.4-8-5.8-5.7 8-1.2z", fill: "#ea9ef0" } },
      { tag: "path", attrs: { d: "M18 40h28M20 46h24", stroke: "#ea9ef0", "stroke-width": "2", "stroke-dasharray": "4 3", fill: "none" } }
    ] },
    { shapes: [
      { tag: "circle", attrs: { cx: "32", cy: "32", r: "27", fill: "#221c1c8c", stroke: "#ea9ef0", "stroke-width": "2", "stroke-dasharray": "5 4" } },
      { tag: "circle", attrs: { cx: "32", cy: "24", r: "5", fill: "#ea9ef0" } },
      { tag: "path", attrs: { d: "M20 46c2-9 7-13 12-13s10 4 12 13z", fill: "#ea9ef0" } }
    ] },
    { shapes: [
      { tag: "circle", attrs: { cx: "32", cy: "32", r: "27", fill: "#221c1c8c", stroke: "#ea9ef0", "stroke-width": "2" } },
      { tag: "circle", attrs: { cx: "32", cy: "32", r: "6", fill: "none", stroke: "#ea9ef0", "stroke-width": "3" } },
      { tag: "path", attrs: { d: "M32 8v10M32 46v10M8 32h10M46 32h10M15 15l7 7M42 42l7 7M49 15l-7 7M22 42l-7 7", stroke: "#ea9ef0", "stroke-width": "2.5", fill: "none" } }
    ] },
    { shapes: [
      { tag: "circle", attrs: { cx: "32", cy: "32", r: "27", fill: "#221c1c8c", stroke: "#ea9ef0", "stroke-width": "2" } },
      { tag: "path", attrs: { d: "M22 14h20v6h-4l-2 22h8l-2 8H24l-2-8h8l-2-22h-4z", fill: "#ea9ef0" } }
    ] }
  ];
  var badge = badges[Math.floor(Math.random() * badges.length)];
  var ns = "http://www.w3.org/2000/svg";
  var svg = document.createElementNS(ns, "svg");
  svg.setAttribute("viewBox", "0 0 64 64");
  svg.setAttribute("class", "navbar-default-profile-badge");
  svg.setAttribute("role", "img");
  svg.setAttribute("aria-label", "badge policier");
  badge.shapes.forEach(function(shape) {
    var el = document.createElementNS(ns, shape.tag);
    Object.keys(shape.attrs).forEach(function(key) {
      el.setAttribute(key, shape.attrs[key]);
    });
    svg.appendChild(el);
  });
  defaultProfile.replaceWith(svg);
});

document.addEventListener("DOMContentLoaded", function() {
  var spotlight = document.getElementById("feed-actors-spotlight");
  if (spotlight) {
    var actors = [
      {
        icon: "fa-user-secret",
        name: "Samuel Labarthe",
        news: "On le retrouve en 2025 à l'affiche de « Flair de famille » sur France 2, dans la peau de François Flament, après avoir incarné François Mitterrand dans la série « Tapie » sur Netflix.",
        role: "Vu dans les 27 épisodes de la saison 2 dans le rôle du commissaire Swan Laurence, notre détective flegmatique en trench-coat."
      },
      {
        icon: "fa-newspaper",
        name: "Blandine Bellavoir",
        news: "Elle enchaîne les rôles : Cathou dans « Fortune de France » (2024) puis Clara Castella dans « Meurtres en Gironde » (2025), une collection que les fans de polars adorent.",
        role: "Interprète d'Alice Avril, l'impétueuse journaliste de La Voix du Nord, dans les 27 épisodes de la saison 2."
      },
      {
        icon: "fa-star",
        name: "Élodie Frenck",
        news: "Toujours très présente à la télévision : Diane Baccara dans « Commandant Saint-Barth » (2025) et à l'affiche du téléfilm « Meurtres à Pont-L'Évêque » de la collection France 3.",
        role: "Marlène Leroy, la secrétaire dévouée et naïve du commissaire Laurence, récompensée par le prix jeune espoir féminin à La Rochelle en 2013."
      },
      {
        icon: "fa-user-doctor",
        name: "Natacha Lindinger",
        news: "Retour en force sur TF1 en 2025 dans la série d'espionnage « Menace Imminente » aux côtés de Patrick Bruel, qui a réuni plus de 4,3 millions de téléspectateurs.",
        role: "Le docteur Euphrasie Maillol, la légiste dominante dont le commissaire Laurence était follement amoureux, dans 4 épisodes de la saison 2."
      }
    ];
    var picks = actors.slice();
    picks.sort(function() { return Math.random() - 0.5; });
    picks.slice(0, 2).forEach(function(actor) {
      var card = document.createElement("div");
      card.className = "feed-actor-card";
      var header = document.createElement("div");
      header.className = "feed-actor-card-header";
      var icon = document.createElement("i");
      icon.className = "fa-solid " + actor.icon;
      var title = document.createElement("h4");
      title.textContent = actor.name;
      header.appendChild(icon);
      header.appendChild(title);
      var news = document.createElement("p");
      news.className = "feed-actor-card-news";
      news.textContent = actor.news;
      var role = document.createElement("p");
      role.className = "feed-actor-card-role";
      role.textContent = actor.role;
      card.appendChild(header);
      card.appendChild(news);
      card.appendChild(role);
      spotlight.appendChild(card);
    });
  }
});

document.addEventListener("DOMContentLoaded", function() {
  var audiencesSection = document.getElementById("feed-section-audiences");
  if (!audiencesSection) return;

  var idleDelay = 20000;
  var tourToken = 0;
  var idleTimer = null;
  var scanRowTimer = null;
  var calloutTimer = null;
  var callout = null;
  var running = false;
  var userScrollY = window.scrollY;
  var electedCursor = 0;

  function ensureCallout() {
    if (callout) return callout;
    callout = document.createElement("div");
    callout.className = "feed-audiences-topcallout";
    document.body.appendChild(callout);
    return callout;
  }

  function clearRowEffects() {
    var rows = audiencesSection.querySelectorAll(".topblog_tr");
    rows.forEach(function(row) {
      row.classList.remove("feed-audiences-row-scan", "feed-audiences-row-glow");
    });
  }

  /* critiques REELLES de la presse ; les citations inventees sont reservees
     aux journalistes fictifs, clairement signalees (mention dans le callout). */
  var critics = [
    "\u00ab Samuel Labarthe poss\u00e8de le raffinement old school d'un Roger Moore. \u00bb \u2014 H\u00e9l\u00e8ne Rochette, T\u00e9l\u00e9rama",
    "\u00ab \u00c9lodie Frenck emporte la mise par sa vis comica. \u00bb \u2014 H\u00e9l\u00e8ne Rochette, T\u00e9l\u00e9rama",
    "\u00ab Samuel Labarthe y campe avec \u00e9l\u00e9gance un commissaire froid et sarcastique. \u00bb \u2014 Bulles de Culture",
    "\u00ab L'une des grandes qualit\u00e9s de la s\u00e9rie est son trio de personnages attachants. \u00bb \u2014 Bulles de Culture",
    "\u00ab Une s\u00e9rie m\u00e9langeant myst\u00e8re et humour dans une ambiance r\u00e9tro. \u00bb \u2014 T\u00e9l\u00e9rama",
    "\u00ab Le trio marche \u00e0 merveille, il est \u00e0 la fois dr\u00f4le et touchant ! \u00bb \u2014 Allocin\u00e9 (spectateurs)"
  ];
  var criticCursor = 0;
  function nextCritic() {
    var critic = critics[criticCursor % critics.length];
    criticCursor++;
    return critic;
  }

  var episodeImgs = {
    "La Myst\u00e9rieuse Affaire de Styles": { img: "/static/vendors/img/chateau_tilques.jpg", source: "Ch\u00e2teau d'\u00c9cou \u00e0 Tilques, d\u00e9cor de l'\u00e9pisode \u2014 Photo : Wikimedia Commons (CC BY-SA)" },
    "Meurtre \u00e0 la kermesse": { img: "/static/vendors/img/chateau_wambrechies.jpg", source: "Ch\u00e2teau de Wambrechies (Nord) \u2014 Photo : R\u00e9mi Jouan, Wikimedia Commons (CC BY-SA)" }
  };
  function episodeImageFor(title) {
    if (episodeImgs[title]) return episodeImgs[title];
    var keys = Object.keys(episodeImgs);
    var pick = keys[Math.floor(Math.random() * keys.length)];
    return episodeImgs[pick];
  }

  function showCallout(html) {
    var el = ensureCallout();
    el.innerHTML = html;
    el.classList.add("visible");
  }
  function hideCallout() {
    if (callout) callout.classList.remove("visible");
  }

  function smoothScrollTo(targetY, durationMs, done, token) {
    var startY = window.scrollY;
    var distance = targetY - startY;
    if (Math.abs(distance) < 4) {
      if (done) done();
      return;
    }
    var startTime = null;
    function step(timestamp) {
      if (token !== tourToken) return;
      if (startTime === null) startTime = timestamp;
      var progress = Math.min(1, (timestamp - startTime) / durationMs);
      var eased = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      window.scrollTo(0, startY + distance * eased);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else if (done) {
        done();
      }
    }
    requestAnimationFrame(step);
  }

  function parseScore(row) {
    var cells = row.querySelectorAll("td");
    if (cells.length < 4) return null;
    var pctText = cells[cells.length - 1].textContent.replace(/,/g, ".").replace(/%/g, "").trim();
    var viewersText = cells[cells.length - 2].textContent.replace(/[^\d]/g, "");
    var pct = parseFloat(pctText);
    var viewers = parseInt(viewersText, 10);
    if (isNaN(pct) || isNaN(viewers)) return null;
    return { pct: pct, viewers: viewers };
  }

  function rankedRows() {
    var rows = Array.prototype.slice.call(audiencesSection.querySelectorAll(".topblog_tr"));
    return rows
      .map(function(row) { return { row: row, score: parseScore(row) }; })
      .filter(function(entry) { return entry.score !== null; })
      .sort(function(a, b) { return b.score.pct - a.score.pct; });
  }

  /* construit le contenu de l'encart pour une ligne donnee */
  function calloutHtmlFor(row) {
    var title = row.querySelectorAll("td")[1].textContent.trim();
    var score = parseScore(row);
    if (!score) return null;
    var episodeImg = episodeImageFor(title);
    return "<button type='button' class='feed-audiences-callout-close' aria-label='Fermer'>&times;</button>" +
      "<div class='feed-audiences-callout-flex'>" +
      "<img class='feed-audiences-callout-img' src='" + episodeImg.img + "' alt='" + title + "'>" +
      "<div class='feed-audiences-callout-body'>" +
      "<strong>" + title + "</strong><br>" +
      "Record d'audience : " + score.pct.toLocaleString("fr-FR") + " % de part d'audience, " +
      score.viewers.toLocaleString("fr-FR") + " t\u00e9l\u00e9spectateurs !<br>" +
      nextCritic() + "<br>" +
      "<span class='feed-audiences-callout-source'>Image : " + episodeImg.source + "</span>" +
      "</div></div>";
  }

  var lastGlowRow = null;
  function bindClose() {
    if (!callout) return;
    var btnClose = callout.querySelector(".feed-audiences-callout-close");
    if (!btnClose) return;
    btnClose.addEventListener("click", function() {
      hideCallout();
      clearTimeout(calloutTimer);
      if (lastGlowRow) { lastGlowRow.classList.remove("feed-audiences-row-glow"); lastGlowRow = null; }
    });
  }

  /* balayage stylise bas -> haut, UNE SEULE FOIS */
  function scanRowsUp(rows, index, token, done) {
    if (token !== tourToken) return;
    if (index < 0) {
      if (done) done();
      return;
    }
    var row = rows[index];
    row.scrollIntoView({ block: "center", behavior: "smooth" });
    row.classList.add("feed-audiences-row-scan");
    scanRowTimer = setTimeout(function() {
      scanRowsUp(rows, index - 1, token, done);
    }, 420);
  }

  /* affiche l'encart pendant 5 secondes pour une ligne donnee */
  function spotlightRow(row, token, done) {
    if (token !== tourToken) return;
    clearRowEffects();
    row.scrollIntoView({ block: "center", behavior: "smooth" });
    row.classList.add("feed-audiences-row-glow");
    var html = calloutHtmlFor(row);
    if (html) { showCallout(html); bindClose(); }
    calloutTimer = setTimeout(function() {
      hideCallout();
      row.classList.remove("feed-audiences-row-glow");
      if (done) done();
    }, 12000);
  }

  function runTour(token) {
    if (token !== tourToken) return;
    var ranked = rankedRows();
    if (ranked.length === 0) {
      running = false;
      scheduleIdle();
      return;
    }
    var allRows = Array.prototype.slice.call(audiencesSection.querySelectorAll(".topblog_tr"));
    // descente rapide et stylisee vers la section audiences
    smoothScrollTo(audiencesSection.getBoundingClientRect().top + window.scrollY - 70, 2000, function() {
      if (token !== tourToken) return;
      // UN SEUL balayage : episodes parcourus par AUDIENCE DECROISSANTE (du moins bon vers le meilleur), successifs, une fois
      var rankedOrder = ranked.map(function(e) { return e.row; });
      scanRowsUp(rankedOrder, rankedOrder.length - 1, token, function() {
        if (token !== tourToken) return;
        // l'episode elu DIVERSIFIE : a chaque tour on prend le suivant dans le
        // classement par audience decroissante (3 premiers, puis les 3 autres, etc.)
        var elected = ranked[electedCursor % ranked.length];
        electedCursor = (electedCursor + 1) % ranked.length;
        spotlightRow(elected.row, token, function() {
          if (token !== tourToken) return;
          // retour a la position de l'utilisateur
          smoothScrollTo(userScrollY, 2000, function() {
            if (token !== tourToken) return;
            clearRowEffects();
            running = false;
            scheduleIdle();
          }, token);
        });
      });
    }, token);
  }

  function scheduleIdle() {
    if (running) return;
    idleTimer = setTimeout(function() {
      if (running) return;
      running = true;
      userScrollY = window.scrollY;
      tourToken++;
      runTour(tourToken);
    }, idleDelay);
  }

  function cancelTour() {
    tourToken++;
    running = false;
    hideCallout();
    clearTimeout(scanRowTimer);
    clearTimeout(calloutTimer);
    clearRowEffects();
    smoothScrollTo(userScrollY, 1600, null, tourToken);
  }

  var userEvents = ["mousemove", "mousedown", "touchstart", "keydown", "wheel", "scroll"];
  userEvents.forEach(function(eventName) {
    window.addEventListener(eventName, function() {
      if (running && eventName === "scroll") return;
      clearTimeout(idleTimer);
      if (running) cancelTour();
      scheduleIdle();
    }, { passive: true });
  });

  /* les lignes du tableau sont clickables : 1 SEUL encart a la fois, il se ferme
     au bout de 5 secondes ou a la demande ; un nouveau clic ferme le precedent */
  function openRowCallout(row) {
    var html = calloutHtmlFor(row);
    if (!html) return;
    if (lastGlowRow && lastGlowRow !== row) lastGlowRow.classList.remove("feed-audiences-row-glow");
    lastGlowRow = row;
    row.classList.add("feed-audiences-row-glow");
    showCallout(html);
    bindClose();
    clearTimeout(calloutTimer);
    calloutTimer = setTimeout(function() {
      hideCallout();
      row.classList.remove("feed-audiences-row-glow");
      lastGlowRow = null;
    }, 12000);
  }
  audiencesSection.querySelectorAll(".topblog_tr").forEach(function(row) {
    row.classList.add("feed-audiences-row-click");
    row.addEventListener("click", function() { openRowCallout(row); });
  });

  scheduleIdle();
});

function initScrollNav() {
  var scrollNav = document.querySelector(".site-scroll-nav");
  if (!scrollNav) return;
  var navbarHeight = function() {
    var navbar = document.getElementById("navbar");
    return navbar ? navbar.offsetHeight : 76;
  };
  var sectionStep = function(direction) {
    var sections = document.querySelectorAll("main > section > .feed-intro, main > section > [id^='feed-section-'], main > section, main > .container-fluid");
    var navH = navbarHeight();
    var tolerance = 2;
    var tops = [];
    for (var i = 0; i < sections.length; i++) {
      var rect = sections[i].getBoundingClientRect();
      tops.push(rect.top + window.scrollY);
    }
    tops.sort(function(a, b) { return a - b; });
    if (direction > 0) {
      for (var j = 0; j < tops.length; j++) {
        if (tops[j] - navH > window.scrollY + tolerance) {
          return Math.max(0, tops[j] - navH);
        }
      }
      return window.scrollY + Math.max(240, window.innerHeight * 0.8);
    }
    for (var k = tops.length - 1; k >= 0; k--) {
      if (tops[k] - navH < window.scrollY - tolerance) {
        return Math.max(0, tops[k] - navH);
      }
    }
    return 0;
  };
  var viewportStep = function() { return Math.max(240, window.innerHeight * 0.8); };
  var pageHeight = function() { return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight); };
  var scrollAnimToken = 0;
  var smoothStep = function(targetY) {
    var maxY = pageHeight() - window.innerHeight;
    var target = Math.max(0, Math.min(targetY, maxY));
    var startY = window.scrollY;
    var distance = target - startY;
    if (Math.abs(distance) < 4) {
      window.scrollTo(0, target);
      return;
    }
    var token = ++scrollAnimToken;
    var startTime = null;
    var duration = Math.min(600, Math.max(220, Math.abs(distance) / 3));
    function step(timestamp) {
      if (token !== scrollAnimToken) return;
      if (startTime === null) startTime = timestamp;
      var progress = Math.min(1, (timestamp - startTime) / duration);
      var eased = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      window.scrollTo(0, startY + distance * eased);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  };
  function bind(id, handler) {
    var btn = document.getElementById(id);
    if (!btn) return;
    btn.addEventListener("click", function(ev) {
      ev.preventDefault();
      handler();
    });
    btn.style.cursor = "pointer";
  }
  bind("scroll-full-top", function() { smoothStep(0); });
  bind("scroll-up", function() { smoothStep(sectionStep(-1)); });
  bind("scroll-down", function() { smoothStep(sectionStep(1)); });
  bind("scroll-full-bottom", function() { smoothStep(pageHeight() - window.innerHeight); });
}
/* le script est charge en defer : si le DOM est deja pret, on initialise tout de suite,
   sinon on attend DOMContentLoaded (les 4 boutons doivent toujours repondre) */
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initScrollNav);
} else {
  initScrollNav();
}

document.addEventListener("DOMContentLoaded", function() {
  var detailQuote = document.getElementById("post-detail-quote");
  if (detailQuote) {
    var quotes = [
      { text: "Un des plaisirs de la vie, c'est de ne pas la prendre au sérieux.", author: "— adapté d'Agatha Christie", person: "Agatha Christie", img: "/static/vendors/img/agatha_christie.jpg", source: "Quote Investigator, 2010 ; portrait : Wikimedia Commons (domaine public)" },
      { text: "L'imagination est un bien précieux : elle permet de voir des crimes partout.", author: "— d'après Agatha Christie", person: "Agatha Christie", img: "/static/vendors/img/agatha_christie.jpg", source: "L'Express, 2013 ; portrait : Wikimedia Commons (domaine public)" },
      { text: "Très peu de gens s'intéressent à un meurtre tant qu'ils ne connaissent pas la victime.", author: "— librement inspiré d'Agatha Christie", person: "Agatha Christie", img: "/static/vendors/img/agatha_christie.jpg", source: "A Murder is Announced (1950) ; portrait : Wikimedia Commons (domaine public)" },
      { text: "Un bon détective ne croit jamais aux coïncidences. Un excellent billet non plus.", author: "— La rédaction du Clairon de Lille", person: "Clairon de Lille (critique fictif)", img: "", source: "Chronique du Clairon de Lille, rubrique faits divers de la saison 2 (fiction)" },
      { text: "Chaque lecteur est un enquêteur en puissance : son arme, l'index de la page.", author: "— Huguette Marthe Salsifi, Gala Télé-Police", person: "Huguette Marthe Salsifi (critique fictive)", img: "", source: "Gala Télé-Police, chronique télé (fiction)" }
    ];
    var pick = pickFresh(quotes, "post-detail");
    detailQuote.querySelector(".post-detail-quote-text").textContent = "« " + pick.text + " »";
    detailQuote.querySelector(".post-detail-quote-author").textContent = pick.author;
    if (/fictif/i.test(pick.person || "") || /Clairon de Lille/.test(pick.author) || /Gala T\u00e9l\u00e9-Police/.test(pick.author)) {
      markFictionalQuote(detailQuote.querySelector(".post-detail-quote-author"));
    }
    if (pick.img) {
    var portraitWrap = document.createElement("span");
    portraitWrap.className = "quote-portrait-wrap";
    var portrait = document.createElement("img");
    portrait.src = pick.img;
    portrait.alt = pick.person;
    portrait.className = "quote-portrait";
    portraitWrap.appendChild(portrait);
    detailQuote.insertBefore(portraitWrap, detailQuote.firstChild);
    }
    var source = document.createElement("p");
    source.className = "quote-source";
    source.textContent = "Source : " + pick.source;
    detailQuote.querySelector("blockquote").appendChild(source);
  }

  var gridQuotes = document.querySelectorAll(".photos-grid-quote");
  if (gridQuotes.length) {
    var byEpisode = {
      "Jeux de glaces": { text: "Marlène, appelez le procureur Troisgros !", author: "— Commissaire Swan Laurence, épisode « Jeux de glaces »" },
      "Meurtre au champagne": { text: "Vous saviez que la victime buvait du champagne ? J'en déduis que l'assassin trinque sans soif.", author: "— Alice Avril, épisode « Meurtre au champagne »" },
      "Pension Vanilos": { text: "Ici, tout le monde ment poliment. C'est ce qu'on appelle une pension de famille.", author: "— Commissaire Swan Laurence, épisode « Pension Vanilos »" },
      "Murder Party": { text: "Un meurtre par jeu ? J'ai connu des enquêtes qui commençaient moins bien.", author: "— Alice Avril, épisode « Murder Party »" }
    };
    var castImgs = {
      "Commissaire Swan Laurence": "/static/vendors/img/swan_laurence.png",
      "Marlène Leroy": "/static/vendors/img/marlene_leroy.jpg",
      "Alice Avril": "/static/vendors/img/alice_avril.jpg",
      "Dr Euphrasie Maillol": "/static/vendors/img/euphrasie_maillol.jpg"
    };
    var episodeSource = {
      "Jeux de glaces": "Saison 2, épisode 1 (France 2, 29 mars 2013) — Wikipédia",
      "Meurtre au champagne": "Saison 2, épisode 2 (France 2, 5 avril 2013) — Wikipédia",
      "Pension Vanilos": "Saison 2, épisode 8 (France 2, 28 août 2015) — Wikipédia",
      "Murder Party": "Saison 2, épisode 11 (France 2, 18 septembre 2015) — Wikipédia"
    };
    var anyEpisode = [
      { text: "Avril est née dans le pétrin. Elle mourra dans le pétrin. À croire que le mot « pétrin » a été inventé pour elle !", author: "— Commissaire Swan Laurence, épisode 27" },
      { text: "Inutile de hurler, Marlène : le criminel n'écoute que la radio.", author: "— Commissaire Swan Laurence" },
      { text: "Monsieur le commissaire, j'ai trouvé un indice ! … C'est un trombone.", author: "— Marlène Leroy, secrétaire dévouée" },
      { text: "Je ne cite jamais mes sources, sauf quand elles inventent.", author: "— Alice Avril, La Voix du Nord" },
      { text: "La science est formelle : le corps parle. Le reste, c'est de la littérature.", author: "— Dr Euphrasie Maillol, médecin légiste" },
      { text: "Un témoin qui ne sait rien, c'est encore un témoin. Notez-le, Marlène.", author: "— Commissaire Swan Laurence" },
      { text: "Ce cliché sent le scoop à plein nez, et le scoop, c'est mon domaine.", author: "— Alice Avril, La Voix du Nord" },
      { text: "Retenez cette image : elle vaut mille procès-verbaux.", author: "— Commissaire Swan Laurence" },
      { text: "J'ai punaisé cette photo au mur du commissariat. Marlène a déjà préparé le scotch.", author: "— Commissaire Swan Laurence" },
      { text: "Développée à la chambre noire, révélée au talent.", author: "— Marlène Leroy, secrétaire dévouée" },
      { text: "Une pièce à conviction qui flatte l'œil : rare.", author: "— Dr Euphrasie Maillol, médecin légiste" },
      { text: "Même le procureur Troisgros sifflerait d'admiration.", author: "— Commissaire Swan Laurence" },
      { text: "Un angle de vue digne de mes unes : je veux la exclusivité.", author: "— Alice Avril, La Voix du Nord" },
      { text: "Le détail est dans l'objectif, comme le crime est dans le dossier.", author: "— Commissaire Swan Laurence" },
      { text: "J'archive cette image sous « merveille », juste à côté de « mystère ».", author: "— Marlène Leroy, secrétaire dévouée" },
      { text: "Ce noir et blanc a plus de vérité que bien des témoignages.", author: "— Dr Euphrasie Maillol, médecin légiste" },
      { text: "Monsieur le commissaire, cette photo accuse — et elle a du style.", author: "— Alice Avril, La Voix du Nord" },
      { text: "On ne mélange pas les pois et les carreaux, et on harmonise les couleurs.", author: "— Marlène Leroy, conseils vestimentaires" },
      { text: "Un meurtre est commis à 20 heures précises. J'y serai, monsieur le commissaire.", author: "— Alice Avril, La Voix du Nord" },
      { text: "Marlène a une cervelle d'oiseau — mais un flair de légiste.", author: "— narrateur, d'après Wikipédia" },
      { text: "Le commissaire téléphone à un dénommé inspecteur Japp : les clins d'œil, c'est sacré.", author: "— Pension Vanilos, clin d'œil à Agatha Christie" },
      { text: "Le trio d'acteurs marche à merveille, il est à la fois drôle et touchant !", author: "— spectateur AlloCiné" },
      { text: "Samuel Labarthe y campe avec élégance un commissaire froid et sarcastique.", author: "— Bulles de Culture" },
      { text: "L'une des grandes qualités de la série est son trio de personnages attachants.", author: "— Bulles de Culture" },
      { text: "Il n'ouvre un dossier que si Marlène a déjà tout classé… et il résout l'affaire par principe.", author: "— présentation du commissaire, d'après Wikipédia" },
      { text: "Curieuse et fonceuse mais envahissante : la journaliste du Nord par excellence.", author: "— présentation d'Alice Avril, d'après Wikipédia" },
      { text: "Une série qui mériterait un avenir international. Un vrai régal.", author: "— spectateur AlloCiné" },
      { text: "La godiche décorative au grand cœur, alias Élodie Frenck : un trio qui fonctionne bien !", author: "— critique AlloCiné, saison 2" }
    ];
    var criticQuotes = [
      { text: "Cette image vaut tous les communiqués du commissariat.", author: "— Gérard Ovide Braquo, Le Clairon de Lille" },
      { text: "Un cadrage net, un mystère flou : la marque des grands reports.", author: "— Joséphine Bertille Farpes, France Soir du Nord" },
      { text: "On dirait une scène de crime. Et je suis assassiné d'élégance.", author: "— Norbert Camille Douille, Le Polar du Dimanche" },
      { text: "Chaque détail raconte un crime... ou un alibi. Chef-d'œuvre.", author: "— Huguette Marthe Salsifi, Gala Télé-Police" },
      { text: "Je connais des légistes qui feraient de cette photo une pièce à conviction.", author: "— Rodolphe Anselme Picrate, Le Bulletin des Enquêtes" },
      { text: "Une photo qui parle, c'est une photo qui accuse. Celle-ci chante.", author: "— Alice Pénélope Verneuil, La Voix du Nord" },
      { text: "Si le noir et blanc mentait, celui-ci mentirait pour de bon.", author: "— Firmin Ladislas Cormorant, L'Écho des Faubourgs" },
      { text: "Développée dans une cave, digne des murs d'un musée.", author: "— Berthe Cunégonde Lapachi, Le Trombone du Nord" },
      { text: "Cette image a un alibi en béton : la beauté.", author: "— Achille Hippolyte Verjus, La Feuille de Choux du Nord" },
      { text: "On y devine le mobile, on y admire la lumière.", author: "— Constance Adèle Fougeolles, Le Sifflet de Lille" },
      { text: "Mes lecteurs, arrêtez tout : voici la preuve par l'image.", author: "— Désiré Barnabé Trictrac, La Manchette Républicaine" },
      { text: "Le flou artistique ? Plutôt l'aveu du coupable.", author: "— Marthe Sidonie Quinquette, Le Petit Journal du Dimanche" },
      { text: "Trois loupes sur cinq, et je suis avare en loupes.", author: "— Norbert Camille Douille, Le Polar du Dimanche" },
      { text: "Cette photo a été punaisée dans mon cœur avant mon mur.", author: "— Huguette Marthe Salsifi, Gala Télé-Police" },
      { text: "La preuve que le Nord est le décor du siècle.", author: "— Gérard Ovide Braquo, Le Clairon de Lille" },
      { text: "Je la mettrais en une sans discuter, mes lecteurs non plus.", author: "— Joséphine Bertille Farpes, France Soir du Nord" }
    ];
    var criticSvg = function(i) {
      var palettes = [
        ["#ea9ef0", "#221c1c8c"],
        ["#e0c37a", "#221c1c8c"],
        ["#9edee0", "#221c1c8c"],
        ["#e07a7a", "#221c1c8c"]
      ];
      var p = palettes[i % palettes.length];
      var ns = "http://www.w3.org/2000/svg";
      var svg = document.createElementNS(ns, "svg");
      svg.setAttribute("viewBox", "0 0 64 64");
      svg.setAttribute("class", "quote-portrait");
      svg.setAttribute("role", "img");
      svg.setAttribute("aria-label", "portrait du critique");
      var bg = document.createElementNS(ns, "circle");
      bg.setAttribute("cx", "32");
      bg.setAttribute("cy", "32");
      bg.setAttribute("r", "31");
      bg.setAttribute("fill", p[1]);
      svg.appendChild(bg);
      var head = document.createElementNS(ns, "circle");
      head.setAttribute("cx", "32");
      head.setAttribute("cy", "24");
      head.setAttribute("r", "11");
      head.setAttribute("fill", p[0]);
      svg.appendChild(head);
      var body = document.createElementNS(ns, "path");
      body.setAttribute("d", "M12 58c2-14 10-20 20-20s18 6 20 20z");
      body.setAttribute("fill", p[0]);
      svg.appendChild(body);
      return svg;
    };
    var pageNumber = 1;
    var pageMatch = window.location.search.match(/[?&]page=(\d+)/);
    if (pageMatch) pageNumber = parseInt(pageMatch[1], 10) || 1;
    var pageSize = 5;
    var quoteIndexBase = (pageNumber - 1) * pageSize;
    gridQuotes.forEach(function(box, cardIndex) {
      var caption = box.closest(".photos-grid-card");
      var title = caption ? caption.querySelector(".photos-grid-title") : null;
      var titleText = title ? title.textContent.trim() : "";
      var pick = null;
      Object.keys(byEpisode).forEach(function(ep) {
        if (!pick && titleText.indexOf(ep) !== -1) pick = byEpisode[ep];
      });
      var globalIndex = quoteIndexBase + cardIndex;
      var pool = pick ? [] : anyEpisode.concat(criticQuotes);
      var isCritic = false;
      if (!pick) {
        pick = pickFresh(pool, "photos-grid-" + globalIndex % 4);
        isCritic = pool.indexOf(pick) >= anyEpisode.length;
      }
      if (!pick) return;
      box.querySelector(".photos-grid-quote-text").textContent = "« " + pick.text + " »";
      box.querySelector(".photos-grid-quote-author").textContent = pick.author;
      if (isCritic || /(Commissaire|Marl\u00e8ne|Avril|Maillol|Glissant|Tricard|narrateur|d'apr\u00e8s|Bulles de Culture|AlloCin\u00e9|Pension Vanilos)/.test(pick.author)) {
        /* citation de personnage ou de presse reelle : pas de mention "inventee" */
      } else {
        markFictionalQuote(box.querySelector(".photos-grid-quote-author"));
      }
      var epKey = null;
      Object.keys(byEpisode).forEach(function(ep) { if (!epKey && titleText.indexOf(ep) !== -1) epKey = ep; });
      var person = pick.author.replace("— ", "").split(",")[0].trim();
      var pw = document.createElement("span");
      pw.className = "quote-portrait-wrap";
      var img = castImgs[person] || "";
      if (img) {
        var im = document.createElement("img");
        im.src = img;
        im.alt = person;
        im.className = "quote-portrait";
        pw.appendChild(im);
      } else if (isCritic) {
        pw.appendChild(criticSvg(globalIndex));
      }
      if (pw.firstChild) box.insertBefore(pw, box.firstChild);
      var srcEl = document.createElement("p");
      srcEl.className = "quote-source";
      srcEl.textContent = "Source : " + (epKey ? episodeSource[epKey] : (isCritic ? "Critique de presse fictive — journaliste du Nord" : "Les Petits Meurtres d'Agatha Christie, saison 2 (France 2) — citation de personnage"));
      box.querySelector("blockquote").appendChild(srcEl);
    });
  }
  var postsGridQuotes = document.querySelectorAll(".posts-grid-quote");
  if (postsGridQuotes.length) {
    var postQuotes = [
      { text: "Chaque billet est une pièce à conviction : relisez-le deux fois, la deuxième à voix haute.", author: "— Commissaire Swan Laurence" },
      { text: "J'écris mes articles au conditionnel : ça laisse la police le soin de confirmer.", author: "— Alice Avril, La Voix du Nord" },
      { text: "Un bon papier, c'est comme une autopsie : ça ne cache rien, ça classe tout.", author: "— Dr Euphrasie Maillol, médecin légiste" },
      { text: "Monsieur le commissaire, j'ai titré votre enquête ! … « Meurtre en une ».", author: "— Marlène Leroy, secrétaire dévouée" },
      { text: "La plume est plus rapide que le stipend, mais moins que le téléphone de Marlène.", author: "— Commissaire Swan Laurence" },
      { text: "J'archive tout : même les billets d'humeur finissent au dossier.", author: "— Marlène Leroy, secrétaire dévouée" },
      { text: "Dans ce commissariat, un billet rédigé c'est une prime ; un billet publié, un miracle.", author: "— Commissaire Swan Laurence" }
    ];
    var usedPostQuotes = [];
    postsGridQuotes.forEach(function(box) {
      var pool = postQuotes.filter(function(q) { return usedPostQuotes.indexOf(q.text) === -1; });
      if (!pool.length) return;
      var pick = pool[Math.floor(Math.random() * pool.length)];
      usedPostQuotes.push(pick.text);
      box.querySelector(".posts-grid-quote-text").textContent = "« " + pick.text + " »";
      box.querySelector(".posts-grid-quote-author").textContent = pick.author;
      markFictionalQuote(box.querySelector(".posts-grid-quote-author"));
      var person = pick.author.replace("— ", "").split(",")[0].trim();
      var img = ({
        "Commissaire Swan Laurence": "/static/vendors/img/swan_laurence.png",
        "Marlène Leroy": "/static/vendors/img/marlene_leroy.jpg",
        "Alice Avril": "/static/vendors/img/alice_avril.jpg",
        "Dr Euphrasie Maillol": "/static/vendors/img/euphrasie_maillol.jpg"
      })[person] || "";
      if (img) {
        var pw = document.createElement("span");
        pw.className = "quote-portrait-wrap";
        var im = document.createElement("img");
        im.src = img;
        im.alt = person;
        im.className = "quote-portrait";
        pw.appendChild(im);
        box.insertBefore(pw, box.firstChild);
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", function() {
  var encartUser = (document.querySelector(".navbar-nav-right .nav-item") || {}).textContent || "";
  encartUser = encartUser.trim().split(/\s+/)[0] || "chercheur anonyme";
  var encartTexts = {
    follow: [
      "Choisir ses abonnements, " + encartUser + " : Marlène a sa liste, le commissaire a la sienne. Personne ne suit personne... pour l'instant !",
      "Ici on choisit qui on suit, comme Laurence choisit ses enquêtes : avec soin, " + encartUser + " !",
      "Abonnez-vous, " + encartUser + " ! Alice Avril ferait n'importe quoi pour une bonne source, pas vous ?",
      "Suivez vos enqueteurs preferes ! Marl\u00e8ne tient d\u00e9j\u00e0 la liste \u00e0 jour... entre deux couches de vernis \u00e0 ongles.",
      "Choisissez qui m\u00e9rite vos gros titres : Alice jure qu'elle a d\u00e9j\u00e0 un article pr\u00eat sur chacun d'eux.",
      "Un bon journaliste suit ses sources. Le commissaire Laurence, lui, pr\u00e9f\u00e8re qu'on le laisse tranquille.",
      "Suivre un utilisateur : la seule filature autoris\u00e9e par le commissariat de Lille !"
    ],
    photo_add: [
      "Ajouter une photo à notre enquête, " + encartUser + " ! Marlène a déjà préparé le scotch pour l'album.",
      "Une nouvelle pièce à conviction, " + encartUser + " ? Le commissaire Laurence approuve (à condition qu'elle soit nette).",
      "Vos photos valent celles de La Voix du Nord, " + encartUser + " ... presque !",
      "Ajouter une photo \u00e0 notre enqu\u00eate ? Marl\u00e8ne a d\u00e9j\u00e0 pr\u00e9par\u00e9 le scotch !",
      "Une pi\u00e8ce \u00e0 conviction de plus ! Le Dr Glissant demande une photo du cadavre... enfin, du paysage.",
      "T\u00e9l\u00e9scopez vos clich\u00e9s : Alice Avril n'attend que \u00e7a pour en faire la une de La Voix du Nord.",
      "Attention : toute photo myst\u00e9rieuse sera examin\u00e9e sous la lampe du commissaire."
    ],
    photo_add_multiple: [
      "Ajouter plein de photos d'un coup, " + encartUser + " : comme un album de Treets, on n'arrête plus la machine !",
      "Enquête express, " + encartUser + " : plusieurs indices d'un seul geste, Marlène n'en revient pas.",
      "Le Dr Maillol dit que tout va bien. Chargez les photos vite avant qu'il change d'avis, " + encartUser + " !",
      "Plusieurs pi\u00e8ces \u00e0 conviction d'un coup ! Marl\u00e8ne risque de faire tomber le classeur.",
      "Le commissaire sort les photos une par une, vous, vous les jetez en vrac ! Efficace.",
      "Le Dr Glissant conseille de photographier sous tous les angles : ni vu ni connu.",
      "La pellicule ne se d\u00e9veloppe pas seule : envoyez tout, on classera apr\u00e8s l'autopsie."
    ],
    photo_detail: [
      "Pièce à conviction numérotée, " + encartUser + " : observez bien, le détail est dans l'objectif !",
      "Une photo vaut mille indices, " + encartUser + " : le commissaire Laurence l'a punaisée au mur du commissariat.",
      "Dossier photo classé, " + encartUser + " : Marlène a déjà préparé le papier bulle, on ne sait jamais."
    ],
    photo_delete: [
      "Supprimer une pièce à conviction, " + encartUser + " ? Même le procureur Troisgros va faire la grimace.",
      "Attention, " + encartUser + " : Alice Avril fouille toujours les corbeilles. Vraiment toujours.",
      "Ce dossier d'enquête va maigrir, " + encartUser + " ... Marlène garde une copie sous son poster de Marilyn, on ne sait jamais.",
      "D\u00e9truire une pi\u00e8ce \u00e0 conviction ? Le commissaire divisionnaire Tricard fr\u00e9mit d\u00e9j\u00e0.",
      "Gare \u00e0 vous : Alice Avril fouille toujours les poubelles du commissariat.",
      "Supprimer une preuve est un crime... presque. Sauf si Marl\u00e8ne l'a mal rang\u00e9e : on dira qu'elle \u00e9tait d\u00e9j\u00e0 class\u00e9e.",
      "Le scotch de Marl\u00e8ne aura v\u00e9cu : cette photo quitte le dossier."
    ],
    photo_update: [
      "Mettre une photo à jour, " + encartUser + " : le commissaire Laurence corrige aussi ses rapports, enfin parfois.",
      "Une petite retouche d'indice, " + encartUser + " ? La vérité est dans la Chambre, enfin dans la photo !",
      "On réécrit l'enquête, " + encartUser + " ... discrètement, Alice Avril ne doit rien savoir.",
      "Retoucher une pi\u00e8ce \u00e0 conviction, Tricard dirait falsification ; nous, on dit mise au propre !",
      "Alice corrige ses articles autant de fois que Laurence corrige Marl\u00e8ne. Inspirez-vous.",
      "Un dossier bien tenu, c'est un dossier qui tue... m\u00e9taphoriquement.",
      "Le l\u00e9giste v\u00e9rifie tout deux fois. Faites comme lui !"
    ],
    post_add: [
      "Un nouveau billet, " + encartUser + " ! Pensez à mettre un chiffre dans le titre, sinon l'inspecteur Laurence refuse le rapport.",
      "Racontez-nous tout, " + encartUser + " : Alice Avril n'aurait pas fait mieux... mais n'oubliez pas le chiffre dans le titre !",
      "Publiez votre billet, " + encartUser + " ! Marlène, préparez la machine à écrire (et un chocolat chaud) !",
      "N'oubliez pas un chiffre dans le titre : m\u00eame les dossiers sont num\u00e9rot\u00e9s au commissariat !",
      "Un nouveau billet ? Alice Avril sort d\u00e9j\u00e0 sa machine \u00e0 \u00e9crire, championne !",
      "\u00ab Marl\u00e8ne, appelez le procureur Troisgros \u00bb : on publie un billet de plus !",
      "Le commissaire exige un titre avec un chiffre. Ce n'est pas lui qui invente les r\u00e8gles... si, en fait."
    ],
    post_delete: [
      "Supprimer un billet, " + encartUser + " ? Classé sans suite par le commissariat, donc.",
      "Ce billet va disparaître, " + encartUser + " ... comme le corps dans l'armoire. Motus et bouche cousue.",
      "Classer l'affaire, " + encartUser + " ? Le procureur Troisgros signe, Marlène trie les copies (bonbon inclus).",
      "Classer sans suite : le r\u00eave de tout commissaire surcharg\u00e9 de dossiers.",
      "Supprimer un billet : la seule affaire que Laurence classera sans interrogatoire.",
      "Ce billet finira au panier \u00e0 papiers de Marl\u00e8ne... avec le courrier du c\u0153ur, bien s\u00fbr.",
      "Alice proteste : chaque histoire m\u00e9rite ses gros titres. Pas vous ?"
    ],
    post_update: [
      "Mettre un billet à jour, " + encartUser + " : Laurence relit, Marlène tape à la machine, tout le monde travaille !",
      "Modifier l'enquête, " + encartUser + " : le Dr Maillol certifie que c'est bon pour la santé.",
      "Une version corrigée, " + encartUser + " ? Alice Avril aurait tué pour cette exclusivité... enfin, presque.",
      "Mettre \u00e0 jour un dossier d'enqu\u00eate : le talent du vrai policier de papier.",
      "Le commissaire relit toujours deux fois. Enfin, quand Marl\u00e8ne n'a pas renvers\u00e9 le caf\u00e9 dessus.",
      "Un billet retouch\u00e9 vaut mieux qu'un suspect rel\u00e2ch\u00e9 trop t\u00f4t.",
      "On remet \u00e7a au propre : machine \u00e0 \u00e9crire, carbone, et hop, le dossier est bon !"
    ],
    signin: [
      "Inscrivez-vous pour rejoindre l'équipe d'enquête, recrue ! Le commissariat de Lille cherche des talents.",
      "Un nouveau badge à décrocher, recrue ! Marlène prépare déjà le Ruban adhésif pour votre dossier.",
      "L'enquête vous attend, recrue : cachet, badge et Treets offerts le premier jour !",
      "Bienvenue au commissariat de Lille : laissez vos coordonn\u00e9es \u00e0 l'entr\u00e9e, Marl\u00e8ne g\u00e8re le standard !",
      "S'inscrire, c'est comme signer un proc\u00e8s-verbal : lisez avant de parapher !",
      "Rejoignez l'enqu\u00eate : le commissaire Laurence n'a pas besoin de vous... mais Marl\u00e8ne, si !",
      "Nouveau sur le blog ? Le Dr Glissant vous offre un Treets de bienvenue."
    ],
    password_change: [
      "Changer de mot de passe : même Marlène n'essaie pas de deviner celui du commissaire Laurence.",
      "Nouveau mot de passe, ancien secret d'enquête : Alice Avril n'aura rien à écrire dans La Voix du Nord !",
      "Un mot de passe bien gardé vaut mieux qu'un dossier mal fermé, camarade !",
      "Changer de mot de passe : m\u00eame Marl\u00e8ne n'arrive pas \u00e0 retenir le code du coffre.",
      "Un mot de passe solide, c'est comme un alibi : personne ne doit le deviner.",
      "Le coffre du commissariat a trois serrures. Votre compte, un seul mot de passe : choisissez-le costaud.",
      "La suspicion est de mise : changez de mot de passe avant que Tricard ne doute de vous."
    ],
    profile_update: [
      "Changer de photo de profil, " + encartUser + " : Marlène dit qu'un portrait net, c'est déjà la moitié de l'enquête.",
      "Nouveau visage, même talent, " + encartUser + " ! Le commissaire Laurence approuve votre souci du détail.",
      "Mettez votre plus beau portrait au dossier, " + encartUser + " : format .jpg, sourire garant" + String.fromCharCode(233) + " !"
    ],
    contact_admin: [
      "Un mot pour la prefecture ? Le commissaire Laurence lit son courrier... entre deux sarcastiques.",
      "Ecrire aux admins, c'est comme envoyer un telegramme au commissariat : Marl\u00e8ne assure la reponse sous 48 h !",
      "Un souci sur le blog ? Le Dr Glissant prescrit deja un Treets et une bonne nounouille d'admin s'en occupe.",
      "Alice Avril verifierait votre identite en trois questions. Nous, on vous croit sur parole : ecrivez !",
      "La Lampe du commissariat veille : votre message arrivera bon port, promis."
    ],
    password_reset: [
      "Un mot de passe égaré ? Même le grand Agatha admettrait : ça arrive aux meilleurs enquêteurs.",
      "La mémoire des uns fait les énigmes des autres : réinitialisons tout ça, tranquille.",
      "Indice : votre email. Enquête close en trois clics, promis !",
      "Oubli\u00e9 ? Marl\u00e8ne oublie aussi des choses... ne lui en parlez pas trop fort.",
      "Le courrier du c\u0153ur arrive toujours, votre email de r\u00e9initialisation aussi.",
      "Un t\u00e9l\u00e9gramme partir\u00e0 du commissariat d\u00e8s que vous aurez donn\u00e9 votre adresse !",
      "M\u00eame le commissaire Laurence \u00e9gare ses cl\u00e9s. \u00c7a arrive aux meilleurs."
    ]
  };
  document.querySelectorAll(".action-encart").forEach(function(box) {
    var key = box.getAttribute("data-encart");
    var pool = encartTexts[key];
    if (!pool || !pool.length) return;
    box.querySelector(".encart-text").textContent = pickFresh(pool, key);
  });
});
document.addEventListener("DOMContentLoaded", function() {
  var teasers = {
    laurence: [
      "Trench-coat, ironie et flair infaillible : le commissaire qui fume plus vite que les assassins.",
      "Il n'ouvre un dossier que si Marlène a déjà tout classé... et il résout l'affaire par principe.",
      "Sa méthode ? Un regard, un sarcasme, et l'assassin se dénonce tout seul."
    ],
    avril: [
      "Elle court après le scoop avec plus d'ardeur que les meurtriers après leur alibi.",
      "Une une choc par semaine, trois ennemis par article : la reporter qui dérange tant mieux.",
      "Toujours là où l'embrouille commence, jamais là où le commissaire veut qu'elle soit."
    ],
    marlene: [
      "Secrétaire dévouée, tailleurs éclatants et fiches classées mieux qu'au fisc.",
      "Elle devance les désirs de Laurence d'un temps de standard téléphonique.",
      "Naïve comme une colombe, précieuse comme une arme à dossier chargé."
    ]
  };
  var cursors = { laurence: 0, avril: 0, marlene: 0 };
  document.querySelectorAll(".feed-intro-actor-teaser").forEach(function(el) {
    var key = el.getAttribute("data-actor-teaser");
    if (!teasers[key]) return;
    var update = function() {
      var list = teasers[key];
      el.textContent = list[cursors[key] % list.length];
      cursors[key]++;
    };
    update();
    setInterval(update, 6000);
  });
});


/* ===== TABLEAU D'ENQUETE : RENOUVELLEMENT A CHAQUE CHARGEMENT ===== */
/* Le croquis des lieux cles est FIXE. A chaque chargement :
   - 4 membres de l'equipe technique sont choisis ALEATOIREMENT parmi les 23
     encarts et "jetes/poses" une a une sur le croquis (effet deposer/jeter) ;
     les autres restent visibles dans la grille du bureau ;
   - chaque encart recoit une PUNAISE VARIEE (rouge, laiton, bleu, kraft) et une
     micro-rotation "pose a la main" ;
   - les encarts publicitaires visiteurs restent disperses gauche/droite. */
document.addEventListener("DOMContentLoaded", function() {
  /* punaises variees */
  var pinClasses = ["pin-red", "pin-brass", "pin-blue", "pin-kraft"];
  var people = Array.prototype.slice.call(document.querySelectorAll(".feed-fiche-people .feed-fiche-person"));
  people.forEach(function(el, n) {
    el.classList.add(pinClasses[n % pinClasses.length]);
    var spin = (Math.random() * 10 - 5).toFixed(1);
    el.style.setProperty("--hand-spin", spin + "deg");
  });

  /* 4 membres au hasard a chaque refresh : les autres sont masques.
     Positions passees en custom properties (--py/--px) : le CSS les force
     en absolu sur le croquis avec une regle haute specificite, garantissant
     leur visibilite quel que soit le reste de la feuille de style. */
  if (people.length > 3) {
    var order = [];
    for (var i = 0; i < people.length; i++) order.push(i);
    for (var j = order.length - 1; j > 0; j--) {
      var k = Math.floor(Math.random() * (j + 1));
      var t = order[j]; order[j] = order[k]; order[k] = t;
    }
    /* BOUCLE INFINIE : 5 fiches tirées au sort, apparaitres/disparaitres
       une a une toutes les 4 secondes par l'effet jeter/deposer (photos
       section 2), puis retour a la premiere : la boucle ne s'arrete jamais.
       Toutes les fiches de la liste sont masquees par defaut. */
    var pool = order.slice(0, 5);
    var zone = { top: [30, 70], left: [70, 78] };
    people.forEach(function(el, n) {
      if (pool.indexOf(n) === -1) el.style.display = "none";
    });
    pool.forEach(function(idx) {
      var el = people[idx];
      el.classList.add("person-mini");
      el.setAttribute("tabindex", "0");
      el.addEventListener("mouseenter", function() { el.classList.add("person-focus"); });
      el.addEventListener("focus", function() { el.classList.add("person-focus"); });
      el.addEventListener("mouseleave", function() { el.classList.remove("person-focus"); });
      el.addEventListener("blur", function() { el.classList.remove("person-focus"); });
    });
    var loopIdx = 0;
    function dropNext() {
      var el = people[pool[loopIdx % pool.length]];
      /* reposition + effet jeter/deposer */
      el.style.display = "";
      el.style.setProperty("--py", (zone.top[0] + Math.random() * (zone.top[1] - zone.top[0])).toFixed(1) + "%");
      el.style.setProperty("--px", (zone.left[0] + Math.random() * (zone.left[1] - zone.left[0])).toFixed(1) + "%");
      el.style.setProperty("--toss-spin", (Math.random() * 20 - 10).toFixed(1) + "deg");
      el.classList.remove("person-gone", "person-rest", "person-toss");
      el.classList.add("person-dropped");
      setTimeout(function() {
        el.classList.add("person-toss");
        el.classList.add("person-rest");
      }, 250);
      /* 3.4 s plus tard : disparition progressive, puis fiche suivante */
      setTimeout(function() {
        el.classList.add("person-gone");
        setTimeout(function() { el.style.display = "none"; el.classList.remove("person-gone"); }, 600);
      }, 3400);
      loopIdx += 1;
      setTimeout(dropNext, 4000);
    }
    setTimeout(dropNext, 600);
  }

  /* encarts publicitaires visiteurs : ordre aleatoire gauche/droite */
  var notes = Array.prototype.slice.call(document.querySelectorAll(".feed-visitor-notes .feed-visitor-note"));
  if (notes.length) {
    var noteOrder = [];
    for (var m = 0; m < notes.length; m++) noteOrder.push(m);
    for (var o = noteOrder.length - 1; o > 0; o--) {
      var r = Math.floor(Math.random() * (o + 1));
      var w = noteOrder[o]; noteOrder[o] = noteOrder[r]; noteOrder[r] = w;
    }
    noteOrder.forEach(function(idx, n) {
      notes[idx].dataset.side = n % 2 === 0 ? "L" : "R";
      notes[idx].dataset.lane = String(Math.floor(n / 2));
    });
  }
});

/* ===== CROQUIS : PASTILLES INTERACTIVES (photo du lieu au survol) ===== */
document.addEventListener("DOMContentLoaded", function() {
  var tip = document.createElement("div");
  tip.className = "feed-map-tip";
  tip.setAttribute("role", "tooltip");
  document.body.appendChild(tip);
  function showTip(btn) {
    var staticUrl = btn.getAttribute("data-static") || "/static/vendors/img/" + btn.getAttribute("data-img");
    tip.innerHTML = "<img src='" + staticUrl + "' alt='" + btn.getAttribute("data-place") + "'>" +
      "<strong>" + btn.getAttribute("data-place") + "</strong>" +
      "<small>" + btn.getAttribute("data-src") + "</small>";
    var r = btn.getBoundingClientRect();
    var w = Math.min(280, window.innerWidth - 24);
    tip.style.width = w + "px";
    tip.style.visibility = "hidden";
    tip.style.display = "block";
    var tr = tip.getBoundingClientRect();
    var left = r.left + r.width / 2 - tr.width / 2;
    left = Math.max(10, Math.min(left, window.innerWidth - tr.width - 10));
    var top = r.top - tr.height - 10;
    if (top < 66) top = r.bottom + 10; /* sous la navbar (z-index 2000) si trop haut */
    tip.style.left = left + "px";
    tip.style.top = top + "px";
    tip.style.visibility = "visible";
    tip.classList.add("feed-map-tip--on");
  }
  function hideTip() { tip.classList.remove("feed-map-tip--on"); tip.style.display = "none"; }
  Array.prototype.forEach.call(document.querySelectorAll(".feed-map-hotspot"), function(btn) {
    btn.addEventListener("mouseenter", function() { showTip(btn); });
    btn.addEventListener("focus", function() { showTip(btn); });
    btn.addEventListener("mouseleave", hideTip);
    btn.addEventListener("blur", hideTip);
    btn.addEventListener("click", function() { showTip(btn); });
  });
  window.addEventListener("scroll", hideTip, { passive: true });
});

/* ===== PLAN DE LILLE : LOADER THEMATIQUE PENDANT LE CHARGEMENT ===== */
document.addEventListener("DOMContentLoaded", function() {
  var plan = document.querySelector(".feed-lille-plan");
  var loader = document.querySelector(".feed-lille-plan-loader");
  if (!plan || !loader) return;
  function ready() { loader.classList.add("feed-lille-plan-ready"); }
  if (plan.complete && plan.naturalWidth > 0) { ready(); return; }
  plan.addEventListener("load", ready);
  plan.addEventListener("error", ready);
});

/* ===== FEED : LE COMMISSAIRE DEPOSE LES PHOTOS UNE A UNE SUR LE PLAN DE LILLE ===== */
/* Retour a l'effet "depot une a une". La PREMIERE photo visible est ALEATOIRE,
   ensuite la serie debute de la 1ere a la derniere photo (l'utilisateur ne voit
   donc jamais "la 1ere photo, puis de nouveau la 1ere, puis la 2nde..."). */
document.addEventListener("DOMContentLoaded", function() {
  var slot = document.querySelector(".feed-evidence-slot--photos");
  if (!slot) return;
  var pile = slot.querySelector(".feed-evidence-pile");
  var deck = slot.querySelector(".feed-evidence-deck");
  if (!pile || !deck) return;
  var cards = Array.prototype.slice.call(deck.querySelectorAll(".feed-evidence-card"));
  pile.innerHTML = "";
  if (!cards.length) return;
  /* rotations et decalages "poses a la main" */
  var spins = [-14, 9, -7, 12, -11, 6, -4, 15];
  var offsets = [-30, 24, -12, 36, -24, 14, -36, 20];
  var zTop = 10;
  function place(card, index) {
    var clone = card.cloneNode(true);
    clone.classList.remove("evidence-pinned");
    clone.style.setProperty("--toss-spin", spins[index % spins.length] + "deg");
    clone.style.setProperty("--toss-x", offsets[index % offsets.length] + "px");
    clone.style.zIndex = String(zTop);
    zTop++;
    clone.classList.add("evidence-toss");
    pile.appendChild(clone);
    setTimeout(function() {
      clone.classList.remove("evidence-toss");
      clone.classList.add("evidence-rest");
    }, 900);
    /* la plus ancienne glisse hors du tableau quand la pile depasse 5 photos */
    setTimeout(function() {
      var stacked = pile.querySelectorAll(".feed-evidence-card");
      var maxStack = Math.min(5, cards.length);
      if (stacked.length > maxStack) {
        var oldest = stacked[0];
        oldest.style.transition = "transform 0.6s ease, opacity 0.6s ease";
        oldest.style.transform = "translate(-170%, 26%) rotate(-32deg) scale(0.8)";
        oldest.style.opacity = "0";
        setTimeout(function() { oldest.remove(); }, 640);
      }
    }, 1500);
  }
  /* 1ere photo visible : ALEATOIRE (l'utilisateur ne doit pas revoir la 1ere juste apres) */
  var firstIdx = Math.floor(Math.random() * cards.length);
  place(cards[firstIdx], 0);
  /* ensuite la serie complete, de la 1ere a la derniere photo, en boucle */
  var evidenceIndex = 0; /* compte de depot APRES la premiere aleatoire */
  function loop() {
    place(cards[evidenceIndex % cards.length], evidenceIndex + 1);
    evidenceIndex++;
  }
  setTimeout(loop, 3600);
  setInterval(loop, 3600);
});




/* ===== IMAGES : APPARITION UNIQUEMENT UNE FOIS ENTIEREMENT TELECHARGEES ===== */
/* Effet "developpement de pellicule" theme dossier d'enquete : l'image reste invisible
   (vignette sombre) tant qu'elle n'est pas complete, puis apparait d'un bloc. */
document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll("img").forEach(function(img) {
    if (img.classList.contains("img-reveal-managed")) return;
    img.classList.add("img-reveal-managed");
    function reveal() {
      img.classList.remove("img-reveal-pending");
      img.classList.add("img-reveal-in");
    }
    if (img.complete && img.naturalWidth > 0) {
      /* deja en cache : legere apparition quand meme, mais sans vignette d'attente */
      reveal();
      return;
    }
    img.classList.add("img-reveal-pending");
    img.addEventListener("load", reveal);
    img.addEventListener("error", function() {
      img.classList.remove("img-reveal-pending");
    });
  });
});

/* ===== A PROPOS : TOURNAGE REDUIT / LIRE LA SUITE ===== */
/* Par defaut, le paragraphe reduit de Tournage n'apparait PAS a l'ecran
   (seules les 2 premieres lignes restent) ; le clic sur LIRE LA SUITE
   redimensionne la section vers le bas pour devoiler tout le texte. */
document.addEventListener("DOMContentLoaded", function() {
  var zone = document.querySelector(".tournage-zone");
  if (!zone || zone.classList.contains("tournage-managed")) return;
  zone.classList.add("tournage-managed");
  var paragraphs = Array.prototype.slice.call(zone.querySelectorAll("p"));
  if (paragraphs.length < 3) return;
  var expanded = false;
  var btn = document.createElement("button");
  btn.type = "button";
  btn.className = "a_propos_more-btn";
  btn.textContent = "LIRE LA SUITE";
  btn.addEventListener("click", function() {
    expanded = !expanded;
    apply();
  });
  function apply() {
    paragraphs.forEach(function(p, i) {
      if (expanded || i < 2) {
        p.classList.remove("tournage-hidden");
      } else {
        p.classList.add("tournage-hidden");
      }
    });
    btn.textContent = expanded ? "REDUIRE" : "LIRE LA SUITE";
  }
  var last = paragraphs[paragraphs.length - 1];
  last.parentNode.insertBefore(btn, last.nextSibling);
  apply();
});

/* ===== CITATIONS INVENTEES : MENTION "citation inventee" ===== */
function markFictionalQuote(authorEl) {
  if (!authorEl) return;
  if (authorEl.parentNode.querySelector(".quote-fictional-note")) return;
  var note = document.createElement("span");
  note.className = "quote-fictional-note";
  note.textContent = "citation invent\u00e9e \u2014 le personnage et le m\u00e9dia sont fictifs";
  authorEl.insertAdjacentElement("afterend", note);
}


/* ===== FICHES SUSPECTS : rotation 3 par 3 (effet photos section 2) ===== */
/* Les 6 personnages apparaissent 3 par 3, au hasard, avec l'effet
   jeter/deposer de la section photos ; apres chaque passe on attend
   15 secondes puis on affiche 3 autres personnages au hasard, en boucle. */
document.addEventListener("DOMContentLoaded", function() {
  var board = document.querySelector(".suspects-grid");
  if (!board || board.classList.contains("suspects-loop-managed")) return;
  board.classList.add("suspects-loop-managed");
  var cards = Array.prototype.slice.call(board.querySelectorAll(".suspect-card"));
  if (cards.length < 3) return;
  cards.forEach(function(c) { c.classList.add("suspect-hidden"); });
  function pick3() {
    var idx = [];
    for (var i = 0; i < cards.length; i++) idx.push(i);
    for (var j = idx.length - 1; j > 0; j--) {
      var k = Math.floor(Math.random() * (j + 1));
      var t = idx[j]; idx[j] = idx[k]; idx[k] = t;
    }
    return idx.slice(0, 3);
  }
  function showThree() {
    /* disparition glissee vers la droite + fondu des cartes affichees */
    cards.forEach(function(c) {
      if (!c.classList.contains("suspect-hidden")) {
        c.classList.add("suspect-out");
        (function(cc) {
          setTimeout(function() {
            cc.classList.remove("suspect-out", "suspect-dropped", "suspect-toss", "suspect-rest");
            cc.classList.add("suspect-hidden");
          }, 620);
        })(c);
      } else {
        c.classList.remove("suspect-dropped", "suspect-toss", "suspect-rest", "suspect-out");
      }
    });
    /* les 3 nouvelles cartes arrivent de gauche, une par une (pos*350) */
    setTimeout(function() {
      pick3().forEach(function(n, pos) {
        var c = cards[n];
        setTimeout(function() {
          c.classList.remove("suspect-hidden");
          c.classList.add("suspect-dropped");
          /* glisse gauche -> droite + fondu transparent -> opaque */
          setTimeout(function() {
            c.classList.add("suspect-rest");
          }, 60);
        }, pos * 420);
      });
    }, 660);
    /* apres les 3 apparitions : pause de 15 s puis nouvelle passe */
    setTimeout(showThree, 15000);
  }
  setTimeout(showThree, 500);
});
