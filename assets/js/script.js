



function foodSearch(food){
    
    // Spoonacular API Key
    var spoonAPIKey = "c23f00ad85984a518a8ef39763c81e2b"
    food = "muffins";
    var queryURL = "https://api.spoonacular.com/food/products/search?query=" + food + "&apiKey=" + spoonAPIKey;
    
    fetch(queryURL)
    .then(function (response){
        console.log(response)
        response.json().then(function (data){
            console.log(data);
        });
    });
    
};

// Search button handler
$("#search-btn").on("click", foodSearch);