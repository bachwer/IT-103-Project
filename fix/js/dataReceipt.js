const recipes = [
    { id: 1, title: "Green Beans With Tofu and Roasted Peanuts (lowfodmap)", author: "Joana Jardim", category: "Vegetarian dishes", nutrition: { energy: 99, fat: 6, carbohydrate: 5, protein: 6 }, likes: 22, by: "100g", img: "https://thefodmapfactor.com/wp-content/uploads/2021/04/TheFODMAPFactor-Sticky-Peanut-Green-Beans-2.jpg"},
    { id: 2, title: "Turmeric Roasted Cauliflower Salad", author: "John Doe", category: "Vegan", nutrition: { energy: 120, fat: 8, carbohydrate: 10, protein: 4 }, likes: 10, by: "150g", img: "https://freshchoice.imgix.net/assets/Charred-Turmeric-Cauliflower-Salad.jpg" },
    { id: 3, title: "Spaghetti Aglio e Olio", author: "Jamie Oliver", category: "Vegan", nutrition: { energy: 150, fat: 10, carbohydrate: 20, protein: 5 }, likes: 300, by: "120g", img: "https://www.vincenzosplate.com/wp-content/uploads/2023/11/1500x1500-Photo-5_2679-How-to-Make-Spaghetti-Aglio-e-Olio-Like-an-Italian-V1.jpg" },
    { id: 4, title: "Avocado Toast with Cherry Tomatoes", author: "Martha Stewart", category: "Vegetarian dishes", nutrition: { energy: 250, fat: 15, carbohydrate: 30, protein: 7 }, likes: 450, by: "130g", img: "https://images.squarespace-cdn.com/content/v1/60f9bc54b58d9f20a4dbc2c4/1654701403965-2PAB4QUN2FK0HA1GOES8/IMG_4169a.JPG" },
    { id: 5, title: "Miso Glazed Eggplant", author: "David Chang", category: "Vegan", nutrition: { energy: 180, fat: 7, carbohydrate: 15, protein: 6 }, likes: 275, by: "140g", img: "https://hikarimiso.com/wp-content/uploads/2021/11/Miso-Glazed-Eggplant_HikariMiso.jpg" },
    { id: 6, title: "Chickpea Salad with Lemon Dressing", author: "Ina Garten", category: "Vegetarian dishes", nutrition: { energy: 220, fat: 9, carbohydrate: 25, protein: 8 }, likes: 500, by: "110g", img: "https://www.rhubarbarians.com/wp-content/uploads/2019/03/lemon-chickpea-arugula-salad-featured.jpg" },
    { id: 7, title: "Grilled Portobello Mushrooms", author: "Gordon Ramsay", category: "Vegan", nutrition: { energy: 130, fat: 5, carbohydrate: 10, protein: 7 }, likes: 350, by: "125g", img: "https://www.jessicagavin.com/wp-content/uploads/2021/06/grilled-portobello-mushrooms-11-1200.jpg" },
    { id: 8, title: "Lentil Soup with Spinach", author: "Nigella Lawson", category: "Vegetarian dishes", nutrition: { energy: 200, fat: 6, carbohydrate: 30, protein: 10 }, likes: 400, by: "100g", img: "https://theflavoursofkitchen.com/wp-content/uploads/2018/08/Spinach-Lentil-Soup-3-500x375.jpg" },
    { id: 9, title: "Vegan Tofu Scramble", author: "Alice Waters", category: "Vegan", nutrition: { energy: 180, fat: 8, carbohydrate: 5, protein: 12 }, likes: 320, by: "135g", img: "https://cdn.loveandlemons.com/wp-content/uploads/2021/01/tofu-scramble-2.jpg" }
];

// Thêm dữ liệu mẫu
for (let i = 10; i <= 100; i++) {
    recipes.push({
        title: `Recipe ${i}: Vegetarian Delight`,
        img: "https://www.foodiesfeed.com/wp-content/uploads/2023/06/boiled-eggs-on-a-plate.jpg",
        author: i % 2 === 0 ? "Chef Alex" : "Chef Maria",
        category: i % 3 === 0 ? "Vegan" : "Vegetarian dishes",
        nutrition: {
            energy: 90 + (i % 30),           // 90 -> 119
            fat: 5 + (i % 5),                // 5 -> 9
            carbohydrate: 6 + (i % 10),      // 6 -> 15
            protein: 4 + (i % 6)             // 4 -> 9
        },
        likes: Math.floor(Math.random() * 500) + 1,
        by: `${100 + (i % 50)}g`,
        totalTime: `${20 + Math.floor(Math.random() * 40)} minutes`,
        preparationTime: `${10 + Math.floor(Math.random() * 20)} minutes`,
        finalWeight: `${100 + Math.floor(Math.random() * 100)}g`,
        portions: Math.floor(Math.random() * 4) + 1,
        description: ["A delicious and healthy dish perfect for any meal.",  "ssA delicious and healthy dish perfect for any meal."],
        id: i,
    });
}

