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
