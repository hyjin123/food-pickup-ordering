// Client facing scripts here

$(() => {

  //Example to show queried data to the main page
  // const renderIt = function (data) {
  //   $("#main-container").append(`<p>${data.users[0].name}</p>`);
  // };

  // const showUsers = function() {
  //   $.ajax({
  //     url: "/api/users",
  //     type: "GET",
  //     dataType: "JSON",
  //     success: (data) => {
  //       console.log(data);
  //       renderIt(data);
  //     }
  //   });
  // };
  // showUsers();

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

  // Feature to greet the user in the main page
  const greetUser = function() {
    $.ajax({
      url: "/greetings",
      success: (data) => {
        $("#greeting").append(`<p>${data.customerName}</p>`);
      }
    });
  };
  greetUser();
});
