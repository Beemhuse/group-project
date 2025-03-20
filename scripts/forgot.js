// Call in the base url 
import { baseUrl } from "./baseurl.js"; 
    let messageContainer = document.getElementById("message-container");
    let messageText = document.getElementById("message");
    let messageIcon = document.getElementById("message-icon");
// Call in the form container
const forgotPasswordForm = document.querySelector(".forgot-password-form");
forgotPasswordForm.addEventListener('submit', function(event) {    
    event.preventDefault(); // prevent page reload
    // Call in the email input, the loader, the send code button, and its text
    let emailInputValue = document.querySelector("#email").value.trim();
    const sendOtpButton = document.getElementById('send-otp-btn');
    const loader = document.getElementById('loader');
    const btnText = document.getElementById('send-code-button-text');
    let emailRegexErrorMessage = document.getElementById("forgot-password-introduction")
    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(emailInputValue)) {
        emailRegexErrorMessage.textContent = "Please enter a valid email address";
        emailRegexErrorMessage.style.color = "red"
        return;
    }
    // Disable the button, show loader, and hide button text while waiting
    sendOtpButton.disabled = true;
    loader.style.display = 'inline-block';
    btnText.style.visibility = 'hidden';
    // Fetch the endpoint and send the OTP request
    fetch(`${baseUrl}/api/forgot-password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: emailInputValue })
    })
    .then(response => response.json())
    .then(data => {
        const message = data.message;  // Get the message from the response
        console.log('Response data:', data);  // Log the full response data

        // Simulate OTP sending process based on the message
        if (message && message.toLowerCase().includes('password reset otp sent')) {
            showMessage("Otp sent successful", "success");
            setTimeout(() => {
              window.location.href = "/pages/auth/otp.html"; // Redirect to otp page
          }, 2000); 
        } else {
            console.log('OTP send failed! Message: ' + message);  
        }
    })
    .catch(error => {
        // Handle network or server errors
        console.log('Network or server error:', error);
        showMessage("Otp sent unsuccessful", "error");
        sendOtpButton.disabled = false;
        loader.style.display = 'none';
        btnText.style.visibility = 'visible';
    });
});
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
