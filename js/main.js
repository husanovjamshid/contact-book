let elForm = document.querySelector(".js-form");
let elInput = document.querySelector(".js-input");
let elList = document.querySelector(".js-list");
// let elTemplate = document.querySelector(".js-template").content;

elForm.addEventListener("submit", (evt) => {
  fetch(`http://www.omdbapi.com/?apikey=5d5d9786&s=${elInput.value}`)
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        elList.innerHTML = "";
        data.Search.forEach((element) => {
          let newLists = document.createElement("div");
          newLists.setAttribute("class", "col-12 col-sm-12 col-md-6 col-lg-3");

          let newItem = document.createElement("div");
          newItem.innerHTML = `
          <div class="card" >
          <img src="${element.Poster}" class="card-img-top" alt="...">
          <div class="card-body">
          <h5 class="card-title">Name: ${element.Title}</h5>
          <h6 class="card-text mt-4">Year: ${element.Year}</h6>
          <h6 class="card-text mt-2">Type: ${element.Type}</h6>
          
          </div>
          </div>
      `;

          newLists.appendChild(newItem);
          elList.appendChild(newLists);
          elInput.value = ''
        });

      }else {
        let err = document.createElement('h4')
        err.setAttribute('class', )
        err.textContent = 'Xatolik yuz berdi qayta izlab ko`ring'

        elList.appendChild(err)
        console.log('err');
      }
    });
});
