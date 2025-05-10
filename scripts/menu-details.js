let messageContainer = document.getElementById("message-container");
let messageText = document.getElementById("message");
let messageIcon = document.getElementById("message-icon");
const dishContainer = document.querySelector('.menu-details-container-content');
const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('slug');

async function fetchDishProperties() {
    try {
        const response = await fetch(`https://student-food-be.onrender.com/api/dishes/${myParam}`);
        if (response.ok) {
            const dish = await response.json();
            displayDish(dish);
        } else {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        console.error('There was a problem fetching the dishes:', error);
    }
}

function displayDish(dish) {
    const formattedPrice = new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
      }).format(dish.price);
    const pageLeft = document.createElement('div');
    pageLeft.setAttribute('class', 'menu-details-container-left-content');
    pageLeft.innerHTML = `<img src="${dish.imageUrl}" class="food-image" alt="${dish.title}">`;

    const pageRight = document.createElement('div');
    pageRight.setAttribute('class', 'menu-details-container-right-content');
    pageRight.innerHTML = `
        <div class="">
            <h2 id="food-name">${dish.title}</h2>
            <p id="food-about">${dish.description}</p>
            <button class="size">Serving size: ${dish.size}</button>
        </div>
        <span id="food-price">
            <p id="price">${formattedPrice}</p>
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
    `;

    dishContainer.appendChild(pageLeft);
    dishContainer.appendChild(pageRight);
    const decrementButton = document.querySelector(".sub-number");
    const incrementButton = document.querySelector(".add-number");
    const quantityValue = document.querySelector(".quantity-value");
    const orderButton = document.querySelector(".order");
    let a = 1;
    incrementButton.addEventListener("click", () => {
        a++;
        a = (a < 10) ? "0" + a : a;
        quantityValue.value = a;
        updateCartQuantity(myParam, parseInt(a, 10));
    });
    decrementButton.addEventListener("click", () => {
        if (a > 1) {
            a--;
            a = (a < 10) ? "0" + a : a;
            quantityValue.value = a;
            updateCartQuantity(myParam, parseInt(a, 10));
        }
    });
    orderButton.addEventListener("click", () => {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingItem = cart.find(item => item.slug === myParam);
        try {
            const newQuantity = parseInt(quantityValue.value, 10); // Get the new quantity from the input
            
    
            if (existingItem) {
                // If the item already exists in the cart, check if the quantity is different
                const previousQuantity = existingItem.quantity;
    
                if (previousQuantity !== newQuantity) {
                    // Update the quantity if it is different
                    existingItem.quantity = newQuantity;
                    localStorage.setItem("cart", JSON.stringify(cart));
                    updateCartCount(); // Update the cart count
    
                    // Show success message indicating the item quantity was updated
                    showMessage(`${dish.title} quantity updated`, "success");
                } else {
                    // Show a message saying the item is already in the cart
                    showMessage(`${dish.title} is already in your cart`, "info");
                }
            } else {
                // If the item is not already in the cart, add it
                cart.push({
                    slug: myParam,
                    title: dish.title,
                    price: dish.price,
                    imageUrl: dish.imageUrl,
                    quantity: newQuantity,
                });
                localStorage.setItem("cart", JSON.stringify(cart));
                updateCartCount(); // Update the cart count
    
                // Show success message for adding to the cart
                showMessage(`${dish.title} successfully added to cart`, "success");
            }
        } catch (error) {
            // Show error message if there's an issue adding to the cart
            showMessage('Failed to add to cart', "error");
            console.error("Error adding to cart:", error);
        }
    });
    
    
    
}
function updateCartQuantity(slug, newQuantity) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let item = cart.find(item => item.slug === slug);
    if (item) {
        item.quantity = newQuantity;
        localStorage.setItem("cart", JSON.stringify(cart));
    }
    updateCartCount();
}
// Fetch dishes for menu list
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
// Function to display dishes in the menu list
function displayDishes(dishes) {
    dishes?.forEach(dish => {
        const formattedPrice = new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
          }).format(dish.price);
        const dishCard = document.createElement('div');
        dishCard.setAttribute('class', 'food-lists-container-content');

        const dishImage = document.createElement('img');
        dishImage.src = dish.imageUrl;
        dishImage.alt = dish.title;
        dishImage.classList.add('dish-image');

        const dishName = document.createElement('div');
        dishName.classList.add('dish-name');
        dishName.textContent = dish.title;

        const dishDescription = document.createElement('div');
        dishDescription.classList.add('dish-description');
        dishDescription.textContent = dish.description;

        const buyButton = document.createElement('button');
        buyButton.classList.add('buy-now');
        buyButton.textContent = 'Buy now';
        buyButton.onclick = () => openDetail(dish.slug.current);

        const dishPrice = document.createElement('div');
        dishPrice.classList.add('dish-price');
        dishPrice.textContent = `${formattedPrice}`;

        let d = document.createElement('span');
        let q = document.createElement('span');

        d.appendChild(dishName);
        d.appendChild(dishPrice);
        d.classList.add("categoryPrice");

        q.appendChild(dishDescription);
        q.appendChild(buyButton);
        q.classList.add("descBuy");

        dishCard.appendChild(dishImage);
        dishCard.appendChild(d);
        dishCard.appendChild(q);
        dishCard.addEventListener("click", () => openDetail(dish.slug.current));

        dishesContainer.appendChild(dishCard);
    });
}

// Open menu details page
function openDetail(slug) {
    window.location.href = "menu-details.html?slug=" + slug;
}

// Fetch dishes on page load
window.onload = () => {
    fetchDishes();
    fetchDishProperties();
    updateCartCount();
};


function showMessage(message, type) {
    messageText.textContent = message;
    messageContainer.classList.remove('hidden');
    messageContainer.classList.add('show'); // Add the success or error class
    messageIcon.className = `fas ${type === 'success' ? 'fa-check-circle' : 'fa-circle-exclamation'}`;
    messageIcon.style.color = type === 'success' ? '#219653' : '#f41010'; // Green for success, red for error
    // Hide the message after 3 seconds
    setTimeout(() => {
        messageContainer.classList.remove('show');
        setTimeout(() => {
            messageContainer.classList.add('hidden');
        }, 1000);
    }, 3000);
}
