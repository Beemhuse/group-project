// Getting the elements
const signInButton = document.getElementById('create-account-button');
const loader = document.getElementById('loader');
const signInButtonText = document.getElementById('sign-in-button-text');
let password = document.getElementById("password");
let passwordIcon = document.getElementById("password-icon");
let messageContainer = document.getElementById("message-container");
let messageText = document.getElementById("message");
let messageIcon = document.getElementById("message-icon");
const signUpForm = document.querySelector(".sign-up-form");
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
 
// Function to handle signup form submission
async function handleSignup(event) {
  event.preventDefault(); // Prevent form submission
  const name = document.querySelector("#username").value.trim();
  const email = document.querySelector("#email").value.trim();
  const password = document.querySelector("#password").value.trim();
  
  signInButton.disabled = true;
  loader.style.display = 'inline-block';
  signInButtonText.style.visibility = 'hidden';
 // Check if the form is valid
  if (!name ||!email ||!password) {
    showMessage("Please fill in all fields", "error");
    signInButton.disabled = false; // Re-enable the button
    loader.style.display = 'none';
    signInButtonText.style.visibility = 'visible';
    return;
  }
  // Validate the email format

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    showMessage("Please enter a valid email address", "error");
    signInButton.disabled = false; // Re-enable the button
    loader.style.display = 'none';
    signInButtonText.style.visibility = 'visible';
    return;
  }
  // Validate the password length
  if (password.length < 8) {
    showMessage("Password must be at least 8 characters long", "error");
    signInButton.disabled = false; // Re-enable the button
    loader.style.display = 'none';
    signInButtonText.style.visibility = 'visible';
    return;
  }
  const userData = {
      name,
      email,
      password,
  };
    // try
    try {
        // Sending the signup request
        const response = await fetch("https://student-food-be.onrender.com/api/signup", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });
        const result = await response.json();
        // Log the result for debugging purposes
        console.log(result)        
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
