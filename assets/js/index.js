// Page element housing date 
let $currentDay = $("#currentDay");
// Main container element - to insert timeblocks
let $mainEl = $(".container");
// Button to save user inputted events into time block
let $saveBtn =$("button");

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


init();
// Function initialize necessary feature 
function init() {
    setDate();
    renderTimeBlocks();
}

// Function that displays date
function setDate() {
    // Display date on page
    $currentDay.text(moment().format("dddd, MMMM Do YYYY"));
}

// Function that displays timeblocks on page
function renderTimeBlocks() {
    for (let i = 9; i < 18; i++) {
        const hours = moment().hour(i).format("h A");   

        // Create div el to house time block
        let $timeblockContainer = $('<div class ="row"></div>');
        let $hourDiv = $('<div class = "col-2 hour"></div>');
        let $textareaEl = $('<textarea class = "col-8 event" placeholder = "Add Event"></textarea>');
        let $saveBtn =$('<button class = "col-2 saveBtn"><i class="fas fa-save"></button>');
        
        // Set content for hours on timeblock
        $hourDiv.text(hours);

        // Set attribute for events to the hour
        $textareaEl.attr("data-time", hours)

        // Append content to page
        $mainEl.append($timeblockContainer);
        $timeblockContainer.append($hourDiv);
        $timeblockContainer.append($textareaEl);
        $timeblockContainer.append($saveBtn);
    }
}

// Function to render saved events 
function renderSavedEvents () {
    for (let i = 0; i < hours.length; i++) {
        const hour = hours[i];
        console.log(hour);
        let savedEvent = localStorage.getItem(hour);
        if (savedEvent !== null){
            console.log(savedEvent);
            let test = "." + hour
            console.log(test);
            $("#hour").text(savedEvent);
        }    
    }
}

// Function to store new event in timeblock
function saveEvent(event) {
    // Hour of the day i.e., 9am - 5pm
    let $hour =$(event.target).siblings(".hour").text();
    // store inputted event
    let $newEvent = $(event.target).siblings("#event").val();
    // store inputted event in local storage. Key is hour of day
    localStorage.setItem($hour, $newEvent)
    $("#event").attr('data-time', $hour);
    // add hour to class for event text area
    $("#event").addClass($hour);
    console.log($hour);
    
}

// Event handler for user event save button
$saveBtn.on('click', saveEvent);