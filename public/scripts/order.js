
$(document).ready(function() {

  // Once client clicks on the add-to-cart button, the second parameter is there as it is dynamically rendered
  $(document).on("click", ".order-button", function(event) {
    event.preventDefault();
    $.ajax('/api/orders', {
      method: 'POST',
      dataType: 'JSON',
      data:$(this),
      success: (data) => {
        console.log(data);
      },

      error: (err) => {
        console.log(`Error details: ${err}`);
      }
    });
  });
});

