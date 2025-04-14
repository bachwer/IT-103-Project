let recipes = JSON.parse(localStorage.getItem('recipes'));
let box = document.getElementById("contentHomePage");
let dataUser = JSON.parse(localStorage.getItem("dataUser")) || { users: [] };
let indexUser = parseInt(localStorage.getItem("indexUser"));
let userName = localStorage.getItem("userName");

console.log(indexUser);

numFavorites(dataUser.users[indexUser].favorite.id.length);

let recipesTemp = [...recipes];


loadPage(1,recipesTemp)

function loadPage(page, list, ){
    box.innerHTML = "";
    page--;
    page *= 8;
    for (let i = page; i < page + 8; i++) {
        printRecipe(i, list);
    }
}

function printRecipe(i, list){
    let recipe = list[i];
    let divChild = document.createElement("div");
    const byValue = recipe.by ? recipe.by : "100g";
    let type;
    let clasType;
    let imgType;
    let imgAvatar;
    const imgArray = [
        "https://dvqlxo2m2q99q.cloudfront.net/000_clients/657152/file/6571525jT4Q8Jf.jpg",
        "https://img.freepik.com/free-photo/portrait-african-american-man_23-2149072179.jpg",
        "https://as2.ftcdn.net/v2/jpg/04/01/30/49/1000_F_401304934_PMHtzz9sAHGCYEYV3twpQhkm5kWeQzEg.jpg",
        "https://images.saatchiart.com/saatchi/1162197/art/5570673/4640485-HSC00001-7.jpg",
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D",
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ];



    for(let i = 0; i < dataUser.users.length; i++) {
        let name = dataUser.users[i].userName;

        if(name === recipe.author){
            imgAvatar = dataUser.users[i].img;
            break;
        }else{
            const randomNumber = Math.floor(Math.random() * imgArray.length);
            imgAvatar = imgArray[randomNumber];
        }
    }

        if(userName === recipe.author){

            type = "My Recipes";
            clasType = "titleBar2"
            imgType = "../assets/border_color.png";
        }else{
           type = "Community Recipes";
                clasType = "titleBar"
            imgType = "../assets/iconCommunity.png";

        }





    divChild.innerHTML = `

        <div class=${clasType} id="community">
            <img src=${imgType} height="14" width="14" alt="">
            <span>${type}</span>
    </div>
     <div class="boxTitleBar">
                    <img src="${recipe.img}" alt="">
                </div>
    <div class="titleBar1">
        <p>${recipe.title}</p>
       
        <div class="text-btnInBar1">
         <img class="imgAvatar" src=${imgAvatar} height="30" width="30" alt=""/>
            <span>${recipe.author}</span>
            <button class="btnLike"><i class="fa-regular fa-heart"></i>&nbsp;${recipe.likes}</button>
        </div>
        <div class="text-btnInBar2">
            <img src="../assets/tag.png" height="18" width="20" alt="">
            <span>${recipe.category}</span>
        </div>
    </div>

    <div class="parameterFoods">
       <div class="BoxParameterFoods">
         <div class="c"><span class="a">By</span><br> <span class="b">${byValue}</span></div>

        <div class="c"><span class="a">Energy</span><br><strong style="font-weight: bold">${(recipe.nutrition.energy).toFixed(1)} kcal</strong></div>
        <div class="c"><span class="a">Fat</span><br><span>${(recipe.nutrition.fat).toFixed(1)}</span> g</div>
        <div class="c"><span class="a">Carbohydrate</span><br> <span>${(recipe.nutrition.carbohydrate).toFixed(1)} g</span></div>
        <div class="c"><span class="a">Protein</span><br> <span >${(recipe.nutrition.protein).toFixed(1)} g</span></div>
       </div>
    </div>
    `;
    divChild.classList.add("contentBox");




    divChild.addEventListener("click", function () {
        localStorage.setItem("Detail",JSON.stringify(recipe));
        window.location.href = "../page/DetailReceiptPage.html";

    })
    const btn = divChild.querySelector("button");
    const icon = divChild.querySelector("i");

    if(dataUser.users[indexUser].favorite.id.includes(recipe.id)){
        icon.classList.replace('fa-regular', 'fa-solid');
        icon.style.color = "rgb(204, 89, 101)";
        btn.style.backgroundColor = "#FFFFFF";
        btn.style.color = "rgb(204, 89, 101)";

    }else{
        btn.style.backgroundColor = "#FFFFFF";
        btn.style.color = "#AAAAAA";


    }


    btn.addEventListener("click", function(event) {
        event.stopPropagation();

        const icon = this.querySelector('i');
        const newId = recipe.id;
        const currentLikes = parseInt(this.textContent.match(/\d+/)[0]) || 0;

        if (!dataUser.users[indexUser].favorite.id.includes(newId)) {
            // Thêm vào favorite
            dataUser.users[indexUser].favorite.id.push(newId);
            recipes[newId - 1].likes = currentLikes + 1;

            // Cập nhật giao diện
            icon.classList.replace('fa-regular', 'fa-solid');
            this.innerHTML = `<i class="fa-solid fa-heart"></i>&nbsp;${recipes[newId - 1].likes}`;
            this.style.color = "rgb(204, 89, 101)";

            // Hiệu ứng
            this.classList.add('like-animate');
            setTimeout(() => this.classList.remove('like-animate'), 300);
            console.log(newId);
            console.log(recipes.length);
        } else {
            // Xóa khỏi favorite
            dataUser.users[indexUser].favorite.id = dataUser.users[indexUser].favorite.id.filter(id => id !== newId);
            recipes[newId - 1].likes = currentLikes - 1;

            // Cập nhật giao diện
            icon.classList.replace('fa-solid', 'fa-regular');
            this.innerHTML = `<i class="fa-regular fa-heart"></i>&nbsp;${recipes[newId - 1].likes}`;
            this.style.color = "";

            // Hiệu ứng
            this.classList.add('unlike-animate');
            setTimeout(() => this.classList.remove('unlike-animate'), 300);
        }

        // Lưu dữ liệu
        localStorage.setItem("dataUser", JSON.stringify(dataUser));
        localStorage.setItem("recipes", JSON.stringify(recipes));

        numFavorites(dataUser.users[indexUser].favorite.id.length);
    });

    box.appendChild(divChild);
}


