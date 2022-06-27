window.addEventListener("load", () => {
  init();
});

// once page is loaded, allow the following functions to run:
function init() {
  console.log("Loading page");

  // events
  handleClickSearchBar();
  handleClickMobileMenu();
}

// events
function handleClickSearchBar() {
  // declare variables
  const buttonSearch = document.querySelector("#button-search-js");
  // add eventListener, calling a function to manage the component
  buttonSearch.addEventListener("click", expandSearchBar);
}

function handleClickMobileMenu() {
  const buttonMenu = document.querySelector("#button-menu-js");
  buttonMenu.addEventListener("click", manageMenuMobile);
}

function expandSearchBar() {
  const buttonSearch = document.querySelector("#button-search-js");
  const searchBox = document.querySelector("#search-box-mobile-js");
  const inputSearch = document.querySelector("#search-input-mobile-js");
  const buttonSearchMobile = document.querySelector("#search-button-mobile-js");

  // check attribute on component
  const isSearchBoxVisible = searchBox.getAttribute("data-visible");
  // check attribute value to change it
  if (isSearchBoxVisible === "false") {
    searchBox.setAttribute("data-visible", true);
    // make the components 'focusable'
    inputSearch.setAttribute("tabindex", "0");
    buttonSearchMobile.setAttribute("tabindex", "0");
    // also make changes to aria-rules, for screen readers
    searchBox.setAttribute("aria-hidden", false);
    buttonSearch.setAttribute("aria-expanded", true);
  } else {
    // if button is clicked again, reset the attributes
    searchBox.setAttribute("data-visible", false);
    inputSearch.setAttribute("tabindex", "-1");
    buttonSearchMobile.setAttribute("tabindex", "-1");
    searchBox.setAttribute("aria-hidden", true);
    buttonSearch.setAttribute("aria-expanded", false);
  }
}

function manageMenuMobile() {
  const buttonMenu = document.querySelector("#button-menu-js");
  const navbar = document.querySelector("#mobile--navigation-js");
  const isNavbarVisible = navbar.getAttribute("data-visible");
  const list = document.querySelectorAll("#mobile--navigation-js ul li a");

  if (isNavbarVisible === "false") {
    console.log(isNavbarVisible);
    buttonMenu.setAttribute("aria-expanded", true);
    buttonMenu.setAttribute("aria-label", "Close menu");
    navbar.setAttribute("data-visible", true);
    changeNodeListAttribute(list, "tabindex", "0");

    // closing menu options
    // once navbar is expanded (has data-visible set as true), allow it to be closed when:
    // user clicks on a link or outside the navbar
    closeMenuByClickOutsideNav(buttonMenu, list, navbar);

    // user press esc to close navbar
    closeMenuByEscapeKey(buttonMenu, list, navbar);

    // nav loses focus
    closeMenuWhenLosingFocus(buttonMenu, list, navbar);
  } else {
    console.log(isNavbarVisible);
    // reset the values when navbar is closed
    resetMobileMenu(buttonMenu, list, navbar);
  }
}

function changeNodeListAttribute(list, attribute, value) {
  list.forEach((item) => item.setAttribute(attribute, value));
}

function closeMenuByClickOutsideNav(button, list, nav) {
  const img = document.querySelector("#icon-mobile-menu-js");
  const isVisible = nav.getAttribute("data-visible");

  if (isVisible === "true") {
    window.addEventListener("click", (event) => {
      if (
        event.target === img ||
        event.target === nav ||
        event.target === button
      ) {
        return null;
      } else {
        resetMobileMenu(button, list, nav);
      }
    });
  }
}

function closeMenuByEscapeKey(button, list, nav) {
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      resetMobileMenu(button, list, nav);
    }
  });
}

function closeMenuWhenLosingFocus(button, list, nav) {
  // instead of keep track of blur or focusout => triggers run in 'delay'
  // use focusin => once the event happens, it will reset the menu
  window.addEventListener("focusin", (event) => {
    if (event.target.className !== "menu--link-item") {
      resetMobileMenu(button, list, nav);
    }
  });
}

function resetMobileMenu(button, list, nav) {
  button.setAttribute("aria-expanded", false);
  button.setAttribute("aria-label", "Open menu");
  nav.setAttribute("data-visible", false);
  changeNodeListAttribute(list, "tabindex", "-1");
}
