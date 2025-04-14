let foods = JSON.parse(localStorage.getItem('foods'));
// let recipes = JSON.parse(localStorage.getItem('recipes'));
let userName = localStorage.getItem("userName")

let contentFoodsPage = document.getElementById("contentFoodsPage");
loadPage(1, foods);

let myModal = document.getElementById("myModal");
let closeBtn = document.querySelector(".close");
let closeButton = document.querySelector(".btn-close");

closeBtn.onclick = function () {
    myModal.classList.remove("show");
}


closeButton.onclick = function () {
    myModal.classList.remove("show");
}

window.onclick = function (event) {
    if (event.target === myModal) {
        myModal.classList.remove("show");

    }
}
let creat = document.getElementById("CreateFood");

creat.addEventListener("click", function () {
    let foodInput = {};
    let save = document.getElementById("save");
    let name = document.getElementById("FoodName");
    let source = document.getElementById("source");
    let category = document.getElementById("category");
    let quantity = document.getElementById("quantity");
    let Energy = document.getElementById("Energy");
    let Fat = document.getElementById("Fat");
    let Carbohydrate = document.getElementById("Carbohydrate");
    let Protein = document.getElementById("Protein");

    Energy.disabled = false;
    Fat.disabled = false;
    Carbohydrate.disabled = false;
    Protein.disabled = false;
    quantity.disabled = false;
    category.disabled = false;
    name.disabled = false;
    name.value = "";
    source.value = "";

    category.value = "";
    quantity.value = "";
    Energy.value = "";
    Fat.value = "";
    Carbohydrate.value = "";
    Protein.value = "";

    name.style.backgroundColor = "#FFF";
    name.style.border = "1px solid #DDDDDD";
    name.style.borderLeft = "none";
    name.style.height = "calc(100% - 4px)";

    category.style.backgroundColor = "#FFF";
    category.style.border = "1px solid #DDDDDD";
    category.style.borderLeft = "none";
    category.style.height = "calc(100% - 4px)";


    setInputStyles(Energy);
    setInputStyles(Fat);
    setInputStyles(Carbohydrate);
    setInputStyles(Protein);


    let main = document.getElementById("NutritionContent2");

    main.innerHTML = "";

    let food = foods[1];
    for (let key in food.nutritionData) {
        let box = document.createElement("div");

        box.innerHTML = `
         <div class="NutritionValue">   
          <button>${food.nutritionData[key].name}</button>
          <input type="text" style="background-color: #ffff" data-key="${key}">
          <div class="Cholesterol1">${food.nutritionData[key].unit}</div>
         </div>
    `;
        main.appendChild(box);



    }
    myModal.classList.add("show");
    save.onclick = function () {


        if (validateField(name) === true &&
            validateField(Energy) === true &&
            validateField(Fat) === true &&
            validateField(category) === true &&
            validateField(Carbohydrate) === true &&
            validateField(Protein) === true &&
            validateField(quantity) === true) {
            console.log("save2")
            myModal.classList.remove("show");

            foodInput = {
                name: name.value,
                source: userName ,
                energy: Energy.value,
                fat: Fat.value,
                carbohydrate: Carbohydrate.value,
                protein: Protein.value,
                category: category.value,
                quantity: quantity.value,
                nutritionData: {},
        }
            saveAllValues();

            foods.push(foodInput)
            localStorage.setItem("foods", JSON.stringify(foods));

            location.reload();
        }
    }

    function validateField(field) {

        const modal = document.getElementById("myModal");

        if (field.value === "") {
            field.style.border = "1px solid #F08080";
            modal.scrollTop = 0;
        } else {
            field.style.border = "";
            name.style.border = "1px solid #DDDDDD";
            category.style.border = "1px solid #DDDDDD";
            return true;
        }
    }


    function saveAllValues() {
        const inputs = main.querySelectorAll('input[type="text"]');
        const unitValue = main.querySelectorAll(`Cholesterol1`);

        inputs.forEach(input => {
            const key = input.getAttribute('data-key'); // Lấy key từ data-key
            let data = key.toString()
            const value = input.value.trim(); // Lấy giá trị từ input (xóa khoảng trắng thừa)


            if (!foodInput.nutritionData[key]) {
                foodInput.nutritionData[key] = {
                        name: data,
                        value: "",
                        unit: "",

                };
            }




            foodInput.nutritionData[key].value = +value;
        });



        Object.keys(foods[0].nutritionData).forEach(key => {
            foodInput.nutritionData[key].unit = foods[0].nutritionData[key].unit;
        });





    }

});