const ingredientsList = [
    ["2 cups fresh basil leaves, packed (can sub half the basil leaves with baby spinach)", "1/2 cup extra virgin olive oil", "1/3 cup pine nuts (can sub chopped walnuts)", "3 garlic cloves, minced (about 3 teaspoons)", "Salt and freshly ground black pepper to taste", "1/4 Cup of nutritional Yeast (15 g)"],
    ["1 cup quinoa, rinsed", "2 cups water", "1/2 teaspoon salt", "1/4 cup chopped parsley", "1/4 cup diced red bell pepper", "2 tablespoons lemon juice"],
    ["1 medium sweet potato, peeled and diced", "1 tablespoon olive oil", "1/2 teaspoon paprika", "1/4 teaspoon garlic powder", "Salt and pepper to taste"],
    ["1 avocado, mashed", "1 slice whole grain bread", "1/2 teaspoon lemon juice", "Pinch of salt", "1 tablespoon feta cheese"],
    ["2 cups chopped kale", "1 tablespoon olive oil", "1 teaspoon apple cider vinegar", "1/4 cup shredded carrots", "2 tablespoons pumpkin seeds"]
];

// Thêm danh sách nguyên liệu ngẫu nhiên vào mỗi món ăn
recipes.forEach(recipe => {
    const randomIndex = Math.floor(Math.random() * ingredientsList.length);
    recipe.ingredients = ingredientsList[randomIndex];
});









recipes[0].totalTime = "45 minutes";
recipes[0].preparationTime = "20 minutes";
recipes[0].finalWeight = "150g";
recipes[0].portions = 2;
recipes[0].description = ["A delicious and healthy dish perfect for any meal.",  "ssA delicious and healthy dish perfect for any meal."],

recipes[1].totalTime = "30 minutes";
recipes[1].preparationTime = "15 minutes";
recipes[1].finalWeight = "200g";
recipes[1].portions = 3;
recipes[1].description = ["A delicious and healthy dish perfect for any meal.",  "ssA delicious and healthy dish perfect for any meal."];

recipes[2].totalTime = "25 minutes";
recipes[2].preparationTime = "10 minutes";
recipes[2].finalWeight = "120g";
recipes[2].portions = 1;
recipes[2].description = ["A delicious and healthy dish perfect for any meal.",  "ssA delicious and healthy dish perfect for any meal."];

recipes[3].totalTime = "3n =minutes";
recipes[3].preparationTime = "15 minutes";
recipes[3].finalWeight = "130g";
recipes[3].portions = 2;
recipes[3].description = ["A delicious and healthy dish perfect for any meal.",  "ssA delicious and healthy dish perfect for any meal."];

recipes[4].totalTime = "40 minutes";
recipes[4].preparationTime = "20 minutes";
recipes[4].finalWeight = "140g";
recipes[4].portions = 4;
recipes[4].description = ["A delicious and healthy dish perfect for any meal.",  "ssA delicious and healthy dish perfect for any meal."];

recipes[5].totalTime = "45 minutes";
recipes[5].preparationTime = "20 minutes";
recipes[5].finalWeight = "150g";
recipes[5].portions = 2;
recipes[5].description = ["A delicious and healthy dish perfect for any meal.",  "ssA delicious and healthy dish perfect for any meal."];

recipes[6].totalTime = "30 minutes";
recipes[6].preparationTime = "15 minutes";
recipes[6].finalWeight = "200g";
recipes[6].portions = 3;
recipes[6].description = ["A delicious and healthy dish perfect for any meal.",  "ssA delicious and healthy dish perfect for any meal."];

recipes[7].totalTime = "25 minutes";
recipes[7].preparationTime = "10 minutes";
recipes[7].finalWeight = "120g";
recipes[7].portions = 1;
recipes[7].description = ["A delicious and healthy dish perfect for any meal.",  "ssA delicious and healthy dish perfect for any meal."];

recipes[8].totalTime = "35 minutes";
recipes[8].preparationTime = "15 minutes";
recipes[8].finalWeight = "130g";
recipes[8].portions = 2;
recipes[8].description = ["A delicious and healthy dish perfect for any meal.",  "ssA delicious and healthy dish perfect for any meal."];

