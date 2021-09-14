// for global variables
var foodAPI;
var newPage = 0;
var foodOrExercise = 0;
var savedDay = {
    Sunday: [],
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: []
};
var dayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
var exerciseAPI;


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
        console.log(pickedResult);
        day = day.trim();
        console.log(day);
        var newP = $("<p>").text($("#search-result-" + pickedResult).children()[1].textContent)
        var savedFood = ($("#search-result-" + pickedResult).children()[1].textContent);
        console.log(savedFood);
        console.log(savedDay[day])
        savedDay[day].push(savedFood);
        console.log(savedDay[day])
        
        $(`#${day}`).prepend(newP)
        localStorage.setItem(day, savedDay[day]);
    })
   
};

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

// pull exercise info from api
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
            exerciseAPI = exerciseData;
        
            createExerciseSearchResults(exerciseAPI);
            });
        });
    };
// create workouts results
function createExerciseSearchResults(searchedItem){
    
    var j;
    for (var i=0; i<4; i++) {
        $(`#search-result-${i}`).empty()
        var j = [Math.floor(Math.random()*1326)];
        console.log(j);
        $(`#search-result-${i}`).append(`
            <img src=${searchedItem[j].gifUrl}></img>
            <div>${searchedItem[j].name}</div>
            <div class="options">
                <label class="label">Select A Day</label>
                <div class="control">
                    <div class="select">
                        <select id=${i}>
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
        `)
        
    };

 // function for sending drop down bar info to calander 
 $("select").change(function(){
    var day = $(this).val()
    var pickedResult = $(this).attr("id")
    console.log(pickedResult);
    day = day.trim();
    console.log(day);


    var newP = $("<p>").text($("#search-result-" + pickedResult).children()[1].textContent);
    var savedExercise = ($("#search-result-" + pickedResult).children()[1].textContent);
    console.log(savedExercise);
    console.log(savedDay[day])
    savedDay[day].push(savedExercise)
    
    $(`#${day}`).append(newP);
    localStorage.setItem(day, savedDay[day]);

})

};
// exercise click handler
$("#exercise-search-btn").on("click", exerciseSearch);

// function to delete items per day
function deleteDay(day){
    $(`#${dayName[day]}`).empty();  
    savedDay[dayName[day]] = [];
    localStorage.removeItem(dayName[day]);
 };

 // handlers for delete buttons
$("#deleteSunday").on("click", function(){
    deleteDay(0);    
});

$("#deleteMonday").on("click", function(){
    deleteDay(1);
});

$("#deleteTuesday").on("click", function(){
    deleteDay(2);
});

$("#deleteWednesday").on("click", function(){
    deleteDay(3);
});

$("#deleteThursday").on("click", function(){
    deleteDay(4);
});

$("#deleteFriday").on("click", function(){
    deleteDay(5);
});

$("#deleteSaturday").on("click", function(){
    deleteDay(6);
});


// load search history from local storage
function myinit(){

     for (var i=0; i<7; i++){

         savedDay[dayName[i]] = localStorage.getItem(dayName[i]);
         if(savedDay[dayName[i]] !== null){
        
             console.log(savedDay[dayName[i]])    
        
             savedDay[dayName[i]] = savedDay[dayName[i]].split(",");
        
             console.log(savedDay[dayName[i]])
             console.log(savedDay[dayName[i]].length)
             for(var j = 0; j<savedDay[dayName[j]].length; j++){
                 $(`#${dayName[i]}`).append(`
                     <div>${savedDay[dayName[j]]}</div>
                 `)};
         };
     };
};

//myinit();