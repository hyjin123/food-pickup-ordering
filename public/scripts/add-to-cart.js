$(() => {

  const addNewItem = (itemName, itemQuantity, itemPrice) => {
    const $selectedItem = $('<tr>').addClass('order-item');
    const $itemName$ = $('<td>').addClass('order-item-name').text(itemName);
    const $quantity = $('<td>').addClass('order-quantity').text(itemQuantity);
    const $price = $('<td>').addClass('order-price').text(itemPrice);

    $selectedItem.append($itemName$, $quantity, $price);

    return $selectedItem;
  };

  const renderItems = (itemName, itemQuantity, itemPrice) => {
    const $itemContainer = $('#selected-items-container');
    // $itemContainer.empty();
    const $selectedItem = addNewItem(itemName, itemQuantity, itemPrice);
    $itemContainer.prepend($selectedItem);

  };

  // Once client clicks on the add-to-cart button, the second parameter is there as it is dynamically rendered
  $(document).on("click", ".add-to-cart", function(event) {
    event.preventDefault();
    $.ajax('/api/add-to-cart', {
      method: 'POST',
      dataType: 'JSON',
      data: {
        id: event.target.value
      },
      success: (data) => {
        console.log(data);
        const itemName = data.item[0].name;
        const itemPrice = data.item[0].price;
        renderItems(itemName, 1, itemPrice);
      },

      error: (err) => {
        console.log(`Error details: ${err}`);
      }
    });
  })

})
