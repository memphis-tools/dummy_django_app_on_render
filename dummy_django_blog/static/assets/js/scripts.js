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

  var idleDelay = 10000;
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

  function showCallout(text) {
    var el = ensureCallout();
    el.innerHTML = text;
    el.classList.add("visible");
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
    var pctText = cells[cells.length - 1].textContent.replace(",", ".").replace("%", "").trim();
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
      var calloutHtml = "<strong>" + title + "</strong><br>" +
        "Record d'audience : " + entry.score.pct.toLocaleString("fr-FR") + " % de part d'audience, " +
        entry.score.viewers.toLocaleString("fr-FR") + " téléspectateurs !<br>" +
        nextCritic();
      showCallout(calloutHtml);
      scanRowTimer = setTimeout(function() {
        hideCallout();
        entry.row.classList.remove("feed-audiences-row-glow");
        entry.row.classList.add("feed-audiences-row-scan");
        if (done) done();
      }, 4200);
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
  document.getElementById("scroll-down").addEventListener("click", function() { smoothStep(window.scrollY + viewportStep()); });
  document.getElementById("scroll-full-bottom").addEventListener("click", function() { smoothStep(pageHeight() - window.innerHeight); });
});
