const elList = document.querySelector(".list");
const elInput = document.querySelector(".header__input");
const elSelect = document.querySelector(".form-select");

let search = elInput.value;
let API_KEY = "8311d5a5"; 

const fragment = document.createDocumentFragment();

const renderMovie = (arr, element) =>{
  element.innerHTML = null;
  
  arr.forEach(item => {
    const newItem = document.createElement("li");
    const newImg = document.createElement("img");
    const newTitle = document.createElement("h3");
    const newYear = document.createElement("p");
    
    newTitle.textContent = item.Title.split(" ").slice(0 , 3).join(" ");
    newYear.textContent = item.Year;
    
    
    newItem.setAttribute("class", "card my-2 border-warning bg-dark me-2");
    newItem.setAttribute("style", "width: 16rem");
    newImg.setAttribute("style", "height: 10rem");
    newImg.setAttribute("src", item.Poster);
    newImg.setAttribute("class", "card-img-top w-100 mx-auto");
    
    newTitle.setAttribute("class", "card-title h4 fs-5 mt-3 text-warning text-center")
    newYear.setAttribute("class", "card-year text-danger opacity-75 fw-bolder mb-1 text-center")
    
    
    newItem.appendChild(newImg);
    newItem.appendChild(newTitle);
    newItem.appendChild(newYear);
    
    fragment.appendChild(newItem)
  });
  element.appendChild(fragment);
}

function renderType(arr, element) {

  let included = [];

  arr.forEach((item) => {
      if (!included.includes(item.Type)) {
        included.push(item.Type);
      }
    });
 

  included.forEach((item) => {
    const newOption = document.createElement("option");
    newOption.value = item;
    newOption.textContent = item;
    element.appendChild(newOption);
  });
  
}


// fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`)
// .then((response) => response.json())
//  .then((data) => {
//   if(data.length){
// renderMovie(data.Search, elList);
//   }
// })


let movies = [];
async function getMovie() {
  const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`);
  const data = await response.json();
  movies = [...data.Search];

  if(data.Response && data.Search){
    renderMovie(data.Search, elList);
    renderType(data.Search, elSelect);
  }
}
  

elInput.addEventListener("change", (evt) => {
  search = evt.target.value;
  getMovie()
})

elSelect.addEventListener("change", (evt) => {
  evt.preventDefault();

  let elSelectVal = evt.target.value;
  let filterTypes = elSelectVal == "Filter by Type" ? movies : movies.filter((item) => item.Type.includes(elSelectVal));

  renderMovie(filterTypes, elList);
});


getMovie();

