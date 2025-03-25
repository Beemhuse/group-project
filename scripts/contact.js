 

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
      } else {
        let message = document.getElementById("message-sent")
        message.innerHTML = "Message Sent succeffully!";
        message.style.display = "block";
        setTimeout(() => {
          message.style.display = "none";
            contactForm.reset();

        }, 2000);  
      

      }


    } catch (error) {
      console.error("Error:", error);
    }
  }
  if (contactForm) {
    contactForm.addEventListener("submit", (event) =>submitMessage(event, "contact"));
  }
});
