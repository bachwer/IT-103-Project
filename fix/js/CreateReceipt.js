let foods = JSON.parse(localStorage.getItem('foods'));
let recipes = JSON.parse(localStorage.getItem('recipes'));
let box = document.getElementById("containerAddFood");
let userName = localStorage.getItem("userName")
let categoryList = JSON.parse(localStorage.getItem('category'));

loadPage(1, foods);

addBoxText(0);
var addMethod = document.getElementById("addMethod");
let j = 0;
addMethod.addEventListener("click", function () {
    j++;
    addBoxText(j);
})


const emptyRecipe = {

    nutritionData: [
        {name: "Sodium", value: "0", unit: "mg"},
        {name: "Vitamin A", value: "0", unit: "ug"},
        {name: "Vitamin B-6", value: "0", unit: "mg"},
        {name: "Vitamin B-12", value: "0", unit: "ug"},
        {name: "Vitamin C", value: "0", unit: "mg"},
        {name: "Vitamin D (D2 + D3)", value: "0", unit: "ug"},
        {name: "Vitamin E", value: "0", unit: "mg"},
        {name: "Vitamin K", value: "0", unit: "ug"},
        {name: "Sugars", value: "0", unit: "g"},
        {name: "Calcium", value: "0", unit: "mg"},
        {name: "Iron", value: "0", unit: "mg"},
        {name: "Magnesium", value: "0", unit: "mg"},
        {name: "Phosphorus", value: "0", unit: "mg"},
        {name: "Potassium", value: "0", unit: "mg"},
        {name: "Zinc", value: "0", unit: "mg"},
        {name: "Copper", value: "0", unit: "mg"},
        {name: "Fluoride", value: "0", unit: "ug"},
        {name: "Manganese", value: "0", unit: "mg"},
        {name: "Selenium", value: "0", unit: "ug"},
        {name: "Thiamin", value: "0", unit: "mg"},
        {name: "Riboflavin", value: "0", unit: "mg"},
        {name: "Niacin", value: "0", unit: "mg"},
        {name: "Pantothenic acid", value: "0", unit: "mg"},
        {name: "Folate, total", value: "0", unit: "ug"}
    ],
    author: userName,     //ok
    by: "",
    category: "",
    description: [""],
    finalWeight: "",
    id: 0,
    img: "",
    ingredients: [],
    likes: 0,
    nutrition: {
        energy: 0,
        fat: 0,
        carbohydrate: 0,
        protein: 0
    },
    portions: 0,
    preparationTime: "",
    title: "",
    totalTime: ""
}


// function loadPage(num){
//     box.innerHTML = "";
//     num--;
//     num *= 5;
//     for(let i = num; i < num + 5; i++) {
//         let food = foods[i]
//         let portion = 0;
//
//         for (let key in food.nutritionData) {
//             if (food.nutritionData[key].unit === "g") {
//                 portion += parseFloat(food.nutritionData[key].value) || 0;
//             }
//         }
//         console.log(portion);
//
//
//         let divBox = document.createElement("div");
//         divBox.innerHTML = `
//     <div class="row2">
//     <div class="row2Text">
//         <span class="span1">${food.name}</span>
//         <span class="span2">${food.source}</span>
//
//         <div class="btn21">
//             <button class="btn111">${food.quantity}</button>
//             <button class="btn24">portion (${(portion).toFixed(1)} grams)</button>
//             <button class="btn111">${Math.round(portion) } g</button>
//         </div>
//     </div>
//
//     <div class="btn2">
//         <button>${food.energy}</button>
//         <button>${food.fat}</button>
//         <button>${food.carbohydrate}</button>
//         <button>${food.protein}</button>
//         <button id="addBtn2" class="addBtn2">
//             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
//                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
//                 <line x1="12" y1="5" x2="12" y2="19"></line>
//                 <line x1="5" y1="12" x2="19" y2="12"></line>
//             </svg>
//         </button>
//     </div>
// </div>
//
//     `;
//         document.addEventListener("DOMContentLoaded", function () {
//             document.querySelectorAll(".addBtn2").forEach((btn, index) => {
//                 let foodItem = foods[index]; // Lưu giá trị food tại thời điểm gán sự kiện
//
//                 btn.replaceWith(btn.cloneNode(true)); // Xóa mọi sự kiện cũ trên button
//                 let newBtn = document.querySelectorAll(".addBtn2")[index];
//
//                 newBtn.addEventListener("click", function () {
//                     console.log(foodItem.name); // In đúng food.name khi bấm
//                 });
//             });
//         });
//
//         box.appendChild(divBox);
//
//     }
//
// }
function loadPage(num, list) {
    box.innerHTML = "";
    num--;
    num *= 5;

    for (let i = num; i < num + 5; i++) {
        load(i, list);
    }
}

