var footer_date = new Date();
document.getElementById("footer_date").innerHTML = "Blog &copy;LesPetitsMeurtres 2023-" + footer_date.getFullYear();

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
  var callout = null;
  var running = false;
  var userScrollY = window.scrollY;
  var topCursor = 0;

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

  function showCallout(text, row) {
    var el = ensureCallout();
    el.innerHTML = text;
    el.classList.add("visible");
    el.style.left = "";
    el.style.top = "";
    if (!row) return;
    var rect = row.getBoundingClientRect();
    el.style.left = Math.max(10, Math.min(window.innerWidth - el.offsetWidth - 10, rect.left + rect.width / 2 - el.offsetWidth / 2)) + "px";
    el.style.top = Math.max(10, rect.top - el.offsetHeight - 14) + "px";
  }

  function hideCallout() {
    if (callout) callout.classList.remove("visible");
  }

  function saveUserPosition() {
    userScrollY = window.scrollY;
  }

  function cancelTour() {
    tourToken++;
    running = false;
    hideCallout();
    clearRowEffects();
    clearTimeout(scanRowTimer);
    smoothScrollTo(userScrollY, 900, null, tourToken);
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

  function nextTopGroup(ranked) {
    var group = ranked.slice(topCursor, topCursor + 3);
    if (group.length < 3 && ranked.length >= 3) {
      group = group.concat(ranked.slice(0, 3 - group.length));
    }
    topCursor = (topCursor + 3) % Math.max(3, ranked.length);
    return group;
  }

  var critics = [
    "Alice Pénélope Verneuil, La Voix du Nord : « Un épisode qui tient le téléspectateur en joue du générique au clap de fin. »",
    "Gérard Ovide Braquo, Le Clairon de Lille : « On croyait avoir tout vu, le commissariat nous ressort une pépite. Du grand art. »",
    "Joséphine Bertille Farpes, France Soir du Nord : « Un crime parfait de scénario : même le légiste n'a rien à redire. »",
    "Norbert Camille Douille, Le Polar du Dimanche : « Enfin un meurtre élégant. Ma note ? Cinq loupes sur cinq. »",
    "Huguette Marthe Salsifi, Gala Télé-Police : « Marlène a encore oublié le courrier du cœur, et nous, on a oublié de respirer. »",
    "Rodolphe Anselme Picrate, Le Bulletin des Enquêtes : « La semaine prochaine, prenez un alibi : vous ne bougerez plus du canapé. »"
  ];
  var criticCursor = 0;

  function nextCritic() {
    var critic = critics[criticCursor % critics.length];
    criticCursor++;
    return critic;
  }

  var episodeImgs = {
    "La Mystérieuse Affaire de Styles": { img: "/static/vendors/img/chateau_tilques.jpg", source: "Château d'Écou à Tilques, décor de l'épisode — Photo : Wikimedia Commons (CC BY-SA)" },
    "Meurtre à la kermesse": { img: "/static/vendors/img/chateau_wambrechies.jpg", source: "Château de Wambrechies (Nord) — Photo : Rémi Jouan, Wikimedia Commons (CC BY-SA)" }
  };
  function episodeImageFor(title) {
    if (episodeImgs[title]) return episodeImgs[title];
    var keys = Object.keys(episodeImgs);
    var pick = keys[Math.floor(Math.random() * keys.length)];
    return episodeImgs[pick];
  }
  function revealTop(entry, token, done) {
    if (token !== tourToken) return;
    var title = entry.row.querySelectorAll("td")[1].textContent.trim();
    var rows = Array.prototype.slice.call(audiencesSection.querySelectorAll(".topblog_tr"));
    clearRowEffects();
    scanRows(rows, rows.indexOf(entry.row) + 1, token, function() {
      if (token !== tourToken) return;
      clearRowEffects();
      entry.row.scrollIntoView({ block: "center" });
      entry.row.classList.add("feed-audiences-row-glow");
      var episodeImg = episodeImageFor(title);
      var calloutHtml = "<div class='feed-audiences-callout-flex'>" +
        "<img class='feed-audiences-callout-img' src='" + episodeImg.img + "' alt='" + title + "'>" +
        "<div class='feed-audiences-callout-body'>" +
        "<strong>" + title + "</strong><br>" +
        "Record d'audience : " + entry.score.pct.toLocaleString("fr-FR") + " % de part d'audience, " +
        entry.score.viewers.toLocaleString("fr-FR") + " téléspectateurs !<br>" +
        nextCritic() + "<br>" +
        "<span class='feed-audiences-callout-source'>Image : " + episodeImg.source + "</span>" +
        "</div></div>";
      showCallout(calloutHtml, entry.row);
      scanRowTimer = setTimeout(function() {
        hideCallout();
        entry.row.classList.remove("feed-audiences-row-glow");
        entry.row.classList.add("feed-audiences-row-scan");
        if (done) done();
      }, 3000);
    }, true);
  }

  function scanRows(rows, index, token, done, silent) {
    if (token !== tourToken) return;
    if (index >= rows.length) {
      if (done) done();
      return;
    }
    var row = rows[index];
    row.scrollIntoView({ block: "center", behavior: silent ? "auto" : "smooth" });
    row.classList.add("feed-audiences-row-scan");
    scanRowTimer = setTimeout(function() {
      scanRows(rows, index + 1, token, done, silent);
    }, silent ? 90 : 260);
  }

  function runTour(token) {
    if (token !== tourToken) return;
    var ranked = rankedRows();
    if (ranked.length === 0) {
      running = false;
      scheduleIdle();
      return;
    }
    var group = nextTopGroup(ranked);
    var allRows = Array.prototype.slice.call(audiencesSection.querySelectorAll(".topblog_tr"));
    smoothScrollTo(audiencesSection.getBoundingClientRect().top + window.scrollY - 70, 3000, function() {
      if (token !== tourToken) return;
      scanRows(allRows, 0, token, function() {
        if (token !== tourToken) return;
        clearRowEffects();
        revealTop(group[0], token, function() {
          if (token !== tourToken) return;
          revealTop(group[1], token, function() {
            if (token !== tourToken) return;
            revealTop(group[2] || group[0], token, function() {
              if (token !== tourToken) return;
              smoothScrollTo(0, 3000, function() {
                if (token !== tourToken) return;
                clearRowEffects();
                running = false;
                scheduleIdle();
              }, token);
            });
          });
        });
      });
    }, token);
  }

  function scheduleIdle() {
    if (running) return;
    idleTimer = setTimeout(function() {
      if (running) return;
      saveUserPosition();
      running = true;
      tourToken++;
      runTour(tourToken);
    }, idleDelay);
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

  scheduleIdle();
});

