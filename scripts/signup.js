// Getting the elements
let password = document.getElementById("password");
let passwordIcon = document.getElementById("password-icon");
let messageContainer = document.getElementById("message-container");
let messageText = document.getElementById("message");
let messageIcon = document.getElementById("message-icon");
let usernameInput = document.querySelector("#username")
let emailInput = document.querySelector("#email")
let passwordInput = document.querySelector("#password")
const signUpForm = document.querySelector(".sign-up-form");
// Password view toggle
passwordIcon.onclick = (e) => {
    e.preventDefault();
    if (password.type === "password") {
        password.type = "text";
        passwordIcon.classList.remove("fa-eye-slash");
        passwordIcon.classList.add("fa-eye");
    } else {
        password.type = "password";
        passwordIcon.classList.remove("fa-eye");
        passwordIcon.classList.add("fa-eye-slash")++;
    }
};
// Importing the base URL for API requests
import { baseUrl } from "./baseUrl";
// Function to handle signup form submission
async function handleSignup(event) {
  event.preventDefault(); // Prevent form submission
  const name = usernameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  const signInButton = document.getElementById('create-account-button');
  const loader = document.getElementById('loader');
  const signInButtonText = document.getElementById('sign-in-button-text');
  // Disable the button and show the loader
  signInButton.disabled = true;
  loader.style.display = 'inline-block';
  signInButtonText.style.visibility = 'hidden';
  // User data to send in the request
  const userData = {
      name,
      email,
      password,
  };
    // try
    try {
        // Sending the signup request
        const response = await fetch(`${baseUrl}/api/signup`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });
        const result = await response.json();
        if (response.ok) {
            // Show success message and transition
            showMessage(`Welcome ${name}`, "success");
            setTimeout(() => {
              window.location.href = "/pages/auth/login.html"; // Redirect to login page
          }, 2000); 
        } else {
            // Show error message if the response isn't OK
            throw new Error(result.error || "Signup failed");
        }
    } catch (error) {
        showMessage("Sign up failed", "error");
        signInButton.disabled = false; // Re-enable the button
        loader.style.display = 'none';
        signInButtonText.style.visibility = 'visible';
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
signUpForm.addEventListener('submit', handleSignup);
