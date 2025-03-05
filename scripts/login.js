let passsword =  document.getElementById("password")
let confirmPassword = document.getElementById("confirm-password")
let passwordIcon = document.getElementById("password-icon")




passwordIcon.onclick = (e) => {
    e.preventDefault()
    if(password.type === "password")
    {
        password.type = "text";
        passwordIcon.classList.remove("fa-eye-slash")
        passwordIcon.classList.add("fa-eye")
    }
    else{
        password.type = "password";
        passwordIcon.classList.remove("fa-eye")
        passwordIcon.classList.add("fa-eye-slash")
    }
}
let loginButton = document.getElementById("log-in-button")
let emailInput = document.querySelector("#email")
let passwordInput = document.querySelector("#password")
let emailErrorMesssge = document.querySelector(".email-error-message")
let passwordErrorMesssge = document.querySelector(".password-error-message")




loginButton.addEventListener("click",(e) => {
    e.preventDefault()
    if(emailInput.value.trim() === ""){
        emailErrorMesssge.style.display = "block"
        emailErrorMesssge.textContent = "This field is required"
    }
    else{
        emailErrorMesssge.style.display = "none"
    }
    if(passwordInput.value.trim() === ""){
        passwordErrorMesssge.style.display = "block"
        passwordErrorMesssge.textContent = "This field is required"
    }
    else{
        passwordErrorMesssge.style.display = "none"
    }
})


