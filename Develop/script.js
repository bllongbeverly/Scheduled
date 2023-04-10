$(function () {
  // Add listener for click events on the save button
  $('.saveBtn').on('click', function() {
    // Get the user input from the textarea
    var userInput = $(this).siblings('.description').val();
    // Get the id of the time-block containing the button that was clicked
    var timeBlockId = $(this).closest('.time-block').attr('id');
    // Save the user input in local storage using the id as the key
    localStorage.setItem(timeBlockId, userInput);
  });

  // Apply past, present, or future class to each time block
  var currentHour = dayjs().hour();
  $('.time-block').each(function() {
    var timeBlockHour = parseInt($(this).attr('id').split('-')[1]);
    if (timeBlockHour < currentHour) {
      $(this).addClass('past');
    } else if (timeBlockHour === currentHour) {
      $(this).addClass('present');
    } else {
      $(this).addClass('future');
    }
  });

  // Get any user input that was saved in localStorage and set the values of the corresponding textarea elements
  $('.time-block').each(function() {
    var timeBlockId = $(this).attr('id');
    var userInput = localStorage.getItem(timeBlockId);
    $(this).find('.description').val(userInput);
  });

  // Display the current date in the header of the page
  var currentDate = dayjs().format('dddd, MMMM D');
  $('#currentDay').text(currentDate);
});
