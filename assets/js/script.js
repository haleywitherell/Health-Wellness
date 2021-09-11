// for global variables
var foodAPI;
var newPage = 0;
var foodOrExercise = 0;

// function for food api call
function foodSearchResults(food){
    // Spoonacular API Key
    foodOrExercise = 1;
    var spoonAPIKey = "c23f00ad85984a518a8ef39763c81e2b"
    var queryURL = "https://api.spoonacular.com/food/products/search?query=" + food + "&number=100&apiKey=" + spoonAPIKey;
    
    fetch(queryURL)
    .then(function (foodResponse){
        console.log(foodResponse)
        foodResponse.json().then(function (foodData){
            console.log(foodData);
            foodAPI = foodData;
            newPage = 0;          
            createSearchResults(foodAPI, newPage);
        });
    });
    
};

// function to append the search results to the dom
function createSearchResults(searchedItem, page){
    
    if(foodAPI === null){
        return;
    }
    // loop for food search results
    var j = 0;
    for (var i=page; i<page+4; i++){
        console.log(i);
        $(`#search-result-${j}`).empty()
        $(`#search-result-${j}`).append(`
            <img src=${searchedItem.products[i].image}></img>
            <div>${searchedItem.products[i].title}</div>
            <div class="options">
            <label class="label">Select A Day</label>
            <div class="control">
            <div class="select">
            <select id=${j}>
            <option>Select a Day</option>
            <option>Sunday</option>
            <option>Monday</option>
            <option>Tuesday</option>
            <option>Wednesday</option>
            <option>Thursday</option>
            <option>Friday</option>
            <option>Saturday</option>
            </select>
            </div>
            </div>
            </div>
        `);
        j++
        newPage = i;
    };
    // function for sending drop down bar info to calander 
    $("select").change(function(){
        var day = $(this).val()
        var pickedResult = $(this).attr("id")
    
        var newP = $("<p>").text($("#search-result-" + pickedResult).children()[1].textContent)
        $(`#${day}`).append(newP)
    
    })
};


// $("document").on("change", "select", function() {
//     console.log("there was change")
// })
// function for initial food search
function foodSearch(evt){
    evt.preventDefault();
    
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
// Next result button handler
$(".next-result").on("click", function(evt){
    if(foodOrExercise === 0){
        return;
    };
    if(foodOrExercise === 1){
        createSearchResults(foodAPI, newPage);
    };
    if(foodOrExercise ===2){
        createExerciseSearchResults(exerciseAPI);
    };
});

var exerciseAPI;


// console.log($("select"))

function exerciseSearch(){
    
    foodOrExercise = 2;
    fetch("https://exercisedb.p.rapidapi.com/exercises", {
	    "method": "GET",
	    "headers": {
		    "x-rapidapi-host": "exercisedb.p.rapidapi.com",
		    "x-rapidapi-key": "947315c5d7msh8e150cb96f6debap19e15cjsn514f7b11e3e3"
	    }
    })
    .then(exerciseResponse => {
	    console.log(exerciseResponse);
        exerciseResponse.json().then(function(exerciseData){
            console.log(exerciseData[Math.floor(Math.random()*1326)]);
            exerciseAPI = exerciseData;
        
            createExerciseSearchResults(exerciseAPI);
            });
        });
    };

function createExerciseSearchResults(searchedItem){
    
    var j;
    for (var i=0; i<4; i++) {
        $(`#search-result-${i}`). empty()
        var j = [Math.floor(Math.random()*1326)];
        $(`#search-result-${i}`).append(`
            <img src=${searchedItem[j].gifUrl}></img>
            <div>${searchedItem[j].name}</div>
        `)
    };
};

$("#exercise-search-btn").on("click", exerciseSearch);


//console.log(exerciseData[Math.floor(Math.random())].name);
//console.log(exerciseData[0].name)

// exerciseSearch();





    /* options for searches replaces exercises
    bodypart - waist, upper legs, back, lower legs, chest, upper arms, cardio, shoulders, lower arms, 
    equipment - body weight, cable, leverage machine, assisted, medicine ball, stability ball, 
                band, barbell, dumbbell, kettlebell, sled machine, smith machine, hammer, rope,
                tire, trap bar, stationary bike, wheel roller, weighted, roller, ez barbell

    */