const nutritionData = [
    { name: "Sodium", unit: "mg", max: 20 },
    { name: "Vitamin A", unit: "ug", max: 100 },
    { name: "Vitamin B-6", unit: "mg", max: 5 },
    { name: "Vitamin B-12", unit: "ug", max: 3 },
    { name: "Vitamin C", unit: "mg", max: 50 },
    { name: "Vitamin D (D2 + D3)", unit: "ug", max: 10 },
    { name: "Vitamin E", unit: "mg", max: 7 },
    { name: "Vitamin K", unit: "ug", max: 80 },
    { name: "Sugars", unit: "g", max: 10 },
    { name: "Calcium", unit: "mg", max: 200 },
    { name: "Iron", unit: "mg", max: 15 },
    { name: "Magnesium", unit: "mg", max: 300 },
    { name: "Phosphorus", unit: "mg", max: 250 },
    { name: "Potassium", unit: "mg", max: 500 },
    { name: "Zinc", unit: "mg", max: 10 },
    { name: "Copper", unit: "mg", max: 3 },
    { name: "Fluoride", unit: "ug", max: 2 },
    { name: "Manganese", unit: "mg", max: 5 },
    { name: "Selenium", unit: "ug", max: 55 },
    { name: "Thiamin", unit: "mg", max: 1.5 },
    { name: "Riboflavin", unit: "mg", max: 1.3 },
    { name: "Niacin", unit: "mg", max: 20 },
    { name: "Pantothenic acid", unit: "mg", max: 7 },
    { name: "Folate, total", unit: "ug", max: 400 }
];

// Hàm random giá trị từ 0 đến max, giữ 2 số thập phân
const getRandomValue = (max) => (Math.random() * max).toFixed(2);

// Thêm mảng `nutritionData` vào `recipes`
recipes.forEach(recipe => {
    recipe.nutritionData = nutritionData.map(nutrient => ({
        name: nutrient.name,
        value: getRandomValue(nutrient.max),
        unit: nutrient.unit
    }));
});







let foods = [
    {"name": "Apple", "source": "McCance and Widdowson's", "energy": 52, "fat": 0.2, "carbohydrate": 14, "protein": 0.3, "category": "Fruit", "quantity": 1},
    {"name": "Banana", "source": "McCance and Widdowson's", "energy": 89, "fat": 0.3, "carbohydrate": 23, "protein": 1.1, "category": "Fruit", "quantity": 1},
    {"name": "Chicken Breast", "source": "McCance and Widdowson's", "energy": 165, "fat": 3.6, "carbohydrate": 0, "protein": 31, "category": "Meat", "quantity": 1},
    {"name": "Rice, White", "source": "McCance and Widdowson's", "energy": 130, "fat": 0.3, "carbohydrate": 28, "protein": 2.7, "category": "Grain", "quantity": 1},
    {"name": "Salmon", "source": "McCance and Widdowson's", "energy": 208, "fat": 13, "carbohydrate": 0, "protein": 20, "category": "Seafood", "quantity": 1},
    {"name": "Egg", "source": "McCance and Widdowson's", "energy": 155, "fat": 11, "carbohydrate": 1.1, "protein": 13, "category": "Dairy", "quantity": 1},
    {"name": "Milk", "source": "McCance and Widdowson's", "energy": 42, "fat": 1, "carbohydrate": 5, "protein": 3.4, "category": "Dairy", "quantity": 1},
    {"name": "Cheese", "source": "McCance and Widdowson's", "energy": 402, "fat": 33, "carbohydrate": 1.3, "protein": 25, "category": "Dairy", "quantity": 1},
    {"name": "Beef", "source": "McCance and Widdowson's", "energy": 250, "fat": 15, "carbohydrate": 0, "protein": 26, "category": "Meat", "quantity": 1},
    {"name": "Potato", "source": "McCance and Widdowson's", "energy": 77, "fat": 0.1, "carbohydrate": 17, "protein": 2, "category": "Vegetable", "quantity": 1},
    {"name": "Broccoli", "source": "McCance and Widdowson's", "energy": 55, "fat": 0.6, "carbohydrate": 11, "protein": 3.7, "category": "Vegetable", "quantity": 1},
    {"name": "Carrot", "source": "McCance and Widdowson's", "energy": 41, "fat": 0.2, "carbohydrate": 10, "protein": 0.9, "category": "Vegetable", "quantity": 1},
    {"name": "Almonds", "source": "McCance and Widdowson's", "energy": 579, "fat": 50, "carbohydrate": 22, "protein": 21, "category": "Nut/Seed", "quantity": 1},
    {"name": "Walnuts", "source": "McCance and Widdowson's", "energy": 654, "fat": 65, "carbohydrate": 14, "protein": 15, "category": "Nut/Seed", "quantity": 1},
    {"name": "Peanuts", "source": "McCance and Widdowson's", "energy": 567, "fat": 49, "carbohydrate": 16, "protein": 26, "category": "Nut/Seed", "quantity": 1},
    {"name": "Spinach", "source": "McCance and Widdowson's", "energy": 23, "fat": 0.4, "carbohydrate": 3.6, "protein": 2.9, "category": "Vegetable", "quantity": 1},
    {"name": "Tofu", "source": "McCance and Widdowson's", "energy": 144, "fat": 8, "carbohydrate": 3.9, "protein": 15, "category": "Legume", "quantity": 1},

];



