let elForm = document.querySelector(".js-form");
let elInput = document.querySelector(".js-input");
let elSelect = document.querySelector(".js-select");
let elPhone = document.querySelector(".js-phone");
let elCards = document.querySelector(".cards");
let elCloseBtn = document.querySelector(".close-btn");
let elModal = document.querySelector(".modal__friend");

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
      "d-flex card__info align-items-center justify-content-between"
    );

    let userInfo = document.createElement("div");
    userInfo.setAttribute("class", "p-3");

    let cardTitle = document.createElement("h5");
    cardTitle.setAttribute("class", "card__title");
    cardTitle.textContent = item.name;
    let cardSelect = document.createElement("h5");
    cardSelect.setAttribute("class", "my-3 card__select");
    cardSelect.textContent = item.select;
    let cardButton = document.createElement("button");
    cardButton.setAttribute("class", "btn btn-outline-primary card__phone");
    cardButton.textContent = item.phone;

    let userBtn = document.createElement("div");
    userBtn.setAttribute("class", "d-flex p-3 flex-column");

    let cardEdit = document.createElement("button");
    cardEdit.setAttribute("class", "btn btn-warning shadows editBtn");
    let cardIcon = document.createElement("i");
    cardIcon.setAttribute("class", "fa-solid fa-pen-to-square");
    cardEdit.appendChild(cardIcon);
    cardEdit.dataset.editId = item.id;

    let cardDelete = document.createElement("div");
    cardDelete.setAttribute("class", "btn btn-danger mt-4 shadows deletedBtn");
    cardDelete.innerHTML = `<i class="fa-sharp fa-solid fa-trash"></i>`;
    // let cardIcon1 = document.createElement("i");
    // cardIcon1.setAttribute("class", "fa-sharp fa-solid fa-trash");
    // cardDelete.appendChild(cardIcon1);
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

  
  window.localStorage.setItem('friendList', JSON.stringify(friendList))
}

let friendList = JSON.parse(window.localStorage.getItem('friendList')) || [];
elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();



  let obj = {
    id: friendList.length ? friendList[friendList.length - 1].id + 1 : 1,
    name: elInput.value,
    select: elSelect.value,
    phone: elPhone.value,
  };

  friendList.push(obj);

  

  friendFunc(friendList, elCards)
  
});

elCards.addEventListener("click", (evt) => {
  if(evt.target.matches(".deletedBtn")) {
    let deleteId = evt.target.dataset.deleteId
    let friendIndex = friendList.findIndex((item) => item.id == deleteId)
    friendList.splice(friendIndex, 1)
    friendFunc(friendList, elCards)
  
  };

  if(evt.target.matches(".editBtn")) {
    let deleteId = evt.target.dataset.deleteId
    let friendIndex = friendList.findIndex((item) => item.id == deleteId)
    let friendName = friendList.find((item) => item.id == deleteId)
    elModal.classList.add('open__modal')
    elModal.classList.remove('close__modal')
    document.body.style.backgroundColor = 'rgba(175, 165, 153, 0.733)'
    document.body.style.backdropFilter = 'blur(10px);'

    // elInputModal.value = 
    // console.log(friendName);
    
    friendFunc(friendList, elCards)
  
  };
  
});

friendFunc(friendList, elCards)

elCloseBtn.addEventListener('click' ,()=> {
  elModal.classList.add('close__modal')
  elModal.classList.remove('open__modal')
  document.body.style.backgroundColor = 'inherit'
  
})