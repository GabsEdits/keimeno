var editableArea = document.getElementById("editableArea");

window.addEventListener("load", function () {
  var savedText = localStorage.getItem("savedText");
  if (savedText) {
    editableArea.innerHTML = savedText;
  }
});

editableArea.addEventListener("input", function () {
  var text = editableArea.innerHTML;
  localStorage.setItem("savedText", text);
});

editableArea.addEventListener("keydown", function (event) {
  if ((event.ctrlKey || event.metaKey) && event.key === "b") {
    event.preventDefault();
    document.execCommand("bold", false, null);
  }

  if ((event.ctrlKey || event.metaKey) && event.key === "i") {
    event.preventDefault();
    document.execCommand("italic", false, null);
  }

  if (event.key === "Enter") {
    event.preventDefault();
    insertNewLine();
  }
});

function insertNewLine() {
  var selection = window.getSelection();
  var range = selection.getRangeAt(0);
  var br = document.createElement("br");
  range.insertNode(br);
  range.collapse(false);
  selection.removeAllRanges();
  selection.addRange(range);
}

function toggleDistractionFreeMode() {
  document.body.classList.toggle("focus-mode");
}

function clearText() {
  if (window.confirm("Are you sure you want to clear the text?")) {
    editableArea.innerHTML = "";
    localStorage.removeItem("savedText");
  }
}

var logo = document.querySelector("h1");
logo.addEventListener("click", clearText);

document.addEventListener("keydown", handleKeyDown);

function clearTextShortcut(event) {
  if (event.altKey && event.key === "c") {
    event.preventDefault();
    clearText();
  }
}

document.addEventListener("keydown", clearTextShortcut);

function toggleSpoiler() {
  this.classList.toggle("revealed");
}

function handleKeyDown(event) {
  if (event.ctrlKey && event.altKey && event.key === "q") {
    event.preventDefault();
    var selection = window.getSelection();
    var range = selection.getRangeAt(0);

    var spoiler = document.createElement("span");
    spoiler.classList.add("spoiler");
    spoiler.classList.add("revealed");
    spoiler.textContent = range.toString();
    range.deleteContents();
    range.insertNode(spoiler);

    range.selectNodeContents(spoiler);
    selection.removeAllRanges();
    selection.addRange(range);

    spoiler.addEventListener("click", toggleSpoiler);
  }
}

editableArea.addEventListener("keydown", handleKeyDown);

const hoverElement = document.getElementById("hover-element");
const originalColor = window.getComputedStyle(hoverElement).color;

hoverElement.addEventListener("mouseenter", function () {
  const randomColor = getRandomColor();
  hoverElement.style.color = randomColor;
});

hoverElement.addEventListener("mouseleave", function () {
  hoverElement.style.color = originalColor;
});

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function toggleKeyboardShortcuts() {
  const modal = document.querySelector(".keyboard-shortcuts-container");
  const modalBackground = document.querySelector(
    ".keyboard-shortcut-modal-background"
  );
  modal.classList.toggle("show");
  modalBackground.classList.toggle("show");
}

const keyboardToggle = document.querySelector(".keyboard-shortcuts-toggle");
const keyboardContainer = document.querySelector(
  ".keyboard-shortcuts-container"
);
const keyboardModalBackground = document.querySelector(
  ".keyboard-shortcut-modal-background"
);

function handleOutsideClick(event) {
  if (
    !keyboardToggle.contains(event.target) &&
    !keyboardContainer.contains(event.target)
  ) {
    keyboardContainer.classList.remove("show");
    keyboardModalBackground.classList.remove("show");
  }
}

const wordCountDisplay = document.getElementById("wordCountDisplay");

editableArea.addEventListener("input", countWords);

function countWords() {
  const text = editableArea.textContent || editableArea.innerText;

  const words = text.trim().split(/\s+/);

  const filteredWords = words.filter((word) => word !== "");

  wordCountDisplay.textContent = `Words: ${filteredWords.length}`;
}

window.addEventListener("load", function () {
  countWords();
});
