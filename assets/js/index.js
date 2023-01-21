// Display current time and date 
let $currentDay = $("#currentDay").text(moment().format("dddd, MMMM Do YYYY"));
let $saveBtn =$("button");

function saveEvent(event) {
    let $newEvent =$(event.target).siblings("#event").val();
    console.log($newEvent);
    
}

// event handler for user event save button
$saveBtn.on('click', saveEvent);