import Glide from "@glidejs/glide";

window.addEventListener("load", () => {
  init();
});

// once page is loaded, allow the following functions to run:
function init() {
  // events
  handleClickSearchBox();
  handleClickMobileMenu();
}

// events
function handleClickSearchBox() {
  // declare variables
  const buttonExpandSearch = document.querySelector("#button-expand-search-js");
  // add eventListener, calling a function to manage the component
  buttonExpandSearch.addEventListener("click", expandSearchBox);
}

// function handleClickCloseSearchBox() {}

function handleClickMobileMenu() {
  const buttonMenu = document.querySelector("#button-menu-js");
  buttonMenu.addEventListener("click", manageMenuMobile);
}

function expandSearchBox() {
  const buttonExpandSearch = document.querySelector("#button-expand-search-js");
  const searchBox = document.querySelector("#search-box-mobile-js");
  const buttonCloseSearch = document.querySelector("#button-close-search-js");
  const list = document.querySelectorAll(
    "#search-box-mobile-js [tabindex='-1']"
  );
  // list returns #search-input-mobile-js, #search-submit-button-mobile-js, #button-close-search-js

  // check attribute on component
  const isSearchBoxVisible = searchBox.getAttribute("data-visible");
  // check attribute value to change it
  if (isSearchBoxVisible === "false") {
    searchBox.setAttribute("data-visible", true);
    // also make changes to aria-rules, for screen readers
    searchBox.setAttribute("aria-hidden", false);
    buttonExpandSearch.setAttribute("aria-expanded", true);
    buttonCloseSearch.setAttribute("aria-expanded", true);
    // make the components 'focusable'
    changeNodeListAttribute(list, "tabindex", "0");

    // once content is visible, allow it to be closed by:
    // escape key

    // when input loses focus
    closeSearchBoxWhenLosingFocus(
      searchBox,
      buttonExpandSearch,
      buttonCloseSearch,
      list
    );
    // when user clicks outside search box
    closeSearchBoxOutsideDiv(
      searchBox,
      buttonExpandSearch,
      buttonCloseSearch,
      list
    );
  } else {
    // if button is clicked again, reset the attributes
    resetMobileSearch(searchBox, buttonExpandSearch, buttonCloseSearch, list);
  }
}

function manageMenuMobile() {
  const buttonMenu = document.querySelector("#button-menu-js");
  const navbar = document.querySelector("#mobile--navigation-js");
  const isNavbarVisible = navbar.getAttribute("data-visible");
  const list = document.querySelectorAll("#mobile--navigation-js ul li a");

  if (isNavbarVisible === "false") {
    buttonMenu.setAttribute("aria-expanded", true);
    buttonMenu.setAttribute("aria-label", "Close menu");
    navbar.setAttribute("data-visible", true);
    changeNodeListAttribute(list, "tabindex", "0");

    // closing options
    closeMenuByClickOutsideNav(buttonMenu, list, navbar);
    closeMenuByEscapeKey(buttonMenu, list, navbar);
    closeMenuWhenLosingFocus(buttonMenu, list, navbar);
  } else {
    resetMobileMenu(buttonMenu, list, navbar);
  }
}

function changeNodeListAttribute(list, attribute, value) {
  list.forEach((item) => item.setAttribute(attribute, value));
}

function closeSearchBox(searchbox, input, button, mobileButton, list) {
  const buttonClose = document.querySelector("#button-close-search-js");
  buttonClose.addEventListener(
    "click",
    resetMobileSearch(searchbox, input, button, mobileButton, list)
  );
}

function closeSearchBoxOutsideDiv(searchbox, expandButton, closeButton, list) {
  const img = document.querySelector("#icon-expand-search-js");
  const input = document.querySelector("#search-input-mobile-js");
  const isVisible = searchbox.getAttribute("data-visible");

  if (isVisible === "true") {
    window.addEventListener("click", (event) => {
      if (
        event.target === img ||
        event.target === searchbox ||
        event.target === input ||
        event.target === expandButton
      ) {
        return null;
      } else {
        resetMobileSearch(searchbox, expandButton, closeButton, list);
      }
    });
  }
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

function closeSearchBoxWhenLosingFocus(
  searchbox,
  expandButton,
  closeButton,
  list
) {
  window.addEventListener("focusin", (event) => {
    if (
      event.target.id === "search-input-mobile-js" ||
      event.target.id === "search-submit-button-mobile-js" ||
      event.target.id === "button-close-search-js"
    ) {
      return null;
    } else {
      resetMobileSearch(searchbox, expandButton, closeButton, list);
    }
  });
}

function resetMobileMenu(button, list, nav) {
  button.setAttribute("aria-expanded", false);
  button.setAttribute("aria-label", "Open menu");
  nav.setAttribute("data-visible", false);
  changeNodeListAttribute(list, "tabindex", "-1");
}

function resetMobileSearch(searchbox, expandButton, closeButton, list) {
  searchbox.setAttribute("data-visible", false);
  searchbox.setAttribute("aria-hidden", true);
  expandButton.setAttribute("aria-expanded", false);
  closeButton.setAttribute("aria-expanded", false);
  changeNodeListAttribute(list, "tabindex", "-1");
}

// Glider.js
new Glide(".glide", { type: "carousel", perView: 1 }).mount();
