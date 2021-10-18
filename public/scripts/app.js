// Client facing scripts here

$(() => {

  //Example to show queried data to the main page
  // const renderIt = function (data) {
  //   $("#main-container").append(`<p>${data.users[0].name}</p>`);
  // };


  // feature that shows the toggle button based on the vertical position
  $(document).scroll(function() {
    let position = $(this).scrollTop();
    if (position > 200) {
      $("#toggle-button").fadeIn();
    } else {
      $("#toggle-button").fadeOut();
    }
  });

  // feature that lets you scroll to the top when you toggle the button
  $("#toggle-button").click(function() {
    window.scrollTo({top: 0, behavior: 'smooth'});
  });

});
