// Helper function to get elements
function $(el) {
  if (el.charAt(0) === "#") {
    // if el begins with # then find element with id
    return document.getElementById(el.substring(1));
  } else if (el.charAt(0) === ".") {
    // if el begins with . then find element with class
    return document.querySelectorAll(el.substring(1));
  }
}

const modal = $("#modal");
const modalShow = $("#show-modal");
const modalClose = $("#close-modal");
const bookmarkForm = $("#bookmark-form");
const websiteNameEl = $("#website-name");
const websiteUrlEl = $("#website-url");
const bookmarksContainer = $("#bookmarks-container");

// Show Modal and focus on 1st Input
function showModal() {
  modal.classList.add("show-modal");
  websiteNameEl.focus();
}

// Event Listeners
modalShow.addEventListener("click", showModal);
modalClose.addEventListener("click", () => {
  modal.classList.remove("show-modal");
});
window.addEventListener("click", (e) =>
  e.target === modal ? modal.classList.remove("show-modal") : false
);
