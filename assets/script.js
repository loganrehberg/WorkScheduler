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

// Get the current date and display it at the top of the calendar
function displayCurrentDay (){
  var currentDayEl = document.getElementById('currentDay');
  var currentDate = dayjs().format('dddd, MMMM D, YYYY');
  currentDayEl.textContent = currentDate;
}

// set the color coding for each time block based on past, present, or furute
function setColorCoding() {
  var currentHour = dayjs().hour();

  //loop through each time block
  $('.time-block').each(function(){
    var timeBlockHour = parseInt($(this).attr('id').split('-')[1]);

    // add appropriate class based on the current hour
    if (timeBlockHour < currentHour) {
      $(this).addClass('past');
    }else if (timeBlockHour === currentHour){
      $(this).addClass('present');
    } else {
      $(this).addClass('future');
    }
  });
}

// save the event text in local storage when the save button is clicked
$('.saveBtn').on('click', function(){
  var timeBlockId = $(this).parent().attr('id');
  var eventText = $(this).siblings('.description').val();

  localStorage.setItem(timeBlockId, eventText);
});

//Load the saved events from local storage
function loadEvents(){
  $('.time-block').each(function(){
    var timeBlockId = $(this).attr('id');
    var eventText = localStorage.getItem(timeBlockId);

    $(this).find('.description').val(eventText);
  });
};

