
// Days of the Week Variable 
var daysOfTheWeek = [
    {day: 1},
    {day: 2},
    {day: 3},
    {day: 3},
    {day: 4},
    {day: 5},
    {day: 6},
    {day: 7},
];   

// create days of the week sections 
for(i=0; i<daysOfTheWeek.length; i++) {
    var day = $("<div").text(daysOfTheWeek[i].day)
    var dayTitle = $("h1")

    day.append(dayTitle)
}