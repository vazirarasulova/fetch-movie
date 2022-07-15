const elList = document.querySelector(".list");
const elInput = document.querySelector(".header__input");

let search = elInput.value;
let API_KEY = "8311d5a5"; 

const fragment = document.createDocumentFragment();

const renderMovie = (arr, element) =>{
  element.innerHTML = null;
  
  arr.forEach(item => {
    console.log(item);
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
    element.appendChild(fragment);
  });
}

// fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`)
// .then((response) => response.json())
//  .then((data) => {
//   if(data.length){
// renderMovie(data.Search, elList);
//   }
// })


async function getMovie() {
  const response = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`)
  const data = await response.json()
  
  if(data.Response && data.Search.length){
    renderMovie(data.Search, elList);
  }
  
}

elInput.addEventListener("change", (evt) => {
  search = evt.target.value;
  getMovie()
})

getMovie();

