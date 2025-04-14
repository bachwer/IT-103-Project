let boxFull = document.getElementById("imgReceiptContainer23ValueTotal");
let Detail = JSON.parse(localStorage.getItem('Detail'));
let boxFull1 = document.getElementById("padding");
let recipes = JSON.parse(localStorage.getItem('recipes'));
let userName = localStorage.getItem('userName');
let indexUser =+ localStorage.getItem("indexUser");



console.log(recipes[1].nutritionData);


boxFull.innerHTML = "";
let i = 0;
for (let key in recipes[0].nutritionData) {
    console.log("2");
    i++;

    let nutrient = Detail.nutritionData[key];

    let box = document.createElement("div");
    box.innerHTML = `

    <div class="imgReceiptContainer23Value">
        <span>${nutrient.name}</span>
        <span><span>${nutrient.value} </span> ${nutrient.unit}</span>
    </div>

    `;
    if (i % 2 === 0) {
        box.classList.add("gray1");
    } else {
        box.classList.add("gray2");
    }


    boxFull.appendChild(box);
}





for(let i = 0; i <Detail.ingredients.length ; i++) {
    let box = document.createElement("div");
    box.innerHTML = `


    <div class="informationReceiptContainerValue1Text">
       ${Detail.ingredients[i]}

    </div>

    `;
    boxFull1.appendChild(box);


}


let box = document.getElementById("informationReceiptContainerValue2Box");
console.log(Detail.description.length);
box.innerHTML="";
for(let i = 1; i < Detail.description.length ; i++) {
    // console.log(Detail.description[i]);
    let text = document.createElement("div");
    text.innerHTML = `
        <div class="informationReceiptContainerValue2Box">
           <div class="informationReceiptContainerValue2Box2">
             ${i}
           </div>
           <div class="ch" id="text">
                ${Detail.description[i]}
           </div>
    
    `
    box.appendChild(text);


}







new Chart("myChart", {
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
                font: { size: 14 }

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
            data: [Detail.nutrition.fat, Detail.nutrition.carbohydrate, Detail.nutrition.protein]
        }]
    },
    plugins: [ChartDataLabels]
});


loadName();

function loadName(){
    let kcal = document.getElementById("kcal");
    let imgReceiptContainer = document.getElementById("imgReceiptContainer");
    let name = document.getElementById("name");
    let author = document.getElementById("author");
    let totalTime = document.getElementById("total_time");
    let preparationTime = document.getElementById("preparation_time");
    let finalWeight = document.getElementById("final_weight");
    let portions = document.getElementById("portions");
    let description = document.getElementById("description");
    let fatValue = document.getElementById("fatValue");
    let CarbohydrateValue = document.getElementById("carbohydrateValue");
    let ProteinValue = document.getElementById("ProteinValue");
    let FiberValue = document.getElementById("fiberValue");
    author.innerText = Detail.author;
    name.innerText = Detail.title;
    totalTime.innerText = Detail.totalTime;
    preparationTime.innerText = Detail.preparationTime;
    finalWeight.innerText = Detail.finalWeight;
    portions.innerText = Detail.portions;
    description.innerText = Detail.description[0];

    imgReceiptContainer.style.setProperty("--bg-img", `url("${Detail.img}")`);
    kcal.innerText = (Detail.nutrition.energy).toString() + " ";

    fatValue.innerText = ( Detail.nutrition.fat).toString() + "g";
    CarbohydrateValue.innerText = (Detail.nutrition.carbohydrate).toString() + "g";
    ProteinValue.innerText = (Detail.nutrition.protein).toString() + "g";
    FiberValue.innerText = "0g";
    //color 0
}

let imgReceipt = document.getElementById("imgReceipt");
let type;
let imgType;
let clasType;

loadBoxImg();

function loadBoxImg(){
    let dataUser = JSON.parse(localStorage.getItem("dataUser"));

    let arr =  dataUser.users[indexUser].favorite.id;
    const hasNumber2 = arr.includes(Detail.id);

    let color;
    if(hasNumber2){
        color = "red";
    }else{
        color = "";
    }



    if(userName === Detail.author){
        type = "My Recipes";
        imgType = "../assets/border_color.png";
        clasType = "titleBar223"
    }else{
        type = "Community Recipes";
        imgType = "../assets/iconCommunity.png";
        clasType = "titleBar311"
    }
    imgReceipt.innerHTML="";
    imgReceipt.innerHTML = `
<div class="titleBar11 " >
        <img src=${imgType} alt="">
        <span class="${clasType}">${type}</span>
        
      </div>
      <button id="btnHeart"><i class="fa-solid fa-heart" style="color: ${color};"></i><span class= ${color}>${Detail.likes}</span></button>
`

}


let Favorites1 = document.getElementById("Favorites1");
let dataUser = JSON.parse(localStorage.getItem("dataUser"));


Favorites1.addEventListener("click", function(){
    let arr =  dataUser.users[indexUser].favorite.id;
    const hasNumber2 = arr.includes(Detail.id);
    console.log(hasNumber2);
    if(hasNumber2){
        let index = dataUser.users[indexUser].favorite.id.indexOf(Detail.id)
        dataUser.users[indexUser].favorite.id.splice(index,1)
        if(Detail.likes > 0){
            Detail.likes = Detail.likes - 1;
            console.log(Detail.id + "-1");
        }
    }else{
        dataUser.users[indexUser].favorite.id.push(Detail.id)
        console.log(Detail.id);

        for(let i = 0; i < recipes.length; i++){
            if(Detail.id === recipes[i].id){
                recipes[i].likes = Detail.likes + 1;
            }
        }
        Detail.likes = Detail.likes + 1;
    }
    localStorage.setItem("dataUser", JSON.stringify(dataUser));
    localStorage.setItem("Detail", JSON.stringify(Detail));
    localStorage.setItem("recipes", JSON.stringify(recipes));

    loadBoxImg()
});












