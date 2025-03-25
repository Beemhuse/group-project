//    for the hamburger
let toggleButton = document.querySelector(".hamburger")

toggleButton.addEventListener("click", () => {
    show()
})

function show() {
    toggleButton.classList.toggle("open")
    document.querySelector(".header-nav").classList.toggle("active")


}




const token = sessionStorage.getItem("token");
// Get all elements with the class 'log-in-button'
// Select the login and sign-up buttons
const loginButton = document.querySelector('.log-in-button');
const signUpButtons = document.querySelectorAll('.sign-up-button');

// Add event listeners to the login buttons
signUpButtons.forEach(button => {
    button.addEventListener("click", () => {
        window.location.href = "/pages/auth/signup.html";  // Redirect to the login page
    });
});

// Add event listener to the sign-up button
if (loginButton) {
    loginButton.addEventListener("click", () => {
        window.location.href = "/pages/auth/login.html";  // Redirect to the signup page
    });
}


if (token) {
    signUpButtons.forEach(button => {
        button.style.display = 'none'; // Hide the sign-up button
    });
    // If the user is logged in, hide login button and show user icon
    if (loginButton) {
        loginButton.style.display = 'none'; // Hide the login button
    }



    const header = document.querySelector(".header-left-content")
    // Create the userIcon dynamically
    const userIcon = document.createElement('div');
    userIcon.setAttribute("class", "user-icon")
    // element.setAttribute("id", "newId");
    userIcon.innerHTML = `
                <i class="fa-solid fa-user" style="color: #fff;"></i>        
        `
    userIcon.classList.add('user')
    header.appendChild(userIcon)
    const dropdownMenu = document.getElementById("dropdownMenu");
    dropdownMenu.style.transform = "scale(0)"

    // // Toggle dropdown menu when user icon is clicked
    userIcon.addEventListener("click", (event) => {
        // Prevent the click event from bubbling up to the document
        event.stopPropagation();
        const isVisible = dropdownMenu.style.transform === "scale(0)";
        dropdownMenu.style.transform = isVisible ? "scale(1)" : "scale(0)";
    });
    // // Add logout functionality
    // Get the logout modal and the buttons
    const logoutBtn = document.getElementById("logoutLink")
    const logoutModal = document.getElementById("logoutModal");
    const cancelLogout = document.getElementById("cancelLogout");
    const confirmLogout = document.getElementById("confirmLogout");

    // When the user clicks the logout button, open the modal
    logoutBtn.onclick = function () {
        logoutModal.style.visibility = "visible";
    }
    // When the user clicks the cancel button, close the modal
    cancelLogout.onclick = function () {
        logoutModal.style.visibility = "hidden";
        closeDropDown()
    }

    // When the user clicks the confirm button, log the user out (or add your logout logic here)
    confirmLogout.onclick = function () {
        // Here you can add your actual logout logic, like redirecting the user or clearing session storage
        sessionStorage.removeItem('token');  // Remove the token on logout
        location.reload(); // Reload the page to reset UI
        // logoutModal.style.display = "none";
    }
    // When the user clicks anywhere outside the modal, close it
    window.onclick = function (event) {
        if (event.target === logoutModal) {
            logoutModal.style.visibility = "hidden";
            closeDropDown()
        }
    }
 function closeDropDown(){
     dropdownMenu.style.transform = "scale(0)"
 }
    // const logoutButton = document.getElementById('logout-btn');
    // logoutButton.addEventListener('click', () => {
    //     sessionStorage.removeItem('token');  // Remove the token on logout
    //     location.reload(); // Reload the page to reset UI
    // });
}

// for the dropdown
// document.addEventListener("DOMContentLoaded", () => {
const user_icon = document.querySelector(".user-icon");
// console.log(user_icon)


// // Close dropdown when clicking outside the user icon or menu
// document.addEventListener("click", (event) => {
//   if (!user_icon.contains(event.target) && !dropdownMenu.contains(event.target)) {
//     dropdownMenu.style.display = "none";
//   }
// });



// import the baseUrl from baseUrl.js
// import { baseUrl } from "./scripts/baseUrl.js";
// call in the dishesContainer
const dishesContainer = document.querySelector('.best-seller-dishes-container-content-container');
// call in the loader
const loader = document.getElementById('loader');
// import the baseUrl from baseurl.js
// Function to fetch dishes and display them
let loading = false
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
        const dishCard = document.createElement('div');
        dishCard.classList.add('best-seller-dishes-container-content');
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
        dishCard.addEventListener("click", () => openDetail(dish.slug.current))
        // dishesContainer.appendChild(dishCard);
        dishesContainer.appendChild(dishCard)
    }
    )
}
// Fetch dishes on page load
window.onload = fetchDishes;
function openDetail(slug) {
    window.location.href = "/pages/menu-details.html?slug=" + slug
}