function load(i, list) {
    let food = list[i];
    let portion = 0;

    // Tính tổng portion với đơn vị "g"
    if (food.nutritionData) {
        for (let key in food.nutritionData) {
            if (food.nutritionData[key].unit === "g") {
                portion += parseFloat(food.nutritionData[key].value) || 0;
            }
        }
    }

    let divBox = document.createElement("div");
    divBox.innerHTML = `
            <div class="row2">
                <div class="row2Text">
                    <span class="span1">${food.name}</span>
                    <span class="span2">${food.source}</span>
                    <div class="btn21">
                        <button class="btn111">${food.quantity}</button>
                        <button class="btn24">portion (${portion.toFixed(1)} grams)</button>
                        <button class="btn111">${Math.round(portion)} g</button>
                    </div>
                </div>
                <div class="btn2">
                    <button>${food.energy}</button>
                    <button>${food.fat}</button>
                    <button>${food.carbohydrate}</button>
                    <button>${food.protein}</button>
                    <button class="addBtn2" id="addBtn2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                    </button>
                </div>
            </div>
        `;


    let addBtn = divBox.querySelector(".addBtn2");
    addBtn.addEventListener("click", function () {
        // console.log(food.name);
        addContent(food.name, food);
        CalculationNutrition(food);
    });

    box.appendChild(divBox);
}

//Calculation nutrition


function CalculationNutrition(food) {

    emptyRecipe.nutrition.energy += +food.energy;
    emptyRecipe.nutrition.fat += +food.fat;
    emptyRecipe.nutrition.protein += +food.protein;
    emptyRecipe.nutrition.carbohydrate += +food.carbohydrate;
    let fi = +parseFloat(food.nutritionData.fiber.value);



// Cộng dồn Sodium và làm tròn
    emptyRecipe.nutritionData[0].value = (parseFloat(emptyRecipe.nutritionData[0].value) + parseFloat(food.nutritionData.sodium.value)).toFixed(1);

// Cộng dồn Vitamin A và làm tròn
    emptyRecipe.nutritionData[1].value = (parseFloat(emptyRecipe.nutritionData[1].value) + parseFloat(food.nutritionData.vitaminA.value)).toFixed(1);

// Cộng dồn Vitamin B-6 và làm tròn
    emptyRecipe.nutritionData[2].value = (parseFloat(emptyRecipe.nutritionData[2].value) + parseFloat(food.nutritionData.vitaminB6.value)).toFixed(1);

// Cộng dồn Vitamin B-12 và làm tròn
    emptyRecipe.nutritionData[3].value = (parseFloat(emptyRecipe.nutritionData[3].value) + parseFloat(food.nutritionData.vitaminB12.value)).toFixed(1);

// Cộng dồn Vitamin C và làm tròn
    emptyRecipe.nutritionData[4].value = (parseFloat(emptyRecipe.nutritionData[4].value) + parseFloat(food.nutritionData.vitaminC.value)).toFixed(1);

// Cộng dồn Vitamin D và làm tròn
    emptyRecipe.nutritionData[5].value = (parseFloat(emptyRecipe.nutritionData[5].value) + parseFloat(food.nutritionData.vitaminD.value)).toFixed(1);

// Cộng dồn Vitamin E và làm tròn
    emptyRecipe.nutritionData[6].value = (parseFloat(emptyRecipe.nutritionData[6].value) + parseFloat(food.nutritionData.vitaminE.value)).toFixed(1);

// Cộng dồn Vitamin K và làm tròn
    emptyRecipe.nutritionData[7].value = (parseFloat(emptyRecipe.nutritionData[7].value) + parseFloat(food.nutritionData.vitaminK.value)).toFixed(1);

// Cộng dồn Sugars và làm tròn
    emptyRecipe.nutritionData[8].value = (parseFloat(emptyRecipe.nutritionData[8].value) + parseFloat(food.nutritionData.sugars.value)).toFixed(1);

// Cộng dồn Calcium và làm tròn
    emptyRecipe.nutritionData[9].value = (parseFloat(emptyRecipe.nutritionData[9].value) + parseFloat(food.nutritionData.calcium.value)).toFixed(1);

// Cộng dồn Iron và làm tròn
    emptyRecipe.nutritionData[10].value = (parseFloat(emptyRecipe.nutritionData[10].value) + parseFloat(food.nutritionData.iron.value)).toFixed(1);

// Cộng dồn Magnesium và làm tròn
    emptyRecipe.nutritionData[11].value = (parseFloat(emptyRecipe.nutritionData[11].value) + parseFloat(food.nutritionData.magnesium.value)).toFixed(1);

// Cộng dồn Phosphorus và làm tròn
    emptyRecipe.nutritionData[12].value = (parseFloat(emptyRecipe.nutritionData[12].value) + parseFloat(food.nutritionData.phosphorus.value)).toFixed(1);

// Cộng dồn Potassium và làm tròn
    emptyRecipe.nutritionData[13].value = (parseFloat(emptyRecipe.nutritionData[13].value) + parseFloat(food.nutritionData.potassium.value)).toFixed(1);

// Cộng dồn Zinc và làm tròn
    emptyRecipe.nutritionData[14].value = (parseFloat(emptyRecipe.nutritionData[14].value) + parseFloat(food.nutritionData.zinc.value)).toFixed(1);

// Cộng dồn Copper và làm tròn
    emptyRecipe.nutritionData[15].value = (parseFloat(emptyRecipe.nutritionData[15].value) + parseFloat(food.nutritionData.copper.value)).toFixed(1);

// Cộng dồn Fluoride và làm tròn
    emptyRecipe.nutritionData[16].value = (parseFloat(emptyRecipe.nutritionData[16].value) + parseFloat(food.nutritionData.fluoride.value)).toFixed(1);

// Cộng dồn Manganese và làm tròn
    emptyRecipe.nutritionData[17].value = (parseFloat(emptyRecipe.nutritionData[17].value) + parseFloat(food.nutritionData.manganese.value)).toFixed(1);

// Cộng dồn Selenium và làm tròn
    emptyRecipe.nutritionData[18].value = (parseFloat(emptyRecipe.nutritionData[18].value) + parseFloat(food.nutritionData.selenium.value)).toFixed(1);

// Cộng dồn Thiamin và làm tròn
    emptyRecipe.nutritionData[19].value = (parseFloat(emptyRecipe.nutritionData[19].value) + parseFloat(food.nutritionData.thiamin.value)).toFixed(1);

// Cộng dồn Riboflavin và làm tròn
    emptyRecipe.nutritionData[20].value = (parseFloat(emptyRecipe.nutritionData[20].value) + parseFloat(food.nutritionData.riboflavin.value)).toFixed(1);

// Cộng dồn Niacin và làm tròn
    emptyRecipe.nutritionData[21].value = (parseFloat(emptyRecipe.nutritionData[21].value) + parseFloat(food.nutritionData.niacin.value)).toFixed(1);

// Cộng dồn Pantothenic acid và làm tròn
    emptyRecipe.nutritionData[22].value = (parseFloat(emptyRecipe.nutritionData[22].value) + parseFloat(food.nutritionData.pantothenicAcid.value)).toFixed(1);

// Cộng dồn Folate, total và làm tròn
    emptyRecipe.nutritionData[23].value = (parseFloat(emptyRecipe.nutritionData[23].value) + parseFloat(food.nutritionData.folateTotal.value)).toFixed(1);


    // console.log(emptyRecipe.nutrition.energy)


//-----------------------------------------------------------------------------------------------------------------/
    kcal(emptyRecipe.nutrition.energy);
    console.log(fi);
    circle((emptyRecipe.nutrition.fat).toFixed(1), (emptyRecipe.nutrition.carbohydrate).toFixed(1), (emptyRecipe.nutrition.protein).toFixed(1), fi)
    loadTableNutrient();


}

