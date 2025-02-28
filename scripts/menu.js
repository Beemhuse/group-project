
const menuData = "./menu.json";
let data = []

document.addEventListener("DOMContentLoaded", (e) => {
    e.preventDefault();
    let dishButton = document.querySelectorAll(".available-dishes");
    console.log(dishButton)
    dishButton.forEach((dishButton) => {
        console.log(dishButton)
        dishButton.addEventListener("click", async (e) => {
            e.preventDefault();
            fetch(menuData)
            .then(response => response.json())
            .then(response => {
                data = response;
                console.log(data)
                // const riceDishes = data.filter(item => item.category === "Rice Dishes")
                // console.log(riceDishes)
                const riceDishesContainer = document.getElementById('rice-dishes');
                riceDishesContainer.innerHTML = "";
                data.forEach((dish) => {
                    const riceMenu = document.createElement("div");
                    riceMenu.classList.add("rice-menu");
                    riceMenu.innerHTML = `
                         <p>${dish.name}</p>
                         <p>${dish.description}</p>
                         <img src="${dish.image}"/>
                         <p>$${dish.price}</p>`
    
                })
                riceDishesContainer.appendChild(riceMenu);
                
            })
        })


            })
           

            // if (e.target.innerHTML === "Rice Dishes") {
            //     console.log("rice clicked");
            //     try {
            //         const response = await fetch(menuData);
            //         data = await response.json();
            //         // const riceDishes = data.filter(item => item.category === "Rice Dishes");

            //         const riceDishesContainer = document.getElementById('rice-dishes');
            //         riceDishesContainer.innerHTML = "";
            //         riceDishes.forEach((dish) => {
            //             const riceMenu = document.createElement("div");
            //             riceMenu.classList.add("rice-menu");
            //             riceMenu.innerHTML = `
            //                          <p>${dish.name}</p>
            //                          <p>${dish.description}</p>
            //                          <img src="${dish.image}"/>
            //                          <p>$${dish.price}</p>`
            //         })
            //         }
            //         catch (error) {
            //             console.error('error', error);
            //     }
            
            
               


    })






    // dishButton.forEach((dishButton) => {
    //     dishButton.addEventListener("click", async (e) => {
    //         e.preventDefault();
    //         if (e.target.innerHTML === "Rice Dishes") {
    //             try {
    //                 const response = await fetch('menuUrl');
    //                 data = await response.json();
    //                 const riceDishes = data.filter(item => item.category === "Rice Dishes");
                
    //                 const riceDishesContainer = document.getElementById('rice-dishes');
                    
    //                 riceDishes.forEach((dish) => {
    //                     const riceMenu = document.createElement("div");
    //                     riceMenu.classList.add("rice-menu");
    //                     riceMenu.innerHTML = `
    //                                     <p>${dish.name}</p>
    //                                     <p>${dish.description}</p>
    //                                     <img src="${dish.image}"/>
    //                                     <p>$${dish.price}</p>`
    //                     riceDishesContainer.appendChild(riceMenu);
    //                 })
    //             } catch (error) {
    //                 console.error('error', error);

    //             }

    //         }
    //     })
    // })



