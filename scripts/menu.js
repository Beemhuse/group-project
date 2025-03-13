const menuData = "./menu.json";

document.addEventListener("DOMContentLoaded", (e) => {
  e.preventDefault();
  let data = []; // result.dishes
  let filteredData = []; // data
  const pageNumbers = document.querySelector(".pages");
  const prevButton = document.getElementById("page1");
  const nextButton = document.getElementById("page2");
  const ourDishes = document.getElementById("Our-dishes");
  const buttonContainer = document.getElementById("what-we-offer");

  const dishPerPage = 8;
  let currentPage = 1;
  let totalPages = 1;
  let isPaginated = true; // Track if pagination is needed

  async function getData() {
    try {
      const res = await fetch("../menu.json");
      const result = await res.json();
      data = result.dishes;
      filteredData = data; // Default to all dishes
      totalPages = Math.ceil(filteredData.length / dishPerPage); // totalDishes divided by itemsPerPage. that is 24 dishes / 8 dishesPerPage
      isPaginated = true; // Apply pagination initially
      displayCategoryButtons(data);
      displayPage(currentPage);
    } catch (error) {
      alert("Error loading menu data");
      console.error(error);
    }
  }

  function filterData(category) {
    if (category === "All") {
      filteredData = data; // fetches the json file
      totalPages = Math.ceil(filteredData.length / dishPerPage); // divide the 24 dishes into 8 dishes per 3 pages. The Syntax is Math.ceil(totalItems / itemsPerPage)
      isPaginated = true; // Enable pagination for "All" only excluding the other dish buttons
    } else {
      filteredData = data.filter((dish) => dish.category === category); // filter the dishes for the other dish buttons excluding "All" based on the dishes category
      totalPages = 1; // No pagination needed
      isPaginated = false; // Disable pagination
    }

    currentPage = 1;
    displayPage(currentPage);
  }

  function displayCategoryButtons(dishes) {
    if (!buttonContainer) {
      alert("Container with ID 'what-we-offer' not found!");
      return;
    }

    buttonContainer.innerHTML = "";
    const categories = ["All", ...new Set(dishes.map((dish) => dish.category))]; // Create an array of unique dish categories, ensuring "All" is the first option.

    categories.forEach((category) => {
      const button = document.createElement("button");
      button.classList.add("available-dishes");
      button.textContent = category;
      button.addEventListener("click", (e) => {
        e.preventDefault();
        filterData(category);
      });

      buttonContainer.appendChild(button);
    });
  }

  function displayPage(page) {
    ourDishes.innerHTML = "";
    let dishesToShow;

    if (isPaginated) {
      const startIndex = (page - 1) * dishPerPage;
      const endIndex = startIndex + dishPerPage;
      dishesToShow = filteredData.slice(startIndex, endIndex);
    } else {
      dishesToShow = filteredData; // Show all dishes for a selected category
    }

    dishesToShow.forEach((dish) => {
      const menu = document.createElement("div");
      menu.classList.add("dishes-menu");

      const formattedPrice = new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
      }).format(dish.price);

      menu.innerHTML = `
                <div class="dish">
                    <img id="dish-image" src=${dish.image} alt=${dish.name} width="120px">
                    <div class="dish-content">
                        <div id="dish-title">
                            <h2>${dish.name}</h2>
                            <p>${dish.description}</p>
                        </div>
                        <div id="price-buy">
                            <h2 id="price">${formattedPrice}</h2>
                            <button class="order-button">Buy Now</button>
                        </div>
                    </div>
                </div>`;

      ourDishes.appendChild(menu);
    });

    updatePagination();
  }

  function updatePagination() {
    if (isPaginated) {
      pageNumbers.style.display = "block";
      pageNumbers.textContent = `Page ${currentPage} of ${totalPages}`;
      prevButton.style.display = "inline-block";
      nextButton.style.display = "inline-block";
      prevButton.disabled = currentPage === 1;
      nextButton.disabled = currentPage === totalPages;
    } else {
      pageNumbers.style.display = "none";
      prevButton.style.display = "none";
      nextButton.style.display = "none";
    }
  }

  prevButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (currentPage > 1) {
      currentPage--;
      displayPage(currentPage);
    }
  });

  nextButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (currentPage < totalPages) {
      currentPage++;
      displayPage(currentPage);
    }
  });

  getData();
});
