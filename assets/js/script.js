



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

function exerciseSearch(){

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

