const addDishButton = document.getElementById("add-dish");
const removeDishButton = document.getElementById("remove-dish");
const dishQuantity = document.getElementById("quantity-value");
let price = document.getElementById("dish-price");
let dishImage = document.getElementById("dish-image");
let dishTitle = document.getElementById("dish-title");
let returnButton = document.getElementById("shop-btn");
let checkoutButton = document.getElementById("checkout-btn");
let a = 1;

returnButton.addEventListener("click", () => {
  window.location.href = "../pages/menu-details.html";
});
  checkoutButton.addEventListener("click", () => {
    window.location.href = "../pages/placeorder.html";
  });



document.addEventListener("DOMContentLoaded", () => {
  let cartDish = JSON.parse(localStorage.getItem("cart")) || [];
  let cartContainer = document.getElementById("orders");

  // Clear the container before adding items (to prevent duplication)
  cartContainer.innerHTML = "";

  if (cartDish.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  cartDish.forEach((dish, index) => {
    let dishElement = document.createElement("div");
    dishElement.classList.add("orders");

    const formattedPrice = new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(dish.price);
    
    const formattedSubtotal = new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(dish.price * dish.quantity);

    dishElement.innerHTML = `
              <div class="dishes-title">
              <button class="remove-btn" data-index="${index}"> <i class="fa-solid fa-trash"></i></button>
                      <img src="${dish.imageUrl}" alt="${dish.title }" class="dish-image" >
                    <p class="cart-title">${dish.title}</p>
                </div>
                <div class="dish-price">
                   <p class="cart-price">${formattedPrice}</p>
                </div>
                <div id="add-more-dishes">
                    <div class="remove-dish"> <i class="fa-solid fa-minus"></i></div>
                    <input type="text" value="${
                      dish.quantity
                    }" min="1" class="cart-quantity" data-index="${index}" id="quantity-value">
                    <div class="add-dish"><i class="fa-solid fa-plus"></i></div>
                </div>
                <div id="dish-subtotal">
                     <p class="cart-subtotal">${
                      formattedSubtotal
                     }</p>
                </div>
                
                
        `;

    cartContainer.appendChild(dishElement);
  });

  // Attach event listeners for quantity update and remove button
  updateCartListeners();
  updateSubtotal();
});

function updateCartListeners() {
  document.querySelectorAll(".cart-quantity").forEach((input) => {
    input.addEventListener("change", updateQuantity);
  });

  document.querySelectorAll(".remove-btn").forEach((button) => {
    button.addEventListener("click", removeItem);
  });
}

// Update quantity and subtotal when user changes input value
function updateQuantity(event) {
  let cartDish = JSON.parse(localStorage.getItem("cart")) || [];
  let index = event.target.getAttribute("data-index");
  let newQuantity = parseInt(event.target.value);

  if (newQuantity < 1) newQuantity = 1;

  cartDish[index].quantity = newQuantity;
  localStorage.setItem("cart", JSON.stringify(cartDish));

  // Refresh the cart display
  document.dispatchEvent(new Event("DOMContentLoaded"));
}
 
 

function updateSubtotal(event) {
    function updateSubtotal() {
        let cartDish = JSON.parse(localStorage.getItem("cart")) || [];
        let cartItems = document.querySelectorAll(".orders");
    
        cartItems.forEach((item, index) => {
            let price = item.querySelector(".cart-price").textContent.replace("N", "").trim();
            let quantity = item.querySelector(".cart-quantity").value;
            let subtotal = item.querySelector(".cart-subtotal");
    
            let priceValue = parseFloat(price);
            let quantityValue = parseInt(quantity);
    
            subtotal.textContent = `N${(priceValue * quantityValue).toFixed(2)}`;
        });
    }
    
  }

  document.addEventListener("click", (event) => {
    let cartDish = JSON.parse(localStorage.getItem("cart")) || [];

    if (event.target.closest(".add-dish")) {
        let index = event.target.closest(".add-dish").parentElement.querySelector(".cart-quantity").getAttribute("data-index");
        cartDish[index].quantity++;
    }

    if (event.target.closest(".remove-dish")) {
        let index = event.target.closest(".remove-dish").parentElement.querySelector(".cart-quantity").getAttribute("data-index");
        cartDish[index].quantity = Math.max(1, cartDish[index].quantity - 1);
    }

    localStorage.setItem("cart", JSON.stringify(cartDish));
    document.dispatchEvent(new Event("DOMContentLoaded"));
});

function sumSubtotal() {
  let cart = JSON.parse(localStorage.getItem("cart")) || []; // Retrieve cart data
  let summedSubtotal = document.getElementById("subtotalgap");
  let sumTotal = document.getElementById("total");

  if (!summedSubtotal) {
    console.error("Element with id 'subtotal' not found.");
    return;
  }

  let subtotal = cart.reduce((total, dish) => total + (dish.price * dish.quantity), 0);
  let formattedSubtotal = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(subtotal);

  summedSubtotal.textContent = formattedSubtotal;
  sumTotal.textContent = formattedSubtotal; 
}

// Call the function to update subtotal on page load
document.addEventListener("DOMContentLoaded", sumSubtotal);

document.addEventListener("change", (event) => {
  if (event.target.classList.contains("cart-quantity")) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let index = event.target.getAttribute("data-index");
    let newQuantity = parseInt(event.target.value);

    cart[index].quantity = newQuantity < 1 ? 1 : newQuantity; // Prevents negative values

    localStorage.setItem("cart", JSON.stringify(cart)); // Save back to storage
    sumSubtotal(); // Update subtotal display
  }
});

function removeItem(event) {
  let cartDish = JSON.parse(localStorage.getItem("cart")) || [];
  let removeButton = event.target.closest(".remove-btn");

  if (!removeButton)  {
    console.log(error)
  }

  let index = Number(removeButton.getAttribute("data-index")); // Get the correct index
  const modalmessage = document.getElementById("modal");
  console.log(modalmessage)
  const modal = document.createElement('div');
  modal.classList.add('delete-modal'); // Ensure this class has visible CSS
  modal.innerHTML = modalmessage.innerHTML;
  modal.style.display = "block"; // Ensure this class has visible CSS
  document.body.appendChild(modal);
  let confirm = document.querySelector(".confirm-button")
  let cancel = document.querySelector(".cancel-button")

  confirm.addEventListener('click', () => {
    console.log("confirmed")
    modal.remove();
    cartDish.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cartDish));
    document.dispatchEvent(new Event("DOMContentLoaded"));
  })
  cancel.addEventListener('click', () => {
    console.log("cancelled")
    modal.remove();
  })

}

document.addEventListener("click", (event) => {
  if (event.target.closest(".remove-btn")) {
    removeItem(event);
  }
});


 