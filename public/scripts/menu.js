$(() => {

  const createMenuItem = function(menu) {
    let $markup = `
    <div class="col">
      <div class="card h-80">
        <img src=${item.image_url} class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${item.name}</h5>
          <p class="card-text">${item.description}</p>
        </div>
        <div class="card-footer">
         <button type="button" class="btn btn-primary">ADD TO CART</button>
        </div>
      </div>
    </div>
    `
    return $markup;
  };

  const renderMenuItems = function(menu) {
    for (const item of menu) {
      createMenuItem(item);
    }
  }

  const showMenu = function() {
    $.ajax({
      url: "/api/widgets/menu",
      type: "GET",
      dataType: "JSON",
      success: (data) => {
        const menu = data.menuItems;
        console.log(renderMenuItems(menu));
      }
    })
  }

  showMenu();

});
