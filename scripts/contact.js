 

// Fetching the data from the API
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("input-fields");

  async function submitMessage(event) {
    event.preventDefault();

    try {
      const response = await fetch(`https://student-food-be.onrender.com/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: document.getElementById("name").value,
          email: document.getElementById("email").value,
          message: document.getElementById("message").value,
        }),
      });
      const result = await response.json();
      console.log(result);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else{
        showMessage();
  
      }

    } catch (error) {
      console.error("Error:", error);
    }
  }
  if (contactForm) {
    contactForm.addEventListener("submit", (event) =>submitMessage(event, "contact"));
  }
});

function showMessage(message) {
  // Create a div for the message
  const messageDiv = document.createElement("div");
  messageDiv.textContent = "Message sent successfully";
  messageDiv.style.position = "fixed";
  messageDiv.style.top = "20px";
  messageDiv.style.right = "5%";
  messageDiv.style.backgroundColor = "white";
  messageDiv.style.color = "#4CAF50";
  messageDiv.style.padding = "30px 20px";
  messageDiv.style.borderRadius = "5px";
  messageDiv.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.28)";
  messageDiv.style.zIndex = "1000";

  document.body.appendChild(messageDiv);

  // Remove the message after 3 seconds
  setTimeout(() => {
    messageDiv.remove();
  }, 4000);
}
