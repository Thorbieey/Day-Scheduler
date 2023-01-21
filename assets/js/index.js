// Display current time and date 
let $currentDay = $("#currentDay").text(moment().format("dddd, MMMM Do YYYY"));
// Button to save user inputted events into time block
let $saveBtn =$("button");
// Hour of the day i.e., 9am - 5pm
let $hour =$(".hour").text();
// 
let eventTextArea = document.querySelector("#event");
// Available timeblocks
let hours = [
    "9am",
    "10am",
    "11am",
    "12am",
    "1pm",
    "2pm",
    "3pm",
    "4pm",
    "5pm"
];

renderSavedEvents();
// Function to render saved events 
function renderSavedEvents () {
    for (let i = 0; i < hours.length; i++) {
        const hour = hours[i];
        let savedEvent = localStorage.getItem(hour);
        if (savedEvent !== null){
            console.log(savedEvent);
            $("#event").text(savedEvent);
        }    
    }
}

// Function to store new event in timeblock
function saveEvent(event) {
    // store inputted event
    let $newEvent = $(event.target).siblings("#event").val();
    // store inputted event in local storage. Key is hour of day
    localStorage.setItem($hour, $newEvent)
    $("#event").attr('data-time', $hour);
    // add hour to class for event text area
    $("#event").addClass($hour);
    console.log($newEvent);
    
}

// Event handler for user event save button
$saveBtn.on('click', saveEvent);