let elForm = document.querySelector(".js-form");
let elInput = document.querySelector(".js-input");
let elSelect = document.querySelector(".js-select");
let elPhone = document.querySelector(".js-phone");
let elCards = document.querySelector(".cards");
let elCloseBtn = document.querySelector(".close-btn");
let elModal = document.querySelector(".modal__friend");
let elDark = document.querySelector(".dark__color");
let elContact = document.querySelector(".contact__color");
let elNewCon = document.querySelector(".newCon__color");

// MODAL
let elFormModal = document.querySelector(".modal-form");
let elInputModal = document.querySelector(".modal-input");
let elSelectModal = document.querySelector(".modal-select");
let elPhoneModal = document.querySelector(".modal-phone");

function friendFunc(array, node) {
  node.innerHTML = "";
  array.forEach((item) => {
    let cardInfo = document.createElement("div");
    cardInfo.setAttribute(
      "class",
      "d-flex border border-1 card__info align-items-center justify-content-between"
    );

    let userInfo = document.createElement("div");
    userInfo.setAttribute("class", "p-3");

    let cardTitle = document.createElement("h5");
    cardTitle.setAttribute("class", "card__title");
    cardTitle.textContent = item.name;
    let cardSelect = document.createElement("h5");
    cardSelect.setAttribute("class", "my-3 card__select");
    cardSelect.textContent = item.select;
    let cardButton = document.createElement("a");
    cardButton.setAttribute("class", "btn btn-outline-primary card__phone");
    cardButton.setAttribute('href', `tel:${item.phone}`)
    cardButton.textContent = item.phone;

    let userBtn = document.createElement("div");
    userBtn.setAttribute("class", "d-flex p-3 flex-column");

    let cardEdit = document.createElement("button");
    cardEdit.setAttribute("class", "btn btn-warning shadows editBtn");
    cardEdit.textContent = 'Edit'
    cardEdit.dataset.deleteId = item.id;

    let cardDelete = document.createElement("div");
    cardDelete.setAttribute("class", "btn btn-danger mt-4 shadows deletedBtn");
    cardDelete.textContent = 'Delete'
    cardDelete.dataset.deleteId = item.id;

    userBtn.appendChild(cardEdit);
    userBtn.appendChild(cardDelete);

    userInfo.appendChild(cardTitle);
    userInfo.appendChild(cardSelect);
    userInfo.appendChild(cardButton);

    cardInfo.appendChild(userInfo);
    cardInfo.appendChild(userBtn);

    node.appendChild(cardInfo);
  });

  window.localStorage.setItem("friendList", JSON.stringify(friendList));
}

let friendList = JSON.parse(window.localStorage.getItem("friendList")) || [];
elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  
  let findes = (friendList.findIndex((item) => item.phone == elPhone.value));

  if (findes >= 0) {
    alert('Bunaqa raqam mavjud')
  }else {
    let obj = {
      id: friendList.length > 0 ? friendList[friendList.length-1].id + 1 : 1,
      name: elInput.value,
      select: elSelect.value,
      phone: elPhone.value,
    };
  
    friendList.push(obj);
  
  
    friendFunc(friendList, elCards);
    elInput.value = ''
    elSelect.value = 'Relationship'
    elPhone.value = ''
  }
  
});

elCards.addEventListener("click", (evt) => {
  if (evt.target.matches(".deletedBtn")) {
    let deleteId = evt.target.dataset.deleteId;
    let friendIndex = friendList.findIndex((item) => item.id === deleteId);
    friendList.splice(friendIndex, 1);
    friendFunc(friendList, elCards);
  }

  if (evt.target.matches(".editBtn")) {
    let deleteId = evt.target.dataset.deleteId;
    let friendName = friendList.find((el) => el.id == deleteId);
    elModal.classList.add("open__modal");
    elModal.classList.remove("close__modal");
    document.body.style.backgroundColor = "rgba(175, 165, 153, 0.733)";
    document.body.style.backdropFilter = "blur(10px);";

    elInputModal.value = friendName.name;
    elSelectModal.value = friendName.select;
    elPhoneModal.value = friendName.phone;

    elFormModal.addEventListener("submit", (evt) => {
      evt.preventDefault();
      friendName.name = elInputModal.value;
      friendName.select = elSelectModal.value;
      friendName.phone = elPhoneModal.value;
      friendFunc(friendList, elCards);
      elModal.classList.add("close__modal");
      elModal.classList.remove("open__modal");
      document.body.style.backgroundColor = "inherit";
    });
    friendFunc(friendList, elCards);
  }
});

friendFunc(friendList, elCards);

var elDarkBtn = document.querySelector(".dark__mode");
var elLightBtn = document.querySelector(".light__mode");

let theme = false;

elDarkBtn.addEventListener("click", function () {
  theme = true;

  let bg = "dark";
  window.localStorage.setItem("theme", bg);
  darkFunc();
});

function darkFunc() {
  if (window.localStorage.getItem("theme") == "dark") {
    elDarkBtn.classList.add("mode__active");
    elLightBtn.classList.remove("mode__active");
    document.body.style.backgroundColor = "#333";
    elDark.classList.add('dark__color')
    elContact.classList.add('contact__color')
    elNewCon.classList.add('newCon__color')
  }
}

darkFunc();

elLightBtn.addEventListener("click", function () {
  theme = false;

  let bg = "light";
  window.localStorage.setItem("theme", bg);
  lightFunc();
});

function lightFunc() {
  if (window.localStorage.getItem("theme") == "light") {
    document.body.style.backgroundColor = "#fff";
    elDarkBtn.classList.remove("mode__active");
    elLightBtn.classList.add("mode__active");
    elDark.classList.remove('dark__color')
    elContact.classList.remove('contact__color')
    elNewCon.classList.remove('newCon__color')
  }
}

lightFunc();


elCloseBtn.addEventListener("click", () => {
  elModal.classList.add("close__modal");
  elModal.classList.remove("open__modal");
  document.body.style.backgroundColor = "inherit";
});