circle(0, 0, 0, 0)
kcal(0);


function circle(f, c, p, fi) {

    // Fat elements
    let fat1 = document.getElementById("fat1");
    let fat = document.getElementById("fat");

    // Carbohydrate elements
    let carbohydrate1 = document.getElementById("Carbohydrate1");
    let carbohydrate = document.getElementById("Carbohydrate");

    // Protein elements
    let protein1 = document.getElementById("Protein1");
    let protein = document.getElementById("Protein");

    // fiber
    let fiber1 = document.getElementById("fiber1");
    let fiber = document.getElementById("fiber2");

    fiber.innerText = fi;
    if (fi > 0) {
        fiber1.classList.add("color4");
    } else {
        fiber1.classList.remove("color4");
    }

    // Handle fat
    fat.innerText = f.toString();
    if (f > 0) {
        fat1.classList.add("color1");
    } else {
        fat1.classList.remove("color1");
    }

    // Handle carbohydrate (same pattern as fat)
    carbohydrate.innerText = c.toString();
    if (c > 0) {
        carbohydrate1.classList.add("color2");
    } else {
        carbohydrate1.classList.remove("color2");
    }


    // Handle protein (same pattern as fat)
    protein.innerText = p.toString();
    if (p > 0) {
        protein1.classList.add("color3");
    } else {
        protein1.classList.remove("color3");
    }

    //



    PieChart(f, c, p);


}


function kcal(num) {
    let kcal = document.getElementById("kcal");
    kcal.innerText = num.toString()
}


let totalQuantityPageFoods = foods.length;
let NumPageFoods = Math.ceil(totalQuantityPageFoods / 5);

function PaginationFoods(totalPage, currentPage) {
    let boxFull = document.getElementById("PaginationFoods");
    boxFull.innerHTML = "";


    function createItem(text, page, isActive = false, isDisabled = false) {
        let boxPage = document.createElement("div");
        let btnNum = document.createElement("button");
        btnNum.innerHTML = text;
        btnNum.classList.add("btn-Page")

        if (isDisabled) {
            btnNum.disabled = true;
            btnNum.classList.add("disabled");
            btnNum.classList.remove("btn-Page")
        } else {
            btnNum.addEventListener("click", function () {
                PaginationFoods(totalPage, page);
                loadPage(page, foods)
            });
        }
        if (isActive) {
            btnNum.classList.add("activeBtn");
            btnNum.classList.remove("btn-Page");
        }
        boxPage.appendChild(btnNum);
        boxFull.appendChild(boxPage);
    }


    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPage, currentPage + 3);
    if (start > 1) createItem("<img src='../assets/Symbolleft.png' height=\"13\" width=\"14\"  >", currentPage - 1, false, currentPage <= 1);


    if (start > 1) createItem("...", start - 1, false, true);
    //1,2,3
    for (let i = start; i < end; i++) {
        createItem(i, i, currentPage === i);
    }

    if (end + 3 < totalPage) createItem("...", end + 1, false, true);

    for (let i = totalPage; i <= totalPage; i++) {
        createItem(i, i, currentPage === i);
    }
    createItem(" <img src='../assets/Symbol.png' height=\"13\" width=\"14\"  >", currentPage + 1, false, currentPage >= totalPage);

}

