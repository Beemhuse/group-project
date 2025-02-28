
const menuUrl = './pages/menu.json';
let data = []

document.addEventListener("DOMContentLoaded", (e) => {
    e.preventDefault();
    let dishButton = document.querySelectorAll(".available-dishes");
    dishButton.forEach((dishButton) => {
        dishButton.addEventListener("click", async (e) => {
            e.preventDefault();
            if (e.target.dataset.category === "Rice Dishes") {
                try {
                    const response = await fetch(menuUrl);
                    data = await response.json();
                    const riceDishes = data.filter(item => item.category === "Rice Dishes");
                
                    const riceDishesContainer = document.getElementById('rice-dishes');
                    // riceDishesContainer.innerHTML = "";
                    riceDishes.forEach((dish) => {
                        const riceMenu = document.createElement("div");
                        riceMenu.classList.add("rice-menu");
                        riceMenu.innerHTML = `
                                        <p>${dish.name}</p>
                                        <p>${dish.description}</p>
                                        <img src="${dish.image}"/>
                                        <p>$${dish.price}</p>`
                        riceDishesContainer.appendChild(riceMenu);
                    })
                } catch (error) {
                    console.error('Error:', error);

                }

            }
        })
    })
})



