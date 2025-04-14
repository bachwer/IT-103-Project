
    var recipes = JSON.parse(localStorage.getItem('recipes')) || [];

document.addEventListener('DOMContentLoaded', function() {
    let box = document.getElementById("contentHomePage");
    let dataUser = JSON.parse(localStorage.getItem("dataUser")) || { users: [] };
    let indexUser = localStorage.getItem("indexUser");
    let favoriteIds = dataUser.users[indexUser].favorite.id;
    let btnCommunity = document.getElementById("btnCommunity");
    btnCommunity.addEventListener("click", async () => {
        window.location.href = "../page/ReceiptPage.html";
    })

    let userName = dataUser.users[indexUser].userName;

    if(favoriteIds.length === 0){

    }else{
        box.innerHTML=``;
    }


    // Initialize the page
    window.loadPage = loadPage;
    loadPage(1, recipes);





    function loadPage(page, list) {
        box.innerHTML = '';
        page--;
        let startIndex = page * 8;

        let endIndex = Math.min(startIndex + 8, favoriteIds.length);


        // Only loop through valid indices
        for(let i = startIndex; i < endIndex; i++) {
            let recipeId = favoriteIds[i];
            if (recipeId !== undefined) {
                printRecipe(recipeId, list);
            }
        }
    }
    window.loadPage2 = loadPage2;
    function loadPage2(page, list) {
        box.innerHTML = '';
        page--;
        let startIndex = page * 8;

        let endIndex = Math.min(startIndex + 8, list.length);


        for(let i = startIndex; i < endIndex; i++) {
            let recipeId = list[i].id;
                printRecipe(recipeId, recipes);
                console.log(recipeId)

        }
    }

    function printRecipe(i, list) {
        let recipe = list[i-1];
        if (!recipe) return;

        let divChild = document.createElement("div");
        let img = recipe.img;
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
            <img src="${img}" alt="">
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
                <div class="c"><span class="a">By</span><br> <span class="b">${recipe.by}</span></div>
                <div class="c"><span class="a">Energy</span><br><strong style="font-weight: bold">${recipe.nutrition.energy} kcal</strong></div>
                <div class="c"><span class="a">Fat</span><br><span>${(recipe.nutrition.fat).toFixed(1)}</span> g</div>
                <div class="c"><span class="a">Carbohydrate</span><br> <span>${(recipe.nutrition.carbohydrate).toFixed(1)} g</span></div>
                <div class="c"><span class="a">Protein</span><br> <span>${(recipe.nutrition.protein).toFixed(1)} g</span></div>
            </div>
        </div>
    `;
        divChild.classList.add("contentBox");

        divChild.addEventListener("click", function () {
            localStorage.setItem("Detail", JSON.stringify(recipe));
            window.location.href = "../page/DetailReceiptPage.html";
        });
        const icon = divChild.querySelector("i");
        const btn = divChild.querySelector("button");
        icon.classList.replace('fa-regular', 'fa-solid');
        btn.style.backgroundColor = "rgb(255,255,255)";
        btn.style.color =  "rgb(204, 89, 101)";

        btn.addEventListener("click", function (event) {
            event.stopPropagation();
            let newId = recipe.id;
            console.log(newId);

            let index = dataUser.users[indexUser].favorite.id.indexOf(newId);
            console.log(dataUser.users[indexUser].favorite.id.indexOf(newId - 1))
            if (index !== -1) {
                dataUser.users[indexUser].favorite.  id.splice(index, 1);
            }
            console.log(index);

            localStorage.setItem("dataUser", JSON.stringify(dataUser));

            // Reload the current page after removing the favorite
            let currentPage = Math.floor(index / 8) + 1;
            loadPage(currentPage, recipes);


            pageNt(calculateTotalPages(), 1);
        });

        box.appendChild(divChild);
    }

    function calculateTotalPages() {
        let totalItems = dataUser.users[indexUser].favorite.id.length + 1;
        return Math.max(1, Math.ceil(totalItems / 7));
    }

    // Initialize pagination
    let totalPages = calculateTotalPages();
    pageNt(totalPages, 1);

    function pageNt(totalPage, currentPage) {
        let boxFull = document.getElementById("Pagination");
        // Check if Pagination element exists
        if (!boxFull) {
            console.error("Pagination element not found");
            return;
        }

        boxFull.innerHTML = "";

        if (totalPage === 0 || dataUser.users[indexUser].favorite.id.length === 0) {
            // No need for pagination when there are no favorites
            return;
        }

        function createItem(text, page, isActive = false, isDisabled = false) {
            let boxPage = document.createElement("div");
            let boxPageNum = document.createElement("button");
            boxPageNum.innerHTML = text;
            boxPageNum.classList.add("btn-Page");

            if (isDisabled) {
                boxPageNum.disabled = true;
                boxPageNum.classList.add("disabled");
                boxPageNum.classList.remove("btn-Page");
            } else {
                boxPageNum.addEventListener("click", function(){
                    pageNt(totalPage, page);
                    loadPage(page, recipes);
                });
            }

            if (isActive) {
                boxPageNum.classList.add("activeBtn");
                boxPageNum.classList.remove("btn-Page");
            }

            boxPage.appendChild(boxPageNum);
            boxFull.appendChild(boxPage);
        }

        createItem("<img src='../assets/Symbolleft.png' height=\"13\" width=\"14\"  >", currentPage - 1, false, currentPage <= 1);

        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPage, currentPage + 3);

        if (startPage > 1) createItem("...", startPage - 1, false, true);


        for (let i = startPage; i < endPage; i++) {
            createItem(i, i, currentPage === i);
        }

        if (endPage + 3 < totalPage) createItem("...", endPage + 1, false, true);

        for (let i = totalPage; i <= totalPage; i++) {
            createItem(i, i, currentPage === i);
        }

        createItem(" <img src='../assets/Symbol.png' height=\"13\" width=\"14\"  >", currentPage + 1, false, currentPage >= totalPage);
    }

    let Category1  = document.getElementById("Category");


    Category1.addEventListener("input", function () {
        let value = Category1.value.trim();

        box.innerHTML = "";
        if(value === ""){
            loadPage(1,recipes );
            return 0;
        }
        Category(value);

    });

    function Category(value){
        let count = 0;
        let favoriteIds = dataUser.users[indexUser].favorite.id;
        for(let i = 0 ; i < favoriteIds.length ; i++){
            if (recipes[favoriteIds[i]].category.toLowerCase().includes(value.toLowerCase())) {
                printRecipe(favoriteIds[i], recipes);
                count++;
            }
            if(count === 8){
                break;
            }
        }
    }

    let inputBox = document.getElementById("search");
    inputBox.addEventListener("input", function () {
            let value = inputBox.value.trim();

            box.innerHTML = "";
            if(value === ""){
                loadPage(1,recipes );
                return 0;
            }
            search(value);

        });

    function search(value){
        let count = 0;
        let favoriteIds = dataUser.users[indexUser].favorite.id;
        for(let i = 0 ; i < favoriteIds.length ; i++){
            if (recipes[favoriteIds[i]].title.toLowerCase().includes(value.toLowerCase())) {
                printRecipe(favoriteIds[i], recipes);
                count++;
            }
            if(count === 8){
                break;
            }
        }
    }




});

    function Increase(){
        let sortedRecipes = [...recipes];
        process(sortedRecipes)
        sortedRecipes.sort((a, b) => {
            let totalA = a.nutrition.energy + a.nutrition.fat + a.nutrition.carbohydrate + a.nutrition.protein;
            let totalB = b.nutrition.energy + b.nutrition.fat + b.nutrition.carbohydrate + b.nutrition.protein;
            return totalA - totalB;
        });
        loadPage2(1, sortedRecipes);
    }


    function Decrease(){
        let sortedRecipes = [...recipes];
        process(sortedRecipes)
        sortedRecipes.sort((a, b) => {
            let totalA = a.nutrition.energy + a.nutrition.fat + a.nutrition.carbohydrate + a.nutrition.protein;
            let totalB = b.nutrition.energy + b.nutrition.fat + b.nutrition.carbohydrate + b.nutrition.protein;
            return totalB - totalA;
        });

        loadPage2(1, sortedRecipes);
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
        process(sortedRecipes)

        for(let i = 0; i < sortedRecipes.length - 1; i++) {
            for(let j = i + 1; j < sortedRecipes.length; j++) {
                const valI = parseFloat(sortedRecipes[i]?.nutrition?.[nutrientKey] || 0);
                const valJ = parseFloat(sortedRecipes[j]?.nutrition?.[nutrientKey] || 0);


                if(valI < valJ) {
                    [sortedRecipes[i], sortedRecipes[j]] = [sortedRecipes[j], sortedRecipes[i]];
                }
            }

        }
        console.log(sortedRecipes);
        loadPage2(1, sortedRecipes);
    }

    function process(sortedRecipes) {
        let dataUser = JSON.parse(localStorage.getItem("dataUser")) || { users: [] };
        let indexUser = localStorage.getItem("indexUser");
        let check = dataUser.users[indexUser].favorite.id;
        for (let i = sortedRecipes.length - 1; i >= 0; i--) {
            if (!check.includes(sortedRecipes[i].id)) {
                sortedRecipes.splice(i, 1);
            }
        }

    }







