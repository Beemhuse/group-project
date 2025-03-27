const cartCountElement = document.getElementById('cart-count');
const cartIcon = document.querySelector('.fa-cart-shopping');


cartIcon.addEventListener('click',() => {
    window.location.href = "/pages/cartpage.html"; // direct to cartpage
})
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalItems = cart.length;
    cartCountElement.style.visibility = totalItems > 0 ? "visible" : "hidden";
    cartCountElement.innerText = totalItems;
}
updateCartCount();