PaginationFoods(NumPageFoods, 1);


let tagAddImg = document.getElementById("tagAddImg");

tagAddImg.style.display = "flex";


let recipeItem = document.getElementById("recipeItem");


let check = true;
recipeItem.addEventListener("click", function () {
    let boxContainerReceipt = document.getElementById("boxContainerReceipt");
    let img = document.getElementById("imgRow");
    if (check) {
        boxContainerReceipt.style.display = "none";
        img.style.transform = "rotate(180deg)";
    } else {
        boxContainerReceipt.style.display = "block";
        img.style.transform = "rotate(360deg)";
    }

    check = !check;
})


// function addContent(name,food) {
//     const contentCreatValue = document.getElementById("contentCreatValue");
//     const existingItems = contentCreatValue.querySelectorAll(".item-text");
//     let itemFound = false;
//
//
//     existingItems.forEach(item => {
//         const itemName = item.textContent.replace(/^\d+\s/, "").trim(); // Lấy tên (bỏ số)
//         if (itemName === name) {
//
//             const countSpan = item.querySelector("span:first-child");
//             const currentCount = parseInt(countSpan.textContent);
//             countSpan.textContent = `${currentCount + 1} `;
//             itemFound = true;
//         }
//     });
//
//
//     if (!itemFound) {
//         const box = document.createElement("div");
//         box.className = "padding";
//
//         box.innerHTML = `
//             <div class="InPadding">
//                 <div class="recipe-item">
//                     <div class="item-container">
//                         <div class="item-info">
//                             <span class="item-text"><span>1 </span>${name}</span>
//                         </div>
//                         <button class="btnDel">
//                             <img src="../assets/delete.png" height="18" width="14" alt="Delete"/>
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         `;
//     }
//


//     contentCreatValue.appendChild(box);
// }

function addContent(name, food) {

    const contentCreatValue = document.getElementById("contentCreatValue");
    const existingItems = contentCreatValue.querySelectorAll(".item-text");
    let itemFound = false;
    let num = 1;
    existingItems.forEach(item => {
        const itemName = item.textContent.replace(/^\d+\s/, "").trim();
        if (itemName === name) {
            const countSpan = item.querySelector("span:first-child");
            const currentCount = parseInt(countSpan.textContent);
            countSpan.textContent = `${currentCount + 1} `;
            itemFound = true;
            num = currentCount + 1;


        }



    });










    if (!itemFound) {
        const box = document.createElement("div");
        box.className = "padding";

        box.innerHTML = `
            <div class="InPadding">
                <div class="recipe-item">
                    <div class="item-container">
                        <div class="item-info">
                            <span class="item-text"><span class="itemNum">1 </span>${name}</span>
                        </div>
                        <button class="btnDel">
                            <img src="../assets/delete.png" height="18" width="14" alt="Delete"/>
                        </button>
                    </div>
                </div>
            </div>
        `;

        // Thêm sự kiện xóa
        let btnDel = box.querySelector(".btnDel");


        btnDel.addEventListener("click", function () {
            const index = emptyRecipe.ingredients.indexOf(name);
            if (index !== -1) {
                emptyRecipe.ingredients.splice(index, 1);
            }
            let popup = document.getElementById("deletePopup");
            let confirmDelete = document.getElementById("confirmDelete");
            let cancelDelete = document.getElementById("cancelDelete");

            // Hiển thị popup
            popup.style.display = "flex";

            //Khi nhấn Xóa, thực hiện xóa phần tử
            confirmDelete.onclick = function () {
                const countSpan = box.querySelector('.item-text span:first-child');
                const itemCount = parseInt(countSpan.textContent);


                for (let i = 0; i < itemCount; i++) {

                    popup.style.display = "none";
                    emptyRecipe.nutrition.energy -= food.energy;
                    emptyRecipe.nutrition.fat -= food.fat;
                    emptyRecipe.nutrition.protein -= food.protein;
                    emptyRecipe.nutrition.carbohydrate -= food.carbohydrate;
                    let fi = 0 - food.nutritionData.fiber.value
                    console.log(emptyRecipe.nutrition.energy)


                    emptyRecipe.nutritionData[0].value = (parseFloat(emptyRecipe.nutritionData[0].value) - parseFloat(food.nutritionData.sodium.value)).toFixed(1);

                    emptyRecipe.nutritionData[1].value = (parseFloat(emptyRecipe.nutritionData[1].value) - parseFloat(food.nutritionData.vitaminA.value)).toFixed(1);

// Cộng dồn Vitamin B-6 và làm tròn
                    emptyRecipe.nutritionData[2].value = (parseFloat(emptyRecipe.nutritionData[2].value) - parseFloat(food.nutritionData.vitaminB6.value)).toFixed(1);

// Cộng dồn Vitamin B-12 và làm tròn
                    emptyRecipe.nutritionData[3].value = (parseFloat(emptyRecipe.nutritionData[3].value) - parseFloat(food.nutritionData.vitaminB12.value)).toFixed(1);

// Cộng dồn Vitamin C và làm tròn
                    emptyRecipe.nutritionData[4].value = (parseFloat(emptyRecipe.nutritionData[4].value) - parseFloat(food.nutritionData.vitaminC.value)).toFixed(1);

// Cộng dồn Vitamin D và làm tròn
                    emptyRecipe.nutritionData[5].value = (parseFloat(emptyRecipe.nutritionData[5].value) - parseFloat(food.nutritionData.vitaminD.value)).toFixed(1);

// Cộng dồn Vitamin E và làm tròn
                    emptyRecipe.nutritionData[6].value = (parseFloat(emptyRecipe.nutritionData[6].value) - parseFloat(food.nutritionData.vitaminE.value)).toFixed(1);

// Cộng dồn Vitamin K và làm tròn
                    emptyRecipe.nutritionData[7].value = (parseFloat(emptyRecipe.nutritionData[7].value) - parseFloat(food.nutritionData.vitaminK.value)).toFixed(1);

// Cộng dồn Sugars và làm tròn
                    emptyRecipe.nutritionData[8].value = (parseFloat(emptyRecipe.nutritionData[8].value) - parseFloat(food.nutritionData.sugars.value)).toFixed(1);

// Cộng dồn Calcium và làm tròn
                    emptyRecipe.nutritionData[9].value = (parseFloat(emptyRecipe.nutritionData[9].value) - parseFloat(food.nutritionData.calcium.value)).toFixed(1);

// Cộng dồn Iron và làm tròn
                    emptyRecipe.nutritionData[10].value = (parseFloat(emptyRecipe.nutritionData[10].value) - parseFloat(food.nutritionData.iron.value)).toFixed(1);

// Cộng dồn Magnesium và làm tròn
                    emptyRecipe.nutritionData[11].value = (parseFloat(emptyRecipe.nutritionData[11].value) - parseFloat(food.nutritionData.magnesium.value)).toFixed(1);

// Cộng dồn Phosphorus và làm tròn
                    emptyRecipe.nutritionData[12].value = (parseFloat(emptyRecipe.nutritionData[12].value) - parseFloat(food.nutritionData.phosphorus.value)).toFixed(1);

// Cộng dồn Potassium và làm tròn
                    emptyRecipe.nutritionData[13].value = (parseFloat(emptyRecipe.nutritionData[13].value) - parseFloat(food.nutritionData.potassium.value)).toFixed(1);

// Cộng dồn Zinc và làm tròn
                    emptyRecipe.nutritionData[14].value = (parseFloat(emptyRecipe.nutritionData[14].value) - parseFloat(food.nutritionData.zinc.value)).toFixed(1);

// Cộng dồn Copper và làm tròn
                    emptyRecipe.nutritionData[15].value = (parseFloat(emptyRecipe.nutritionData[15].value) - parseFloat(food.nutritionData.copper.value)).toFixed(1);

// Cộng dồn Fluoride và làm tròn
                    emptyRecipe.nutritionData[16].value = (parseFloat(emptyRecipe.nutritionData[16].value) - parseFloat(food.nutritionData.fluoride.value)).toFixed(1);

// Cộng dồn Manganese và làm tròn
                    emptyRecipe.nutritionData[17].value = (parseFloat(emptyRecipe.nutritionData[17].value) - parseFloat(food.nutritionData.manganese.value)).toFixed(1);

// Cộng dồn Selenium và làm tròn
                    emptyRecipe.nutritionData[18].value = (parseFloat(emptyRecipe.nutritionData[18].value) - parseFloat(food.nutritionData.selenium.value)).toFixed(1);

// Cộng dồn Thiamin và làm tròn
                    emptyRecipe.nutritionData[19].value = (parseFloat(emptyRecipe.nutritionData[19].value) - parseFloat(food.nutritionData.thiamin.value)).toFixed(1);

// Cộng dồn Riboflavin và làm tròn
                    emptyRecipe.nutritionData[20].value = (parseFloat(emptyRecipe.nutritionData[20].value) - parseFloat(food.nutritionData.riboflavin.value)).toFixed(1);

// Cộng dồn Niacin và làm tròn
                    emptyRecipe.nutritionData[21].value = (parseFloat(emptyRecipe.nutritionData[21].value) - parseFloat(food.nutritionData.niacin.value)).toFixed(1);

// Cộng dồn Pantothenic acid và làm tròn
                    emptyRecipe.nutritionData[22].value = (parseFloat(emptyRecipe.nutritionData[22].value) - parseFloat(food.nutritionData.pantothenicAcid.value)).toFixed(1);

// Cộng dồn Folate, total và làm tròn
                    emptyRecipe.nutritionData[23].value = (parseFloat(emptyRecipe.nutritionData[23].value) - parseFloat(food.nutritionData.folateTotal.value)).toFixed(1);


//-----------------------------------------------------------------------------------------------------------------/
                    kcal(emptyRecipe.nutrition.energy);
                    circle((emptyRecipe.nutrition.fat).toFixed(1), (emptyRecipe.nutrition.carbohydrate).toFixed(1), (emptyRecipe.nutrition.protein).toFixed(1), (emptyRecipe.nutrition.protein).toFixed(1), fi.toFixed)
                    loadTableNutrient();
                }
                box.remove();


                popup.style.display = "none";
            };


            cancelDelete.onclick = function () {
                popup.style.display = "none";
            };


        });
        contentCreatValue.appendChild(box);

    }
    console.log(num);
    emptyRecipe.ingredients.push(num +" "+ name);
    console.log(emptyRecipe.ingredients);
    if(num > 1){
        const index = emptyRecipe.ingredients.indexOf(num - 1 +" "+ name);
        emptyRecipe.ingredients.splice(index, 1);
    }
}


let inputBox1 = document.getElementById("searchReceipt");
let inputBoxCategory = document.getElementById("CategoryReceipt");


inputBox1.addEventListener("input", function () {
    let value = inputBox1.value.trim();

    box.innerHTML = "";
    if (value === "") {
        loadPage(1, foods);
        return 0;
    }
    search(value);


});
inputBoxCategory.addEventListener("input", function () {
    let value = inputBoxCategory.value.trim();

    box.innerHTML = "";
    if (value === "") {
        loadPage(1, foods);
        return 0;
    }
    Category(value);
});


function search(value) {
    let count = 0;

    for (let i = 0; i < foods.length; i++) {
        if (foods[i].name.toLowerCase().includes(value.toLowerCase())) {
            console.log("hôh");
            load(i, foods);
            count++;
        }
        if (count === 5) {
            break;
        }
    }
}

function Category(value) {
    let count = 0;
    for (let i = 0; i < foods.length; i++) {
        if (foods[i].category === value) {
            console.log(foods[i].category);
            load(i, foods);
            count++;
        }
        if (count === 5) {
            break;
        }
    }
}


function Increase() {
    let sortedRecipes = [...foods];
    sortedRecipes.sort((a, b) => {

        let totalA = a.energy + a.fat + a.carbohydrate + a.protein;
        let totalB = b.energy + b.fat + b.carbohydrate + b.protein;
        return totalA - totalB;
    });
    loadPage(1, sortedRecipes);
}

function Decrease() {

    let sortedRecipes = [...foods];
    sortedRecipes.sort((a, b) => {

        let totalA = a.energy + a.fat + a.carbohydrate + a.protein;
        let totalB = b.energy + b.fat + b.carbohydrate + b.protein;
        return totalB - totalA;
    });
    loadPage(1, sortedRecipes);

}
function Fat() {
    sortNu("fat");
}
function Carbohydrate(){
    sortNu("carbohydrate");
}
function Protein(){
    sortNu("protein");
}
function Energy(){
    sortNu("energy");
}

function sortNu(nutrientKey) {
    let sortedRecipes = foods;
    sortedRecipes.sort((a, b) => {
        let totalA = parseFloat(a?.[nutrientKey]) || 0;
        let totalB = parseFloat(b?.[nutrientKey]) || 0;
        return totalB - totalA;
    });
    loadPage(1, sortedRecipes);
}





loadTableNutrient();

function loadTableNutrient() {

    let imgReceiptContainer23ValueTotal = document.getElementById("imgReceiptContainer23ValueTotal");

    imgReceiptContainer23ValueTotal.innerHTML = "";


    for (let i = 0; i < emptyRecipe.nutritionData.length; i++) {
        let name = emptyRecipe.nutritionData[i].name;
        let unit = emptyRecipe.nutritionData[i].unit;
        let value = emptyRecipe.nutritionData[i].value;
        let box = document.createElement("div");
        box.innerHTML = `  
             <div class="imgReceiptContainer23Value">
                <span>${name}</span>
                <span><span>${value} </span> ${unit}</span>
            </div>
        
        `;

        if (i % 2 === 0) {
            box.classList.add("gray1");
        } else {
            box.classList.add("gray2");
        }
        imgReceiptContainer23ValueTotal.appendChild(box);
    }
}


// Lấy phần tử menu
searchCategory();
// console.log(categoryList);

function searchCategory() {
    let categoryMenuList = document.getElementById("categoryMenuList");
    categoryMenuList.innerHTML = '';

    categoryList.forEach((name) => {
        let li = document.createElement("li");
        li.textContent = name.toString();
        li.classList.add("option");
        categoryMenuList.appendChild(li);
    });
}


document.addEventListener("DOMContentLoaded", function () {
    let tagButton = document.getElementById("tag");
    let categoryMenu = document.getElementById("categoryMenu");

    // Khi bấm nút, hiển thị menu
    tagButton.addEventListener("click", function (event) {
        categoryMenu.style.display = (categoryMenu.style.display === "block") ? "none" : "block";

        event.stopPropagation();
    });

    // Khi click ngoài menu thì ẩn nó đi
    document.addEventListener("click", function (event) {
        if (!categoryMenu.contains(event.target) && event.target !== tagButton) {
            categoryMenu.style.display = "none";
        }
    });

    // Khi click vào một tùy chọn
    document.querySelectorAll(".option").forEach(option => {
        option.addEventListener("click", function () {
            console.log("Bạn chọn:", this.innerText);


            let NewCategory = document.getElementById("NewCategory");
            // NewCategory.value += this.innerText + ", " ;

            if (!NewCategory.value.includes(this.innerText)) {
                NewCategory.value += (NewCategory.value ? ", " : "") + this.innerText;
            }

            categoryMenu.style.display = "none";
        });
    });
});


function createImageUploadPopup() {
    // Tạo container cho popup
    const popupContainer = document.createElement('div');
    popupContainer.className = 'image-upload-popup';
    popupContainer.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  `;

    // Tạo nội dung popup
    const popupContent = document.createElement('div');
    popupContent.className = 'popup-content';
    popupContent.style.cssText = `
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    width: 90%;
    max-width: 500px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  `;

    // Tạo tiêu đề
    const title = document.createElement('h2');
    title.textContent = 'Upload image using link';
    title.style.cssText = `
    margin-top: 0;
    margin-bottom: 15px;
    color: #333;
  `;

    // Tạo input cho URL
    const urlInput = document.createElement('input');
    urlInput.type = 'url';
    urlInput.placeholder = 'input Url of img';
    urlInput.style.cssText = `
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
  `;

    // Tạo preview ảnh
    const imagePreview = document.createElement('div');
    imagePreview.className = 'image-preview';
    imagePreview.style.cssText = `
    margin: 15px 0;
    text-align: center;
    min-height: 100px;
    display: none;
    
  `;

    const previewImage = document.createElement('img');
    previewImage.style.cssText = `
    max-width: 100%;
    max-height: 200px;
    border: 1px solid #eee;
  `;
    imagePreview.appendChild(previewImage);

    // Tạo container cho buttons
    const buttonContainer = document.createElement('div');
    buttonContainer.style.cssText = `
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  `;

    // Tạo nút Preview
    const previewButton = document.createElement('button');
    previewButton.textContent = 'preview img';
    previewButton.style.cssText = `
    padding: 8px 15px;
    background-color: #2BA0CC;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  `;
    previewButton.onclick = () => {
        const url = urlInput.value.trim();
        if (url) {
            previewImage.src = url;
            previewImage.onload = () => {
                imagePreview.style.display = 'block';
            };
            previewImage.onerror = () => {
                imagePreview.style.display = 'none';
            };
        } else {
            urlInput.style = `
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 2px solid red;
    border-radius: 4px;
    box-sizing: border-box;
    color: red;
  `;

        }
    };

    // Tạo nút Hủy
    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'cancel';
    cancelButton.style.cssText = `
    padding: 8px 15px;
    background-color: #f1f1f1;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 10px;
  `;
    cancelButton.onclick = () => {
        document.body.removeChild(popupContainer);
    };

    // Tạo nút Tải lên
    const uploadButton = document.createElement('button');
    uploadButton.textContent = 'Upload';
    uploadButton.style.cssText = `
    padding: 8px 15px;
    background-color: #1AB394;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  `;
    uploadButton.onclick = () => {
        const url = urlInput.value.trim();
        if (url && imagePreview.style.display !== 'none') {
            // Xử lý sự kiện tải ảnh lên thành công
            // Đây là nơi bạn có thể thêm mã để lưu URL vào database hoặc xử lý URL
            emptyRecipe.img = url


            imgAdd(url);

            const event = new CustomEvent('imageUploaded', {
                detail: {imageUrl: url}
            });
            document.dispatchEvent(event);

            document.body.removeChild(popupContainer);
        } else {
            previewButton.style.cssText = `
    padding: 8px 15px;
    background-color: #2BA0CC;
    color: white;
    border: 2px solid red;
    border-radius: 4px;
    cursor: pointer;
  `;
        }
    };

    // Thêm các phần tử vào popup
    buttonContainer.appendChild(cancelButton);
    buttonContainer.appendChild(uploadButton);

    popupContent.appendChild(title);
    popupContent.appendChild(urlInput);
    popupContent.appendChild(previewButton);
    popupContent.appendChild(imagePreview);
    popupContent.appendChild(buttonContainer);

    popupContainer.appendChild(popupContent);

    // Thêm popup vào body
    document.body.appendChild(popupContainer);

    // Đặt focus vào input
    urlInput.focus();
}

