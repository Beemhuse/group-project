document.addEventListener("DOMContentLoaded", () => {
    const token = sessionStorage.getItem("token");
    
    if (!token) {
        window.location.href = "/pages/auth/login.html";
     }
    })