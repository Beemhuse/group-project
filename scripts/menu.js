const menuData = "./menu.json";

document.addEventListener("DOMContentLoaded", (e) => {
  let data = [];
  e.preventDefault();
  async function getData() {
    try {
      const res = await fetch("../menu.json");
      console.log(res);
      let result = await res.json();
      data = result;
      displayDishes(result.dishes);
      displayCategoryButtons(data.dishes);
        // displayDishesByCategory(data); // Show all dishes initially
    } catch (error) {
      console.error("Error:", error);
    }
  }

  getData();
  console.log(data);
  function filterData(data, a) {
    console.log(data.dishes);
    const res = data?.dishes?.filter((dish) => dish.category == a);
    console.log(res);
    // return
    displayDishes(res);
  }
  // let filter = filterData()
  // console.log(filterData())

  function displayDishes(data) {
    console.log(data)
      if (data) {
        const container = document.getElementById("rice-dishes");
      console.log(container);
      container.innerHTML = "";
      data.forEach((dish) => {
        const riceMenu = document.createElement("div");
        riceMenu.classList.add("rice-menu");
        console.log(riceMenu);
        riceMenu.innerHTML = `
                  <div class="dish">
                <img id="dish-image" src=${dish.image} alt=${dish.name} width="120px">
                <div class="dish-content">
                    <div id="dish-title">
                        <h2>${dish.name}</h2>
                        <p>${dish.description}</p>
                    </div>
                    <div id="price-buy">
                        <h2>N ${dish.price}</h2>
                        <button class="order-button">Buy Now</button>
                    </div>
                </div>
            </div>`;

        container.appendChild(riceMenu);
      });
    }
  }


  function displayCategoryButtons(dishes) {
    const buttonContainer = document.getElementById("what-we-offer");
console.log(buttonContainer)
    if (!buttonContainer) {
        console.error("Container with ID 'category-buttons' not found!");
        return;
    }

    buttonContainer.innerHTML = ""; // Clear previous buttons

    // Get unique categories
    const categories = ["All", ...new Set(dishes.map(dish => dish.category))];

    // Create buttons dynamically
    categories.forEach((category) => {
        const button = document.createElement("button");
        button.classList.add("available-dishes");
        button.textContent = category;
        button.addEventListener("click", async (e) => {
            e.preventDefault();
            if (category === "All") {
                getData(); // Show all
            } else {
                filterData({ dishes }, category);
            }
        });

        buttonContainer.appendChild(button);
    });
}
  // displayDishes()
  let dishButton = document.querySelectorAll(".available-dishes");
  console.log(dishButton);
  dishButton.forEach((dishButton) => {
    console.log(dishButton);
    dishButton.addEventListener("click", async (e) => {
      e.preventDefault();
      console.log(e.target.textContent);
      if (e.target.textContent === "All") {
        getData();
      } else {
        try {
          const res = await fetch("../menu.json");
          let result = await res.json();
          filterData(result, e.target.textContent);
        } catch (error) {
          console.error("Error:", error);
        }
      }
    });
  });
});

 