// Hàm để hiển thị popup


// Sử dụng: showImageUploadPopup();


function imgAdd(url) {
    let imgReceiptContainer1 = document.getElementById('imgReceiptContainer1');


    imgReceiptContainer1.style.backgroundImage = `url('${url}')`;
    imgReceiptContainer1.style.backgroundSize = "cover"; // Đảm bảo ảnh phủ toàn bộ
    imgReceiptContainer1.style.backgroundPosition = "center"; // Căn giữa ảnh
    imgReceiptContainer1.style.backgroundRepeat = "no-repeat"; // Không lặp lại ảnh
}


function PieChart(a, b, c) {
    // Xử lý dữ liệu đầu vào
    const valueA = Number(a) || 0;
    const valueB = Number(b) || 0;
    const valueC = Number(c) || 0;

    // Lấy context canvas
    const ctx = document.getElementById('myChart');
    if (!ctx) {
        console.error("Không tìm thấy canvas với ID 'myChart'");
        return;
    }

    // Hủy biểu đồ cũ nếu tồn tại
    if (window.myPieChart) {
        window.myPieChart.destroy();
    }

    // Tạo biểu đồ mới với phong cách ban đầu nhưng kích thước nhỏ hơn
    window.myPieChart = new Chart(ctx, {
        type: "pie",
        options: {
            plugins: {
                datalabels: {
                    formatter: (value, ctx) => {
                        let sum = ctx.dataset.data.reduce((a, b) => a + b, 0);
                        let percentage = ((value / sum) * 100).toFixed(2) + "%";
                        return percentage;
                    },
                    color: "#fff",
                    font: {size: 15}

                }
            },
            title: {
                display: true,
                text: "Biểu đồ hình tròn"
            },
            legend: {
                display: true
            },
            responsive: false
        },
        data: {
            datasets: [{
                backgroundColor: ["#DB4965", "#EA9F77", "#1AB394"],
                data: [valueA, valueB, valueC]
            }]
        },
        plugins: [ChartDataLabels]
    });
}

