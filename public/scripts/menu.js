$(() => {

  // creating markup for each menu item
  const createMenuItem = function(item) {
    let $markup = `
    <div class="col">
      <div class="card h-80">
        <img src=${item.image_url} class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${item.name}</h5>
          <p class="card-text">${item.description}</p>
          <p class="card-price">$${item.price}</p>
        </div>
        <div class="card-footer">
          <button type="submit" class="btn btn-primary add-to-cart" name="item" value="${item.id}">ADD TO CART</button>
        </div>
      </div>
    </div>
    `
    return $markup;
  };

  // prepending the markup for each menu item
  const renderMenuItems = function(menu) {
    for (const item of menu) {
      const newItem = createMenuItem(item);
      $("#menu").prepend(newItem);
    }
  }

  // Ajax request to get JSON data, which is used to render the menu items using helper function
  const showMenu = function() {
    $.ajax({
      url: "/api/menu",
      type: "GET",
      dataType: "JSON",
      success: (data) => {
        const menu = data.menuItems;
        renderMenuItems(menu)
      }
    })
  }

  showMenu();

});