// Phân Trang
let TotalQuantityPage = recipes.length;
let NumPage = Math.ceil(TotalQuantityPage/8);

 function pageNt(totalPage, currentPage) {
    let boxFull = document.getElementById("Pagination");
    boxFull.innerHTML= "";

    function createItem(text, page, isActive = false, isDisabled = false) {
        let boxPage = document.createElement("div");

        let boxPageNum = document.createElement("button");
        boxPageNum.innerHTML = text;
        boxPageNum.classList.add("btn-Page")


        if (isDisabled) {
            boxPageNum.disabled = true;
            boxPageNum.classList.add("disabled");
            boxPageNum.classList.remove("btn-Page")
        } else {
            boxPageNum.addEventListener("click", function(){
                pageNt(totalPage, page);
                console.log(page);
                loadPage(page, recipesTemp);
            })

        }

        if (isActive) {
            boxPageNum.classList.add("activeBtn");
            boxPageNum.classList.remove("btn-Page")
        }

        boxPage.appendChild(boxPageNum);
        boxFull.appendChild(boxPage);
    }

    createItem("<img src='../assets/Symbolleft.png' height=\"13\" width=\"14\"  >", currentPage - 1, false, currentPage <= 1);

    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPage, currentPage + 3);

    if (startPage > 1) createItem("...", startPage - 1, false, true);
    //1,2,3
    for (let i = startPage; i < endPage; i++) {
        createItem(i, i, currentPage === i);
    }


    if (endPage + 3 < totalPage) createItem("...", endPage + 1, false, true);




        for (let i = totalPage; i <= totalPage; i++) {
        createItem(i, i, currentPage === i);
    }


    createItem(" <img src='../assets/Symbol.png' height=\"13\" width=\"14\"  >", 0, false, currentPage >= totalPage);


}


