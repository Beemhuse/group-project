let subTotal = localStorage.getItem('subtotal')
let subTotalValue = document.getElementById("total-value")
const placeHolderPage = document.getElementById("placeholder-page")
const dateValue = document.getElementById("date-value")
placeHolderPage.addEventListener('click', ()=> {
  window.location.href ='/pages/placeorder.html'
})
let formattedPrice = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(subTotal);
  subTotalValue.textContent = formattedPrice;
  const today = new Date();
  const month = today.toLocaleString('default', { month: 'long' });
  const day = today.getDate(); 
  const year = today.getFullYear();
  const formattedDate = `${month} ${day}, ${year}`;
  dateValue.textContent = formattedDate

  