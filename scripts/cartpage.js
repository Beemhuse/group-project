const addDishButton = document.getElementById("add-dish");
const removeDishButton = document.getElementById("remove-dish");
const dishQuantity = document.getElementById("quantity-value"); 
let a = 1;

function updateSubtotal(){
    let subtotal = document.getElementById("dish-subtotal");
    let price = document.getElementById("dish-price");
   
    let priceValue = parseFloat(price.textContent.replace("N", "").trim());
    subtotal.textContent = `N${priceValue * a}`;
}

addDishButton.addEventListener("click", () => {
    a++;
    a = (a < 10) ? "0" + a : a;
        dishQuantity.value = a;
updateSubtotal();
    
});

removeDishButton.addEventListener("click", () => {
    a--;
    a = (a < 1) ? 1 : a;
    dishQuantity.value = a;
    updateSubtotal();
});
