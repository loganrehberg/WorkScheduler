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

 $(document).ready(function() {
      // Display the current day at the top of the calendar
      const currentDay = dayjs().format('dddd, MMMM D, YYYY');
      $('#currentDay').text(currentDay);

      // An array to store events
      let events = JSON.parse(localStorage.getItem('events')) || [];

      // Function to render the timeblocks
      function renderTimeblocks() {
        $('#timeblocks').empty();
        const currentHour = dayjs().hour();
        for (let hour = 9; hour <= 17; hour++) {
          const time = dayjs().hour(hour).minute(0).format('h:mm A');
          const event = events.find(e => e.hour === hour);
          const eventText = event ? event.text : '';
          let timeblockClass = 'timeblock';
          if (hour < currentHour) {
            timeblockClass += ' past';
          } else if (hour === currentHour) {
            timeblockClass += ' present';
          } else {
            timeblockClass += ' future';
          }
          const timeblockHTML = `<div class="${timeblockClass}" data-hour="${hour}"><div class="time">${time}</div><textarea class="event-text">${eventText}</textarea><button class="save-btn">Save</button></div>`;
          $('#timeblocks').append(timeblockHTML);
        }
      }

      // Function to save an event
      function saveEvent(hour, text) {
        const eventIndex = events.findIndex(e => e.hour === hour);
        if (eventIndex !== -1) {
          events[eventIndex].text = text;
        } else {
          events.push({ hour, text });
        }
        localStorage.setItem('events', JSON.stringify(events));
      }

      // Event listener for saving an event
      $(document).on('click', '.save-btn', function() {
        const hour = $(this).parent().data('hour');
        const text = $(this).siblings('.event-text').val();
        saveEvent(hour, text);
      });

      // Render the timeblocks
      renderTimeblocks();
    });

  //save button for saving the data in the text area
  $(".saveBtn").on( "click", function(event) {
      event.preventDefault();
      //$this is used to target the current element being clicked on and finding the parent ID name
      var timeSlotEl = $(this).closest('.time-block').attr('id');
      //uses name gathered in the "timeSlotEl" variable to pull the ID for the parent Element in HTML
      var timeSlotId = document.getElementById(timeSlotEl);
      //uses the parent element to select the text area child of the parent identified in the timeSLotID variable
      var textSlotEl = timeSlotId.querySelector('textarea')
      //assigns the value in the text area to the saveInput variable
      var saveInput = textSlotEl.value;
        //saves the value in local storage with the name of the parent element as the name and the text value as the value
        localStorage.setItem(timeSlotEl, saveInput);
  } );

