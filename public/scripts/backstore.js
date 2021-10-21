$(() => {

  $(".prep-info").submit(function(event) {
    const orderIdElement = $(this).parents().siblings(".orderID");
    const orderId = orderIdElement.val();

    event.preventDefault();
    const value = $(this).serializeArray();
    $.ajax('/api/twilio/prep-time-alert', {
      method: 'POST',
      dataType: 'TEXT',
      data: {
        value,
        orderId
      },
      success: (data) => {
        console.log("this is prep data:", data);
      },

      error: (err) => {
        console.log(`Error details: ${err}`);
      }
    });
  });

  $(".pick-up-alert").submit(function(event) {
    event.preventDefault();
    const value = $(this).serialize();
    $.ajax('/api/twilio/pick-up-alert', {
      method: 'POST',
      dataType: 'TEXT',
      data: value,
      success: (data) => {
        console.log("this is pick up data:", data);
      },

      error: (err) => {
        console.log(`Error details: ${err}`);
      }
    });
  });

});
