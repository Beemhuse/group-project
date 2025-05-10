// Getting the elements
let password = document.getElementById("password");
let passwordIcon = document.getElementById("password-icon");
let messageContainer = document.getElementById("message-container");
let messageText = document.getElementById("message");
let messageIcon = document.getElementById("message-icon");
let loginButton = document.getElementById("log-in-btn");
let loginForm = document.querySelector(".login-form")
const loader = document.getElementById('loader');
const btnText = document.getElementById('log-in-button-text');

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
async function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
     // Check if the form is valid
  if (!email ||!password) {
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
    loginButton.disabled = true; // Disable the login button
    loader.style.display = 'inline-block';
    btnText.style.visibility = 'hidden';
    // UserData
    const userData = {
        email,
        password,
    };
    try {
        const response = await fetch('https://student-food-be.onrender.com/api/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData), // Convert form data to JSON
        });
        const result = await response.json();
        console.log(result);
        
        if (response.ok) {
            sessionStorage.setItem("token", result.token); // Store token for authentication
            showMessage("Login successful!", "success");
            setTimeout(() => {
                window.location.href = "/index.html"; //  direct to dashboard
            }, 1200); 
            messageContainer.style.transition = 'right 3s ease-out';  // Smooth transition   
        } else {
            // Display the error message returned from the response
            showMessage(result.message || "Invalid credentials", "error"); // Use `result.message` if it's available
        }
    } catch (error) {
        // Display the error message in case of an exception
        showMessage(error.message || "Something went wrong", "error");
    } finally {
        loginButton.disabled = false; // Re-enable the login button
        loader.style.display = 'none';
        btnText.style.visibility = 'visible';
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
