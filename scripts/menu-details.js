// get the elements from the DOM
const dishContainer = document.querySelector('.menu-details-container-content');
const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('slug');
const loginButton = document.querySelector('.log-in-button');
const cartCountElement = document.getElementById('cart-count');

loginButton.addEventListener("click", () => {
    window.location.href = "/pages/auth/login.html";  // Redirect to login page
  });
async function fetchDishProperties() {
   try {
       const response = await fetch(`https://student-food-be.onrender.com/api/dishes/${myParam}`);       
       if(response.ok){
         console.log("response is okay")
         const dish = await response.json();
         displayDish(dish);

         console.log(dish)
       }else{
           throw new Error('Network response was not ok');
       } 
      } catch (error) {
       console.error('There was a problem fetching the dishes:', error);
   }
function displayDish(dish) {
      const pageLeft = document.createElement('div')
      pageLeft.setAttribute('class', 'menu-details-container-left-content')
      pageLeft.innerHTML = `
        <img src="${dish.imageUrl}" class="food-image" alt="${dish.title}">
        `
      const pageRight = document.createElement('div')
      pageRight.setAttribute('class', 'menu-details-container-right-content')
      pageRight.innerHTML = `
                        <div class="">
                            <h2 id="food-name">${dish.title}</h2>
                            <p id="food-about">${dish.description}</p>
                            <button class="size">Serving size: ${dish.size}</button>
                        </div>
                        <span id="food-price">
                            <i class="fa-solid fa-naira-sign" style="color: #616161;"></i>
                            <p id="price">${dish.price}</p>
                        </span>
                        <div class="quantity">
                            <span class="quantity-content">
                                <div class="sub-number number">
                                    <button class="minus-btn" type="button">
                                        <i class="fa-solid fa-minus"></i>
                                    </button>
                                </div>
                                <input class="quantity-value" type="text" value="01" id="number-of-plates">
                                <div class="add-number number">
                                    <button class="plus-btn" type="button">
                                        <i class="fa-solid fa-plus"></i>
                                    </button>
                                </div>
                                <button type="submit" class="order">Order</button>
                            </span>
                        </div>
      `
      dishContainer.appendChild(pageLeft);
      dishContainer.appendChild(pageRight);
      const decrementButton = document.querySelector(".sub-number")
      const incrementButton = document.querySelector(".add-number")
      const quantityValue = document.querySelector(".quantity-value") 
      let a = 1;
      incrementButton.addEventListener("click", () => {
          a++;
          a = (a < 10) ? "0" + a : a;
          quantityValue.value = a;
        })
        decrementButton.addEventListener("click", () => {
            if(a>1){
                a--;
                a = (a < 10) ? "0" + a : a;
   quantityValue.value = a;
}
if(a <= 1){
    a =  "0" + a;
}
})
const orderButton = document.querySelector(".order")
    orderButton.addEventListener("click", () => {
    cartCountElement.style.visibility = "visible"
     cartCountElement.innerText = quantityValue.value
    
})
}}
fetchDishProperties();
// import the baseUrl from baseUrl.js
// import { baseUrl } from "./baseUrl";
const dishesContainer = document.querySelector('.food-lists-container-content-container');
async function fetchDishes() {
    try {
        const response = await fetch("https://student-food-be.onrender.com/api/dishes");      
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const dishes = await response.json();
            displayDishes(dishes);
    } catch (error) {
        console.error('There was a problem fetching the dishes:', error);
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
function openDetail(slug){
   window.location.href = "menu-details.html?slug=" + slug
}