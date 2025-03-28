let toggleButton = document.querySelector(".hamburger")
const dropdownMenu = document.querySelector('.dropdown-menu')
const logoutBtn = document.getElementById("logoutLink")
const userIcon = document.querySelector('.user')
const logoutModal = document.getElementById("logoutModal");
const cancelLogout = document.getElementById("cancelLogout");
const confirmLogout = document.getElementById("confirmLogout");
const loginButton = document.querySelector('.log-in-button');
const signUpButtons = document.querySelectorAll('.sign-up-button');
const token = sessionStorage.getItem("token");


// Show dropdown
function showDropDown() {
    dropdownMenu.classList.toggle('showDropdown');
}

// Handle logout button click
logoutBtn.onclick = function () {
    logoutModal.style.visibility = "visible";
    dropdownMenu.style.transform = "scale(0)";  // Close dropdown when opening modal
};

// Cancel logout, close modal and dropdown
cancelLogout.onclick = function () {
    logoutModal.style.visibility = "hidden";
    closeDropDown();  // Ensure dropdown closes
};

// Confirm logout
confirmLogout.onclick = function () {
    sessionStorage.removeItem('token');  // Remove the token on logout
    location.reload(); // Reload page to reset UI
    logoutModal.style.display = "none";
    closeDropDown();  // Ensure dropdown closes after logout
};

// When clicking outside the modal, close the modal and dropdown
window.onclick = function (event) {
    if (event.target === logoutModal) {
        logoutModal.style.visibility = "hidden";
        closeDropDown();  // Close dropdown when clicking outside modal
    }
};

// Close dropdown
function closeDropDown() {
    dropdownMenu.style.transform = "scale(0)";  // Close the dropdown
}

// Toggle the hamburger menu
toggleButton.addEventListener("click", () => {
    show();  // Toggle hamburger menu
});

function show() {
    toggleButton.classList.toggle("open");
    document.querySelector(".header-nav").classList.toggle("active");
}

// Add event listeners to sign-up buttons
signUpButtons.forEach(button => {
    button.addEventListener("click", () => {
        window.location.href = "/pages/auth/signup.html";  // Redirect to the signup page
    });
});
loginButton.addEventListener('click', () => {
    window.location.href = "/pages/auth/login.html";  // Redirect to the login page
})
// Handle login button click (removed duplicate code)
if (token) {
    signUpButtons.forEach(button => {
        button.style.display = 'none';  // Hide sign-up buttons if logged in
    });
    if (loginButton) {
        loginButton.style.display = 'none';  // Hide login button if logged in
    }
    userIcon.style.display = 'flex';  // Show user icon if logged in
} else {
    userIcon.style.display = 'none';  // Hide user icon if not logged in
}

// Toggle dropdown when clicking on the user icon
userIcon.addEventListener('click', () => {
    showDropDown();  // Toggle dropdown when the user clicks the user icon
});

