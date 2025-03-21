// get the elements from the DOM
const decrementButton = document.querySelector(".minus-btn")
const incrementButton = document.querySelector(".plus-btn")
const quantityValue = document.querySelector(".quantity-value")
const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('slug');
// console.log(myParam)
// add the event listener to the decrementButton
decrementButton.addEventListener("click", () => {
   if(quantityValue.value <= 1){
    quantityValue = 1;
   }
   else {
    quantityValue.value = parseInt(quantityValue.value) - 1;
   }
})  
// add the event listener to the incrementButton

incrementButton.addEventListener("click", () => {
   quantityValue.value = parseInt(quantityValue.value) + 1;
})


  
// import the baseUrl from baseUrl.js
// import { baseUrl } from "./baseUrl";// call in the dishesContainer
const dishesContainer = document.querySelector('.food-lists-container-content-container');
// console.log(dishesContainer);

// call in the loader
const loader = document.getElementById('loader');
console.log(loader);

// import the baseUrl from baseurl.js
// Function to fetch dishes and display them
async function fetchDishes() {
    try {
        // Show loader while fetching data
        loader.style.display = 'block';  // Ensure loader is visible after the delay
        const response = await fetch("https://student-food-be.onrender.com/api/dishes");
        console.log(response);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const dishes = await response.json();
        // Once data is fetched, hide loader and display dishes
        setTimeout(function () {
            loader.style.display = 'none';  // Hide the loader
        }, 3000);  // Delay of 3000ms (3 seconds)

        setTimeout(function () {
            displayDishes(dishes);
        }, 3000);  // Delay of 3000ms (3 seconds)
    } catch (error) {
        console.error('There was a problem fetching the dishes:', error);
        loader.style.display = 'none';  // Hide loader in case of error
    }
}
// Function to display dishes in the HTML
function displayDishes(dishes) {
    dishes?.forEach(dish => {
        const dishCard = document.createElement('div');
        dishCard.setAttribute('class', 'food-lists-container-content')
        // Image
        const dishImage = document.createElement('img');
        dishImage.src = dish.imageUrl; // Assuming the API provides an imageUrl field
        dishImage.alt = dish.title;
        dishImage.classList.add('dish-image');
        // Name
        const dishName = document.createElement('div');
        dishName.classList.add('dish-name');
        dishName.textContent = dish.title;
        // Description
        const dishDescription = document.createElement('div');
        dishDescription.classList.add('dish-description');
        dishDescription.textContent = dish.description;
        // Button
        const buyButton = document.createElement('button');
        buyButton.classList.add('buy-now');
        buyButton.textContent = 'Buy now';
        buyButton.onclick = () => alert(`You are buying ${dish.title}`);
        // Price
        const dishPrice = document.createElement('div');
        dishPrice.classList.add('dish-price');
        dishPrice.textContent = `$${dish.price}`;
        // Append elements to the card
        dishCard.appendChild(dishImage);
        dishCard.appendChild(dishName);
        dishCard.appendChild(dishDescription);
        dishCard.appendChild(dishPrice);
        dishCard.appendChild(buyButton);
        // for the styling
        let d = document.createElement('span')
        let q = document.createElement('span')
        dishCard.appendChild(d);
        dishCard.appendChild(q);
        d.appendChild(dishName)
        d.appendChild(dishPrice)
        d.classList.add("categoryPrice")
        q.appendChild(dishDescription)
        q.appendChild(buyButton)
        q.classList.add("descBuy")
        dishCard.addEventListener("click", ()=>openDetail(dish.slug.current))
        // dishesContainer.appendChild(dishCard);
        dishesContainer.appendChild(dishCard)
    }
    )
}
// // Fetch dishes on page load
window.onload = fetchDishes;