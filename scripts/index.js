const dishesContainer = document.querySelector('.best-seller-dishes-container-content-container');
const loader = document.getElementById('loader');
let loading = false;
    
async function fetchDishes() {
    try {
        // Show loader while fetching data
        loading = true
        loader.style.display = 'block';  // Ensure loader is visible after the delay
        const response = await fetch("https://student-food-be.onrender.com/api/dishes");
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const dishes = await response.json();

        loading = false
        loader.style.display = 'none';  // Hide the loader
        displayDishes(dishes);

    } catch (error) {
        console.error('There was a problem fetching the dishes:', error);
        loader.style.display = 'none';  // Hide loader in case of error
    }
}
// Function to display dishes in the HTML
function displayDishes(dishes) {
    dishes?.forEach(dish => {
        const formattedPrice = new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
          }).format(dish.price);
        const dishCard = document.createElement('div');
        dishCard.classList.add('best-seller-dishes-container-content');
        // Image
        const dishImage = document.createElement('img');
        dishImage.src = dish.imageUrl; // Assuming the API provides an imageUrl field
        dishImage.alt = dish.title;
        dishImage.classList.add('dish-image');
        // Title
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
        // Price
        const dishPrice = document.createElement('div');
        dishPrice.classList.add('dish-price');
        dishPrice.textContent = `${formattedPrice}`;
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
        dishCard.addEventListener("click", () => openDetail(dish.slug.current))
        dishesContainer.appendChild(dishCard)
    }
    )
}
// Fetch dishes on page load
window.onload = fetchDishes;
function openDetail(slug) {
    window.location.href = "/pages/menu-details.html?slug=" + slug
}