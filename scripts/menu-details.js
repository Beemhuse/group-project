// get the elements from the DOM
const dishContainer = document.querySelector('.menu-details-container-content');
const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('slug');
const loginButton = document.querySelector('.log-in-button');
const cartCountElement = document.getElementById('cart-count');
let a = 1;

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
      incrementButton.addEventListener("click", () => {
          a++;
          a = (a < 10) ? "0" + a : a;
          quantityValue.value = a;
        })
        decrementButton.addEventListener("click", () => {
            if(a>1){
                a--;
                a = (a < 10) ? "0" + a : a;
            }
            if(a <= 1){
                a =  "0" + a;
            }

})
const orderButton = document.querySelector(".order")
    orderButton.addEventListener("click", handleAddToCart(dish, a))
}}
fetchDishProperties();

// function handleAddToCart (){

// }

// Function to add dish to the cart
//     function handleAddToCart(event) {
//         const dishId = myParam;
//         const quantity = quantityValueInput.value;
//         const dish = {
//              imageUrl: dishId.imageUrl,
//              id: dishId._id,
//              quantity: dishId.quantity,
//              price: dishId.price,
//              title: dishId.title,
//              size: dishId.size,
//              description: dishId.description,
//             };

            
//     // Retrieve the current cart from localStorage
//     let cart = JSON.parse(localStorage.getItem("cart")) || [];
//         // Check if dish is already in the cart
//     const existingDish = cart.find(item => item.id === dish._id);
//     if (existingDish > -1) {
//         // If the dish exists, increase its quantity
//         // cart[existingDish].quantity += quantity;
//             existingDish.quantity += parseInt(quantity);

//     }
//         // if (existingDish) {
//         //     existingDish.quantity += parseInt(quantity);
//         // }
        
//         else {
//             cart.push(dish);
//         }

//    // Save the updated cart back to localStorage
//    localStorage.setItem("cart", JSON.stringify(cart));    
//        updateCartCount();
//     }
function handleAddToCart(dish,a) {
    const dishId = myParam;  // This is the slug or ID, but it's not the full dish object!
    const quantity = a;
    console.log(quantity)
    // Fetch the full dish details from the API (already fetched in fetchDishProperties)
    // You should have a `dish` object already available here, so let's use it.
    const eachDish = {
        imageUrl: dish.imageUrl,  // Assuming `dish` contains the full data
        quantity: quantity,  // Get quantity from the input field
        price: dish.price,
        title: dish.title,
        description: dish.description,
    };

    // Retrieve the current cart from localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if the dish is already in the cart
    const existingDish = cart.find(item => item.id === dish._id);  // Compare by `id`

    if(existingDish){
        // If the dish exists, update its quantity
        existingDish.quantity = parseInt(quantity);
        localStorage.setItem("cart", JSON.stringify(cart)); 
        updateCartCount();
    }
    // if (existingDish) {
    //     // If the dish exists, update its quantity
    //     existingDish.quantity += parseInt(dish.quantity);
    // } else {
    //     // If not, add the new dish to the cart
    //     cart.push(dish);
    // }

    // Save the updated cart back to localStorage
    localStorage.setItem("cart", JSON.stringify(cart)); 

    // Update the cart count in the UI
}

    // Function to update the cart count in the header
    // function updateCartCount() {
    // const cart = JSON.parse(localStorage.getItem("cart")) || [];

    //     cartCountElement.textContent = cart.reduce((total, dish) => total + dish.quantity, 0);
    // }
    function updateCartCount() {
        // Retrieve the cart from localStorage
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        console.log(cart);
        
        // Calculate the total quantity of items in the cart
        const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    
        // Update the cart icon counter on the page
        cartCountElement.textContent = totalItems;
    }
    // updateCartCoun()
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
        // buyButton.onclick = () => alert(`You are buying ${dish.title}`);
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