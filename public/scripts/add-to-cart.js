$(() => {

  const addNewItem = (itemName, itemQuantity, itemPrice) => {
    const $selectedItem = $('<tr>').addClass('order-item');
    const $itemName$ = $('<td>').addClass('order-item-name').text(itemName);
    const $quantity = $('<td>').addClass('order-quantity').text(itemQuantity);
    const $price = $('<td>').addClass('order-price').text(itemPrice);

    $selectedItem.append($itemName$, $quantity, $price);

    return $selectedItem;
  };

  const $itemContainer = $('#selected-items-container');
  const $sumOrder = $('#sum-order');
  let totalWtTax = 0;
  const order_list = {
    items: []
  }; //record all data of this customer order

  const sumOrder = (total) => {
    const tax = Math.round(total * 13) / 100;
    $sumOrder.empty();

    const $markup = `
      <tr class="order-item">
        <td class="order-item-name">---</td>
        <td class="order-quantity"></td>
        <td class="order-price"></td>
      </tr>
      <tr class="order-item">
        <td class="order-item-name">Sub total</td>
        <td class="order-quantity"></td>
        <td class="order-price">${Math.round((total) * 100) / 100}</td>
      </tr>
      <tr class="order-item">
        <td class="order-item-name">Tax (13%)</td>
        <td class="order-quantity"></td>
        <td class="order-price">${tax}</td>
      </tr>
      <tr class="order-item">
        <td class="order-item-name"><strong>Total</strong></td>
        <td class="order-quantity"></td>
        <td class="order-price"><strong>${Math.round((total + tax) * 100) / 100}</strong></td>
      </tr>
    `
    $sumOrder.append($markup);
    return $sumOrder;
  };

  const renderItems = (itemName, itemQuantity, itemPrice) => {
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
        console.log('data on click: ', data.item);
        console.log(data);
        const itemID = data.item[0].id;
        const itemName = data.item[0].name;
        const itemPrice = data.item[0].price;
        totalWtTax += itemPrice;
        renderItems(itemName, 1, itemPrice);
        sumOrder(totalWtTax);
        order_list.items.push({
          item_id: itemID,
          quantity: 1
        });
      },

      error: (err) => {
        console.log(`Error details: ${err}`);
      }
    });
  });

  //Record customer note for order POST
  $('#customer-note').change(() => {
    order_list.note = $('#customer-note').val();
  });

  // Trigger order once customer click Order now
  $(document).on("click", ".order-button", function(event) {
    event.preventDefault();
    $.ajax('/api/orders', {
      method: 'POST',
      dataType: 'JSON',
      data: order_list,
      success: (data) => {
        console.log(data);
      },

      error: (err) => {
        console.log(`Error details: ${err}`);
      }
    });
  });
})
