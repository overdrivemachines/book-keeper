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

// Build Bookmarks DOM
function buildBookmarks() {
  // Build items
  bookmarks.forEach((bookmark) => {
    const { name, url } = bookmark;

    // Item div
    const item = document.createElement("div");
    item.classList.add("item");
    // Close Icon
    const closeIcon = document.createElement("i");
    closeIcon.classList.add("fa-solid", "fa-xmark");
    closeIcon.setAttribute("title", "Delete Bookmark");
    closeIcon.setAttribute("onclick", `deleteBookmark('${url}')`);
    // Favicon / Link Container
    const linkInfo = document.createElement("div");
    linkInfo.classList.add("name");
    // Favicon
    const favicon = document.createElement("img");
    favicon.setAttribute(
      "src",
      `https://s2.googleusercontent.com/s2/favicons?domain=${url}`
    );
    favicon.setAttribute("alt", "Favicon");
    // Link
    const link = document.createElement("a");
    link.setAttribute("href", `${url}`);
    link.setAttribute("target", "_blank");
    link.textContent = name;
    // Append to bookmarks container
    linkInfo.append(favicon, link);
    item.append(closeIcon, linkInfo);
    bookmarksContainer.appendChild(item);
  });
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

  buildBookmarks();
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