let AddRecipe = document.getElementById("AddRecipe");
AddRecipe.addEventListener("click", function () {
    // totalTime: ""
    // preparationTime: "",
    //     title: "",
    //     description: "",,
    //     finalWeight: "",
    //     portions: 0,
    //    category: "",

    let recipeName = document.getElementById("recipeName").value;
    let description = document.getElementById("description").value;
    let totalTime = document.getElementById("totalTime").value;
    let prepTime = document.getElementById("prepTime").value;
    let finalWeight = document.getElementById("finalWeight").value;
    let portions = document.getElementById("portions").value;


    emptyRecipe.title = recipeName;
    emptyRecipe.description[0] = description;

    emptyRecipe.preparationTime = prepTime;
    emptyRecipe.finalWeight = finalWeight;
    emptyRecipe.portions = portions;
    emptyRecipe.finalWeight = finalWeight;
    emptyRecipe.by = finalWeight;
    emptyRecipe.portions = portions;
    emptyRecipe.totalTime = totalTime;
    emptyRecipe.id = recipes.length + 1;

    emptyRecipe.description.push(...getInputValues());
    console.log(emptyRecipe.description);

    console.log(emptyRecipe.ingredients);

    let NewCategory = document.getElementById("NewCategory").value;
    const arrNewCategory = NewCategory.split(",").map(item => item.trim());


    for (let i = 0; i < arrNewCategory.length; i++) {
        if (!categoryList.includes(arrNewCategory[i])) {
            categoryList.push(arrNewCategory[i]);
        }
    }
    emptyRecipe.category = NewCategory;
    console.log(arrNewCategory[1]);
    localStorage.setItem("category", JSON.stringify(categoryList));
    if (validateRecipe() === true) {
        console.log("Success!!")
        let recipes = JSON.parse(localStorage.getItem('recipes'));
        recipes.push(emptyRecipe);
        localStorage.setItem("recipes", JSON.stringify(recipes));
        window.location.href = "../page/ReceiptPage.html"
    }

    console.log(emptyRecipe);


});

