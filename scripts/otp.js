let otpErrorMessage = document.querySelector(".code-error-message");
let messageContainer = document.getElementById("message-container");
let messageText = document.getElementById("message");
let messageIcon = document.getElementById("message-icon");
let otpButton = document.getElementById('send-button')
console.log(otpButton);


// on document load
document.addEventListener("DOMContentLoaded", (e) => {
  e.preventDefault()
  // Select all OTP input elements
  const otpInputs = document.querySelectorAll('input[type="text"]');
  const loader = document.getElementById('loader');
  const otpButtonText = document.getElementById('send-otp-button-text');

  // Add event listeners to each input field for input handling
  otpInputs.forEach((input, index) => {
    input.addEventListener('input', () => {
      // Move to the next input after entering a digit
      if (input.value.length === 1 && index < otpInputs.length - 1) {
        otpInputs[index + 1].focus();
      }
      checkOTP(otpInputs, loader, otpButtonText);  // Check if the OTP is fully filled and trigger action
    });

    // Move focus back on backspace
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && index > 0 && input.value === '') {
        otpInputs[index - 1].focus();
      }
    });
  });

  // Function to check if all OTP inputs are filled and automatically trigger OTP submission
  function checkOTP(otpInputs, loader, otpButtonText) {
    const otp = Array.from(otpInputs).map(input => input.value).join('');
    if (otp.length === 6) {
      // OTP is fully filled, trigger the action
    otpButton.disabled = otp.length == 6;  // Disable button if not all inputs are filled

      sendOTP(otp, loader, otpButtonText);  // Replace with your actual function to send the OTP
    }
  }

  // Your custom function to handle OTP submission automatically
  async function sendOTP(otp, loader, otpButtonText) {
    const email = localStorage.getItem("email");
    console.log(email);  // You can remove this in production

    const userData = {
      otp,
      email,
    };

    // Disable the button, show loader, and hide button text while waiting
    otpButtonText.style.visibility = 'hidden';
    loader.style.display = 'inline-block';

    try {
      // Call the API to verify OTP
      const response = await fetch('https://student-food-be.onrender.com/api/verify-otp', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      
      if (response.ok) {
        showMessage("OTP verification successful!", "success");
        setTimeout(() => {
          window.location.href = "/pages/auth/reset.html";  // Redirect to reset page
        }, 2000);
      } else {
        showMessage("Wrong OTP, please try again.", "error");
        loader.style.display = 'none';
        otpButtonText.style.visibility = 'visible';
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      showMessage("Something went wrong. Please try again later.", "error");
      loader.style.display = 'none';
      otpButtonText.style.visibility = 'visible';
    }
  }

  // Show the slide-in message
  function showMessage(message, type) {
    messageText.textContent = message;
    messageContainer.classList.remove('hidden');
    messageContainer.classList.add('show');
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
});