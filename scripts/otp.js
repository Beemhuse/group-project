let otpErrorMessage = document.querySelector(".code-error-message")
let messageContainer = document.getElementById("message-container");
let messageText = document.getElementById("message");
let messageIcon = document.getElementById("message-icon");
// Import to baseUrl
import { baseUrl } from "./baseUrl.js";
// on document load
document.addEventListener("DOMContentLoaded", () => {
const otpInputs = document.querySelectorAll('input[type="text"]');
const otpForm = document.querySelector(".otp-password-form");
// const otpInput = document.getElementById("otp");
// Focus control between OTP inputs
otpInputs.forEach((input, index) => {
  input.addEventListener("input", () => {
    if (input.value.length === input.maxLength && index < otpInputs.length - 1) {
      otpInputs[index + 1].focus();
    } else if (input.value === "" && index > 0) {
      otpInputs[index - 1].focus();
    }
  });

  input.addEventListener("keydown", (event) => {
    if (event.key === "Backspace" && input.value === "" && index > 0) {
      otpInputs[index - 1].focus();
      otpInputs[index - 1].value = "";
    } else if (event.key === "Delete" && input.value === "" && index < otpInputs.length - 1) {
      otpInputs[index + 1].focus();
    }
  });
});


    // Form submission handler
    otpForm.addEventListener("submit", async (event) => {
      event.preventDefault(); // Prevent default form submission behavior        
    // Gather OTP values
    const otp = Array.from(otpInputs).map(input => input.value).join("");
    if (otp.length !== 6) {
        otpErrorMessage.innerHTML = "Please enter the six digit code sent to your email";
             // Make all the OTP input borders red if they're not filled correctly
             otpInputs.forEach(input => {
              if (input.value === "" || input.value.length !== 1) {
                  input.style.border = "1px solid red";
              } 
          });
        return;
      }
    const email = localStorage.getItem("email")
      const userData = {
        otp,
        email,
    };
    const otpButton = document.getElementById('send-button');
    const loader = document.getElementById('loader');
    const otpButtonText = document.getElementById('send-otp-button-text');
    // effect of the button, it's textcontent and the loader
    otpButton.disabled = true;
    loader.style.display = 'inline-block';
    otpButtonText.style.visibility = 'hidden';
    // try the baseurl
      try {
        // Call the API to verify OTP
        const response = await fetch(`${baseUrl}/api/verify-otp`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });
        const data = await response.json();
        // Handle API response
        if (response.ok) {
            // otpInput.style.border = "green";
          showMessage("Successful!", "success");
          setTimeout(() => {
            window.location.href = "/pages/auth/reset.html"; 
          }, 2000); 
          messageContainer.style.transition = 'right 3s ease-out';  // Smooth transition   
          } else {
            otpInputs.style.border = "red";
            showMessage("Wrong OTP", "error");
            otpButton.disabled = false;
            loader.style.display = 'none';
            otpButtonText.style.visibility = 'visible';
          }
        } catch (error) {
            console.error('Otp error:', error);
            showMessage("Wrong OTP", "error");
            otpButton.disabled = false;
            loader.style.display = 'none';
            otpButtonText.style.visibility = 'visible';
        }
   })
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

