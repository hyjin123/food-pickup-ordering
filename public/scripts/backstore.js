$(() => {
  $("form").submit(function(event) {
    event.preventDefault();
    const value = $(this).serialize();
    $.ajax('/api/twilio/prep-time', {
      method: 'POST',
      dataType: 'TEXT',
      data: value,
      success: (data) => {
        console.log("this is the minute:", data);
      },

      error: (err) => {
        console.log(`Error details: ${err}`);
      }
    });
  });
});