const generateNutritionData = (food) => {
    return {
        cholesterol: { name: "Cholesterol", value: Math.floor(Math.random() * 500), unit: "mg" },
        fiber: { name: "Fiber", value: (Math.random() * 10).toFixed(1), unit: "g" },
        sodium: { name: "Sodium", value: Math.floor(Math.random() * 500), unit: "mg" },
        water: { name: "Water", value: (Math.random() * 100).toFixed(1), unit: "g" },
        vitaminA: { name: "Vitamin A", value: (Math.random() * 500).toFixed(1), unit: "µg" },
        vitaminB6: { name: "Vitamin B-6", value: (Math.random() * 5).toFixed(1), unit: "mg" },
        vitaminB12: { name: "Vitamin B-12", value: (Math.random() * 10).toFixed(1), unit: "µg" },
        vitaminC: { name: "Vitamin C", value: (Math.random() * 100).toFixed(1), unit: "mg" },
        vitaminD: { name: "Vitamin D (D2 + D3)", value: (Math.random() * 50).toFixed(1), unit: "µg" },
        vitaminE: { name: "Vitamin E", value: (Math.random() * 50).toFixed(1), unit: "mg" },
        vitaminK: { name: "Vitamin K", value: (Math.random() * 100).toFixed(1), unit: "µg" },
        starch: { name: "Starch", value: (Math.random() * 20).toFixed(1), unit: "g" },
        lactose: { name: "Lactose", value: (Math.random() * 20).toFixed(1), unit: "g" },
        alcohol: { name: "Alcohol", value: (Math.random() * 10).toFixed(1), unit: "g" },
        caffeine: { name: "Caffeine", value: (Math.random() * 100).toFixed(1), unit: "mg" },
        sugars: { name: "Sugars", value: (Math.random() * 50).toFixed(1), unit: "g" },
        calcium: { name: "Calcium", value: Math.floor(Math.random() * 1000), unit: "mg" },
        iron: { name: "Iron", value: (Math.random() * 20).toFixed(1), unit: "mg" },
        magnesium: { name: "Magnesium", value: Math.floor(Math.random() * 500), unit: "mg" },
        phosphorus: { name: "Phosphorus", value: Math.floor(Math.random() * 500), unit: "mg" },
        potassium: { name: "Potassium", value: Math.floor(Math.random() * 1000), unit: "mg" },
        zinc: { name: "Zinc", value: (Math.random() * 20).toFixed(1), unit: "mg" },
        copper: { name: "Copper", value: (Math.random() * 5).toFixed(1), unit: "mg" },
        fluoride: { name: "Fluoride", value: (Math.random() * 5).toFixed(1), unit: "mg" },
        manganese: { name: "Manganese", value: (Math.random() * 5).toFixed(1), unit: "mg" },
        selenium: { name: "Selenium", value: (Math.random() * 100).toFixed(1), unit: "µg" },
        thiamin: { name: "Thiamin", value: (Math.random() * 2).toFixed(1), unit: "mg" },
        riboflavin: { name: "Riboflavin", value: (Math.random() * 2).toFixed(1), unit: "mg" },
        niacin: { name: "Niacin", value: (Math.random() * 50).toFixed(1), unit: "mg" },
        pantothenicAcid: { name: "Pantothenic acid", value: (Math.random() * 10).toFixed(1), unit: "mg" },
        folateTotal: { name: "Folate, total", value: (Math.random() * 500).toFixed(1), unit: "µg" },
        folicAcid: { name: "Folic acid", value: (Math.random() * 50).toFixed(1), unit: "µg" },
        fattyAcidsTrans: { name: "Fatty acids, total trans", value: (Math.random() * 1).toFixed(1), unit: "g" },
        fattyAcidsSaturated: { name: "Fatty acids, total saturated", value: (Math.random() * 10).toFixed(1), unit: "g" },
        fattyAcidsMonounsaturated: { name: "Fatty acids, total monounsaturated", value: (Math.random() * 10).toFixed(1), unit: "g" },
        fattyAcidsPolyunsaturated: { name: "Fatty acids, total polyunsaturated", value: (Math.random() * 10).toFixed(1), unit: "g" },
        chloride: { name: "Chloride", value: Math.floor(Math.random() * 1000), unit: "mg" }
    };
};



foods.forEach(food => {
    food.nutritionData = generateNutritionData(food);
});



localStorage.setItem("foods", JSON.stringify(foods));
localStorage.setItem("recipes", JSON.stringify(recipes));
