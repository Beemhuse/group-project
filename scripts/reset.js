// call in the messsage display
let messageContainer = document.getElementById("message-container");
let messageText = document.getElementById("message");
let messageIcon = document.getElementById("message-icon");
// On document load
document.addEventListener("DOMContentLoaded", () => {
    const resetPasswordForm = document.querySelector(".reset-form");
    const newPasswordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirm-password");
    // Form submission handler
    resetPasswordForm.addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    // Get value from the confirm password and your email from the local storage
    const newPassword = confirmPasswordInput.value;
    const email = localStorage.getItem("email")
    // Get the userData together
      const userData = {
      email,
      newPassword,
    };
    // call in the loader and the button
    const resetButton = document.getElementById('reset-button');
    const loader = document.getElementById('loader');
    const resetButtonText = document.getElementById('reset-button-text');
    // Loader anf button effect
    resetButton.disabled = true;
    loader.style.display = 'inline-block';
    resetButtonText.style.visibility = 'hidden';
    // try
        try {
            // Send POST request to the backend API to reset the password
            const response = await fetch('https://student-food-be.onrender.com/api/password-reset', {
                method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({...userData}),
            });
            const data = await response.json();
            if (response.ok) {
              // Show success message and transition
            showMessage("Password reset successful", "success");
            setTimeout(() => {
              window.location.href = "/pages/auth/login.html"; // Redirect to login page
          }, 2000); 
             localStorage.clear()
            } else {
            throw new Error(result.error || "Signup failed");
            }
          } catch (error) {
            console.error('Password change error:', error);
            showMessage("Password reset unsuccessful", "error");
            resetButton.disabled = false; // Re-enable the button
            loader.style.display = 'none';
            resetButtonText.style.visibility = 'visible';
          }
        });
})
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

