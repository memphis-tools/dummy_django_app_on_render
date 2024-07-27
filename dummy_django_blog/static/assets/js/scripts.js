var footer_date = new Date();
document.getElementById("footer_date").innerHTML = "Blog &copy;LesPetitsMeutres 2023-" + footer_date.getFullYear();

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
  $('body').removeClass("navbar-blur");
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
