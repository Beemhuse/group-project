let codeRequestButton = document.getElementById("send-button")
let codeInput = document.querySelector("#number")
let codeInputMesssge = document.querySelector(".code-error-message")




codeRequestButton.addEventListener("click",(e) => {
    e.preventDefault()
    if(codeInput.value.trim() === ""){
        codeInputMesssge.style.display = "block"
        codeInputMesssge.textContent = "Please enter the six digit pin sent to your email"
    }
    else{
        codeInputMesssge.style.display = "none"
    }
})