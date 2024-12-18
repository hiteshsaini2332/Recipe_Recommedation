const searchForm = document.querySelector("form");
const searchResultDiv = document.querySelector(".search-result");
const container = document.querySelector(".container");
let searchQuery = "";
const APP_ID = '33b1a0ef';
const APP_key = '5e12645236de1c7eb43b725fd06a49ee';


searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  searchQuery = e.target.querySelector("input").value;
  fetchAPI();
});

async function fetchAPI() {
  const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}&from=0&to=100`;
  const response = await fetch(baseURL);
  const data = await response.json();
  generateHTML(data.hits);
}

function generateHTML(results) {
  container.classList.remove("initial");
  let generatedHTML = "";
  results.map((result) => {
    generatedHTML += `
      <div class="item">
        <img src="${result.recipe.image}" alt="img">
        <div class="flex-container">
          <h1 class="title">${result.recipe.label}</h1>
          <a class="view-btn" target="_blank" href="${
            result.recipe.url
          }">View Recipe</a>
        </div>
        <p class="item-data">Calories : ${result.recipe.calories.toFixed(2)}</p>
        <p class="item-data">Diet label : ${
          result.recipe.dietLabels.length > 0
            ? result.recipe.dietLabels
            : "No Data Found"
        }</p>
        <p class="item-data">Health labels : ${result.recipe.healthLabels}</p>
      </div>
    `;
  });
  searchResultDiv.innerHTML = generatedHTML;
}


// This JavaScript code is a simple web application that fetches recipe data from the Edamam API based on user input and displays the results dynamically on the webpage. Here's a breakdown of the code:

// DOM Selection: The code starts by selecting relevant elements from the HTML document using document.querySelector(). These elements include the search form, the container for search results, and a general container.

// Event Listener: An event listener is attached to the search form to capture form submissions. When the form is submitted, it prevents the default form submission behavior and captures the user input.

// API Fetching: The fetchAPI() function is an asynchronous function that constructs the API URL based on the user's search query and sends a GET request to the Edamam API. It then awaits the response and parses the JSON data.

// HTML Generation: The generateHTML() function is responsible for generating HTML markup based on the data received from the API. It loops through the array of recipe objects (data.hits) and constructs HTML elements for each recipe.

// Displaying Results: The generated HTML markup is inserted into the searchResultDiv element, which displays the search results on the webpage.

// API Credentials: The APP_ID and APP_key variables hold the credentials required to authenticate with the Edamam API.