document.addEventListener("DOMContentLoaded", function() {
  var scrollNav = document.querySelector(".site-scroll-nav");
  if (!scrollNav) return;
  var navbarHeight = function() {
    var navbar = document.getElementById("navbar");
    return navbar ? navbar.offsetHeight : 76;
  };
  var sectionStep = function() {
    var sections = document.querySelectorAll("main > section > .feed-intro, main > section > [id^='feed-section-']");
    var current = window.scrollY + window.innerHeight / 2;
    for (var i = 0; i < sections.length; i++) {
      var rect = sections[i].getBoundingClientRect();
      var top = rect.top + window.scrollY;
      if (current < top + rect.height) {
        return top - navbarHeight();
      }
    }
    return window.scrollY + Math.max(240, window.innerHeight * 0.8);
  };
  var viewportStep = function() { return Math.max(240, window.innerHeight * 0.8); };
  var pageHeight = function() { return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight); };
  var smoothStep = function(targetY) {
    var maxY = pageHeight() - window.innerHeight;
    var target = Math.max(0, Math.min(targetY, maxY));
    var startY = window.scrollY;
    var distance = target - startY;
    if (Math.abs(distance) < 4) return;
    var startTime = null;
    var duration = Math.min(600, Math.max(220, Math.abs(distance) / 3));
    function step(timestamp) {
      if (startTime === null) startTime = timestamp;
      var progress = Math.min(1, (timestamp - startTime) / duration);
      var eased = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      window.scrollTo(0, startY + distance * eased);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  };
  document.getElementById("scroll-full-top").addEventListener("click", function() { smoothStep(0); });
  document.getElementById("scroll-up").addEventListener("click", function() { smoothStep(window.scrollY - viewportStep()); });
  document.getElementById("scroll-down").addEventListener("click", function() { smoothStep(sectionStep()); });
  document.getElementById("scroll-full-bottom").addEventListener("click", function() { smoothStep(pageHeight() - window.innerHeight); });
});

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
    var pick = quotes[Math.floor(Math.random() * quotes.length)];
    detailQuote.querySelector(".post-detail-quote-text").textContent = "« " + pick.text + " »";
    detailQuote.querySelector(".post-detail-quote-author").textContent = pick.author;
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
      { text: "Inutile de hurler, Marlène : le criminel n'écoute que la radio.", author: "— Commissaire Swan Laurence" },
      { text: "Monsieur le commissaire, j'ai trouvé un indice ! … C'est un trombone.", author: "— Marlène Leroy, secrétaire dévouée" },
      { text: "Je ne cite jamais mes sources, sauf quand elles inventent.", author: "— Alice Avril, La Voix du Nord" },
      { text: "La science est formelle : le corps parle. Le reste, c'est de la littérature.", author: "— Dr Euphrasie Maillol, médecin légiste" },
      { text: "Un témoin qui ne sait rien, c'est encore un témoin. Notez-le, Marlène.", author: "— Commissaire Swan Laurence" }
    ];
    var usedQuotes = [];
    function pickUnique(episodeQuote) {
      if (episodeQuote && usedQuotes.indexOf(episodeQuote.text) === -1) {
        usedQuotes.push(episodeQuote.text);
        return episodeQuote;
      }
      var pool = anyEpisode.filter(function(q) { return usedQuotes.indexOf(q.text) === -1; });
      if (!pool.length) return null;
      var pick = pool[Math.floor(Math.random() * pool.length)];
      usedQuotes.push(pick.text);
      return pick;
    }
    gridQuotes.forEach(function(box) {
      var caption = box.closest(".photos-grid-card");
      var title = caption ? caption.querySelector(".photos-grid-title") : null;
      var titleText = title ? title.textContent.trim() : "";
      var pick = null;
      Object.keys(byEpisode).forEach(function(ep) {
        if (!pick && titleText.indexOf(ep) !== -1) pick = byEpisode[ep];
      });
      pick = pickUnique(pick);
      if (!pick) return;
      box.querySelector(".photos-grid-quote-text").textContent = "« " + pick.text + " »";
      box.querySelector(".photos-grid-quote-author").textContent = pick.author;
      var epKey = null;
      Object.keys(byEpisode).forEach(function(ep) { if (!epKey && titleText.indexOf(ep) !== -1) epKey = ep; });
      var person = pick.author.replace("— ", "").split(",")[0].trim();
      var img = castImgs[person] || "";
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
      var srcEl = document.createElement("p");
      srcEl.className = "quote-source";
      srcEl.textContent = "Source : " + (epKey ? episodeSource[epKey] : "Les Petits Meurtres d'Agatha Christie, saison 2 (France 2) — citation de personnage");
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
      "Abonnez-vous, " + encartUser + " ! Alice Avril ferait n'importe quoi pour une bonne source, pas vous ?"
    ],
    photo_add: [
      "Ajouter une photo à notre enquête, " + encartUser + " ! Marlène a déjà préparé le scotch pour l'album.",
      "Une nouvelle pièce à conviction, " + encartUser + " ? Le commissaire Laurence approuve (à condition qu'elle soit nette).",
      "Vos photos valent celles de La Voix du Nord, " + encartUser + " ... presque !"
    ],
    photo_add_multiple: [
      "Ajouter plein de photos d'un coup, " + encartUser + " : comme un album de Treets, on n'arrête plus la machine !",
      "Enquête express, " + encartUser + " : plusieurs indices d'un seul geste, Marlène n'en revient pas.",
      "Le Dr Maillol dit que tout va bien. Chargez les photos vite avant qu'il change d'avis, " + encartUser + " !"
    ],
    photo_detail: [
      "Pièce à conviction numérotée, " + encartUser + " : observez bien, le détail est dans l'objectif !",
      "Une photo vaut mille indices, " + encartUser + " : le commissaire Laurence l'a punaisée au mur du commissariat.",
      "Dossier photo classé, " + encartUser + " : Marlène a déjà préparé le papier bulle, on ne sait jamais."
    ],
    photo_delete: [
      "Supprimer une pièce à conviction, " + encartUser + " ? Même le procureur Troisgros va faire la grimace.",
      "Attention, " + encartUser + " : Alice Avril fouille toujours les corbeilles. Vraiment toujours.",
      "Ce dossier d'enquête va maigrir, " + encartUser + " ... Marlène garde une copie sous son poster de Marilyn, on ne sait jamais."
    ],
    photo_update: [
      "Mettre une photo à jour, " + encartUser + " : le commissaire Laurence corrige aussi ses rapports, enfin parfois.",
      "Une petite retouche d'indice, " + encartUser + " ? La vérité est dans la Chambre, enfin dans la photo !",
      "On réécrit l'enquête, " + encartUser + " ... discrètement, Alice Avril ne doit rien savoir."
    ],
    post_add: [
      "Un nouveau billet, " + encartUser + " ! Pensez à mettre un chiffre dans le titre, sinon l'inspecteur Laurence refuse le rapport.",
      "Racontez-nous tout, " + encartUser + " : Alice Avril n'aurait pas fait mieux... mais n'oubliez pas le chiffre dans le titre !",
      "Publiez votre billet, " + encartUser + " ! Marlène, préparez la machine à écrire (et un chocolat chaud) !"
    ],
    post_delete: [
      "Supprimer un billet, " + encartUser + " ? Classé sans suite par le commissariat, donc.",
      "Ce billet va disparaître, " + encartUser + " ... comme le corps dans l'armoire. Motus et bouche cousue.",
      "Classer l'affaire, " + encartUser + " ? Le procureur Troisgros signe, Marlène trie les copies (bonbon inclus)."
    ],
    post_update: [
      "Mettre un billet à jour, " + encartUser + " : Laurence relit, Marlène tape à la machine, tout le monde travaille !",
      "Modifier l'enquête, " + encartUser + " : le Dr Maillol certifie que c'est bon pour la santé.",
      "Une version corrigée, " + encartUser + " ? Alice Avril aurait tué pour cette exclusivité... enfin, presque."
    ],
    signin: [
      "Inscrivez-vous pour rejoindre l'équipe d'enquête, recrue ! Le commissariat de Lille cherche des talents.",
      "Un nouveau badge à décrocher, recrue ! Marlène prépare déjà le Ruban adhésif pour votre dossier.",
      "L'enquête vous attend, recrue : cachet, badge et Treets offerts le premier jour !"
    ],
    password_change: [
      "Changer de mot de passe : même Marlène n'essaie pas de deviner celui du commissaire Laurence.",
      "Nouveau mot de passe, ancien secret d'enquête : Alice Avril n'aura rien à écrire dans La Voix du Nord !",
      "Un mot de passe bien gardé vaut mieux qu'un dossier mal fermé, camarade !"
    ],
    profile_update: [
      "Changer de photo de profil, " + encartUser + " : Marlène dit qu'un portrait net, c'est déjà la moitié de l'enquête.",
      "Nouveau visage, même talent, " + encartUser + " ! Le commissaire Laurence approuve votre souci du détail.",
      "Mettez votre plus beau portrait au dossier, " + encartUser + " : format .jpg, sourire garant" + String.fromCharCode(233) + " !"
    ],
    password_reset: [
      "Un mot de passe égaré ? Même le grand Agatha admettrait : ça arrive aux meilleurs enquêteurs.",
      "La mémoire des uns fait les énigmes des autres : réinitialisons tout ça, tranquille.",
      "Indice : votre email. Enquête close en trois clics, promis !"
    ]
  };
  document.querySelectorAll(".action-encart").forEach(function(box) {
    var key = box.getAttribute("data-encart");
    var pool = encartTexts[key];
    if (!pool) { return; }
    box.querySelector(".encart-text").textContent = pool[Math.floor(Math.random() * pool.length)];
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
