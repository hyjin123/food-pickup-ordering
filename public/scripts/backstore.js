$(() => {

  $(".prep-info").submit(function(event) {
    event.preventDefault();
    const value = $(this).serialize();
    $.ajax('/api/twilio/prep-time-alert', {
      method: 'POST',
      dataType: 'TEXT',
      data: value,
      success: (data) => {
        console.log("this is prep data:", data);
        //updated the status of the order with the new prep time

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
