// const loginButton = document.getElementById("log-in-btn");

// document.addEventListener("DOMContentLoaded", () => {
//     const token = sessionStorage.getItem("token");
//     if(token){
//         loginButton.style.display = "none";

//     }
  
//     })

    document.addEventListener("DOMContentLoaded", () => {
        const token = localStorage.getItem('authToken');
        
        if (token) {
            // If the user is logged in, hide login button and show user icon
            const loginButton = document.querySelector('.log-in-button');  // assuming this exists on the dashboard page
            
            if (loginButton) {
                loginButton.style.display = 'none'; // Hide the login button
            }
            // Create or update the user info section dynamically
            const userInfo = document.createElement('div');
            userInfo.innerHTML = `
                <div id="user-info">
                    <span id="user-icon">👤</span>
                    <span>Welcome, User!</span> 
                    <button id="logout-btn">Logout</button>
                </div>
            `;
            
            document.body.appendChild(userInfo);
    
            // Add logout functionality
            const logoutButton = document.getElementById('logout-btn');
            logoutButton.addEventListener('click', () => {
                localStorage.removeItem('authToken');  // Remove the token on logout
                location.reload(); // Reload the page to reset UI
            });
        }
        else{
            window.location.href = "/pages/auth/login.html";
         }
    });
    