let passsword =  document.getElementById("password")
let confirmPassword = document.getElementById("confirm-password")
let passwordIcon = document.getElementById("password-icon")
let confirmPasswordIcon = document.getElementById("confirm-password-icon")

console.log(password);
console.log(passwordIcon);

console.log(confirmPassword);
console.log(confirmPasswordIcon);



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
confirmPasswordIcon.onclick = () => {
    if(confirmPassword.type === "password")
    {
        confirmPassword.type = "text";
        confirmPasswordIcon.classList.remove("fa-eye-slash")
        confirmPasswordIcon.classList.add("fa-eye")
    }
    else{
        confirmPassword.type = "password";
        confirmPasswordIcon.classList.remove("fa-eye")
        confirmPasswordIcon.classList.add("fa-eye-slash")

    }
}