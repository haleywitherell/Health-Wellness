// for global variables


function foodSearchResults(food){
    // Spoonacular API Key
    var spoonAPIKey = "c23f00ad85984a518a8ef39763c81e2b"
    // food = "muffins"; for test purposes
    var queryURL = "https://api.spoonacular.com/food/products/search?query=" + food + "&apiKey=" + spoonAPIKey;
    
    fetch(queryURL)
    .then(function (foodResponse){
        console.log(foodResponse)
        foodResponse.json().then(function (foodData){
            console.log(foodData);
            
            //var totalProducts = data.totalProducts;
            for (var i=0; i<5; i++){
            $(`#search-result-${i}`).empty()
            $(`#search-result-${i}`).append(`
                <img src=${foodData.products[i].image}></img>
                <div>${foodData.products[i].title}</div>
            `);
            };

        });
    });
    
};

function foodSearch(evt){
    evt.preventDefault();
    alert("Here!");
    var searchInput = $("#food-search-input").val().trim();
    
    // quit function if no input when button clicked
    if (searchInput === null){
        return;
    };
    
    // remove search from bar
    $("#food-search-input").val('');

    foodSearchResults(searchInput);
};


// Food search button handler
$("#food-search-btn").on("click", foodSearch);


function exerciseSearch(){

    /* options for searches replaces exercises
    bodypart - waist, upper legs, back, lower legs, chest, upper arms, cardio, shoulders, lower arms, 
    equipment - body weight, cable, leverage machine, assisted, medicine ball, stability ball, 
                band, barbell, dumbbell, kettlebell, sled machine, smith machine, hammer, rope,
                tire, trap bar, stationary bike, wheel roller, weighted, roller, ez barbell

    */
fetch("https://exercisedb.p.rapidapi.com/exercises", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "exercisedb.p.rapidapi.com",
		"x-rapidapi-key": "947315c5d7msh8e150cb96f6debap19e15cjsn514f7b11e3e3"
	}
})
.then(response => {
	console.log(response);
    response.json().then(function(data){
        console.log(data);
    })
})
.catch(err => {
	console.error(err);
});
};

exerciseSearch();