function setInputStyles(element) {
    element.style.backgroundColor = "#FFF";
    element.style.borderLeft = "none";
    element.style.height = "calc(100% - 4px)";
}

function removeInputStyles(element) {
    element.style.backgroundColor = "";
    element.style.borderLeft = "";
    element.style.height = "";
}

// load page
function loadContentNutritionContent(i) {
    let save = document.getElementById("save");
    save.onclick = function () {
        myModal.classList.remove("show");
    }


    let main = document.getElementById("NutritionContent2");
    main.innerHTML = "";

    let name = document.getElementById("FoodName");
    let source = document.getElementById("source");
    let category = document.getElementById("category");
    let quantity = document.getElementById("quantity");
    let Energy = document.getElementById("Energy");
    let Fat = document.getElementById("Fat");
    let Carbohydrate = document.getElementById("Carbohydrate");
    let Protein = document.getElementById("Protein");
    let editBtn = document.getElementById("edit");

    let food = foods[i];

    name.value = food.name;
    source.value = food.source;
    category.value = food.category;
    Energy.value = food.energy;
    Fat.value = food.fat;
    Carbohydrate.value = food.carbohydrate;
    quantity.value = food.quantity;
    Protein.value = food.protein;


    status(true)

   function status(boolean){
    Energy.disabled = boolean;
    Fat.disabled = boolean;
    Carbohydrate.disabled = boolean;
    Protein.disabled = boolean;
    quantity.disabled = boolean;
    category.disabled = boolean;
    name.disabled = boolean;
   }

    removeInputStyles(name)
    removeInputStyles(category)
    removeInputStyles(Energy)
    removeInputStyles(Fat)
    removeInputStyles(Protein)
    removeInputStyles(Carbohydrate)

    main.innerHTML = "";
    for (let key in food.nutritionData) {
        let box = document.createElement("div");

        box.innerHTML = `
                 <div class="NutritionValue">   
                  <button>${food.nutritionData[key].name}</button>
                <input value="${food.nutritionData[key].value}" type="text" disabled>
                <div class="Cholesterol1">${food.nutritionData[key].unit}</div>
                 </div>
            `;
        main.appendChild(box);
    }


    editBtn.addEventListener("click", function () {

        const modal = document.getElementById("myModal");
        if (userName === source.value) {

            main.innerHTML = "";

            for (let key in food.nutritionData) {

                let box = document.createElement("div");

                box.innerHTML = `
                 <div class="NutritionValue">   
                  <button>${food.nutritionData[key].name}</button>
                    <input style=" background-color: #ffff;" type="text" value="${food.nutritionData[key].value}">
                <div class="Cholesterol1">${food.nutritionData[key].unit}</div>
                 </div>
            `;
                main.appendChild(box);
                status(false)



            }
        }else{
            modal.scrollTop = 0;
            return 0;
        }



        //----------







    });

}


function loadPage(page, list) {
    contentFoodsPage.innerHTML = "";
    page--;
    page *= 9;
    for (let i = page; i < page + 9; i++) {
        load(i, list);
    }


}

