const elementsMap = {
  fullname: document.querySelector(".fullname"),
  position: document.querySelector(".position"),
  nickname: document.querySelector(".nickname"),
  brand: document.querySelector(".brand"),
  address: document.querySelector(".address"),
  mobile: document.querySelector(".mobile"),
};
let form = document.querySelector(".form");
let copyBtn = document.querySelector(".copy-btn");

document.querySelectorAll(".fill-info").forEach((input) => {
  input.addEventListener("input", (event) => {
    const targetClass = input.name;
    const targetElement = elementsMap[targetClass];

    if (targetElement) {
      targetElement.innerHTML =
        input.value || targetElement.dataset.originalText || "";
    }
    // Add () to nickname if has value
    if (input.name === "nickname") {
      if (input.value) {
        elementsMap[targetClass].innerHTML = `(${input.value})`;
      }
    }
  });
});

function copySignature(event) {
  let form = document.querySelector(".form");

  // Trigger form validation and show messages
  if (!form.checkValidity()) {
    // If the form is not valid, show validation messages or take other actions
    form.reportValidity();
    return false;
  }

  event.preventDefault();

  let element = document.querySelector(".signature");
  let clearSelect = document.querySelector(".clearSelect");
  let button = document.querySelector(".copy-btn");
  if (document.body.createTextRange) {
    // For Internet Explorer
    range = document.body.createTextRange();
    range.moveToElementText(element);
    range.select();
    document.execCommand("copy");
  } else if (window.getSelection) {
    // For modern browsers
    selection = window.getSelection();
    range = document.createRange();
    range.selectNodeContents(element);
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand("copy");
    range.selectNodeContents(clearSelect);
  }

  Swal.fire({
    position: "center",
    icon: "success",
    title: "Copied",
    showConfirmButton: false,
    timer: 1500,
  });
}
