$(() => {

  $(".prep-info").submit(function(event) {
    const orderIdElement = $(this).parents().siblings(".orderID");
    const orderId = orderIdElement.val();

    event.preventDefault();
    const value = $(this).serializeArray();
    const timeNow = new Date();
    $.ajax('/api/twilio/prep-time-alert', {
      method: 'POST',
      dataType: 'TEXT',
      data: {
        value,
        orderId,
        timeNow: timeNow.getTime()
      },
      success: (data) => {
      },
      error: (err) => {
        console.log(`Error details: ${err}`);
      }
    });
  });

  $(".pick-up-alert").submit(function(event) {
    event.preventDefault();
    const customerName = $(".customerName").attr('value');
    const orderId = $('#finished').val();

    $.ajax('/api/twilio/pick-up-alert', {
      method: 'POST',
      dataType: 'TEXT',
      data: {
        orderId,
        customerName
      },
      success: (data) => {
        console.log(data);
      },

      error: (err) => {
        console.log(`Error details: ${err}`);
      }
    });
  });

});