// let category = ["Fruit", "Meat", "Grain", "Seafood", "Dairy", "Vegetable", "Nut", "Legume"];
// localStorage.setItem("category", JSON.stringify(category));


function validateRecipe() {
    let recipeName = document.getElementById("recipeName").value.trim();
    let prepTime = document.getElementById("prepTime").value.trim();
    let finalWeight = document.getElementById("finalWeight").value.trim();
    let portions = document.getElementById("portions").value.trim();
    let totalTime = document.getElementById("totalTime").value.trim();
    let NewCategory = document.getElementById("NewCategory").value;

    if(emptyRecipe.img.length === 0) {
        emptyRecipe.img = "https://www.foodiesfeed.com/wp-content/uploads/2023/06/boiled-eggs-on-a-plate.jpg";
    }

    if (!recipeName || !prepTime || !finalWeight || !portions || !totalTime || !NewCategory ) {
        showPopup("Vui lòng điền đầy đủ thông tin!");
        return false;
    }

    return true;
}

// Hàm hiển thị popup cảnh báo
function showPopup(message, duration = 3000) {
    const popup = document.getElementById('popupMessage');
    const popupText = document.getElementById('popupText');

    popupText.textContent = message;
    popup.classList.add('show');


    setTimeout(() => {
        popup.classList.remove('show');
    }, duration);
}






