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
  buttonMenu.addEventListener("click", manageMenu);
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

function manageMenu() {
  console.log("managing mobile menu");
  // declare variables
  // once button is clicked, display the navbar-menu
  // when it is clicked again, hide the navbar-menu
  // also make changes to aria-expanded, for screen readers
}