function load(i) {
    let div = document.createElement("div");
    let food = foods[i];
    div.innerHTML = `
    <div>
        <span class="titleBarFood">${food.name}</span><br>
        <span class="descriptionFood">${food.source}</span>
    </div>
       <div class="BoxParameterFoods">         
            <div class="c"><span class="a">${food.energy}</span><br><span>Energy</span></div>
            <div class="c"><span class="a">${food.fat}</span><br><span>Fat</span></div>
            <div class="c"><span class="a">${food.carbohydrate}</span><br> <span>Carbohydrate</span></div>
            <div class="c"><span class="a">${food.protein}</span><br> <span >Protein</span></div>
       </div>
    `;
    div.classList.add("contentFoods");

    div.addEventListener("click", function () {
        // load page
        loadContentNutritionContent(i);
        myModal.classList.add("show");


    });

    contentFoodsPage.appendChild(div);
}


let totalQuantityPageFoods = foods.length;
let NumPageFoods = Math.ceil(totalQuantityPageFoods / 9);

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
                console.log(page);
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


let inputBox2 = document.getElementById("searchReceipt");
let inputBoxCategory1 = document.getElementById("CategoryReceipt");


inputBox2.addEventListener("input", function () {
    let value = inputBox2.value.trim();

    contentFoodsPage.innerHTML = "";
    if(value === ""){
        loadPage(1, foods );
        return 0;
    }
    search(value);


});
inputBoxCategory1.addEventListener("input", function () {
    let value = inputBoxCategory1.value.trim();

    contentFoodsPage.innerHTML = "";
    if(value === ""){
        loadPage(1,foods );
        return 0;
    }
    Category(value);
});



function search(value){
    let count = 0;

    for(let i = 0 ; i < foods.length ; i++){
        if (foods[i].name.toLowerCase().includes(value.toLowerCase())) {
            load(i);
            count++;
        }
        if(count === 8){
            break;
        }
    }
}

function Category(value){
    let count = 0;
    for(let i = 0 ; i < foods.length ; i++){
        if (foods[i].category === value) {
            console.log(foods[i].category);
            load(i);
            count++;
        }
        if(count === 8){
            break;
        }
    }
}






let inputBox = document.getElementById("searchReceipt");
let inputBoxCategory = document.getElementById("CategoryReceipt");


inputBox.addEventListener("input", function () {
    let value = inputBox.value.trim();

    contentFoodsPage.innerHTML = "";
    if(value === ""){
        loadPage(1, foods );
        return 0;
    }
    search(value);


});
inputBoxCategory.addEventListener("input", function () {
    let value = inputBoxCategory.value.trim();

    contentFoodsPage.innerHTML = "";
    if(value === ""){
        loadPage(1,foods );
        return 0;
    }
    Category(value);
});



function search(value){
    let count = 0;

    for(let i = 0 ; i < foods.length ; i++){
        if (foods[i].name.toLowerCase().includes(value.toLowerCase())) {
            load(i);
            count++;
        }
        if(count === 8){
            break;
        }
    }
}

function Category(value){
    let count = 0;
    for(let i = 0 ; i < foods.length ; i++){
        if (foods[i].category === value) {
            console.log(foods[i].category);
            load(i);
            count++;
        }
        if(count === 8){
            break;
        }
    }
}


function Decrease(){

    let sortedRecipes = foods;
    sortedRecipes.sort((a, b) => {

        let totalA = a.energy + a.fat + a.carbohydrate + a.protein;
        let totalB = b.energy + b.fat + b.carbohydrate + b.protein;
        return totalB - totalA;
    });
    loadPage(1, sortedRecipes);

}

function IncreaseFood(){
    let sortedRecipes = foods;
    sortedRecipes.sort((a, b) => {

        let totalA = parseFloat(a.energy + a.fat + a.carbohydrate + a.protein);
        let totalB = parseFloat(b.energy + b.fat + b.carbohydrate + b.protein);
        return totalA - totalB;
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







let categoryLocal = JSON.parse(localStorage.getItem("category"));
let Category1  = document.getElementById("CategoryReceipt");

for(let i = 0; i < categoryLocal.length - 1; i++){
    console.log("hi");
    let option = document.createElement("option");
    option.text = categoryLocal[i];
    option.value = categoryLocal[i];

    Category1.appendChild(option);

}