function addBoxText(num) {
    let boxTextCooking = document.getElementById("informationReceiptContainerValue2Box");
    for (let i = num; i <= num; i++) {
        let box = document.createElement("div");
        box.innerHTML = `    
        <div class="informationReceiptContainerValue2Box height">
            <div class="informationReceiptContainerValue2Box2">
                    ${i + 1}
                </div>
                <input type="text" id="description${i}"/>
            <div class="box"><img class="imgBox" src="../assets/delete.png" height="18" width="15" alt=""/>
                            
            </div>
            </div>
            
                 `;
        const deleteBox = box.querySelector('.box');
        deleteBox.addEventListener('click', function() {

            box.remove();
            j--;
            updateBoxNumbering();

        });
        boxTextCooking.appendChild(box);


    }
}
function getInputValues() {
    let values = [];
    for(let i = 0; i < j; i++) {
        const inputValue = document.getElementById(`description${i}`).value;
        if(inputValue.trim() !== ""){
            values.push(inputValue);
        }
    }
    return values;
}

function updateBoxNumbering() {
    const boxes = document.querySelectorAll('.informationReceiptContainerValue2Box');

    boxes.forEach((box, index) => {
        const numberBox = box.querySelector('.informationReceiptContainerValue2Box2');
        if (numberBox) {
            numberBox.textContent = index + 1;
        }

        // Update input ID if needed
        const input = box.querySelector('input[type="text"]');
        if (input) {
            input.id = `description${index}`;
        }
    });
}