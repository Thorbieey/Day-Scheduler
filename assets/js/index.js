// Page element housing date 
let $currentDay = $("#currentDay");
// Main container element - to insert timeblocks
let $mainEl = $(".container");
// Button to save user inputted events into time block
let $saveBtn =$("button");


init();
// Function initialize necessary feature 
function init() {
    // Display date
    setDate();
    // Display time blocks
    renderTimeBlocks();
    // Display saved events
    renderSavedEvents();
    // Display colour code
    setColourCode();
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
        let $saveBtn =$('<button class = "col-2 saveBtn"><i class="fas fa-save"></i></button>');
        
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

// Function to save new event in timeblock
function saveEvent(event) {
    // Hour of the day i.e., 9am - 5pm
    let $hour =$(event.target).siblings(".hour").text();
    // Inputted event/text
    let $newEvent = $(event.target).siblings(".event").val();
    // Store inputted event in local storage. Key is hour of day
    localStorage.setItem($hour, $newEvent);
    // Alert user about saved event
    alert("You have saved an event for " + $hour);
}

// Function to render saved events 
function renderSavedEvents() {
    $("[data-time]").each(function () {
        // Get data-time value for each textarea
        let $hour = $(this).attr("data-time");
        // Get saved event by the hour
        let $savedEvent = localStorage.getItem($hour);
        if ($savedEvent !== null){
            // Set content of each text area to saved event. Only if there's a saved event for that hour
            $(this).text($savedEvent);
        }
    })
}

// Function to set colour code
function setColourCode() {
    // Store current time from moments clock in 24 hour format
    let $currentTime = Number(moment().format('H'));
    $("[data-time]").each(function () {
        // Store hour on each timeblock and convert to 24 hour format
        let hour = $(this).attr("data-time")
        let $eventTime = Number(moment(hour, "h A").format("H"));
        if ($eventTime > $currentTime) {
            // If timeblock hour is after the current time set textarea colour to green
            $(this).addClass("future");  
        }
        else if ($eventTime < $currentTime) {
            // If timeblock hour is before the current time set textarea colour to ash
            $(this).addClass("past");
            
        }
        else if ($eventTime == $currentTime) {
            // If timeblock hour is the same as current time set textarea colour to red
            $(this).addClass("present");
        }
    })
}

// Event handler for save new event button
$(".saveBtn").on('click', saveEvent);

// Re-run function to set color code every min
setInterval(setColourCode, 60000);