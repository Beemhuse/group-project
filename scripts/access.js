let toggleButton = document.querySelector(".hamburger")
const dropdownMenu = document.querySelector('.dropdown-menu')
const logoutBtn = document.getElementById("logoutLink")
const userIcon = document.querySelector('.user')
const logoutModal = document.getElementById("logoutModal");
const cancelLogout = document.getElementById("cancelLogout");
const confirmLogout = document.getElementById("confirmLogout");
const loginButton = document.querySelector('.log-in-button');
const signUpButtons = document.querySelectorAll('.sign-up-button');
console.log(signUpButtons);

const user_icon = document.querySelector(".user-icon");
const token = sessionStorage.getItem("token");


logoutBtn.onclick = function () {
    logoutModal.style.visibility = "visible";
}
cancelLogout.onclick = function () {
    logoutModal.style.visibility = "hidden";
    closeDropDown()
}
confirmLogout.onclick = function () {
    sessionStorage.removeItem('token');  // Remove the token on logout
    location.reload(); // Reload the page to reset UI
    logoutModal.style.display = "none";
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
toggleButton.addEventListener("click", () => {
    show()
})

function show() {
    toggleButton.classList.toggle("open")
    document.querySelector(".header-nav").classList.toggle("active")
}
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
        button.style.display = 'none';
    });
    if (loginButton) {
        loginButton.style.display = 'none';
    }
    userIcon.style.display = 'flex' 
    userIcon.addEventListener("click", (event) => {
        dropdownMenu.classList.toggle('showDropdown')
    }); 
}
else{
    userIcon.style.display = 'none' 
}