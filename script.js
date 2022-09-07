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

let bookmarks = [];

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

// Validate Form
function validate(nameValue, urlValue) {
  const expression =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
  const regex = new RegExp(expression);

  // Check if user entered name and url
  if (!nameValue || !urlValue) {
    alert("Please submit values for both fields");
    return false;
  }

  // Check if URL is valid using regular expression
  if (!urlValue.match(regex)) {
    alert("Please provide a valid web address");
    return false;
  }

  return true;
}

// Fetch bookmarks from localStorage if available
function fetchBookmarks() {
  if (localStorage.getItem("bookmarks")) {
    bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  } else {
    // Create bookmarks array in local storage
    bookmarks = [{ name: "Google", url: "https://google.com" }];
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }
}

// Handle Data from Form
function storeBookmark(e) {
  e.preventDefault();
  // retrieve values from form input
  const nameValue = websiteNameEl.value;
  let urlValue = websiteUrlEl.value;
  // check if urlValue has http or https. If not, add https.
  if (!urlValue.includes("https://") && !urlValue.includes("http://")) {
    urlValue = `https://${urlValue}`;
  }

  // Validate form fields name and url
  if (!validate(nameValue, urlValue)) {
    return false;
  }

  // create an object
  const bookmark = { name: nameValue, url: urlValue };
  // add the object to bookmarks array
  bookmarks.push(bookmark);
  // save in localstorage
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

  fetchBookmarks();

  // reset the form
  bookmarkForm.reset();
  websiteNameEl.focus();
}

// Event Listener for Form
bookmarkForm.addEventListener("submit", storeBookmark);

// On Load, fetch bookmarks from local storage
fetchBookmarks();
