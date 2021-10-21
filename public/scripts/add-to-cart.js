$(() => {
  $('#clear-cart').hide();
  $('.tip').hide();

  const $itemContainer = $('#selected-items-container');
  const $sumOrder = $('#sum-order');
  let totalWtTax = 0;
  const orderList = {
    items: [],
    note: '',
    tip: 0
  }; // object to store data of this customer's order
  let tip = 0;

  const emptyCart = () => {
    orderList.items = [];
    orderList.note = '';
    orderList.tip = 0;
    totalWtTax = 0;
    tip = 0;
    $('#clear-cart').hide();
    $('.tip').hide();
    $('#tip').val('');
    $('#customer-note').val('')
  };

  const addNewItem = (itemName, itemQuantity, itemPrice) => {
    const $selectedItem = $('<tr>').addClass('order-item');
    const $itemName = $('<td>').addClass('order-item-name').text(itemName);
    const $quantity = $('<td>').addClass('order-quantity').text(itemQuantity);
    const $price = $('<td>').addClass('order-price').text(Number.parseFloat(itemPrice).toFixed(2));

    $selectedItem.append($itemName, $quantity, $price);

    return $selectedItem;
  };

  const refreshSumOrder = (total) => {
    const tax = Math.round(total * 13) / 100;
    tipAmount = Math.round(total * tip) / 100;
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
        <td class="order-price">${Number.parseFloat(total).toFixed(2)}</td>
      </tr>
      <tr class="order-item">
        <td class="order-item-name">Tax (13%)</td>
        <td class="order-quantity"></td>
        <td class="order-price">${tax}</td>
      </tr>
      <tr class="order-item">
      <td class="order-item-name">Tip</td>
      <td class="order-quantity"></td>
      <td class="order-price" id='tip-amount'>${Number.parseFloat(tipAmount).toFixed(2)}</td>
      </tr>
      <tr class="order-item">
        <td class="order-item-name"><strong>Total</strong></td>
        <td class="order-quantity"></td>
        <td class="order-price"><strong>${Math.round((total + tax + tipAmount) * 100) / 100}</strong></td>
        </tr>
      `
    $sumOrder.append($markup);
    return $sumOrder;
  };

    // Render all items using the obj as reference
  const renderItems = () => {
    $itemContainer.empty();
    let $selectedItem;
    for (const item of orderList.items) {
      $selectedItem = addNewItem(item.name, item.quantity, item.price);
      $itemContainer.prepend($selectedItem);
    }
  };
  // Call function to ensure that when there's content in the obj
  // (ex. reloads page), the items will be shown in cart
  renderItems();

  // Functions to build the mechanism for the .ajax post
  // Checks if the item is in cart (for changeCart() function)
  const isInCart = (itemId) => {
    const itemsInCart = [];
    for(const item of orderList.items) {
      itemsInCart.push(item.item_id);
    }
    if (itemsInCart.includes(itemId)) {
      return true;
    }
    return false;
  }

  // Currently, only increases quantity, but may hold option to decrease later
  const updateItem = (itemId, itemPrice) => {
    for(const item of orderList.items) {
      if (item.item_id === itemId) {
        item.quantity ++;
        item.price += itemPrice;
      }
    }
  }

  // Makes changes in the cart, for the .ajax post
  const changeCart = (itemId, itemName, itemPrice) => {
    if (isInCart(itemId)) {
      return updateItem(itemId, itemPrice);
    } else {
      return orderList.items.push({
        item_id: itemId,
        name: itemName,
        quantity: 1,
        price: itemPrice
      });
    }
  }

  // Once client clicks on the add-to-cart button, the second parameter is there as it is dynamically rendered
  $(document).on("click", ".add-to-cart", function(event) {
    event.preventDefault();

    $('.message-to-customer').hide();
    $('#clear-cart').show();
    $('.tip').show();

    $.ajax('/api/add-to-cart', {
      method: 'POST',
      dataType: 'JSON',
      data: {
        id: event.target.value
      },
      success: (data) => {
        const itemId = data.item[0].id;
        const itemName = data.item[0].name;
        const itemPrice = data.item[0].price;
        totalWtTax += itemPrice;
        refreshSumOrder(totalWtTax);
        changeCart(itemId, itemName, itemPrice)
        renderItems();
      },

      error: (err) => {
        console.log(`Error details: ${err}`);
      }
    });
  });

  //Record customer note for order POST
  $('#customer-note').change(() => {
    orderList.note = $('#customer-note').val();
  });

  //Record customer input tip
  $(document).on('blur', '#tip', (event) => {
    event.preventDefault();
    tip = $('#tip').val();
    refreshSumOrder(totalWtTax);
    orderList.tip = tipAmount;
  });

  $(document).on("click", "#clear-cart", function(event) {
    event.preventDefault();
    $itemContainer.empty();
    $sumOrder.empty();
    emptyCart();
  });

  // Trigger order once customer click Order now
  $(document).on("click", ".order-button", function(event) {
    event.preventDefault();

    //Clear order content after submitting and display message to customer
    $itemContainer.empty();
    $sumOrder.empty();
    $('#customer-note').val('');
    $('.message-to-customer').text('Thank you for your order! You will receive our confirmation shortly.');
    $('.message-to-customer').show();

    $.ajax('/api/orders', {
      method: 'POST',
      dataType: 'JSON',
      data: orderList,
      success: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log(`Error details: ${err}`);
      }
    });

    //AJAX request to /api/twilio
    $.ajax('/api/twilio', {
      method: 'POST',
      dataType: 'JSON',
      data: orderList,
      success: (data) => {
        console.log("this is the minute:", data);
      },

      error: (err) => {
        console.log(`Error details: ${err}`);
      }
    });
    emptyCart();
    console.log('check empty cart 2: ',orderList.items);
  });

})
