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
  var ns = "http://www.w3.org/2000/svg";
  var svg = document.createElementNS(ns, "svg");
  svg.setAttribute("viewBox", "0 0 64 64");
  svg.setAttribute("class", "navbar-default-profile-badge");
  svg.setAttribute("role", "img");
  svg.setAttribute("aria-label", "badge policier");
  var star = document.createElementNS(ns, "path");
  star.setAttribute("d", "M32 6l5.5 12.4L50.7 20l-9.4 9.1 2.4 13.1L32 36.2 20.3 42.2l2.4-13.1-9.4-9.1 13.2-1.6z");
  star.setAttribute("fill", "#ea9ef0");
  star.setAttribute("stroke", "#221c1c");
  star.setAttribute("stroke-width", "2");
  svg.appendChild(star);
  var ring = document.createElementNS(ns, "circle");
  ring.setAttribute("cx", "32");
  ring.setAttribute("cy", "32");
  ring.setAttribute("r", "28");
  ring.setAttribute("fill", "none");
  ring.setAttribute("stroke", "#ea9ef0");
  ring.setAttribute("stroke-width", "2");
  ring.setAttribute("stroke-dasharray", "6 5");
  svg.appendChild(ring);
  var patch = document.createElementNS(ns, "path");
  patch.setAttribute("d", "M12 46h40v10a4 4 0 0 1-4 4H16a4 4 0 0 1-4-4z");
  patch.setAttribute("fill", "#221c1c8c");
  patch.setAttribute("stroke", "#ea9ef0");
  patch.setAttribute("stroke-dasharray", "4 3");
  svg.appendChild(patch);
  defaultProfile.replaceWith(svg);
});
