// Getting the elements
let password = document.getElementById("password");
let passwordIcon = document.getElementById("password-icon");
let messageContainer = document.getElementById("message-container");
let messageText = document.getElementById("message");
let messageIcon = document.getElementById("message-icon");
let loginButton = document.getElementById("log-in-btn");
let emailInput = document.getElementById("email");
let passwordInput = document.getElementById("password");
let loginForm = document.querySelector(".login-form")
const loader = document.getElementById('loader');
const btnText = document.getElementById('log-in-button-text');
// Password view
passwordIcon.onclick = (e) => {
    e.preventDefault();
    if (password.type === "password") {
        password.type = "text";
        passwordIcon.classList.remove("fa-eye-slash");
        passwordIcon.classList.add("fa-eye");
    } else {
        password.type = "password";
        passwordIcon.classList.remove("fa-eye");
        passwordIcon.classList.add("fa-eye-slash");
    }
};
// Consume the API
import { baseUrl } from "./baseUrl.js"; // importing the baseUrl from baseurl.js
// Function to handle login form submission
async function handleLogin(event) {
    event.preventDefault();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    loginButton.disabled = true; // Disable the login button
    loader.style.display = 'inline-block';
    btnText.style.visibility = 'hidden';
    // UserData
    const userData = {
        email,
        password,
    };
    try {
        const response = await fetch(`${baseUrl}/api/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData), // Convert form data to JSON
        });
        const result = await response.json();
        if (response.ok) {
            sessionStorage.setItem("token", result.token); // Store token for authentication
            showMessage("Login successful!", "success");
            setTimeout(() => {
                window.location.href = "/index.html"; // Redirect to dashboard
            }, 1200); 
            messageContainer.style.transition = 'right 3s ease-out';  // Smooth transition   
        } else {
            throw new Error(result.error || "Login failed");
        }
    } catch (error) {
        showMessage("Login failed", "error");
        loginButton.disabled = false; // Disable the login button
        loader.style.display = 'none';
        btnText.style.visibility = 'visible';
    } finally {
        loginButton.disabled = false; // Re-enable the login button
    }
}
// Show the slide-in message
function showMessage(message, type) {
    messageText.textContent = message;
    messageContainer.classList.remove('hidden');
    messageContainer.classList.add('show'); // Add the success or error class
    messageIcon.className = `fas ${type === 'success' ? 'fa-check-circle' : 'fa-circle-exclamation'}`;
    messageIcon.style.color = type === 'success' ? '#219653' : '#f41010'; // Green for success, red for error
    // Hide the message after 3 seconds
    setTimeout(() => {
        messageContainer.classList.remove('show');
        setTimeout(() => {
            messageContainer.classList.add('hidden');
        }, 1000);
    }, 3000);
}
// Attach event listener for form submission
loginForm.addEventListener('submit', handleLogin);
