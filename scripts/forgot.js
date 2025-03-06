let sendCodeButton = document.getElementById("send-code-button")
let emailInput = document.querySelector("#email")
let emailErrorMesssge = document.querySelector(".email-error-message")




sendCodeButton.addEventListener("click",(e) => {
    e.preventDefault()
    if(emailInput.value.trim() === ""){
        emailErrorMesssge.style.display = "block"
        emailErrorMesssge.textContent = "Please enter your email"
    }
    else{
        emailErrorMesssge.style.display = "none"
    }
})