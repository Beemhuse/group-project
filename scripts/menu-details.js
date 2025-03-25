// Get elements from the DOM
const dishContainer = document.querySelector('.menu-details-container-content');
const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('slug');
const loginButton = document.querySelector('.log-in-button');
const cartCountElement = document.getElementById('cart-count');
const cartIcon = document.querySelector('.fa-cart-shopping');
console.log(cartIcon);

// let a = 1;

loginButton.addEventListener("click", () => {
    window.location.href = "/pages/auth/login.html";  // Redirect to login page
});

async function fetchDishProperties() {
    try {
        const response = await fetch(`https://student-food-be.onrender.com/api/dishes/${myParam}`);
        if (response.ok) {
            console.log("response is okay");
            const dish = await response.json();
            displayDish(dish);
            console.log(dish);
        } else {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        console.error('There was a problem fetching the dishes:', error);
    }
}

function displayDish(dish) {
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

        // Check if the item already exists in the cart
        const existingItem = cart.find(item => item.slug === myParam);
        if (existingItem) {
            existingItem.quantity = parseInt(quantityValue.value, 10);
        } else {
            cart.push({
                slug: myParam,
                title: dish.title,
                price: dish.price,
                imageUrl: dish.imageUrl,
                quantity: parseInt(quantityValue.value, 10),
            });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
    });
}

// Function to update cart count
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    // let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    let totalItems = cart.length;
    cartCountElement.style.visibility = totalItems > 0 ? "visible" : "hidden";
    cartCountElement.innerText = totalItems;
}

// Function to update cart quantity in localStorage
function updateCartQuantity(slug, newQuantity) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let item = cart.find(item => item.slug === slug);
    if (item) {
        item.quantity = newQuantity;
        localStorage.setItem("cart", JSON.stringify(cart));
    }
    updateCartCount();
}
cartIcon.addEventListener('click',() => {
    window.location.href = "/pages/cartpage.html"; // direct to cartpage
})
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
        dishPrice.textContent = `$${dish.price}`;

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
