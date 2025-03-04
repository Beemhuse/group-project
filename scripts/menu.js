const dishButton = document.querySelectorAll(".available-dishes");

dishButton.forEach((button) => {
    button.addEventListener("click", (e) => {
        e.preventDefault();
        let dishes = document.getElementById("rice-dishes")
        dishes.style.display = "flex";

    });
})