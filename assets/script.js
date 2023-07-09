// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
// TODO: Add a listener for click events on the save button. This code should
// use the id in the containing time-block as a key to save the user input in
// local storage. HINT: What does `this` reference in the click listener
// function? How can DOM traversal be used to get the "hour-x" id of the
// time-block containing the button that was clicked? How might the id be
// useful when saving the description in local storage?
//
// TODO: Add code to apply the past, present, or future class to each time
// block by comparing the id to the current hour. HINTS: How can the id
// attribute of each time-block be used to conditionally add or remove the
// past, present, and future classes? How can Day.js be used to get the
// current hour in 24-hour time?
//
// TODO: Add code to get any user input that was saved in localStorage and set
// the values of the corresponding textarea elements. HINT: How can the id
// attribute of each time-block be used to do this?
//
// TODO: Add code to display the current date in the header of the page.

//Function to render the events on the calender

// An array to store events
let events = [];

// Function to render the timeblocks
function renderTimeblocks() {
  const currentHour = dayjs().hour();

  $('#calendar').empty();
  for (let hour = 9; hour <= 17; hour++) {
    const time = dayjs().hour(hour).minute(0);
    const timeDisplay = time.format('h:mm A');
    const timeblockClass = hour < currentHour ? 'past' : (hour === currentHour ? 'present' : 'future');
    const event = events.find(e => e.time.isSame(time, 'hour'));
    const eventText = event ? event.text : '';

    const timeblockHTML = `
      <div class="timeblock">
        <div class="time">${timeDisplay}</div>
        <textarea class="event-text ${timeblockClass}">${eventText}</textarea>
        <button class="save-btn">Save</button>
      </div>
    `;

    $('#calendar').append(timeblockHTML);
  }
}

// Function to save an event
function saveEvent(time, text) {
  const eventIndex = events.findIndex(e => e.time.isSame(time, 'hour'));
  if (eventIndex !== -1) {
    events[eventIndex].text = text;
  } else {
    events.push({ time, text });
  }
  localStorage.setItem('events', JSON.stringify(events));
}

$(document).ready(function() {
  // Display the current day at the top of the calendar
  const currentDate = dayjs().format('dddd, MMMM D, YYYY');
  $('#currentDay').text(currentDate);

  // Load events from local storage
  const storedEvents = localStorage.getItem('events');
  if (storedEvents) {
    events = JSON.parse(storedEvents);
  }

  renderTimeblocks();

  // Event listener for saving an event
  $('.save-btn').on('click', function() {
    const $timeblock = $(this).closest('.timeblock');
    const $textarea = $timeblock.find('.event-text');
    const time = dayjs($timeblock.find('.time').text(), 'h:mm A');
    const text = $textarea.val().trim();
    saveEvent(time, text);
  });
});