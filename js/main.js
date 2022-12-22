let elContact = document.querySelector(".js-contact");
let elForm = document.querySelector(".js-form");
let elInput = document.querySelector(".js-input");
let elPhone = document.querySelector(".js-phone");
let elSelect = document.querySelector(".js-select");
let elAlert = document.querySelector(".alert");
let elDeletedBtn = document.querySelector(".deletedBtn");
let elEditBtn = document.querySelector(".exitBtn");
let elInfo = document.querySelector(".card__info");
let elTitle = document.querySelector(".card__title");
let elSelectCon = document.querySelector(".card__select");
let elCardPhone = document.querySelector(".card__phone");

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  if (elInput.value == "" || elSelect.value == "" || elPhone.value == "") {
    elAlert.classList.remove("d-none");
    setTimeout(() => {
      elAlert.classList.add("d-none");
    }, 3000);

    return;
  }

  elTitle.textContent = elInput.value;
  elSelectCon.textContent = elSelect.value;
  elCardPhone.textContent = elPhone.value;

  elInfo.classList.remove("d-none");

  elInput.value = ''
  elSelect.value = 'Relationship' 
  elPhone.value = ''
});

elDeletedBtn.addEventListener("click", () => {
  elInfo.textContent = "";
});

elEditBtn.addEventListener("click", () => {
  elInput.value = elTitle.textContent;
  elSelect.value = elSelectCon.textContent;
  elPhone.value = elCardPhone.textContent;
});
