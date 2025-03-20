// get the elements from the DOM
const decrementButton = document.querySelector(".minus-btn")
const incrementButton = document.querySelector(".plus-btn")
const quantityValue = document.querySelector(".quantity-value")
const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('slug');
console.log(myParam)
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