pageNt(NumPage, 1);


let inputBox = document.getElementById("search");
let inputBoxCategory = document.getElementById("Category");

inputBox.addEventListener("input", function () {
    let value = inputBox.value.trim();

    box.innerHTML = "";
    if(value === ""){
        loadPage(1,recipes );
        return 0;
    }
      search(value);


});
inputBoxCategory.addEventListener("input", function () {
    let value = inputBoxCategory.value.trim();

    box.innerHTML = "";
    if(value === ""){
        loadPage(1,recipes );
        return 0;
    }
    Category(value);
});

function Category(value){
    let count = 0;

    for(let i = 0 ; i < recipes.length ; i++){
        if (recipes[i].category.toLowerCase().includes(value.toLowerCase())) {
            printRecipe(i, recipes);
            count++;
        }
        if(count === 8){
            break;
        }
    }
}

function search(value){
    let count = 0;

    for(let i = 0 ; i < recipes.length ; i++){
        if (recipes[i].title.toLowerCase().includes(value.toLowerCase())) {
            printRecipe(i, recipes);
            count++;
    }
        if(count === 8){
            break;
        }
    }
}


function Increase(){
    let sortedRecipes = [...recipes];
    sortedRecipes.sort((a, b) => {

        let totalA = a.nutrition.energy + a.nutrition.fat + a.nutrition.carbohydrate + a.nutrition.protein;
        let totalB = b.nutrition.energy + b.nutrition.fat + b.nutrition.carbohydrate + b.nutrition.protein;
        return totalA - totalB;
    });
    recipesTemp = [...sortedRecipes];
    loadPage(1, recipesTemp);
}

function Decrease(){

    let sortedRecipes = [...recipes];
    sortedRecipes.sort((a, b) => {

        let totalA = a.nutrition.energy + a.nutrition.fat + a.nutrition.carbohydrate + a.nutrition.protein;
        let totalB = b.nutrition.energy + b.nutrition.fat + b.nutrition.carbohydrate + b.nutrition.protein;
        return totalB - totalA;
    });
    recipesTemp = [...sortedRecipes];
    loadPage(1, recipesTemp);

}
let num = 0;

function numFavorites(num){
    let numFavorites = document.getElementById("numFavorites");
    numFavorites.innerText = num.toString();



}
function checkFavorites(){

}

let Favorites = document.getElementById("Favorites");
Favorites.addEventListener("click", function(){
    window.location.href = "../page/HomePage.html";
})




let categoryLocal = JSON.parse(localStorage.getItem("category"));
let Category1  = document.getElementById("Category");
for(let i = 0; i < categoryLocal.length - 1; i++){
    console.log("hi");
    let option = document.createElement("option");
    option.text = categoryLocal[i];
    option.value = categoryLocal[i];

    Category1.appendChild(option);

}

// ["Fruit","Meat","Grain","Seafood","Dairy","Vegetable","Nut","Legume","rau","Vegan","Vegetarian dishes","Gluten-Free","Keto","Paleo","Low-Carb","High-Protein","airy-Free","Mediterranean","Asian Cuisine","Italian","Mexican",""]


let receipt = document.getElementById("receipt");


if (receipt) {
    receipt.addEventListener("change", function () {
        console.log(receipt.checked);
        let check = (receipt.checked);
        if(check){
            box.innerHTML = "";
            for(let i = 0 ; i < recipes.length ; i++){
                let food = recipes[i]
                if(food.author === userName){

                    console.log("true");
                    printRecipe(i, recipes);

                }
            }
        }else{
            box.innerHTML = "";
            loadPage(1,recipes );
        }

    });
} else {

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
    let sortedRecipes = [...recipes];
    sortedRecipes.sort((a, b) => {
        let totalA = parseFloat(a?.nutrition?.[nutrientKey]) || 0;
        let totalB = parseFloat(b?.nutrition?.[nutrientKey]) || 0;
        return totalB - totalA;
    });
    recipesTemp = [...sortedRecipes];
    loadPage(1, recipesTemp);
}


